import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token in every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication APIs
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/register', userData),
  getCurrentUser: () => api.get('/auth/me'),
};

// Projects APIs
export const projectsAPI = {
  getAll: () => api.get('/projects'),
  getById: (id) => api.get(`/projects/${id}`),
  create: (projectData) => api.post('/projects', projectData),
  update: (id, projectData) => api.put(`/projects/${id}`, projectData),
  delete: (id) => api.delete(`/projects/${id}`),
};

// Design Files APIs
export const designFilesAPI = {
  getByProject: (projectId) => api.get(`/projects/${projectId}/files`),
  upload: (projectId, fileData) => {
    const formData = new FormData();
    formData.append('file', fileData.file);
    formData.append('name', fileData.name);
    formData.append('description', fileData.description || '');
    
    return api.post(`/projects/${projectId}/files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  delete: (fileId) => api.delete(`/files/${fileId}`),
};

// Boards APIs
export const boardsAPI = {
  getByProject: (projectId) => api.get(`/projects/${projectId}/boards`),
  create: (projectId, boardData) => api.post(`/projects/${projectId}/boards`, boardData),
  update: (boardId, boardData) => api.put(`/boards/${boardId}`, boardData),
  delete: (boardId) => api.delete(`/boards/${boardId}`),
};

// Contracts APIs
export const contractsAPI = {
  getByProject: (projectId) => api.get(`/projects/${projectId}/contracts`),
  create: (projectId, contractData) => api.post(`/projects/${projectId}/contracts`, contractData),
  update: (contractId, contractData) => api.put(`/contracts/${contractId}`, contractData),
  delete: (contractId) => api.delete(`/contracts/${contractId}`),
};

// Questionnaires APIs
export const questionnairesAPI = {
  getByProject: (projectId) => api.get(`/projects/${projectId}/questionnaires`),
  create: (projectId, questionnaireData) => api.post(`/projects/${projectId}/questionnaires`, questionnaireData),
  update: (questionnaireId, questionnaireData) => api.put(`/questionnaires/${questionnaireId}`, questionnaireData),
  delete: (questionnaireId) => api.delete(`/questionnaires/${questionnaireId}`),
};

// Invoices APIs
export const invoicesAPI = {
  getByProject: (projectId) => api.get(`/projects/${projectId}/invoices`),
  create: (projectId, invoiceData) => api.post(`/projects/${projectId}/invoices`, invoiceData),
  update: (invoiceId, invoiceData) => api.put(`/invoices/${invoiceId}`, invoiceData),
  delete: (invoiceId) => api.delete(`/invoices/${invoiceId}`),
};

// Messages APIs
export const messagesAPI = {
  getByProject: (projectId) => api.get(`/projects/${projectId}/messages`),
  create: (projectId, messageData) => api.post(`/projects/${projectId}/messages`, messageData),
  markAsRead: (messageId) => api.put(`/messages/${messageId}/read`),
  delete: (messageId) => api.delete(`/messages/${messageId}`),
};

export default api;
