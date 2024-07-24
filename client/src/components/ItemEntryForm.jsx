import React from "react";
import SelectFormInput from "./SelectFormInput";
import axios from "axios";
import TextInput from "./TextInput";
import $ from 'jquery';

function ItemEntryForm(){
    async function postForm(event){
        event.preventDefault();
        await axios.post('http://localhost:3000/post/itemEntry',{
            location: $('#locations').val(),
            products: $('#products').val(),
            cust: $('#cust').val(),
            remarks: $('#Remarks').val(),
            customer_name: $('#customer_name').val()
        },
        {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }
    return ( 
        <div className="ItemEntryForm-container">
            <form className="ItemEntryForm-form">
                <TextInput name='customer_name' />
                <SelectFormInput name='products' />
                <SelectFormInput name='locations' />
                <SelectFormInput name='cust' />
                <TextInput name='Remarks' />
                <button onClick={postForm} className="logForm-submit ItemEntryForm-submit btn btn-primary">Submit</button>
            </form>
        </div>
     );
}

export default ItemEntryForm;