import React,{useEffect,useState} from 'react';
import "./ForgotPassword.css";
import {Link} from 'react-router-dom';
import Logo from "../../assets/img/front logo dark.svg";
import CommonImg from '../../utils/CommonImg';
import {useNavigate } from 'react-router-dom';
import { ForgotHandler } from '../../service/auth.services';
import $ from 'jquery';
import { errorToast, successToast } from '../../utils/helper';

function ForgotPassword() {
  const [email,setEmail]=useState('');
  const navigate = useNavigate();
  const forgotPasswordHandler =async()=>{
      if(email){
        const response = await ForgotHandler(email);
        if(response.data.Status==="200"){
          successToast(response.data.message);
          setTimeout(() => {
            navigate(`/information?action=forgot`);
          },3000);
        }else{
          errorToast(response.data.message);
        }
      }else{
        errorToast('please enter email')
      }
     
    }

    useEffect(()=>{
  $(".enter-mail-id").keydown(function (e) {
    if (e.keyCode == 13 || e.keyCode == 32) {
      var getValue = $(this).val();
      $('.all-mail').append('<div className="email-ids">'+ getValue +' <div className="cancel-email">x</div></div>');
      $(this).val('');
    }
  });

  $(document).on('click','.cancel-email',function(){
    $(this).parent().remove();
  });
 // Participants End

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
      // $(i).addClass("active").siblings().removeClass("active"), 
      $(i).addClass("active info").siblings().removeClass("active info"); 
      e.preventDefault();
      moveMarker();
      
      }); 
  //  Tabs Js End 
  $(document).ready(function(){

    $('.js-edit, .js-save').on('click', function(){
      var $form = $(this).closest('.profile_input_edit');
      $form.toggleClass('is-readonly is-editing');
      var isReadonly  = $form.hasClass('is-readonly');
      $form.find('input,textarea').prop('disabled', isReadonly);
    });
    
  });
},[])
  
  return (
      <>
        <div className="login_main">
        <div className="login_info_left">
            <div className="login_logo">
                <Link to="/">
                    <img src={Logo} alt=""/>
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
                                <label>Email</label>
                                <input type="email" onChange={(e)=>setEmail(e.target.value)}/>
                            </div>
                        </div>
                        <div className="btn_login register_btn">
                            <a  className="btn btn-primary" onClick={forgotPasswordHandler}>Send Password Reset Link</a>
                        </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
        <CommonImg/>
    </div>
    </>
    )
}

export default ForgotPassword;
