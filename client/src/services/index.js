import api from './api';
export { authService } from './authService';
export { entranceExamService } from './entranceExamService';

export const courseService = {
  getCourses: async (params = {}) => {
    return api.get('/courses', { params });
  },
  getCategories: async (params = {}) => {
    return api.get('/courses/categories', { params });
  },
  getCourseBySlug: async (slug) => {
    return api.get(`/courses/${slug}`);
  },
  getCourseLessons: async (courseId) => {
    return api.get(`/lessons/course/${courseId}`);
  },
  getLessonPlayback: async (lessonId) => {
    return api.get(`/lessons/playback/${lessonId}`);
  },
};

export const facultyService = {
  getFacultyList: async (params = {}) => {
    return api.get('/faculty', { params });
  },
  getFacultyById: async (id) => {
    return api.get(`/faculty/${id}`);
  },
  createFaculty: async (data) => {
    return api.post('/faculty', data);
  },
  updateFaculty: async (id, data) => {
    return api.put(`/faculty/${id}`, data);
  },
  deleteFaculty: async (id) => {
    return api.delete(`/faculty/${id}`);
  },
};

export const uploadService = {
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  uploadVideo: async (file, onUploadProgress) => {
    const formData = new FormData();
    formData.append('video', file);
    return api.post('/upload/video', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress,
    });
  },
  uploadDocument: async (file) => {
    const formData = new FormData();
    formData.append('document', file);
    return api.post('/upload/document', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export const liveClassService = {
  getStudentLiveClasses: async () => {
    return api.get('/live-classes/student');
  },
  getAllLiveClasses: async (params = {}) => {
    return api.get('/live-classes', { params });
  },
  createLiveClass: async (data) => {
    return api.post('/live-classes', data);
  },
  updateLiveClass: async (id, data) => {
    return api.put(`/live-classes/${id}`, data);
  },
  cancelLiveClass: async (id) => {
    return api.put(`/live-classes/${id}/cancel`);
  },
  deleteLiveClass: async (id) => {
    return api.delete(`/live-classes/${id}`);
  },
};

export const examService = {
  getMockTests: async (params = {}) => {
    return api.get('/mock-tests', { params });
  },
  getMockTestBySlug: async (slug) => {
    return api.get(`/mock-tests/${slug}`);
  },
  startExam: async (mockTestId) => {
    return api.post(`/exam-attempts/start/${mockTestId}`);
  },
  saveResponse: async (attemptId, data) => {
    return api.post(`/exam-attempts/save-response/${attemptId}`, data);
  },
  submitExam: async (attemptId, data = {}) => {
    return api.post(`/exam-attempts/submit/${attemptId}`, data);
  },
  getAttemptResult: async (attemptId) => {
    return api.get(`/exam-attempts/result/${attemptId}`);
  },
  getMyExamHistory: async () => {
    return api.get('/exam-attempts/my-history');
  },
};

export const paymentService = {
  createCheckoutOrder: async (data) => {
    return api.post('/payments/checkout', data);
  },
  verifyPayment: async (data) => {
    return api.post('/payments/verify', data);
  },
  getMyPaymentHistory: async () => {
    return api.get('/payments/my-history');
  },
};

export const enquiryService = {
  submitEnquiry: async (data) => {
    return api.post('/enquiries', data);
  },
};

export const adminService = {
  getDashboardStats: async () => {
    return api.get('/admin/dashboard-stats');
  },
  getStudents: async (params = {}) => {
    return api.get('/admin/students', { params });
  },
  resetStudentDevice: async (studentId, reason) => {
    return api.post(`/admin/students/${studentId}/reset-device`, { reason });
  },
  toggleStudentStatus: async (studentId) => {
    return api.put(`/admin/students/${studentId}/toggle-status`);
  },
  getAuditLogs: async (params = {}) => {
    return api.get('/admin/audit-logs', { params });
  },
  getAllPayments: async (params = {}) => {
    return api.get('/payments/admin/all', { params });
  },
  grantManualAccess: async (data) => {
    return api.post('/payments/admin/grant-manual', data);
  },
  getEnquiries: async (params = {}) => {
    return api.get('/enquiries/admin', { params });
  },
  updateEnquiryStatus: async (id, data) => {
    return api.put(`/enquiries/admin/${id}`, data);
  },
  getSiteSettings: async () => {
    return api.get('/site-settings');
  },
  updateSiteSettings: async (data) => {
    return api.put('/site-settings', data);
  },
  // Course management
  createCourse: async (data) => {
    return api.post('/courses', data);
  },
  updateCourse: async (id, data) => {
    return api.put(`/courses/${id}`, data);
  },
  deleteCourse: async (id) => {
    return api.delete(`/courses/${id}`);
  },
  // Lessons
  createLesson: async (data) => {
    return api.post('/lessons', data);
  },
  updateLesson: async (id, data) => {
    return api.put(`/lessons/${id}`, data);
  },
  deleteLesson: async (id) => {
    return api.delete(`/lessons/${id}`);
  },
  // Mock Tests & Questions
  createMockTest: async (data) => {
    return api.post('/mock-tests', data);
  },
  uploadMockTestPaper: async (data) => {
    return api.post('/mock-tests/upload-paper', data);
  },
  updateMockTest: async (id, data) => {
    return api.put(`/mock-tests/${id}`, data);
  },
  deleteMockTest: async (id) => {
    return api.delete(`/mock-tests/${id}`);
  },
  addQuestion: async (mockTestId, data) => {
    return api.post(`/mock-tests/${mockTestId}/questions`, data);
  },
  bulkUploadQuestions: async (mockTestId, questions) => {
    return api.post(`/mock-tests/${mockTestId}/bulk-questions`, { questions });
  },
  getAdminQuestions: async (mockTestId) => {
    return api.get(`/mock-tests/${mockTestId}/admin-questions`);
  },
  updateQuestion: async (questionId, data) => {
    return api.put(`/mock-tests/questions/${questionId}`, data);
  },
  deleteQuestion: async (questionId) => {
    return api.delete(`/mock-tests/questions/${questionId}`);
  },
};
