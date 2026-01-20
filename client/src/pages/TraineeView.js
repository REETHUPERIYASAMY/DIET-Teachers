import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import apiClient from '../api/apiClient';
import TrainingList from '../components/training/TrainingList';

const TraineeView = () => {
    const { user } = useContext(AuthContext);
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        const fetchTrainings = async () => {
            try {
                const response = await apiClient.get(`/trainings/assigned/${user.id}`);
                setTrainings(response.data);
            } catch (error) {
                console.error('Error fetching trainings:', error);
            }
        };

        fetchTrainings();
    }, [user.id]);

    return (
        <div className="trainee-view">
            <h1>Assigned Trainings</h1>
            {trainings.length > 0 ? (
                <TrainingList trainings={trainings} />
            ) : (
                <p>No trainings assigned yet.</p>
            )}
        </div>
    );
};

export default TraineeView;