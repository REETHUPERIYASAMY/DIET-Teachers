import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import api from '../services/api';

const ClusterIssues = ({ triggerAlert }) => {
  const { clusterName } = useParams();
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    subject: '',
    category: ''
  });

  useEffect(() => {
    fetchIssues();
  }, [clusterName]);

  useEffect(() => {
    // Apply filters
    let filtered = [...issues];
    
    if (filters.subject) {
      filtered = filtered.filter(issue => issue.subject === filters.subject);
    }
    
    if (filters.category) {
      filtered = filtered.filter(issue => issue.category === filters.category);
    }
    
    setFilteredIssues(filtered);
  }, [issues, filters]);

  const fetchIssues = async () => {
    try {
      const response = await api.get(`/issues/cluster/${encodeURIComponent(clusterName)}`);
      setIssues(response.data);
      setFilteredIssues(response.data);
      
      // Extract unique subjects and categories for filters
      const uniqueSubjects = [...new Set(response.data.map(issue => issue.subject))];
      const uniqueCategories = [...new Set(response.data.map(issue => issue.category))];
      
      setSubjects(uniqueSubjects);
      setCategories(uniqueCategories);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching issues:', error);
      triggerAlert('Failed to fetch cluster issues', 'danger');
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      subject: '',
      category: ''
    });
  };

  return (
    <Container fluid>
      <h2 className="mb-4">Issues in {decodeURIComponent(clusterName)} Cluster</h2>
      
      <Card className="mb-4">
        <Card.Header as="h5">Filter Issues</Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <Form.Group controlId="subjectFilter">
                <Form.Label>Subject</Form.Label>
                <Form.Select
                  name="subject"
                  value={filters.subject}
                  onChange={handleFilterChange}
                >
                  <option value="">All Subjects</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="categoryFilter">
                <Form.Label>Issue Category</Form.Label>
                <Form.Select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4} className="d-flex align-items-end">
              <Button variant="secondary" onClick={clearFilters} className="me-2">
                Clear Filters
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : filteredIssues.length === 0 ? (
        <Card>
          <Card.Body>
            <p>No issues found matching the current filters.</p>
          </Card.Body>
        </Card>
      ) : (
        <div className="issues-list">
          {filteredIssues.map(issue => (
            <div key={issue._id} className="issue-card">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h5 className="mb-0">{issue.category}</h5>
                <span className={`badge bg-${issue.status === 'pending' ? 'warning' : issue.status === 'in-progress' ? 'info' : 'success'}`}>
                  {issue.status}
                </span>
              </div>
              <p className="mb-1"><strong>Subject:</strong> {issue.subject}</p>
              <p className="mb-1"><strong>Teacher:</strong> {issue.teacherId.name}</p>
              <p className="mb-2">{issue.description}</p>
              <small className="text-muted">
                Reported on {new Date(issue.createdAt).toLocaleDateString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default ClusterIssues;