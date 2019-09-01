import axios from 'axios';

// axios.interceptors.response.use(reponse => {
//     // console.log(reponse);
//     return reponse;
// });

export const database = 'https://showsdb-787d1.firebaseio.com/';

const axiosFirebase = axios;

export default axiosFirebase;