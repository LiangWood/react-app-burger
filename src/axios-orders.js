import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-app-burger-42c8e.firebaseio.com/'
});

export default instance;