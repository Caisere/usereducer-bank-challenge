import React from 'react'

function Button ({children, onClick, isActive}) {
    return (
        <button
            onClick={onClick}
            disabled={!isActive}
            style={{marginBlock: '20px'}}
        >
            {children}
        </button>
    );
}

export default Button