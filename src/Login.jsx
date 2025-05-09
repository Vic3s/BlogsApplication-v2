import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Nav from "./partials/Nav"
import "./styles/login_page.css"

function Login() {

    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")

    const navigate = useNavigate();

    function postUserInput(e) {
        e.preventDefault();

        const userLoginReqObj = {email: email, password: password}

        fetch("http://localhost:5000/api/login/data", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(userLoginReqObj),
        }).then(response => {
            if(!response.ok){
                throw new Error("* Failed to post to server! *")
            }
            return response.json();
        }).then(data => {
            console.log('Response: ', data)
            navigate("/");
        })
        .catch((err) => console.log(err));

    }

    return <>
    
        <div className="main-container-login">
            <Nav/>

            <div className="login-card">
                <h1>Join And <br /><span>Create.</span></h1>
            </div>

            <div className="login-form-container">

                <div className="login-title">
                    <h1>Log In.</h1>
                </div>
            
                <form onSubmit={postUserInput}>

                    <div className="login-inputs">
                        <div className="input-container">
                            <label htmlFor="email">Email: </label>
                            <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        
                        <div className="input-container">
                            <label htmlFor="password">Password: </label>
                            <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <p className="forgot-password-container">
                        <Link to="/signup">Forgot password?</Link>
                    </p>

                    <button type="submit">Log In</button>
                </form>

                <p className="signup-redirect">Dont have an account? 
                    <span className="link-signup"><Link to="/signup"> Sign Up!</Link></span>
                </p>
            </div>

        </div>
    
    </>

}

export default Login