import React from "react";
import { useBank } from "../context/BankContext";
import Form from "../components/form";
import Button from "../components/button";
import TransactionList from "../components/transactionList";
import User from "../components/user";

function HomePage() {
    const {
        balance,
        loan,
        isActive,
        deposit,
        withdraw,
        requestLoan,
        transaction,
        openHistory,
        handleDeposit,
        handleWithdraw,
        handleDepositInputChange,
        handleWithdrawInputChange,
        dispatch,
    } = useBank();

    return (
        <div className="App">
            <h1>useReducer Bank Account</h1>
            <p>Balance: ${balance}</p>
            <p>Loan: ${loan}</p>

            <Button
                onClick={() => dispatch({ type: "openAccount" })}
                isActive={isActive}
            >
                Open Account
            </Button>

            <Form
                type="Deposit"
                value={deposit}
                onChange={handleDepositInputChange}
                active={isActive}
                onClick={handleDeposit}
            />

            <Form
                type="Withdraw"
                value={withdraw}
                onChange={handleWithdrawInputChange}
                active={isActive}
                onClick={handleWithdraw}
            />

            <Button
                onClick={() => dispatch({ type: "loan", payload: 5000 })}
                isActive={!isActive}
            >
                Request a loan of ${requestLoan}
            </Button>

            <Button
                onClick={() => dispatch({ type: "payloan" })}
                isActive={!isActive}
            >
                Pay loan
            </Button>

            <Button
                onClick={() => dispatch({ type: "closeAccount" })}
                isActive={!isActive}
            >
                Close account
            </Button>

            {balance > 0 && <Button
                onClick={() => dispatch({ type: "openHistory", payload: !openHistory })}
                isActive={true}
            >
                {openHistory ? "Close Transaction History" : "View Transaction History"}
            </Button>}

            {openHistory && (
                <div>
                    <h1>Transaction History</h1>
                    {transaction.length === 0 ? (
                        <p>No Transaction history yet</p>
                    ) : (
                        <TransactionList transaction={transaction} />
                    )}
                </div>
            )}
            <User />
        </div>
    );
}

export default HomePage;

// {
//   /* 
//         <form>
//           <label htmlFor="deposit">Deposit</label>
//           <input
//             type="number"
//             value={deposit}
//             onChange={handleDepositInputChange}
//             placeholder="Amount"
//             min="0"
//             step="0.01"
//             id="deposit"
//             disabled={isActive}
//           />
//           {deposit && <button onClick={handleDeposit}>Deposit</button>}
//         </form> */
// }
// {
//   /* <p>

//                 <button onClick={() => dispatch({type: 'deposit', payload: 150})} disabled={isActive}>
//                     Deposit {deposit}
//                 </button>
//             </p> */
    //   {
    //     /* <form>
    //             <label htmlFor="withdraw">Withdraw</label>
    //             <input 
    //                 type='number' 
    //                 value={withdraw} 
    //                 onChange={handleWithdrawInputChange}
    //                 placeholder="Amount" 
    //                 min='0'
    //                 step='0.01'
    //                 id="withdraw" 
    //                 disabled={isActive}
    //             />
    //             { withdraw && (
    //                     <button onClick={handleWithdraw} >Withdraw</button>
    //                 )
    //             }
    //         </form> */
    //   }
    //   {
    //     /* 
    //         <p>
    //             <button onClick={() => dispatch({type: 'withdraw', payload: 50})} disabled={isActive}>
    //                 Withdraw {withdraw}
    //             </button>
    //         </p> */
    //   }
// }

    //   {
    //     /* <p>
    //     <button
    //       onClick={() => dispatch({ type: "openAccount" })}
    //       disabled={!isActive}
    //     >
    //       Open account
    //     </button>
    //   </p> */
    //   }