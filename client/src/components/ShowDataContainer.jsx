import React from "react";

function ShowDataContainer(props){

    return (  
        <div className="ShowDataContainer-container">
            <h4 className="text-align">{props.id}</h4>
            <h4 className="text-align">{props.name}</h4>
            {(props.hsn) ? <h4 className="text-align">{props.hsn}</h4> : <></> }
        </div>
    );
}

export default ShowDataContainer;