import Axios from 'axios'

const axios = Axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BACKEND_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
  withXSRFToken: true,
})
// axios.interceptors.response.use(
//     response => response,
//     async error => {
//         if (error.response.status === 419 || error.response.status === 401) {
//             localStorage.removeItem('userData')
//             localStorage.removeItem('authStatus')
//             window.location.reload()
//         }
//         return Promise.reject(error)
//     },
// )
export default axios
