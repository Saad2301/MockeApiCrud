import Axios from 'axios';
const axiosIntance = Axios.create({
    baseURL:'https://64b77dd721b9aa6eb0782d3f.mockapi.io'
});
axiosIntance.interceptors.request.use((request)=>{
    request.headers.personName= 'saad';
    return request;
});
axiosIntance.interceptors.response.use(
    function(response){
        return response;
    },
    async (error)=>{
        if(error?.response?.status===404){
            window.location.replace('/login')
        }
    }
    
    );
// axiosIntance.interceptors.request.use(config=>{
//     const token = localStorage.getItem('users');
//     if(token){
//         config.headers['Authorized'] = 'Bearer' + token
//     }
//     config.headers['Content-Type'] = 'application/json';
//         return config;
// },
// error => {
//     Promise.reject(error)
// }
// )
export default axiosIntance;