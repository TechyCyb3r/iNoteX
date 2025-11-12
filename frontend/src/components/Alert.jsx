import React from 'react';

const Alert = (props) => {
    const alertClass = `alert alert-${props.type || 'primary'} ${props.message ? '' : 'd-none'}`;

    return (
        <div className={alertClass} role="alert">
            {props.message || "No alert message available"}
        </div>
    );
};

export default Alert;
