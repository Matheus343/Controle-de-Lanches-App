import axios from "axios";
const api = axios.create(
    {        
        baseURL :'http://10.1.63.41:3000',
        timeout: 5000,        
    }
);

export default api;