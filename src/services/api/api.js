import axios from "axios";

const api = axios.create({
    baseURL: 'http://192.168.4.125:5000'
})

export default api;