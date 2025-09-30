import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://food-feasto-api.onrender.com/api/v1',
    withCredentials: true
});

export default apiClient;