import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../../api/apiClient';

const TrainingDetail = () => {
    const { id } = useParams();
    const [training, setTraining] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrainingDetail = async () => {
            try {
                const response = await apiClient.get(`/trainings/${id}`);
                setTraining(response.data);
            } catch (err) {
                setError('Error fetching training details');
            } finally {
                setLoading(false);
            }
        };

        fetchTrainingDetail();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>{training.title}</h2>
            <p>{training.description}</p>
            <h3>Modules:</h3>
            <ul>
                {training.modules.map((module, index) => (
                    <li key={index}>{module}</li>
                ))}
            </ul>
        </div>
    );
};

export default TrainingDetail;