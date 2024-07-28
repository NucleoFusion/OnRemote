import React, { useEffect, useState } from "react";
import PassInput from "./PassInput";
import TextInput from "./TextInput";
import EmailInput from "./EmailInput";
import axios from "axios";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


function LogForm(props){
    const [logDet,setLogDet] = useState({
        name: "Login"
    });
    const navigate = useNavigate();
    useEffect( ()=>{
        if(Cookies.get('auth') === 'AUTHENTICATED'){
            navigate('/home')
        }
        $(".toHide").hide();
    },[])

    async function postLogin(e){
        e.preventDefault();
        if(logDet.name === "Login"){
            if($("#Password").val() === '' || $("#Email").val() === '' ){
                alert('One or more field is empty');
                return;
            }
            const result = await axios.post('http://localhost:3000/login', {
                password: $("#Password").val(),
                 email: $("#Email").val()
            },
                {
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    }
            });
            if(result.data.auth === 'AUTHENTICATED'){
                alert('Logged In');
                Cookies.set('id',result.data.id);
                Cookies.set('admin',result.data.admin);
                Cookies.set('auth',result.data.auth);
                navigate('/home');
            } else if(result.data.auth === 'USER NOT FOUND'){
                alert('User was not found');
            } else if(result.data.auth === 'WRONG PASSWORD'){
                alert('Wrong Password was entered')
            }
        } else if(logDet.name === "Register"){
            if($("#Password").val() === '' || $("#Email").val() === '' || $("#Token").val() === ''){
                alert('One or more field is empty');
                return;
            }
            const result = await axios.post('http://localhost:3000/register', {
                token: $("#Token").val(),
                password: $("#Password").val(),
                 email: $("#Email").val()
            },
                {
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    }
            });
            if(result.data.auth === 'WRONG TOKEN'){
                alert('Wrong Token was Entered.');
            } else if(result.data.auth === 'USERNAME EXISTS'){
                alert('The User already Exists');
            } else if (result.data.auth === 'AUTHENTICATED'){
                alert('Logged In');
                Cookies.set('id',result.data.id);
                Cookies.set('admin',result.data.admin);
                navigate('/home');
            }
        }
    }

    function setStateDet(event){
        event.preventDefault();
        const data  = logDet;
        if(data.name === "Login"){
            setLogDet({
                name:"Register"
            });
            $(".toHide").toggle();
            $(".login-heading").text("Register");
            $(".logForm-toggle").text("Login");
            $(".logForm-input-container").attr("Login");
        }
        else if(data.name === "Register"){
            setLogDet({
                name:"Login"
            });
            $(".toHide").toggle();
            $(".login-heading").text("Login");
            $(".logForm-toggle").text("Register");
            $(".logForm-input-container").attr("Login");
        }
    }
    
    return (
        <div className="logForm-container">
            <div className="logForm-outer-container">
                    <form className="logForm-input-container">
                        <h3 className="login-heading center" >Login</h3>
                        <TextInput className="logForm-input" name='Token'/>
                        <EmailInput className="logForm-input" name='Email'/>
                        <PassInput className="logForm-input" name='Password'/>
                        <Link to='/home' >
                            <button onClick={postLogin} className="logForm-submit btn btn-primary">Submit</button>
                        </Link>
                    </form>    
                <div className="logForm-container-element justify-left center-child">
                    <button onClick={setStateDet} name="Register" className="logForm-toggle logForm-submit btn btn-primary">Register</button>
                </div>
                </div>
        </div>
    );
}

export default LogForm;
