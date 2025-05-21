import React, { createContext, useContext, useReducer } from 'react'


const AuthProvider = createContext()

const INITIAL_USER = {
    email: "omoshola.code@gmail.com",
    password: "zxcvbnm",
    name: 'Omoshola E',
    avatar: "https://pbs.twimg.com/profile_images/1467501684955955205/BA1K8qsw_400x400.jpg"
};

const initialState = {
    user: null,
    isAuthenticated: false,
    error: ''
}

function AuthReducer(state, action) {
    switch (action.type) {
        case 'user/loggedIn': 
            return {
                ...state, user: action.payload, isAuthenticated: true
            }
        case 'user/loggedOut': 
            return {
                ...state, user: null, isAuthenticated: false
            }
        case 'user/detailsIncorrect': 
            return {
                ...state, error: action.payload
            }
        default: {
            throw new Error("invalid action type!");
        }
    }
    
}

function AuthContext ({children}) {

    const [{user, isAuthenticated, error}, dispatch] = useReducer(AuthReducer, initialState)

    function login (email, password) {
        if (email === INITIAL_USER.email && password === INITIAL_USER.password) {
            dispatch({type: 'user/loggedIn', payload: INITIAL_USER})
        } else {
            dispatch({type: 'user/detailsIncorrect', payload: 'Incorrect email/password'})
        }
    }

    function logout () {
        dispatch({type: 'user/loggedOut'})
    }

    return (
        <AuthProvider.Provider value={{
            user,
            isAuthenticated,
            login,
            logout,
            error
        }}>
            {children}
        </AuthProvider.Provider>
    )
}

// custom hook to make the AuthProvider values accessible anywhere
function useAuth () {
    const context = useContext(AuthProvider)
    if (context === undefined) throw new Error('Context is been used outside of AuthProvider!')
    return context;
}

export {AuthContext, useAuth}