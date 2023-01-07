import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:3000"
    // adminURl: "http://localhost:8000/admin"
})

export default instance;