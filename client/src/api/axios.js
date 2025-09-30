import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://food-feasto-api.onrender.com',
    withCredentials: true
});

export default apiClient;