import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import "./Signup.css"
import axios from "axios"
import { toast } from "react-toastify"
import {Loader} from "../components/Loader"

export const Signup = () => {

    const initialFormData = {
        username:"",
        email:"",
        password:"",
        rememberme: false
    }
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
        const response = await axios.post("https://richpanel.cyclic.app/user/signup", {
            name:formData.username,
            email: formData.email,
            password: formData.password
        })
        
        if(response.status === 200){
            navigate("/login");
            toast.success("Sign up successfully");
        }else{
            toast.error("Unable to sign up")
            toast.info("Please try again")
        }
        setLoader(false);
    }

    return (
        <div id="signup-page">
            <form className="input-form" onSubmit={submitHandler}>
                <div className="form-header">
                    <h3>Create Account</h3>
                </div>

                <div className="form-body">
                    <div className="input-control">
                        <label htmlFor="username">Name</label>
                        <input 
                            type="text" 
                            name="username" 
                            id="username" 
                            placeholder="Manoj Kumar" 
                            value={formData.username}
                            onChange={inputChangeHandler}
                            required>
                        </input>
                    </div>
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
                            <button type="submit">Sign Up</button>
                        </div>
                    </div>
                </div>
                <div className="form-footer">
                    <p>Already have an account? <Link className="nav-link" to="/login"> Login </Link> </p>
                </div>
            </form>
            {
                loader && <Loader/>
            }
        </div>   
    )
}