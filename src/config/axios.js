import axios from "axios";

const tokenValue = localStorage.getItem("token");
const API_END_POINT = "http://127.0.0.1:3000/api/v1/";
//Ref :  https://github.com/axios/axios#config-defaults
axios.defaults.baseURL = API_END_POINT;
axios.defaults.headers.common["Authorization"] = `Bearer ${tokenValue}`;

export default axios;
