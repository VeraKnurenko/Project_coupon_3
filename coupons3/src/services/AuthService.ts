import {ClientType} from "../Models/ClientType";
import axios from "axios";

class AuthService {
    public async login(email: string, password: string, clientType: ClientType){
        const response = await(axios.post<string>("http://localhost:8080/auth/login",
            {"email": email, "password": password, "clientType": ClientType}));
        // authStore.dispatch(login(response.data));
        return response.data;
    }
}