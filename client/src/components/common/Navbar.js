import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Teacher Training Platform</Link>
            </div>
            <div className="navbar-links">
                <Link to="/dashboard">Dashboard</Link>
                {user && user.role === 'admin' && <Link to="/admin">Admin Panel</Link>}
                {user ? (
                    <>
                        <Link to="/trainer">Trainer View</Link>
                        <Link to="/trainee">Trainee View</Link>
                        <button onClick={logout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;