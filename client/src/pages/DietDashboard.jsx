import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../services/api';

const DietDashboard = ({ triggerAlert }) => {
  const [stats, setStats] = useState({
    totalIssues: 0,
    topCluster: 'N/A',
    topIssueType: 'N/A',
    clusters: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/issues/stats');
      setStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      triggerAlert('Failed to fetch dashboard data', 'danger');
      setLoading(false);
    }
  };

  return (
    <Container fluid>
      <h2 className="mb-4">DIET Dashboard</h2>
      
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <Row className="mb-4">
            <Col md={4}>
              <Card className="dashboard-card text-center">
                <Card.Body>
                  <h2 className="text-primary">{stats.totalIssues}</h2>
                  <p className="card-text">Total Issues Reported</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="dashboard-card text-center">
                <Card.Body>
                  <h2 className="text-success">{stats.topCluster}</h2>
                  <p className="card-text">Top Cluster</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="dashboard-card text-center">
                <Card.Body>
                  <h2 className="text-warning">{stats.topIssueType}</h2>
                  <p className="card-text">Top Issue Type</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          <Row>
            <Col>
              <Card>
                <Card.Header as="h5">Clusters</Card.Header>
                <Card.Body>
                  {stats.clusters.length === 0 ? (
                    <p>No clusters available.</p>
                  ) : (
                    <Row>
                      {stats.clusters.map((cluster, index) => (
                        <Col md={4} className="mb-3" key={index}>
                          <Card className="cluster-card h-100">
                            <Card.Body>
                              <Card.Title>{cluster}</Card.Title>
                              <Card.Text>
                                View and manage issues from this cluster
                              </Card.Text>
                              <Button 
                                as={Link} 
                                to={`/cluster/${encodeURIComponent(cluster)}`} 
                                variant="primary"
                              >
                                View Issues
                              </Button>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
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

export default DietDashboard;