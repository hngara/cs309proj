import React, { useState } from "react";
import { Button } from "./Button";
import { Button1 } from "./Button1";
import "./Styles/Log_in.css";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
function Log_in() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if (emailValid) {
      try {
        await AuthService.login(email, password).then(
          () => {
            navigate("/user/edit-profile");
            window.location.reload();
          },
          (error) => {
            alert(error.response.data.errors[0].msg);
          }
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("aktb 3dl ya w74 llasf mynf34 a4tm 3l4an a7na fe proj mo7trm ");
    }
  };
  return (
    <>
      <div className="login-container">
        <form id="form" onSubmit={handleSubmit}>
          <h5 className="login-heading">log in to your eqraame account</h5>
          <div className="login-btn">
            <Button
              className="btns"
              buttonStyle="btn--outline--scr"
              buttonSize="btn--large"
              buttonTrans="btn--scr"
            >
              <img className="googl-icon" src="/icons/google.png" alt="" />
              continue with google
            </Button>
            <Button
              className="btns"
              buttonStyle="btn--outline--scr"
              buttonSize="btn--large"
              buttonTrans="btn--scr"
            >
              <img className="googl-icon" src="/icons/facebook.png" alt="" />
              continue with facebook
            </Button>
          </div>
          <div className="input-container">
            <div className="input-field">
              <input
                type="text"
                required="required"
                onChange={(e) => setEmail(e.target.value)}
              />
              <span>email</span>
            </div>
            <div className="input-field">
              <input
                type="password"
                required="required"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span>password</span>
            </div>
          </div>
          <div className="log-btn">
            <Button1
              type="submit"
              className="btns"
              buttonStyle="btn--primary--logsign"
              buttonSize="btn--large"
              buttonTrans="btn--logsign"
              buttonPath="/login"
            >
              log in
            </Button1>
            <h5 className="signask">
              Don't have an account?
              <Link to="/signup">{"  Sign Up"}</Link>
            </h5>
          </div>
        </form>
      </div>
    </>
  );
}
export default Log_in;
