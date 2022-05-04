import React, { useState, useEffect } from 'react';
import "./ResetPassword.css";
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/img/front logo dark.svg";
import CommonImg from '../../utils/CommonImg';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { PASSWORD_REGEX } from '../../utils/validation';
import { ResetPasswordHandler } from "../../service/auth.services"
import { errorToast, successToast } from '../../utils/helper';
function ResetPassword({ location, props }) {
  const [password, setPassword] = useState('');
  const [confrimpass, setConfrimPass] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const validation = () => {
    let formIsValid = true;
    if (!PASSWORD_REGEX.test(password) === true) {
      formIsValid = false;
    } 
    
    return formIsValid;
  }

  const resetHandler = async () => {
    
    if(password==""){
      errorToast("Please enter password")
    }else{
      if (validation()){
        if (password === confrimpass){
          const response = await ResetPasswordHandler(email, token, password)
          if(response.data.Status==="200"){
              successToast(response.data.message);
              setTimeout(() => {
                 navigate(`/`);
              },5000);
          }else{
               errorToast(response.data.message);
          }
        }else{
          errorToast("New Password and Confirm Password does not matched")
        }
      }else{
        errorToast("Password does not matched with Password Policy")
      }
      
    }    
  }


  useEffect(() => {
    try {
      const dataToken = window.location.search.split('&')[0].split('token=')[1];
      const dataEmail = window.location.search.split('email=')[1];

      if (!dataToken || !dataEmail) {
      } else {
        setEmail(dataEmail);
        setToken(dataToken);
      }
    } catch (error) {
    }
  }, [])

  useEffect(() => {
    //  Tabs Js 
    $('.nav_tabs:first-child').addClass('active');
    $('.login_tabs_row:first-child').addClass('active');
        function moveMarker() {
        var activeNav = $('.active a');
        var activewidth = $(activeNav).width() + 30;
        var totalWidth = activewidth;
        
        var precedingAnchorWidth = anchorWidthCounter();
        
        // TODO: 
        // Find the total widths of all of the anchors
        // to the left of the active anchor.

        var activeMarker = $('.active-marker');
        $(activeMarker).css('display','block');
        
        $(activeMarker).css('width', totalWidth);

        $(activeMarker).css('left', precedingAnchorWidth);
        
        // TODO: 
        // Using the calculated total widths of preceding anchors,
        // Set the left: css value to that number.
        }
        moveMarker();
        
        function anchorWidthCounter() {
        var anchorWidths = 0;
        var a;
        var aWidth;
        var aPadLeft;
        var aPadRight;
        var aTotalWidth;
        $('.nav_tabs').each(function(index, elem) {
            var activeTest = $(elem).hasClass('active');
            if(activeTest) {
            // Break out of the each function.
            return false;
            }

            a = $(elem).find('a');
            aWidth = a.width();
            aPadRight = parseFloat(a.css('margin-right'));
            aTotalWidth = aWidth + aPadRight;

            anchorWidths = anchorWidths + aTotalWidth;
        });

        return anchorWidths;
        }
        
        $(".nav_tabs a").on("click", function(e) {

          var i = $(this).attr("href");
          $(this).parent().addClass("active").siblings().removeClass("active");
          $(i).addClass("active info").siblings().removeClass("active info"); 
          e.preventDefault();
          moveMarker();
        
        }); 
  }, [])
  return (
    <>
      <div className="login_main">
        <div className="login_info_left">
          <div className="login_logo">
            <Link to="/">
              <img src={Logo} alt="" />
            </Link>
          </div>
          <div className="tabs login_left_main">
            <div className="tabs-stage">
              <div className="login_tabs_row" id="navtab2">
                <div className="login_otr">
                  <div className="lofin_title_info forgot_password_title">
                    <h2>Forgot Password</h2>
                  </div>
                  <div className="login_row_box">
                    <div className="login_input">
                      <label>New Password</label>
                      <input type="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="login_input">
                      <label>Confirm Password</label>
                      <input type="password" onChange={(e) => setConfrimPass(e.target.value)} />
                    </div>
                  </div>
                  <div className="btn_login register_btn">
                    <button type="button" className="btn btn-primary" onClick={resetHandler}> Reset Password</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CommonImg />
      </div>
    </>
  )
}

export default ResetPassword;
