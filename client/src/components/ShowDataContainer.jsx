import React from "react";

function ShowDataContainer(props){

    return (  
        <div>
            <h4>{props.id}</h4>
            <h4>{props.name}</h4>
            {(props.hsn) ? <h4>{props.hsn}</h4> : <></> }
        </div>
    );
}

export default ShowDataContainer;