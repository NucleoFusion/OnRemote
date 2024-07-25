import React from "react";
import TextInput from "./TextInput";
import axios from "axios";
import $ from 'jquery';

function ProdEntry(){
    async function postForm(event){
        event.preventDefault();
        await axios.post('http://localhost:3000/post/product',{
            product: $('#Product').val(),
            HSN: $('#HSN').val()
        },
        {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }

    return (
        <div className="ProdEntry-container">
            <form className="ProdEntry-form">
                <TextInput name='Product' />
                <TextInput name='HSN' />
                <button onClick={postForm} className="logForm-submit ProdEntry-submit btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default ProdEntry;