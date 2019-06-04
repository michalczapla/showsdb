import axios from 'axios';

axios.interceptors.response.use(reponse => {
    // console.log(reponse);
    return reponse;
});
const axiosExternal = axios;

export default axiosExternal;