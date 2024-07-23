import React from "react";



function SubmitButton(props){
    return (
        <button type="submit" class="btn btn-primary btn-sm" onClick={props.func}>{props.content}</button>
    );
}

export default SubmitButton;