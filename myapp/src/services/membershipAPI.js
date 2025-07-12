import axios from 'axios';

// API base URL - using deployed Render backend
const API_BASE_URL = 'https://buildfit.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.data || error.message);
    console.error('❌ Full Error:', error);
    if (error.code === 'ERR_NETWORK') {
      console.error(`❌ Network Error: Cannot connect to backend server. Make sure server is running on ${API_BASE_URL}`);
    }
    return Promise.reject(error);
  }
);

// Member API functions
export const membershipAPI = {
  // Get all members
  getAllMembers: async () => {
    try {
      const response = await api.get('/members');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch members');
    }
  },

  // Get member by ID
  getMemberById: async (id) => {
    try {
      const response = await api.get(`/members/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch member');
    }
  },

  // Create new member
  createMember: async (memberData) => {
    try {
      const response = await api.post('/members', memberData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to create member');
    }
  },

  // Update member
  updateMember: async (id, memberData) => {
    try {
      const response = await api.put(`/members/${id}`, memberData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to update member');
    }
  },

  // Delete member
  deleteMember: async (id) => {
    try {
      const response = await api.delete(`/members/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to delete member');
    }
  },

  // Get statistics
  getStats: async () => {
    try {
      const response = await api.get('/stats');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch statistics');
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Server health check failed');
    }
  },

  // Export data as CSV
  exportToCSV: async () => {
    try {
      const response = await api.get('/members');
      const members = response.data.data;
      
      if (!members || members.length === 0) {
        throw new Error('No data to export');
      }

      const headers = [
        'ID', 'Full Name', 'Email', 'Phone', 'Age', 'Gender', 
        'Height (cm)', 'Weight (kg)', 'BMI', 'BMI Category',
        'Goal', 'Experience', 'Preferred Time', 'Membership Plan',
        'Emergency Contact', 'Address', 'Medical Conditions', 'Submitted At'
      ];

      const csvContent = [
        headers.join(','),
        ...members.map(member => [
          member.id,
          `"${member.fullName}"`,
          member.email,
          member.phone,
          member.age,
          member.gender,
          member.height,
          member.weight,
          member.bmi,
          `"${member.bmiCategory}"`,
          `"${member.goal}"`,
          member.experience,
          `"${member.preferredTime || ''}"`,
          `"${member.membershipPlan}"`,
          member.emergencyContact,
          `"${member.address || ''}"`,
          `"${member.medicalConditions || ''}"`,
          new Date(member.submittedAt).toLocaleString()
        ].join(','))
      ].join('\n');

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `membership_data_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      return { success: true, message: 'Data exported successfully' };
    } catch (error) {
      throw new Error(error.message || 'Failed to export data');
    }
  }
};

// Utility functions
export const utils = {
  // Calculate BMI
  calculateBMI: (height, weight) => {
    if (!height || !weight) return '';
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
  },

  // Get BMI category
  getBMICategory: (bmi) => {
    const bmiValue = parseFloat(bmi);
    if (bmiValue < 18.5) return "Underweight";
    if (bmiValue < 25) return "Normal weight";
    if (bmiValue < 30) return "Overweight";
    return "Obese";
  },

  // Format date
  formatDate: (dateString) => {
    return new Date(dateString).toLocaleDateString();
  },

  // Format datetime
  formatDateTime: (dateString) => {
    return new Date(dateString).toLocaleString();
  },

  // Validate email
  validateEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validate phone
  validatePhone: (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }
};

export default membershipAPI;
