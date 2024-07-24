import React, { useState } from "react";
import axios from "axios";
import TextInput from "./TextInput";
import $ from 'jquery';

function LocnCustEntry(props){
    const [entryType,setEntryType] = useState({ 
        entryType: props.entry,
    });
    console.log(entryType);
    async function postData(event){
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