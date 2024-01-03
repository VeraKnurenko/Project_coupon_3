import "./Login.css";
import * as http from "http";

function Login(): JSX.Element {

    function sendForm(){

    }

    return (
        <div className="Login">
            <form >
                <input type={"text"}  id={"email"} placeholder={"email"}/>
                <input type={"text"}  id={"password"} placeholder={"Password"}/>
                <select >
                    <option>ADMIN</option>
                    <option>COMPANY</option>
                    <option>CUSTOMER</option>
                </select><br/>
                <button>Login</button>
            </form>
			
        </div>
    );
}

export default Login;
