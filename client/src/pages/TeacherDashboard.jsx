import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const TeacherDashboard = ({ triggerAlert }) => {
  const { user } = useAuth();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    cluster: user.cluster || '',
    subject: '',
    category: '',
    description: ''
  });

  useEffect(() => {
    fetchMyIssues();
  }, []);

  const fetchMyIssues = async () => {
    try {
      const response = await api.get('/issues');
      // Filter issues by current teacher
      const myIssues = response.data.filter(issue => 
        issue.teacherId._id === user._id
      );
      setIssues(myIssues);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching issues:', error);
      triggerAlert('Failed to fetch issues', 'danger');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await api.post('/issues', formData);
      triggerAlert('Issue submitted successfully!', 'success');
      
      // Reset form
      setFormData({
        cluster: user.cluster || '',
        subject: '',
        category: '',
        description: ''
      });
      
      // Refresh issues
      fetchMyIssues();
    } catch (error) {
      console.error('Error submitting issue:', error);
      triggerAlert(
        error.response?.data?.message || 'Failed to submit issue',
        'danger'
      );
    }
  };

  return (
    <Container fluid>
      <h2 className="mb-4">Teacher Dashboard</h2>
      
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header as="h5">Report Classroom Issue</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formCluster">
                  <Form.Label>Cluster</Form.Label>
                  <Form.Control
                    type="text"
                    name="cluster"
                    value={formData.cluster}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formSubject">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g., Mathematics, Science"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCategory">
                  <Form.Label>Issue Category</Form.Label>
                  <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select category</option>
                    <option value="Classroom Management">Classroom Management</option>
                    <option value="Digital Learning">Digital Learning</option>
                    <option value="Curriculum Implementation">Curriculum Implementation</option>
                    <option value="Student Engagement">Student Engagement</option>
                    <option value="Assessment Methods">Assessment Methods</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the issue in detail"
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit Issue
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card>
            <Card.Header as="h5">My Reported Issues</Card.Header>
            <Card.Body>
              {loading ? (
                <div className="loading-spinner">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : issues.length === 0 ? (
                <p>No issues reported yet.</p>
              ) : (
                <div className="issues-list">
                  {issues.map(issue => (
                    <div key={issue._id} className="issue-card">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="mb-0">{issue.category}</h6>
                        <span className={`badge bg-${issue.status === 'pending' ? 'warning' : issue.status === 'in-progress' ? 'info' : 'success'}`}>
                          {issue.status}
                        </span>
                      </div>
                      <p className="mb-1"><strong>Subject:</strong> {issue.subject}</p>
                      <p className="mb-0">{issue.description}</p>
                      <small className="text-muted">
                        Reported on {new Date(issue.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TeacherDashboard;