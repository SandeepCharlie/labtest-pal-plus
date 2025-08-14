export interface SymptomTestMapping {
  symptoms: string[];
  recommendedTests: {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
  }[];
}

export const symptomTestMappings: SymptomTestMapping[] = [
  {
    symptoms: ['fever', 'headache'],
    recommendedTests: [
      {
        id: 'cbc-malaria',
        name: 'CBC + Malaria Test',
        description: 'Complete blood count with malaria screening',
        price: 800,
        category: 'infection'
      }
    ]
  },
  {
    symptoms: ['chest-pain', 'shortness-breath'],
    recommendedTests: [
      {
        id: 'cardiac-profile',
        name: 'Cardiac Profile + ECG',
        description: 'Heart health screening with ECG',
        price: 1500,
        category: 'cardiac'
      }
    ]
  },
  {
    symptoms: ['stomach-ache', 'nausea', 'vomiting'],
    recommendedTests: [
      {
        id: 'gastro-panel',
        name: 'Gastroenterology Panel',
        description: 'Complete digestive system checkup',
        price: 1200,
        category: 'gastro'
      }
    ]
  },
  {
    symptoms: ['fatigue', 'weakness'],
    recommendedTests: [
      {
        id: 'complete-health',
        name: 'Complete Health Checkup',
        description: 'Comprehensive health screening',
        price: 2500,
        category: 'general'
      }
    ]
  },
  {
    symptoms: ['allergy', 'skin-rash', 'sneezing'],
    recommendedTests: [
      {
        id: 'allergy-panel',
        name: 'Food & Environmental Allergy Panel',
        description: 'Comprehensive allergy testing',
        price: 3500,
        category: 'allergy'
      }
    ]
  },
  {
    symptoms: ['joint-pain', 'muscle-pain'],
    recommendedTests: [
      {
        id: 'rheumatology-panel',
        name: 'Rheumatology Panel',
        description: 'Joint and muscle health screening',
        price: 1800,
        category: 'rheumatology'
      }
    ]
  },
  {
    symptoms: ['diabetes', 'frequent-urination', 'excessive-thirst'],
    recommendedTests: [
      {
        id: 'diabetes-monitoring',
        name: 'Diabetes Monitoring Package',
        description: 'Complete diabetes screening and monitoring',
        price: 1000,
        category: 'diabetes'
      }
    ]
  }
];

export const availableSymptoms = [
  'fever',
  'headache',
  'chest-pain',
  'shortness-breath',
  'stomach-ache',
  'nausea',
  'vomiting',
  'fatigue',
  'weakness',
  'allergy',
  'skin-rash',
  'sneezing',
  'joint-pain',
  'muscle-pain',
  'diabetes',
  'frequent-urination',
  'excessive-thirst',
  'cough',
  'cold',
  'dizziness',
  'back-pain'
];