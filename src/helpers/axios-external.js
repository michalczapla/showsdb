import axios from 'axios';

const instance = axios.create();
instance.interceptors.response.use(reponse => {
    // console.log(reponse);
    return reponse;
});
const axiosExternal = instance;

export default axiosExternal;