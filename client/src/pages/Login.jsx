import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './Login.css';
import teacherImage from '../assets/teacher.webp'; // Replace with your image path

const Login = ({ triggerAlert }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('teacher');
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [cluster, setCluster] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const response = await api.post('/auth/login', { email, password });
        login(response.data);
        triggerAlert('Login successful!', 'success');
      } else {
        const response = await api.post('/auth/register', { name, email, password, role, cluster });
        login(response.data);
        triggerAlert('Registration successful!', 'success');
      }
    } catch (error) {
      triggerAlert(
        error.response?.data?.message || 'An error occurred. Please try again.',
        'danger'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* LOGIN CARD */}
        <Card className="login-card">
          <div className="login-header">
            <h4>DIET Teacher Training Platform</h4>
            <p>{isLogin ? 'Sign in to your account' : 'Create a new account'}</p>
          </div>
          <div className="login-body">
            <Form onSubmit={handleSubmit}>
              {!isLogin && (
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
              )}

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              {!isLogin && (
                <>
                  <Form.Group className="mb-3" controlId="formBasicRole">
                    <Form.Label>Role</Form.Label>
                    <Form.Select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                    >
                      <option value="teacher">Teacher</option>
                      <option value="diet">DIET Faculty/Principal</option>
                      <option value="admin">Admin (SCERT)</option>
                    </Form.Select>
                  </Form.Group>

                  {(role === 'teacher' || role === 'diet') && (
                    <Form.Group className="mb-3" controlId="formBasicCluster">
                      <Form.Label>Cluster</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your cluster"
                        value={cluster}
                        onChange={(e) => setCluster(e.target.value)}
                        required
                      />
                    </Form.Group>
                  )}
                </>
              )}

              <Button
                variant="primary"
                type="submit"
                className="w-100 login-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Loading...
                  </>
                ) : (
                  isLogin ? 'Sign In' : 'Sign Up'
                )}
              </Button>
            </Form>

            <div className="text-center mt-3">
              <p>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  className="btn btn-link p-0 toggle-btn"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        </Card>

        {/* RIGHT-SIDE IMAGE */}
        <div className="login-image">
          <img src={teacherImage} alt="Teacher Illustration" />
        </div>
      </div>
    </div>
  );
};

export default Login;
