import axios from "axios";
import { useLocalStorage } from "@vueuse/core";



const request = axios.create({
  baseURL: "https://mevn-api.onrender.com/v1",
  // headers: {Authorization: auth.token}
  withCredentials: true
});

request.interceptors.request.use((config) => {
  const token = localStorage.getItem('dung_dong_vao_cai_nay')
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

request.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await request.post("auth/refresh_token", null, {
          withCredentials: true,
          
        })
        let token = useLocalStorage("dung_dong_vao_cai_nay","")
        token.value = res.data.accessToken
        return request(originalRequest);
      } catch (error) {
        // navigateTo('/auth/login')
      }
    }
    return Promise.reject(error);
  }
);



export default request;
