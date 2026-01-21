import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const TrainingPlanner = ({ triggerAlert }) => {
  const [clusters, setClusters] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCluster, setSelectedCluster] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [trainingPlan, setTrainingPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClusters();
    fetchCategories();
  }, []);

  const fetchClusters = async () => {
    try {
      const response = await api.get('/issues/stats');
      setClusters(response.data.clusters);
    } catch (error) {
      console.error('Error fetching clusters:', error);
      triggerAlert('Failed to fetch clusters', 'danger');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/issues');
      const uniqueCategories = [...new Set(response.data.map(issue => issue.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      triggerAlert('Failed to fetch categories', 'danger');
    }
  };

  const handleGeneratePlan = async () => {
    if (!selectedCluster || !selectedCategory) {
      triggerAlert('Please select both cluster and issue category', 'warning');
      return;
    }

    setLoading(true);
    
    try {
      const response = await api.post('/trainings/generate', {
        cluster: selectedCluster,
        issueCategory: selectedCategory
      });
      
      setTrainingPlan(response.data);
      triggerAlert('Training plan generated successfully!', 'success');
    } catch (error) {
      console.error('Error generating training plan:', error);
      triggerAlert(
        error.response?.data?.message || 'Failed to generate training plan',
        'danger'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSavePlan = async () => {
    if (!trainingPlan) return;
    
    setSaving(true);
    
    try {
      await api.post('/trainings', {
        title: trainingPlan.title,
        cluster: selectedCluster,
        issueCategory: selectedCategory,
        objectives: trainingPlan.objectives,
        modules: trainingPlan.modules,
        strategies: trainingPlan.strategies
      });
      
      triggerAlert('Training plan saved successfully!', 'success');
      navigate('/training-history');
    } catch (error) {
      console.error('Error saving training plan:', error);
      triggerAlert(
        error.response?.data?.message || 'Failed to save training plan',
        'danger'
      );
    } finally {
      setSaving(false);
    }
  };

  const handlePlanChange = (field, value) => {
    setTrainingPlan(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleModuleChange = (index, field, value) => {
    setTrainingPlan(prev => {
      const updatedModules = [...prev.modules];
      updatedModules[index] = {
        ...updatedModules[index],
        [field]: value
      };
      return {
        ...prev,
        modules: updatedModules
      };
    });
  };

  return (
    <Container fluid>
      <h2 className="mb-4">Training Planner</h2>
      
      <Card className="mb-4">
        <Card.Header as="h5">Generate Training Plan</Card.Header>
        <Card.Body>
          <Row>
            <Col md={5}>
              <Form.Group controlId="clusterSelect" className="mb-3">
                <Form.Label>Select Cluster</Form.Label>
                <Form.Select
                  value={selectedCluster}
                  onChange={(e) => setSelectedCluster(e.target.value)}
                >
                  <option value="">Select a cluster</option>
                  {clusters.map(cluster => (
                    <option key={cluster} value={cluster}>{cluster}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group controlId="categorySelect" className="mb-3">
                <Form.Label>Select Issue Category</Form.Label>
                <Form.Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2} className="d-flex align-items-end">
              <Button 
                variant="primary" 
                onClick={handleGeneratePlan}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Generating...
                  </>
                ) : (
                  'Generate Plan'
                )}
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      
      {trainingPlan && (
        <Card className="training-plan">
          <Card.Header as="h5">
            Training Plan: {trainingPlan.title}
            <Button 
              variant="success" 
              className="float-end" 
              onClick={handleSavePlan}
              disabled={saving}
            >
              {saving ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Saving...
                </>
              ) : (
                'Save Plan'
              )}
            </Button>
          </Card.Header>
          <Card.Body>
            <Alert variant="info">
              <i className="bi bi-info-circle me-2"></i>
              You can edit the training plan details before saving. Click on any text field to modify it.
            </Alert>
            
            <Form.Group controlId="trainingTitle" className="mb-3">
              <Form.Label>Training Title</Form.Label>
              <Form.Control
                type="text"
                value={trainingPlan.title}
                onChange={(e) => handlePlanChange('title', e.target.value)}
              />
            </Form.Group>
            
            <Form.Group controlId="trainingObjectives" className="mb-3">
              <Form.Label>Objectives</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={trainingPlan.objectives}
                onChange={(e) => handlePlanChange('objectives', e.target.value)}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Micro-Learning Modules</Form.Label>
              {trainingPlan.modules.map((module, index) => (
                <Card key={index} className="module-card">
                  <Card.Body>
                    <Form.Group controlId={`moduleTitle${index}`} className="mb-2">
                      <Form.Label>Module {index + 1} Title</Form.Label>
                      <Form.Control
                        type="text"
                        value={module.title}
                        onChange={(e) => handleModuleChange(index, 'title', e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId={`moduleContent${index}`}>
                      <Form.Label>Module Content</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={module.content}
                        onChange={(e) => handleModuleChange(index, 'content', e.target.value)}
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>
              ))}
            </Form.Group>
            
            <Form.Group controlId="trainingStrategies">
              <Form.Label>Teaching Strategies</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={trainingPlan.strategies}
                onChange={(e) => handlePlanChange('strategies', e.target.value)}
              />
            </Form.Group>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default TrainingPlanner;