import axios from 'axios';

const instance = axios.create();
instance.interceptors.response.use(response => {
    // // console.log(reponse);
    // const freeRequests = parseInt(response.headers['x-ratelimit-remaining']);
    // const sleep = m => new Promise(r => setTimeout(r, m));
    // console.log(freeRequests);
    // if (freeRequests===30) {
    //     sleep(5000);
    // } else {
    //     return response;
    // }
    return response;
    
});
const axiosExternal = instance;

export default axiosExternal;