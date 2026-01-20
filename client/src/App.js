import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';
import Login from './components/auth/Login';
import TeacherForm from './pages/TeacherForm';
import DietDashboard from './pages/DietDashboard';
import TrainingPlanner from './pages/TrainingPlanner';
import Repository from './pages/Repository';
import Feedback from './pages/Feedback';
import './styles/main.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <main style={{ padding: 16 }}>
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" replace />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/teacher-form" element={
                            <ProtectedRoute role="Teacher"><TeacherForm /></ProtectedRoute>
                        }/>
                        <Route path="/diet-dashboard" element={
                            <ProtectedRoute role="DIET"><DietDashboard /></ProtectedRoute>
                        }/>
                        <Route path="/planner" element={
                            <ProtectedRoute role="DIET"><TrainingPlanner /></ProtectedRoute>
                        }/>
                        <Route path="/repository" element={
                            <ProtectedRoute role="DIET"><Repository /></ProtectedRoute>
                        }/>
                        <Route path="/feedback" element={
                            <ProtectedRoute role="Teacher"><Feedback /></ProtectedRoute>
                        }/>
                    </Routes>
                </main>
            </Router>
        </AuthProvider>
    );
}

export default App;