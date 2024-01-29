import "./Login.css";
import {NavLink, useNavigate} from "react-router-dom";

import {Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import authService from "../../../services/AuthService";
import {toast} from "react-toastify";
import {authStore} from "../../../Redux/OurStore";
import errorHandler from "../../../services/ErrorHandler";

function Login(): JSX.Element {

    const navigate = useNavigate();

    const {register, handleSubmit, formState,
        getValues} = useForm();

    function sendForm(){
        const email = getValues("email");
        const password = getValues("password");
        const clienttype = getValues("clienttype");
        console.log(clienttype)
        authService.login(email, password, clienttype)
            .then(t => {
                toast.success("Welcome Back " + authStore.getState().user.name);
                if (clienttype == 0){
                    navigate("/dash")

                }
                if(clienttype == 1) {
                    navigate("/companyDetails");
                }
                if (clienttype == 2){
                    navigate("/home")
                }
            })

            .catch( err => {errorHandler.showError(err);
            });

    }

    return (
        <div className="Login">
            <FormControl>
                <FormLabel>Login Information</FormLabel>
                <TextField variant={"outlined"} type={"email"} label={"Email"} id={"email"} {...register("email")} />
                <TextField variant={"outlined"} type={"password"} label={"Password"} id={"password"} {...register("password")}/>
                <RadioGroup defaultValue="2" id={"clienttype"} >
                    <FormControlLabel value="0" control={<Radio {...register("clienttype")} />} label="ADMIN"  />
                    <FormControlLabel value="1" control={<Radio {...register("clienttype")} />} label="COMPANY" />
                    <FormControlLabel value="2" control={<Radio {...register("clienttype")} />} label="CUSTOMER" />
                </RadioGroup>
                <Button variant={"outlined"} onClick ={sendForm} >Login</Button>

            </FormControl>
        </div>
    );
}

export default Login;
