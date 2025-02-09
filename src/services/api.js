import axios from 'axios';

// Use environment variable for backend URL
const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
});


export const createGroup = (group) => api.post('/groups', group);
export const getGroups = () => api.get('/groups');// src/services/api.js
export const createNote = (note) => api.post('/notes', note);
export const getNotesByGroup = (groupId) => api.get(`/notes/${groupId}`);


export const checkGroupNameExists = (name) => api.get('/groups/check', { params: { name } }); // checks group name exists
