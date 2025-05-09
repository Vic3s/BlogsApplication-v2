import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Nav from "./partials/Nav";

function Account(){

    const[acc, setAcc] = useState({user: null})

    const navigate = useNavigate();

    useEffect(()=> {
        const getAcc = async () => {
            await fetch("http://localhost:5000/api/account/data", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })
            .then(response => response.json())
            .then(accObj => {
                setAcc(accObj.user)})
            .catch(err => console.log(err));
        }
        getAcc();
    }, [])

    const logOut = async (e) => {
        e.preventDefault();

        await fetch("http://localhost:5000/api/logout", {
            method: "POST",
            credentials: "include"
        }).then(response => {
            return response.json();
        }).then(data => { console.log("success: ", data)})
        .catch(err => console.log(err))
        navigate("/");
    }

    return  <div id="main-container-accoutn">
                <Nav/>

                <h1 class="login-title">Account</h1>

                <h2>{acc.name}</h2>
                <h2>{acc.email}</h2>

                <form onSubmit={logOut}>
                    <button type="submit" id="log-out">Log Out</button>
                </form>

        </div>
}

export default Account