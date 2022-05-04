import React, {useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import "./Information.css";
import Logo from "../../assets/img/front logo dark.svg";
import CommonImg from '../../utils/CommonImg';
import { information } from '../../utils/data';

function Information() {
    const [queryString, setQueryString] = useState(null);
    useEffect(() => {
        const componentName = window.location.search.split('?')[1].split('action=')[1];
        setQueryString(componentName);
    }, [queryString])
        
    return (
        <>
           <div className="login_main">
        <div className="login_info_left">
            <div className="login_logo">
                <Link to="/">
                    <img src={Logo} alt=""/>
                </Link>
            </div>
            <div className="tabs login_left_main thank_you_box">
                <div className="informattion">
                    {queryString &&
                    <>
                    <h4>{information[queryString].title}</h4>
                    <p>{information[queryString].description}</p>
                    <div className="team_box">
                        <span>{information[queryString].desc1}</span>
                        <strong>{information[queryString].desc2}</strong>
                    </div>
                    </>
                    }
                </div>
            </div>
        </div>
       <CommonImg/>
    </div>
        </>
    )
}

export default Information;
