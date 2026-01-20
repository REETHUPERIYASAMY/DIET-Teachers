import Plan from '../models/Plan.model';

export const generateTrainingPlan = async (classroomIssues) => {
    // Simple AI logic to generate a training plan based on classroom issues
    const trainingTopics = [];

    if (classroomIssues.includes('classroom management')) {
        trainingTopics.push('Classroom Management Strategies');
    }
    if (classroomIssues.includes('student engagement')) {
        trainingTopics.push('Techniques for Increasing Student Engagement');
    }
    if (classroomIssues.includes('differentiated instruction')) {
        trainingTopics.push('Differentiated Instruction Techniques');
    }

    const trainingPlan = new Plan({
        topics: trainingTopics,
        createdAt: new Date(),
    });

    await trainingPlan.save();
    return trainingPlan;
};