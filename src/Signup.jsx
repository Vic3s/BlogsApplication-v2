import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import Nav from "./partials/Nav";
import "./styles/signup_page.css"

function Signup() {

    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const navigate = useNavigate();

    const postUserInput = (e) => {
        e.preventDefault();

        const userCreateReqObj = {name: name, email: email, password: password}

        fetch("http://localhost:5000/api/signup/data", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify(userCreateReqObj),
        }).then(response => {
            if(!response.ok){
                throw new Error("*Faild to post blog!*")
            }
            return response.json();
        }).then(data => {
            console.log('Response: ', data);
            navigate("/");
        })
        .catch((err) => console.log(err));
    }

    return <>
        <Nav/>
        <div className="main-container-signup">

            <div className="signup-card">
                <h1>Start <span>YOUR</span> <br />creative journey.</h1>
            </div>

            <div className="signup-form-container">

                <div className="signup-title">
                    <h1>Sign Up.</h1>
                </div>
                
                <form onSubmit={postUserInput}>  
                    <div className="input-container">
                        <label htmlFor="name">Username</label>
                        <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="input-container">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="input-container">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    
                    <button type="submit" >Sign Up</button>
                </form>
                <p className="login-redirect">Already have an account?
                    <span className="link-login"><Link to="/login"> Log in!</Link></span>
                </p>
            </div>

           
        </div>
    </>

}

export default Signup