import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import TeacherDashboard from './pages/TeacherDashboard';
import DietDashboard from './pages/DietDashboard';
import ClusterIssues from './pages/ClusterIssues';
import TrainingPlanner from './pages/TrainingPlanner';
import TrainingHistory from './pages/TrainingHistory';
import Feedback from './pages/Feedback';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { AuthProvider, useAuth } from './context/AuthContext';
import AlertMessage from './components/AlertMessage';

function AppContent() {
  const { user, loading } = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');

  const triggerAlert = (message, variant = 'success') => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
    
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      {user && <Navbar user={user} />}
      <div className="d-flex">
        {user && <Sidebar user={user} />}
        <div className={user ? "main-content flex-grow-1" : ""}>
          <AlertMessage 
            show={showAlert} 
            message={alertMessage} 
            variant={alertVariant} 
            onClose={() => setShowAlert(false)} 
          />
          <Routes>
            <Route path="/login" element={!user ? <Login triggerAlert={triggerAlert} /> : <Navigate to="/" />} />
            <Route 
              path="/" 
              element={
                user ? (
                  user.role === 'teacher' ? 
                  <TeacherDashboard triggerAlert={triggerAlert} /> : 
                  <DietDashboard triggerAlert={triggerAlert} />
                ) : <Navigate to="/login" />
              } 
            />
            <Route 
              path="/cluster/:clusterName" 
              element={user && user.role !== 'teacher' ? <ClusterIssues triggerAlert={triggerAlert} /> : <Navigate to="/" />} 
            />
            <Route 
              path="/training-planner" 
              element={user && user.role !== 'teacher' ? <TrainingPlanner triggerAlert={triggerAlert} /> : <Navigate to="/" />} 
            />
            <Route 
              path="/training-history" 
              element={user && user.role !== 'teacher' ? <TrainingHistory triggerAlert={triggerAlert} /> : <Navigate to="/" />} 
            />
            <Route 
              path="/feedback/:trainingId" 
              element={user ? <Feedback triggerAlert={triggerAlert} /> : <Navigate to="/login" />} 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;