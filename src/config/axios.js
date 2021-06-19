import axios from "axios";

const API_END_POINT = "http://3.7.98.9:3000/";
//Ref :  https://github.com/axios/axios#config-defaults
axios.defaults.baseURL = API_END_POINT;
//axios.defaults.headers.common["Authorization"] = "tokenValue"; // TODO: change this with react token values

export default axios;
