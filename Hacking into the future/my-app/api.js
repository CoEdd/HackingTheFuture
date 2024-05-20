// api.js
const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

const cors = require('cors');

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

const setupCors = (app) => {
  app.use(cors(corsOptions));
};

const createUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

module.exports = {
  setupCors,
  createUser,
};