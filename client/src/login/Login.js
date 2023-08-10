import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import "../signup/Signup.css"
import "./Login.css"
import axios from "axios"
import { toast } from "react-toastify"
import { Loader } from "../components/Loader"


const initialFormData = {
    email:"",
    password:"",
    rememberme: false
}

export const Login = () => {

    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialFormData);

    function inputChangeHandler(event){
        const {name, type, checked, value} = event.target;
        setFormData(prevState => {
            return {
                ...prevState,
                [name]:(type==="checkbox") ? (checked) : value
            }  
        })
    }

    async function submitHandler(event){
        event.preventDefault();
        setLoader(true);
        try{
            const response = await axios.post("https://richpanel.cyclic.app/user/login", {
                email: formData.email,
                password: formData.password
            })
            
            if(response.data.success){
                toast.success(response.data.message);
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("user", JSON.stringify(response.data.user))
                navigate("/dashboard")
            }else{
                toast.warn(response.data.message);
            }
        }catch(err){
            toast.error("Internal server error");
        }
        setLoader(false);
    }

    return (
        <div id="login-page">
            <form className="input-form" onSubmit={submitHandler}>
                <div className="form-header">
                    <h3>Login to your account</h3>
                </div>

                <div className="form-body">
                    <div className="input-control">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="manoj@richpanel.com" 
                            value={formData.email}
                            onChange={inputChangeHandler}
                            required>
                        </input>
                    </div>
                    <div className="input-control">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="............." 
                            value={formData.password}
                            onChange={inputChangeHandler}
                            required>
                        </input>
                    </div>
                    <div className="input-control">
                        <div className="checkbox-control">
                            <input 
                                type="checkbox" 
                                name="rememberme" 
                                id="rememberme" 
                                checked={formData.rememberme}
                                onChange={inputChangeHandler}
                                >
                            </input>
                            <label htmlFor="rememberme">Remember Me</label>
                        </div>
                    </div>
                    <div className="input-control">
                        <div className="button-control">
                            <button type="submit">Login</button>
                        </div>
                    </div>
                </div>
                <div className="form-footer">
                    <p>New to MyApp? <Link className="nav-link" to="/"> Sign Up </Link> </p>
                </div>
            </form>
            {
                loader && <Loader/>
            }
        </div>    
    )
}