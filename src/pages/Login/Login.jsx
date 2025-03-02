import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEye } from "@fortawesome/free-solid-svg-icons";
import "./Login.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userId, setUserId] = useState('');
  const [userPass, setUserPass] = useState('');
  const navigate = useNavigate();

  const handlealert = () => {
    alert("Clicked");
  };

  const handleLogin = () => {
    if (userId === "user" && userPass === "user123") {
      navigate("/ExploreRecipe")
    } else {
      alert("Please Sign up!");
    }
  };

  return (
    <>
      <div className="login-main">
        <div className="main">
          <div className="inner-width">
            <h2 className="login-main_h2">
              {" "}
              Welcome back to GlobalBites! <br /> Let’s cook something amazing.
            </h2>

            <div className="login-card">
              <h1>Login</h1>

              <div className="login-card-inner">
                <div className="input">
                  <input
                    className="input-box"
                    type="email"
                    name=""
                    id="userId"
                    value={userId}
                    onChange={(e)=>setUserId(e.target.value)}
                    placeholder="Email"
                  />
                  <FontAwesomeIcon className="input-icon" icon={faEnvelope} />
                </div>
                <div className="input">
                  <input
                    className="input-box"
                    type="password"
                    name=""
                    id="userPass"
                    value={userPass}
                    onChange={(e)=>{setUserPass(e.target.value)}}
                    placeholder="Password"
                  />
                  <FontAwesomeIcon className="input-icon" icon={faLock} />
                  <FontAwesomeIcon
                    className="input-icon_eye"
                    onClick={() => {
                      handlealert();
                    }}
                    icon={faEye}
                  />
                </div>

                <div className="login-form__options">
                  <label>
                    <input
                      type="checkbox"
                      className="login-form__remember-me"
                    />
                    Remember me
                  </label>
                  <a href="#" className="login-form__forgot-password link">
                    Forgot Password?
                  </a>
                </div>

                <button
                  onClick={handleLogin}
                  type="submit"
                  className="login-form__button button"
                >
                  Enter the GlobalBites Kitchen!
                </button>

                <div className="login-social">
                  <p>Login with</p>
                  <a href="/" className="login-social_google">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="28"
                      height="28"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#FFC107"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                      <path
                        fill="#FF3D00"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                      ></path>
                      <path
                        fill="#4CAF50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                      ></path>
                      <path
                        fill="#1976D2"
                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
