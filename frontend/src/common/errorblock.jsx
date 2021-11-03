import React from 'react';


const ErrorBlock = ({ status }) => {
    var showerror = "alert-warning";
    
    return ( 
        <div className={showerror} role="alert">
            {status}
        </div>
    );
}

export default ErrorBlock;