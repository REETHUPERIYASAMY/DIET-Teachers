import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './pages/Dashboard';
import TrainerView from './pages/TrainerView';
import TraineeView from './pages/TraineeView';
import AdminPanel from './pages/AdminPanel';
import './styles/main.css';

function App() {
    return (
        <div>
                <Navbar />
                <main style={{ padding: 16 }}>
                    <Switch>
                        <Route exact path="/" render={() => <Redirect to="/login" />} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/dashboard" render={() => (
                            <ProtectedRoute><Dashboard /></ProtectedRoute>
                        )}/>
                        <Route path="/trainer" render={() => (
                            <ProtectedRoute><TrainerView /></ProtectedRoute>
                        )}/>
                        <Route path="/trainee" render={() => (
                            <ProtectedRoute><TraineeView /></ProtectedRoute>
                        )}/>
                        <Route path="/admin" render={() => (
                            <ProtectedRoute><AdminPanel /></ProtectedRoute>
                        )}/>
                    </Switch>
                </main>
        </div>
    );
}

export default App;