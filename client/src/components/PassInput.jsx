import React from "react";

function PassInput(props){
    return (
    <div className="mb-3">
        <label for="exampleInputPassword1" className="form-label">Password</label>
        <input name="password" type="password" className="form-control" id="exampleInputPassword1" />
    </div>
    );
}

export default PassInput;