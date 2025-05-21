import React, { createContext, useContext, useReducer } from "react";

const initialState = {
    balance: 0,
    loan: 0,
    isActive: true,
    deposit: "",
    withdraw: "",
    requestLoan: 5000,
    transaction: [],
    error: null,
    openHistory: false,
  // payLoan: null,
  // closeAccount: null
};

const AccountProvider = createContext();

//highest loan amount
const HIGHEST_LOAN__AMOUNT = 5000;

function reducer(state, action) {
    switch (action.type) {
        case "openAccount":
            return {
                ...state,
                balance: 500,
                isActive: false,
            };
        case "SET_DEPOSIT":
            return {
                ...state,
                deposit: action.payload,
            };
        case "deposit":
            return {
                ...state,
                balance: state.balance + Number(state.deposit),
                deposit: "",
                transaction: [
                ...state.transaction,
                {
                    type: action.type,
                    amount: Number(state.deposit),
                    balance: state.balance + Number(state.deposit),
                    date: new Date(),
                },
                ],
            };
        case "SET_WITHDRAW":
            return {
                ...state,
                withdraw: action.payload,
            };
        case "withdraw":
            return {
                ...state,
                balance: state.balance - Number(state.withdraw),
                withdraw: "",
                transaction: [
                ...state.transaction,
                {
                    type: action.type,
                    amount: Number(state.withdraw),
                    balance: state.balance - Number(state.withdraw),
                    date: new Date(),
                },
                ],
            };
        case "loan":
            const check = state.loan === HIGHEST_LOAN__AMOUNT;
            if (check) {
                return {
                ...state,
                error: "You already have a loan",
                };
            }
            return {
                ...state,
                loan: action.payload,
                balance:
                state.loan < HIGHEST_LOAN__AMOUNT
                    ? state.balance + state.requestLoan
                    : state.balance,
                transaction: [
                ...state.transaction,
                {
                    type: action.type,
                    amount: Number(action.payload),
                    balance: state.balance + Number(action.payload),
                    date: new Date(),
                },
                ],
            };
        case "payloan":
            const checkOutstanding = state.loan;
            if (!checkOutstanding) {
                return {
                ...state,
                error: "No loan Outstanding, use the loan button to take a loan",
                };
            }
            return {
                ...state,
                balance: state.balance - state.loan,
                loan: state.loan !== 0 ? state.loan - HIGHEST_LOAN__AMOUNT : 0,
                transaction: [
                ...state.transaction,
                {
                    type: action.type,
                    amount: Number(state.loan),
                    balance: state.balance - Number(state.loan),
                    date: new Date(),
                },
                ],
            };
        case "closeAccount":
            return {
                ...state,
                isActive: state.balance === 0 && state.loan === 0 ? true : false,
            };
        case "openHistory":
            return {
                ...state,
                openHistory: action.payload,
            };
        default:
            throw new Error("action not match");
    }
}

function BankContext({children}) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        balance,
        loan,
        isActive,
        deposit,
        withdraw,
        requestLoan, 
        transaction,
        openHistory,
    } = state;

    const handleDepositInputChange = (e) => {
        dispatch({
            type: "SET_DEPOSIT",
            payload: e.target.value,
        });
    };

    // Withdrawal
    const handleWithdrawInputChange = (e) => {
        dispatch({
            type: "SET_WITHDRAW",
            payload: e.target.value,
        });
    };

    const handleDeposit = (e) => {
        e.preventDefault();
        dispatch({ type: "deposit" });
    };

    const handleWithdraw = (e) => {
        e.preventDefault();
        dispatch({ type: "withdraw" });
    };


    return (
        <AccountProvider.Provider
            value={{
                dispatch,
                balance,
                loan,
                isActive,
                deposit,
                withdraw,
                requestLoan,
                transaction,
                openHistory,
                handleDepositInputChange,
                handleWithdrawInputChange,
                handleDeposit,
                handleWithdraw
            }}
        >
            {children}
        </AccountProvider.Provider>
    );
}

function useBank () {
    const context = useContext(AccountProvider)
    if (context === undefined) {
        throw new Error('Context is been used outside of the AccountProvider')
    }
    return context
}


export {BankContext, useBank}