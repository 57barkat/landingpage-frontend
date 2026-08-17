// Mock API for case studies
const CASE_STUDIES_DATA = [
  {
    id: '1',
    title: 'E-Commerce Platform Redesign',
    category: 'Web',
    summary: 'Complete redesign and optimization of an e-commerce platform resulting in 45% increase in conversion rate and improved user engagement.',
    year: 2023
  },
  {
    id: '2',
    title: 'Mobile Banking Application',
    category: 'Mobile',
    summary: 'Developed a secure mobile banking app with biometric authentication, real-time notifications, and seamless transaction handling for 500K+ users.',
    year: 2023
  },
  {
    id: '3',
    title: 'AI-Powered Customer Service Chatbot',
    category: 'AI',
    summary: 'Implemented an AI chatbot that reduced customer support tickets by 60% and improved response time by 80% for a fintech company.',
    year: 2024
  },
  {
    id: '4',
    title: 'Blockchain Supply Chain Management',
    category: 'Blockchain',
    summary: 'Built a decentralized supply chain platform using blockchain to ensure transparency and traceability across 50+ supply chain partners.',
    year: 2024
  },
  {
    id: '5',
    title: 'Social Media Analytics Dashboard',
    category: 'Web',
    summary: 'Created a comprehensive analytics dashboard providing real-time insights across multiple social media platforms with custom reporting features.',
    year: 2023
  },
  {
    id: '6',
    title: 'Cross-Platform Fitness Tracking App',
    category: 'Mobile',
    summary: 'Developed iOS and Android fitness tracking app with ML-based workout recommendations, reaching 100K downloads in first month.',
    year: 2023
  },
  {
    id: '7',
    title: 'Machine Learning Recommendation Engine',
    category: 'AI',
    summary: 'Built personalized recommendation system using collaborative filtering, improving user engagement by 55% for an e-learning platform.',
    year: 2024
  },
  {
    id: '8',
    title: 'Crypto Payment Gateway Integration',
    category: 'Blockchain',
    summary: 'Integrated multi-cryptocurrency payment solutions for an online retailer, enabling transactions in 15+ cryptocurrencies with instant settlement.',
    year: 2023
  },
];

export const fetchCaseStudies = () => {
  return new Promise((resolve, reject) => {
    const delay = Math.random() * 800; // Random delay up to 800ms
    const shouldFail = Math.random() < 0.15; // 15% failure rate

    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Network failed'));
      } else {
        resolve(CASE_STUDIES_DATA);
      }
    }, delay);
  });
};
