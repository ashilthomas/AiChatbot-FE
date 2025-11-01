//create a instance
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://aichatbot-be.onrender.com/api/v1/'
})

export default instance;