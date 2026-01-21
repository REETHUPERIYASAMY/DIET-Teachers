import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Container, Form, Button, Row, Col } from 'react-bootstrap';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Feedback = ({ triggerAlert }) => {
  const { trainingId } = useParams();
  const { user } = useAuth();
  const [training, setTraining] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    rating: 5,
    feedback: ''
  });

  useEffect(() => {
    fetchTrainingDetails();
    fetchFeedbacks();
  }, [trainingId]);

  const fetchTrainingDetails = async () => {
    try {
      const response = await api.get(`/trainings/${trainingId}`);
      setTraining(response.data);
    } catch (error) {
      console.error('Error fetching training details:', error);
      triggerAlert('Failed to fetch training details', 'danger');
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const response = await api.get(`/feedback/training/${trainingId}`);
      setFeedbacks(response.data);
      
      // Check if current user has already submitted feedback
      const userFeedback = response.data.find(
        feedback => feedback.teacherId._id === user._id
      );
      
      if (userFeedback) {
        setHasSubmitted(true);
        setFormData({
          rating: userFeedback.rating,
          feedback: userFeedback.feedback
        });
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      triggerAlert('Failed to fetch feedbacks', 'danger');
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
    setSubmitting(true);
    
    try {
      if (hasSubmitted) {
        // Update existing feedback (API doesn't support this yet, but we can show a message)
        triggerAlert('You have already submitted feedback for this training', 'info');
      } else {
        // Submit new feedback
        await api.post('/feedback', {
          trainingId,
          rating: formData.rating,
          feedback: formData.feedback
        });
        
        triggerAlert('Feedback submitted successfully!', 'success');
        setHasSubmitted(true);
        
        // Refresh feedbacks
        fetchFeedbacks();
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      triggerAlert(
        error.response?.data?.message || 'Failed to submit feedback',
        'danger'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map(star => (
          <i 
            key={star} 
            className={`bi bi-star${star <= rating ? '-fill' : ''}`}
          ></i>
        ))}
      </div>
    );
  };

  return (
    <Container fluid>
      <h2 className="mb-4">Training Feedback</h2>
      
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {training && (
            <Card className="mb-4">
              <Card.Header as="h5">{training.title}</Card.Header>
              <Card.Body>
                <p><strong>Cluster:</strong> {training.cluster}</p>
                <p><strong>Issue Category:</strong> {training.issueCategory}</p>
                <p><strong>Objectives:</strong> {training.objectives}</p>
              </Card.Body>
            </Card>
          )}
          
          <Row>
            <Col md={6}>
              <Card className="mb-4">
                <Card.Header as="h5">
                  {hasSubmitted ? 'Your Feedback' : 'Submit Feedback'}
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="rating">
                      <Form.Label>Rating</Form.Label>
                      <Form.Select
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        disabled={hasSubmitted}
                      >
                        <option value={5}>5 - Excellent</option>
                        <option value={4}>4 - Very Good</option>
                        <option value={3}>3 - Good</option>
                        <option value={2}>2 - Fair</option>
                        <option value={1}>1 - Poor</option>
                      </Form.Select>
                      <div className="mt-2">
                        {renderStars(parseInt(formData.rating))}
                      </div>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="feedback">
                      <Form.Label>Feedback</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="feedback"
                        value={formData.feedback}
                        onChange={handleChange}
                        placeholder="Share your thoughts about this training..."
                        disabled={hasSubmitted}
                      />
                    </Form.Group>
                    
                    {!hasSubmitted && (
                      <Button 
                        variant="primary" 
                        type="submit"
                        disabled={submitting}
                      >
                        {submitting ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Submitting...
                          </>
                        ) : (
                          'Submit Feedback'
                        )}
                      </Button>
                    )}
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6}>
              <Card>
                <Card.Header as="h5">All Feedback</Card.Header>
                <Card.Body>
                  {feedbacks.length === 0 ? (
                    <p>No feedback submitted yet.</p>
                  ) : (
                    <div className="feedback-list">
                      {feedbacks.map(feedback => (
                        <div key={feedback._id} className="feedback-card">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <h6 className="mb-0">{feedback.teacherId.name}</h6>
                            {renderStars(feedback.rating)}
                          </div>
                          <p className="mb-0">{feedback.feedback}</p>
                          <small className="text-muted">
                            Submitted on {new Date(feedback.createdAt).toLocaleDateString()}
                          </small>
                        </div>
                      ))}
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Feedback;