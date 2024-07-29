import React, { useState,useEffect } from "react";
import axios from "axios";
import TextInput from "./TextInput";
import $ from 'jquery';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function LocnCustEntry(props){
    const [entryType,setEntryType] = useState({ 
        entryType: props.entry,
    });

    const navigate = useNavigate();
    useEffect( ()=>{
        if(Cookies.get('auth') !== 'AUTHENTICATED'){
            navigate('/');
        }
    },[]);

    async function postData(event){
        if(Cookies.get('admin') === 'false'){
            alert('Admin Priveleges Required');
            navigate('/');
        }
        event.preventDefault()
        if(entryType.entryType === 'Location'){
            await axios.post('http://localhost:3000/post/location',{
                locn: $(`#${props.entry}`).val()
            },
            {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        }
        else if(entryType.entryType === 'Cust'){
            await axios.post('http://localhost:3000/post/cust',{
                locn: $(`#${props.entry}`).val()
            },
            {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        }
    }
    
    
    return (
        <div className="LocnCustEntry-container">
            <form className="LocnCustEntry-form">
                <h3 className="LocnCustEntry-title">{props.entry}</h3>
                <TextInput name={props.entry} />
                <button onClick={postData} className="logForm-submit LocnCustEntry-submit btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default LocnCustEntry;