import React from 'react'

function ErrorMessage ({message}) {
    return (
        <div style={{color: 'red', fontSize: '1.2rem'}}>{message}</div>
    )
}

export default ErrorMessage