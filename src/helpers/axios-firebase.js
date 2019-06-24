import axios from 'axios';

axios.interceptors.response.use(reponse => {
    // console.log(reponse);
    return reponse;
});
const axiosFirebase = axios;

export default axiosFirebase;