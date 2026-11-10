import axios from 'axios';


const api = axios.create({
     baseURL: 'http://localhost:8081/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
    (config) =>{
        const sessionData = sessionStorage.getItem("session_user");
        if(sessionData){
            const {token} = JSON.parse(sessionData);
            if(token){
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) =>{
        return Promise.reject(error)
    }
);
export default api;
