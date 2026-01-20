import React, { useEffect, useState } from 'react';
import { getUsers, getTrainings } from '../api/apiClient';
import './AdminPanel.css';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const usersData = await getUsers();
            const trainingsData = await getTrainings();
            setUsers(usersData);
            setTrainings(trainingsData);
        };
        fetchData();
    }, []);

    return (
        <div className="admin-panel">
            <h1>Admin Panel</h1>
            <section>
                <h2>Users</h2>
                <ul>
                    {users.map(user => (
                        <li key={user._id}>{user.email} - {user.role}</li>
                    ))}
                </ul>
            </section>
            <section>
                <h2>Trainings</h2>
                <ul>
                    {trainings.map(training => (
                        <li key={training._id}>{training.topic}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default AdminPanel;