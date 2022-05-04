import React, { useState ,useEffect}  from "react";
import {Link, useNavigate } from 'react-router-dom';
import {VerfiyHandler} from "../../service/auth.services";
import { errorToast } from "../../utils/helper";
function VerfiyAccount(){

    const navigate = useNavigate();
    useEffect(()=>{ 
        const dataEmail= window.location.search.split('&')[0].split('email=')[1];
        const dataPassword=window.location.search.split('password=')[1];

        verfiyAccountHandler(dataEmail,dataPassword);
    },[]);

    const verfiyAccountHandler=async(email,password)=>{
            if(email && password){
                const response= await VerfiyHandler(email, password);
                if(response.data.Status==="200"){
                    navigate(`/`); 
                }else{
                    errorToast(response.data.message);
                }
            }
    }
    return(
        <>
        </>
    )
}

export default VerfiyAccount;