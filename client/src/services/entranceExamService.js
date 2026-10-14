import api from './api';

export const entranceExamService = {
  // Public / Admin: Get all entrance exams with optional filters
  getEntranceExams: async (params = {}) => {
    return api.get('/entrance-exams', { params });
  },

  // Public / Admin: Get single entrance exam by id or slug
  getEntranceExamById: async (id) => {
    return api.get(`/entrance-exams/${id}`);
  },

  // Admin: Create new entrance exam program
  createEntranceExam: async (data) => {
    return api.post('/entrance-exams', data);
  },

  // Admin: Update entrance exam program
  updateEntranceExam: async (id, data) => {
    return api.put(`/entrance-exams/${id}`, data);
  },

  // Admin: Delete entrance exam program
  deleteEntranceExam: async (id) => {
    return api.delete(`/entrance-exams/${id}`);
  },

  // Admin: Reset/Seed the 9 default entrance exams
  seedDefaultEntranceExams: async () => {
    return api.post('/entrance-exams/seed-defaults');
  },
};

export default entranceExamService;
