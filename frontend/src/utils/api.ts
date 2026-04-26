import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

const riders = {
  list: () => api.get('/riders'),
  getById: (id: number | string) => api.get(`/riders/${id}`),
  create: (payload: any) => api.post('/riders', payload),
  update: (id: number | string, payload: any) => api.put(`/riders/${id}`, payload),
  updateStatus: (id: number | string, payload: any) => api.put(`/riders/${id}/status`, payload),
};

const drivers = {
  list: () => api.get('/drivers'),
  getById: (id: number | string) => api.get(`/drivers/${id}`),
  create: (payload: any) => api.post('/drivers', payload),
  update: (id: number | string, payload: any) => api.put(`/drivers/${id}`, payload),
  updateStatus: (id: number | string, payload: any) => api.put(`/drivers/${id}/status`, payload),
  updateAvailability: (id: number | string, payload: any) => api.put(`/drivers/${id}/availability`, payload),
};

const rides = {
  list: () => api.get('/rides'),
  getById: (id: number | string) => api.get(`/rides/${id}`),
  create: (payload: any) => api.post('/rides', payload),
  update: (id: number | string, payload: any) => api.put(`/rides/${id}`, payload),
  assignDriver: (id: number | string, payload: any) => api.put(`/rides/${id}/assign-driver`, payload),
  complete: (id: number | string, payload: any) => api.put(`/rides/${id}/complete`, payload),
  cancel: (id: number | string) => api.put(`/rides/${id}/cancel`),
};

const dashboard = {
  stats: () => api.get('/dashboard/stats'),
};

export { api, riders, drivers, rides, dashboard };
