import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ShowDataContainer from "./ShowDataContainer";

function ShowDataPage(props){
    const [resultArr,setResultArr] = useState([]);
    useEffect(() => {
        if(!(props.name !== 'locations' && props.name !== 'products' && props.name !== 'cust')){
            const getData = async () => {
                await axios.get('http://localhost:3000/get/' + props.name)
                .then(
                    response => setResultArr(response.data))
                }
                getData();
        }
    }, [props.name]);  
    
    return (
        <div>
            {resultArr.map( (obj)=>{
                return <ShowDataContainer name={obj.name} id={`${obj.id}`} hsn={obj.hsn} />
            })}
        </div>
    );
}

export default ShowDataPage;