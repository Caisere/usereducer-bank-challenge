import React from 'react'

function TransactionList ({transaction}) {
    return (
        <ul>
            {transaction.map((eachTrans, index) => (
            <li key={index}>
                <div>
                    <p>{eachTrans.type}</p>
                    <span>
                        <strong>${eachTrans.amount}</strong>
                    </span>
                    <span>
                        <strong>${eachTrans.balance}</strong>
                    </span>
                    <span>
                        <em>{` ${eachTrans.date.toLocaleTimeString()} ${eachTrans.date.toDateString()}`}</em>
                    </span>
                </div>
            </li>
            ))}
        </ul>
    );
}

export default TransactionList