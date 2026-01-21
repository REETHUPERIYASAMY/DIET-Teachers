import React, { useState, useEffect } from 'react';
import { Card, Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../services/api';

const TrainingHistory = ({ triggerAlert }) => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      const response = await api.get('/trainings');
      setTrainings(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching trainings:', error);
      triggerAlert('Failed to fetch training history', 'danger');
      setLoading(false);
    }
  };

  return (
    <Container fluid>
      <h2 className="mb-4">Training History</h2>
      
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : trainings.length === 0 ? (
        <Card>
          <Card.Body>
            <p>No training plans have been created yet.</p>
            <Button as={Link} to="/training-planner" variant="primary">
              Create Training Plan
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Row>
          {trainings.map(training => (
            <Col md={6} className="mb-4" key={training._id}>
              <Card className="training-card h-100">
                <Card.Header as="h5">
                  {training.title}
                  <span className={`badge bg-${
                    training.status === 'planned' ? 'primary' : 
                    training.status === 'ongoing' ? 'warning' : 'success'
                  } float-end`}>
                    {training.status}
                  </span>
                </Card.Header>
                <Card.Body>
                  <p><strong>Cluster:</strong> {training.cluster}</p>
                  <p><strong>Issue Category:</strong> {training.issueCategory}</p>
                  <p><strong>Objectives:</strong> {training.objectives}</p>
                  <p><strong>Modules:</strong> {training.modules.length} micro-learning modules</p>
                  <p><strong>Created By:</strong> {training.createdBy.name}</p>
                  <p><strong>Scheduled Date:</strong> {new Date(training.scheduledDate).toLocaleDateString()}</p>
                </Card.Body>
                <Card.Footer>
                  <Button 
                    as={Link} 
                    to={`/feedback/${training._id}`} 
                    variant="outline-primary"
                    className="me-2"
                  >
                    View Feedback
                  </Button>
                  <Button variant="outline-secondary">
                    Edit Plan
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default TrainingHistory;