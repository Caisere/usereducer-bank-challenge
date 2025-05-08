import React, { useReducer } from "react";

const initialState = {
    balance: 0,
    loan: 0,
    isActive: true,
    deposit: '',
    withdraw: '',
    requestLoan: 5000,
    transaction: [],
    error: null
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
        case 'SET_DEPOSIT': 
            return {
                ...state, deposit: action.payload
            }
        case 'deposit': 
            return {
                ...state, balance: state.balance + Number(state.deposit), deposit: '', 
                transaction: [...state.transaction, {type: action.type, amount: Number(state.deposit), date: new Date() }]
            }
        case 'SET_WITHDRAW': 
            return {
                ...state, withdraw: action.payload
            }
        case 'withdraw': 
            return {
                ...state, balance: state.balance - Number(state.withdraw), withdraw: '',
                transaction: [...state.transaction, {type: action.type, amount: Number(state.withdraw), date: new Date() }]
            }
        case 'loan':
            const check = state.loan === HIGHEST_LOAN__AMOUNT;
            if (check) {
                return {
                    ...state, error: 'You already have a loan'
                }
            }
            return {
                ...state, loan: action.payload,  balance: state.loan < HIGHEST_LOAN__AMOUNT ?  state.balance + state.requestLoan : state.balance,
                transaction: [...state.transaction, {type: action.type, amount: Number(action.payload), date: new Date() }] 
            }
        case 'payloan': 
            const checkOutstanding = state.loan;
            if (!checkOutstanding) {
                return {
                    ...state, error: 'No loan Outstanding, use the loan button to take a loan'
                }
            }
            return {
                ...state, balance: state.balance - state.loan, loan: state.loan !== 0 ? state.loan - HIGHEST_LOAN__AMOUNT : 0,
                transaction: [...state.transaction, {type: action.type, amount: Number(state.loan), date: new Date() }]
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
    const {balance, loan, isActive, deposit, withdraw, requestLoan, transaction} = state

    console.log(transaction)

    const handleDepositInputChange = (e) => {
        dispatch({ 
            type: 'SET_DEPOSIT', 
            payload: e.target.value 
        });
    };

    // Withdrawal
    const handleWithdrawInputChange = (e) => {
        dispatch({ 
            type: 'SET_WITHDRAW', 
            payload: e.target.value 
        });
    };

    const handleDeposit = (e) => {
        e.preventDefault()
        dispatch({ type: 'deposit' });
    };

    const handleWithdraw = (e) => {
        e.preventDefault()
        dispatch({ type: 'withdraw' });
    };

    return (
        <div className="App"> 
            <h1>useReducer Bank Account</h1>
            <p>Balance: ${balance}</p>
            <p>Loan: ${loan}</p>

            <p>
                <button onClick={() => dispatch({type: 'openAccount'}) } disabled={!isActive}>
                    Open account
                </button>
            </p>

            <form>
                <label htmlFor="deposit">Deposit</label>
                <input 
                    type='number' 
                    value={deposit} 
                    onChange={handleDepositInputChange}
                    placeholder="Amount" 
                    min='0'
                    step='0.01'
                    id="deposit" 
                    disabled={isActive}
                />
                { deposit && (
                        <button onClick={handleDeposit} >Deposit</button>
                    )
                }
            </form>
            {/* <p>

                <button onClick={() => dispatch({type: 'deposit', payload: 150})} disabled={isActive}>
                    Deposit {deposit}
                </button>
            </p> */}

            <form>
                <label htmlFor="withdraw">Withdraw</label>
                <input 
                    type='number' 
                    value={withdraw} 
                    onChange={handleWithdrawInputChange}
                    placeholder="Amount" 
                    min='0'
                    step='0.01'
                    id="withdraw" 
                    disabled={isActive}
                />
                { withdraw && (
                        <button onClick={handleWithdraw} >Withdraw</button>
                    )
                }
            </form>
{/* 
            <p>
                <button onClick={() => dispatch({type: 'withdraw', payload: 50})} disabled={isActive}>
                    Withdraw {withdraw}
                </button>
            </p> */}
            <p>
                <button onClick={() => {dispatch({type: 'loan', payload: 5000})}} disabled={isActive}>
                    Request a loan of ${requestLoan}
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
