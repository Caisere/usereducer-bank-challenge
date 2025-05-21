import React from "react";

function Form({ value, onChange, active, onClick, type }) {
    return (
        <form>
            <label htmlFor={type}>{type}</label>
            <input
                type="number"
                value={value}
                onChange={onChange}
                placeholder="Amount"
                min="0"
                step="0.01"
                id={type}
                disabled={active}
            />
            {value && <button onClick={onClick}>{type}</button>}
        </form>
    );
}

export default Form;
