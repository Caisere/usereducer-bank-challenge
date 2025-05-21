import React, { useEffect, useReducer } from 'react'
import styles from './login.module.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ErrorMessage from '../components/error'
// import Button from '../components/button';

const initialState = {
    email: 'omoshola.code@gmail.com',
    password: 'zxcvbnm'
}

function userDetails (state, action) {
    switch (action.type) {
        case 'userEmail':
            return {
                ...state, email: action.payload
            }
        case 'userPassword':
            return {
                ...state, password: action.payload
            }
        default: {
            throw new Error('invalid action type!')
        }
    }
}

function Login () {
    const [{email, password}, dispatch] = useReducer(userDetails, initialState);
    const {login, isAuthenticated, error} = useAuth()
    const navigate = useNavigate()

    function handleSubmit (e) {
        e.preventDefault()
        if (!email && !password) return

        login(email, password)
    }

    useEffect(function () {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate])

    return (
        <div className={styles.login}>
            
            <form className={styles.form} onSubmit={handleSubmit}>
                {error && <ErrorMessage message={error} />}
                <div className={styles.row}>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        onChange={(e) => dispatch({type: 'userEmail', payload: e.target.value})}
                        value={email}
                    />
                </div>

                <div className={styles.row}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => dispatch({type: 'userPassword', payload: e.target.value})}
                        value={password}
                    />
                </div>

                <div>
                    <button className={styles.loginButton}>Login</button>
                </div>
            </form>
        </div>
    );
}

export default Login