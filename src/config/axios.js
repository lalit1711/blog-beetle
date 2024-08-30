import axios from "axios";

const tokenValue = localStorage.getItem("token");
export const PUBLIC_URL = `http://blog-beetle.lalit.tech/`;
// export const PUBLIC_URL = `http://localhost:3000/`;
export const IMAGE_URL = `${PUBLIC_URL}public/img/users/`;
const API_END_POINT = `${PUBLIC_URL}api/v1/`;
//Ref :  https://github.com/axios/axios#config-defaults
axios.defaults.baseURL = API_END_POINT;
axios.defaults.headers.common["Authorization"] = `Bearer ${tokenValue}`;

export default axios;
