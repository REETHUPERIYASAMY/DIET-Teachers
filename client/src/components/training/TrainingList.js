import React, { useEffect, useState } from 'react';
import apiClient from '../../api/apiClient';

const TrainingList = ({ trainings: propTrainings }) => {
    const [trainings, setTrainings] = useState(propTrainings || []);
    const [loading, setLoading] = useState(!propTrainings);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!propTrainings) {
            const fetchTrainings = async () => {
                try {
                    const response = await apiClient.get('/trainings');
                    setTrainings(response.data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchTrainings();
        }
    }, [propTrainings]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Available Training Plans</h2>
            <ul>
                {trainings.map(training => (
                    <li key={training._id}>
                        <h3>{training.title}</h3>
                        <p>{training.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrainingList;