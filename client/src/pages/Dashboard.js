import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import apiClient from '../api/apiClient';
import TrainingList from '../components/training/TrainingList';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        const fetchTrainings = async () => {
            try {
                const response = await apiClient.get('/trainings');
                setTrainings(response.data);
            } catch (error) {
                console.error('Error fetching trainings:', error);
            }
        };

        fetchTrainings();
    }, []);

    return (
        <div className="dashboard">
            <h1>Welcome, {user.email}</h1>
            <h2>Your Trainings</h2>
            <TrainingList trainings={trainings} />
        </div>
    );
};

export default Dashboard;