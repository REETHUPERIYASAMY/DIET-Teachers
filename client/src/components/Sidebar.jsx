import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ user }) => {
  const location = useLocation();

  return (
    <div className="sidebar d-flex flex-column">
      <div className="p-3">
        <h5 className="text-white">Menu</h5>
      </div>
      <Nav className="flex-column">
        <Nav.Item>
          <Nav.Link 
            as={Link} 
            to="/" 
            className={location.pathname === '/' ? 'active' : ''}
          >
            <i className="bi bi-speedometer2 me-2"></i>
            Dashboard
          </Nav.Link>
        </Nav.Item>
        
        {user.role !== 'teacher' && (
          <>
            <Nav.Item>
              <Nav.Link 
                as={Link} 
                to="/training-planner" 
                className={location.pathname === '/training-planner' ? 'active' : ''}
              >
                <i className="bi bi-clipboard-data me-2"></i>
                Training Planner
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                as={Link} 
                to="/training-history" 
                className={location.pathname === '/training-history' ? 'active' : ''}
              >
                <i className="bi bi-clock-history me-2"></i>
                Training History
              </Nav.Link>
            </Nav.Item>
          </>
        )}
      </Nav>
    </div>
  );
};

export default Sidebar;