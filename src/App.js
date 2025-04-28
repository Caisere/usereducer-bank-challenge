import React, { useReducer } from "react";

const initialState = {
    balance: 0,
    loan: 0,
    isActive: true,
    // deposit: 150,
    // withdraw: 50,
    requestLoan: 5000,
    // payLoan: null,
    // closeAccount: null
};

//highest loan amount 
const HIGHEST_LOAN__AMOUNT = 5000;

function reducer (state, action) {
    switch(action.type) {
        case 'openAccount':
            return {
                ...state, balance: 500, isActive: false
            }
        case 'deposit': 
            return {
                ...state, balance: state.balance + action.payload
            }
        case 'withdraw': 
            return {
                ...state, balance: state.balance - action.payload
            }
        case 'loan':
            return {
                ...state, loan: action.payload,  balance: state.loan < HIGHEST_LOAN__AMOUNT ?  state.balance + state.requestLoan : state.balance 
            }
        case 'payloan': 
            return {
                ...state, balance: state.balance - state.loan, loan: state.loan !== 0 ? state.loan - HIGHEST_LOAN__AMOUNT : 0
            }
        case 'closeAccount': 
            return {
                ...state, isActive: state.balance === 0 && state.loan === 0 ? true : false
            }
        default: 
            throw new Error('action not match')
    } 
}



function App() {

    const [state, dispatch] = useReducer(reducer, initialState);
const {balance, loan, isActive, deposit, withdraw, requestLoan} = state

    return (
        <div className="App"> 
            <h1>useReducer Bank Account</h1>
            <p>Balance: {balance}</p>
            <p>Loan: {loan}</p>

            <p>
                <button onClick={() => dispatch({type: 'openAccount'}) } disabled={!isActive}>
                    Open account
                </button>
            </p>
            <p>
                <button onClick={() => dispatch({type: 'deposit', payload: 150})} disabled={isActive}>
                    Deposit {deposit}
                </button>
            </p>
            <p>
                <button onClick={() => dispatch({type: 'withdraw', payload: 50})} disabled={isActive}>
                    Withdraw {withdraw}
                </button>
            </p>
            <p>
                <button onClick={() => {dispatch({type: 'loan', payload: 5000})}} disabled={isActive}>
                    Request a loan of {requestLoan}
                </button>
            </p>
            <p>
                <button onClick={() => {dispatch({type:'payloan'})}} disabled={isActive}>
                    Pay loan
                </button>
            </p>
            <p>
                <button onClick={() => {dispatch({type: 'closeAccount'})}} disabled={isActive}>
                    Close account
                </button>
            </p>
        </div>

    );
}

export default App;
