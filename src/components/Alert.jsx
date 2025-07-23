import React from 'react'

const Alert = (props) => {
    return (
        <div className="alert alert-primary" role="alert">
            {props.message ? props.message : "No alert message available"}
        </div>
    )
}
export default Alert;