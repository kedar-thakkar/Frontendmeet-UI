import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
import "./Login.css";
import Logo from "../../assets/img/front logo dark.svg";
import { loginHandler, RegisterHandler } from "../../service/auth.services";
import {
  Name_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
} from "../../utils/validation";
import CommonImg from "../../utils/CommonImg";
import { ToastContainer, toast } from "react-toastify";
import { successToast, errorToast } from "../../utils/helper";

toast.configure();

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [enterEmail, setEnterEmail] = useState("");
  const [enterPass, setEnterPass] = useState("");
  const [fullName, setFullName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [isnam, setIsNam] = useState("");
  const [ismail, setIsMail] = useState("");
  const [ispass, setIsPass] = useState("");
  const navigate = useNavigate();

  function loginValidation() {
    let formIsValid = true;
    if (!EMAIL_REGEX.test(email) === true) {
      formIsValid = false;
      if (email === "") {
        formIsValid = false;
        setEnterEmail("Please enter email");
      } else {
        setEnterEmail("Enter Valid Email");
      }
    }
    if (!PASSWORD_REGEX.test(password) === true) {
      formIsValid = false;
      if (password === "") {
        formIsValid = false;
        setEnterPass("Please enter password");
      } else {
        setEnterPass("Enter Correct Password");
      }
    }
    return formIsValid;
  }

  const loginSubmitHandler = async () => {
    if (loginValidation()) {
      let formIsValid = true;
      setEnterEmail("");
      setEnterPass("");
      formIsValid = false;
      var data = {
        username: email,
        password: password,
      };
      const response = await loginHandler(data);
      if (response.data.Status === "200") {
        localStorage.setItem("UserData", JSON.stringify(response.data.data));
        const token = response.data.data.token;
        const userId = response.data.data.id;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        if (userId) {
          navigate(`/dashboard`);
        }
      } else if (response.data.Status === "400") {
        errorToast(response.data.message);
      }
    }
  };
  const keyHandler = (e) => {
    if (e.key === "Enter") {
      loginSubmitHandler();
    }
  };

  function validation() {
    let formIsValid = true;

    if (!Name_REGEX.test(fullName) === true) {
      formIsValid = false;
      if (fullName === "") {
        formIsValid = false;
        setIsNam("Please enter name");
      } else {
        setIsNam("Enter Valid Name");
      }
    } else {
      setIsNam("");
    }
    if (!EMAIL_REGEX.test(regEmail) === true) {
      formIsValid = false;
      if (regEmail === "") {
        formIsValid = false;
        setIsMail("Please enter email");
      } else {
        setIsMail("Email is not valid");
      }
    } else {
      setIsMail("");
    }
    if (!PASSWORD_REGEX.test(regPassword) === true) {
      formIsValid = false;
      if (regEmail === "") {
        formIsValid = false;
        setIsPass("Please enter password");
      } else {
        setIsPass("Password is not matched with Password Policy");
      }
    } else {
      setIsPass("");
    }
    return formIsValid;
  }

  const registerHandler = async () => {

    if (validation()) {

      let formIsValid = true;
      setIsNam("");
      setIsMail("");
      setIsPass("");
      formIsValid = false;

      var data = {
        name: fullName,
        email: regEmail,
        password: regPassword,
      };

      const response = await RegisterHandler(data);

      if (response.data.Status === "200") {

        successToast(response.data.message);
        setTimeout(() => {
          navigate(`/information?action=register`);
        }, 1000);
      } else {
        errorToast(response.data.message);
      }
    }
  };

  function tabActive() {

    $(".nav_tabs:first-child").addClass("active");
    $(".login_tabs_row:first-child").addClass("active");
    function moveMarker() {
      var activeNav = $(".active a");
      var activewidth = $(activeNav).width() + 30;
      var totalWidth = activewidth;
      var precedingAnchorWidth = anchorWidthCounter();
      var activeMarker = $(".active-marker");
      $(activeMarker).css("display", "block");
      $(activeMarker).css("width", totalWidth);
      $(activeMarker).css("left", precedingAnchorWidth);
    }
    moveMarker();

    function anchorWidthCounter() {

      var anchorWidths = 0;
      var a;
      var aWidth;
      var aPadLeft;
      var aPadRight;
      var aTotalWidth;
      $(".nav_tabs").each(function (index, elem) {
        var activeTest = $(elem).hasClass("active");
        if (activeTest) {
          return false;
        }
        a = $(elem).find("a");
        aWidth = a.width();
        aPadRight = parseFloat(a.css("margin-right"));
        aTotalWidth = aWidth + aPadRight;
        anchorWidths = anchorWidths + aTotalWidth;
      });

      return anchorWidths;
    }

    $(".nav_tabs a").on("click", function (e) {

      var i = $(this).attr("href");
      $(this).parent().addClass("active").siblings().removeClass("active");
      $(i).addClass("active info").siblings().removeClass("active info");
      e.preventDefault();
      moveMarker();
    });
  }

  useEffect(() => {
    tabActive();
  }, []);

  useEffect(() => {
    Protected();
  });

  const Protected = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(`/dashboard`);
    }
  };

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
            <div className="tabs-nav">
              <div className="nav_tabs">
                <a href="#navtab1">Log in</a>
              </div>
              <div className="nav_tabs">
                <a href="#navtab2">Register</a>
              </div>
              <i className="active-marker"></i>
            </div>
            <div className="tabs-stage">
              <div
                className="login_tabs_row"
                id="navtab1"
                onKeyPress={keyHandler}
              >
                <div className="login_otr">
                  <div className="lofin_title_info">
                    <h3>Welcome Back!</h3>
                    <p>welcome back! Please Enter your Details</p>
                  </div>
                  <div className="login_row_box">
                    <div className="login_input">
                      <label>Email</label>
                      <input
                        type="email"
                        onChange={(e) => [setEmail(e.target.value), setEnterEmail('')]}
                      />
                    </div>
                    <p className="ErrorColor">{enterEmail}</p>
                    <div className="login_input">
                      <label>Password</label>
                      <input
                        type="password"
                        onChange={(e) => [setPassword(e.target.value), setEnterPass('')] }
                      />
                    </div>
                    <p className="ErrorColor">{enterPass}</p>
                  </div>
                  <div className="forgot_password">
                    <Link to="/forgotpassword">Forgot password ?</Link>
                  </div>
                  <div className="btn_login">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={loginSubmitHandler}
                    >
                      Log In
                    </button>
                  </div>
                </div>
              </div>
              <div className="login_tabs_row" id="navtab2">
                <div className="login_otr">
                  <div className="lofin_title_info">
                    <h2>Sign Up</h2>
                  </div>
                  <div className="login_row_box">
                    <div className="login_input">
                      <label>Full Name</label>
                      <input
                        type="text"
                        onChange={(e) => [setFullName(e.target.value), setIsNam('')]}
                      />
                    </div>
                    <p className="ErrorColor">{isnam}</p>
                    <div className="login_input">
                      <label>Email</label>
                      <input
                        type="email"
                        onChange={(e) => [setRegEmail(e.target.value), setIsMail('')]}
                      />
                    </div>
                    <p className="ErrorColor">{ismail}</p>
                    <div className="login_input">
                      <label>Password</label>
                      <input
                        type="password"
                        onChange={(e) => [setRegPassword(e.target.value), setIsPass('')]}
                      />
                    </div>
                    <p className="ErrorColor">{ispass}</p>
                  </div>
                  <div className="btn_login register_btn">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={registerHandler}
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
        <CommonImg />
      </div>
    </>
  );
}

export default Login;
