//api>index.js
import axios from 'axios';
const API = axios.create({baseURL: 'http://localhost:5000'});

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
});
export const fetchJobs = () => API.get('/jobs');
export const fetchJob = (id) => API.get(`/jobs/${id}`);
export const createJob = (newJob) => API.post('/jobs', newJob);
export const updateJob = (userId, formId) => API.patch(`/jobs/${userId}`, formId);
// export const updateJob = (userId, formId) => API.patch(`/jobs/${userId}`,{params: {formId } });

// export const fetchJobsBySearch = (searchQuery) => API.get('/jobs', searchQuery);
export const fetchJobsBySearch = (searchQuery) => API.get('/jobs/search', { params: { searchQuery } });

export const deleteJob = (id) => API.delete(`/jobs/${id}`);
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);