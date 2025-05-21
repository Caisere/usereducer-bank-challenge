import React from "react";
import styles from './user.module.css'
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function User() {
    const {user, logout} = useAuth()
    const navigate = useNavigate()
    console.log(user)
    
    function handleClick(e) {
        e.preventDefault()
        logout()
        navigate('/')
    }


    return (
        <div className={styles.user}>
            <img src={user.avatar} alt={user.name} />
            <span>Welcome, {user.name}</span>
            <button onClick={handleClick}>Logout</button>
        </div>
    );
}

export default User;
