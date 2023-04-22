import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost/web-project/backend/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default instance;