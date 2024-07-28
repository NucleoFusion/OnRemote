import React, { useEffect } from "react";
import $ from 'jquery';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function Home(){
    const navigate = useNavigate();
    useEffect( ()=>{
        console.log(Cookies.get());
        // if(Cookies.get('auth') !== 'AUTHENTICATED'){
        //     navigate('/');
        // }
        $('#Navbar').show();
    },[]);

    return (
        <>
            <h1>HOME</h1>
        </>

    );
}

export default Home;