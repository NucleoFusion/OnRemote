import React,{useEffect} from "react";
import TextInput from "./TextInput";
import axios from "axios";
import $ from 'jquery';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function ProdEntry(){

    const navigate = useNavigate();
    useEffect( ()=>{
        if(Cookies.get('auth') !== 'AUTHENTICATED'){
            navigate('/');
        }
    },[]);

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
                <h4 className="LocnCustEntry-title">Add Product</h4>
                <TextInput name='Product' />
                <TextInput name='HSN' />
                <button onClick={postForm} className="logForm-submit ProdEntry-submit btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default ProdEntry;