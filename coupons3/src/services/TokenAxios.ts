import axios from "axios";
import {authStore, store} from "../Redux/OurStore";

const tokenAxios = axios.create();

tokenAxios.interceptors.request.use((request: any) => {
    request.headers = {
        authorization: authStore.getState().token
    };
    return request;
});

//TODO CHECK IN shoes onc drive WHERE TOKEN INTERCEPTIORS CLASS

export default tokenAxios;