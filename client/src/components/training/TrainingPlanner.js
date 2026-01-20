import React, { useState } from 'react';
import axios from 'axios';

const TrainingPlanner = () => {
    const [issue, setIssue] = useState('');
    const [trainingPlan, setTrainingPlan] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('/api/trainings/plan', { issue });
            setTrainingPlan(response.data);
        } catch (err) {
            setError('Failed to generate training plan. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="training-planner">
            <h2>Training Planner</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="issue">Classroom Issue:</label>
                    <textarea
                        id="issue"
                        value={issue}
                        onChange={(e) => setIssue(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Generating...' : 'Generate Training Plan'}
                </button>
            </form>
            {error && <p className="error">{error}</p>}
            {trainingPlan && (
                <div className="training-plan">
                    <h3>Generated Training Plan</h3>
                    <pre>{JSON.stringify(trainingPlan, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default TrainingPlanner;