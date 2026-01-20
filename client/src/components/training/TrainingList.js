import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrainingList = () => {
    const [trainings, setTrainings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrainings = async () => {
            try {
                const response = await axios.get('/api/trainings');
                setTrainings(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTrainings();
    }, []);

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