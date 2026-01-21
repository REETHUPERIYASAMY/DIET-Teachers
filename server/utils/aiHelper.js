const OpenAI = require('openai');

// Initialize OpenAI with API key if available
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

// Generate training plan using AI or mock data
const generateTrainingPlan = async (cluster, issueCategory, sampleIssues) => {
  try {
    // If OpenAI API key is not provided, return mock data
    if (!openai) {
      return getMockTrainingPlan(cluster, issueCategory);
    }

    const prompt = `
      Generate a training plan for teachers facing the following issues:
      
      Cluster: ${cluster}
      Issue Category: ${issueCategory}
      Sample Issues: ${sampleIssues}
      
      Provide a response in JSON format with the following structure:
      {
        "title": "Training title",
        "objectives": "Training objectives",
        "modules": [
          {"title": "Module 1 title", "content": "Module 1 content"},
          {"title": "Module 2 title", "content": "Module 2 content"},
          {"title": "Module 3 title", "content": "Module 3 content"}
        ],
        "strategies": "Teaching strategies"
      }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: "You are an expert in teacher training." }, 
                 { role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Error generating training plan:', error);
    // Fallback to mock data
    return getMockTrainingPlan(cluster, issueCategory);
  }
};

// Mock training plan generator
const getMockTrainingPlan = (cluster, issueCategory) => {
  const mockPlans = {
    'Classroom Management': {
      title: 'Effective Classroom Management Strategies',
      objectives: 'To equip teachers with practical techniques for managing classroom behavior and creating a positive learning environment.',
      modules: [
        { title: 'Understanding Student Behavior', content: 'Learn about the psychological factors influencing student behavior and how to respond effectively.' },
        { title: 'Positive Reinforcement Techniques', content: 'Explore various positive reinforcement strategies to encourage desired behaviors.' },
        { title: 'Creating Classroom Rules', content: 'Develop clear, consistent, and enforceable classroom rules with student input.' },
        { title: 'Handling Disruptions', content: 'Learn strategies for minimizing and addressing classroom disruptions without escalating conflicts.' }
      ],
      strategies: 'Interactive workshops, role-playing exercises, case studies, and peer observation sessions.'
    },
    'Digital Learning': {
      title: 'Integrating Digital Tools in Teaching',
      objectives: 'To enhance teachers\' digital literacy and enable effective integration of technology in classroom instruction.',
      modules: [
        { title: 'Introduction to Educational Technology', content: 'Overview of various digital tools and their applications in education.' },
        { title: 'Creating Digital Content', content: 'Learn to develop engaging digital learning materials using various platforms.' },
        { title: 'Online Assessment Tools', content: 'Explore digital assessment methods and tools to evaluate student learning.' },
        { title: 'Digital Safety and Ethics', content: 'Understand digital citizenship, online safety, and ethical use of technology.' }
      ],
      strategies: 'Hands-on workshops, project-based learning, peer collaboration, and expert demonstrations.'
    },
    'Curriculum Implementation': {
      title: 'Effective Curriculum Implementation',
      objectives: 'To help teachers understand and effectively implement the curriculum standards in their teaching practice.',
      modules: [
        { title: 'Understanding Curriculum Framework', content: 'Deep dive into the curriculum structure, standards, and learning outcomes.' },
        { title: 'Lesson Planning', content: 'Develop effective lesson plans aligned with curriculum standards and student needs.' },
        { title: 'Differentiated Instruction', content: 'Learn strategies to adapt teaching methods to accommodate diverse learning needs.' },
        { title: 'Assessment Aligned with Curriculum', content: 'Design assessments that accurately measure student progress against curriculum standards.' }
      ],
      strategies: 'Curriculum mapping exercises, collaborative planning, peer feedback, and expert guidance.'
    }
  };

  // Return the matching mock plan or a default one
  return mockPlans[issueCategory] || {
    title: `Training for ${issueCategory} in ${cluster}`,
    objectives: 'To address the specific challenges faced by teachers in this area.',
    modules: [
      { title: 'Understanding the Issue', content: 'Analyze the root causes and impacts of the issue.' },
      { title: 'Best Practices', content: 'Explore evidence-based approaches to address the issue.' },
      { title: 'Implementation Strategies', content: 'Develop practical strategies for classroom application.' }
    ],
    strategies: 'Interactive workshops, case studies, and collaborative problem-solving.'
  };
};

module.exports = { generateTrainingPlan };