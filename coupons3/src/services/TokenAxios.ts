import axios from "axios";
import store from "../Redux/OurStore";

const tokenAxios = axios.create();

tokenAxios.interceptors.request.use((request: any) => {
    request.headers = {
        authorization: store.getState().authSlice.token
    };

    return request;
});

export default tokenAxios;