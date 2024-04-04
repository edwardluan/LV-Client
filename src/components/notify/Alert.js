import React from 'react';

const Alert = ({ msg, handleShow, bgColor }) => {
    return (
        <div className={`toast show position-fixed text-light ${bgColor}`}
            style={{ bottom: '5px', right: '5px', minWidth: '200px', zIndex: 50 }}>
            <div className={`toast-header text-light ${bgColor}`}>
                <strong className="mr-auto text-light">{msg.title}</strong>
            </div>
            <div className="toast-body">
                {msg.body}
            </div>
        </div>
    )
}

export default Alert;
