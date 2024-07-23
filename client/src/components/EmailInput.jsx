import React from "react";

function EmailInput(props){
    return (
    <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">Email address</label>
        <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
    </div>);
}

export default EmailInput;