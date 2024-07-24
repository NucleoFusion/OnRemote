import React from "react";

function PassInput(props){
    return (
    <div className="input-group mb-3 PassInput-container">
        <span className="input-group-text" id="inputGroup-sizing-default">{props.name}</span>
        <input type="password" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" name={props.name} id={props.name}/>
    </div>
    );
}

export default PassInput;