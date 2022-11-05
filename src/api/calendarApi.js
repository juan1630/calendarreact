import axios from 'axios';
import { getVariables } from '../helpers';

const { VITE_API_URL } = getVariables();

const calendarApi = axios.create({
    baseURL : VITE_API_URL
});

//todo intersectores

calendarApi.interceptors.request.use(config => {
    //agregamos los headers al request
    //em este caso se agregan los headers del token
    config.headers = {
        ...config.headers,
        'x-token' : localStorage.getItem('token')
    }

    return  config
});

export default calendarApi; 