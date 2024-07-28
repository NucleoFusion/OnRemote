import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import ShowDataContainer from "./ShowDataContainer";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function ShowDataPage(props){
    const [resultArr,setResultArr] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        if(Cookies.get('auth' !== 'AUTHENTICATED')){
            navigate('/');
        }
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
        <div className="ShowDataPage-container">
            <div className="ShowDataContainer-container">
                <h3 className="text-align">Serial</h3>
                <h3 className="text-align">{(props.name)}</h3>
                {(props.name === 'products') ? <h3 className="text-align">HSN</h3> : <></> }
            </div>
            {resultArr.map( (obj)=>{
                return <ShowDataContainer name={obj.name} id={`${obj.id}`} hsn={obj.hsn} />
            })}
        </div>
    );
}

export default ShowDataPage;