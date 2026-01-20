import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import TrainingList from '../components/training/TrainingList';
import { apiClient } from '../api/apiClient';

const TrainerView = () => {
    const { user } = useContext(AuthContext);
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        const fetchTrainings = async () => {
            try {
                const response = await apiClient.get(`/trainings/trainer/${user.id}`);
                setTrainings(response.data);
            } catch (error) {
                console.error("Error fetching trainings:", error);
            }
        };

        fetchTrainings();
    }, [user.id]);

    return (
        <div className="trainer-view">
            <h1>Trainer View</h1>
            <TrainingList trainings={trainings} />
        </div>
    );
};

export default TrainerView;