import { useEffect, useState } from "react"
import "./partials_styles/nav_additional_styles.css"

function Nav() {

    const[user, setUser] = useState({user: null});

    useEffect(() => {
        const getUserIfExists = async() => {
            await fetch("http://localhost:5000/api/account/data", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            })
            .then(response => response.json())
            .then(userObj => setUser(userObj))
            .catch(err => console.log(err));
        }
        getUserIfExists();
    }, []);

    function UserExistsCheck(){
        if(user.user == null){
            return <li className="nav-item ms-3">
                        <a className="btn btn-dark btn-rounded" href="/signup">Sign Up</a>
                    </li>
        }else{
            return <>
                <li className="nav-item">
                    <a className="nav-link mx-2" href="/create">
                    <img src="../public/plus-circle-svgrepo-com.svg" alt="Blogs Icon" className="create-icon"/> Create</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link mx-2" href="/account">
                    <img src="../public/account-svgrepo-com.svg" alt="Blogs Icon" className="create-icon"/> Account</a>
                </li>
            </>
        }
    }

    return <>
    
    <nav className="navbar navbar-expand-lg fixed-top bg-light navbar-light">
        <div className="container">
            <a className="navbar-brand" href="/">Blogify</a>
            <div className="search-bar-content">
                <div className="search-bar-body">
                    <img src="../public/search-icon.svg" alt="search-icon" />
                    <div className="search-bar">
                        <form>
                            <input type="text" placeholder="Search..."/>    
                        </form>
                    </div>
                </div>
            </div>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto align-items-center">
                    <li className="nav-item">
                        <a className="nav-link mx-2" href="/">
                        <img src="../public/comment-lines-svgrepo-com.svg" alt="Blogs Icon" className="blogs-icon"/>Blogs</a>
                    </li>
                    <UserExistsCheck/>
                </ul>
            </div>
        </div>
    </nav>
    </>
}

export default Nav;