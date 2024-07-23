import React from "react";

function SelectOption(props){
    return ( 
        <option value={props.name}>{props.name}</option>
    ); 
}

export default SelectOption;