import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import   '../Styles/Signin.css'


function Signin() {
  const navigate = useNavigate();

  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  function handlesubmit() {
    navigate("/converter");
    if (!username || !password) {
      alert("All fields are required");
      return;
    }

    const userdetails = {
      username,
      password,
    };

    // axios.post("http://localhost:8081/login", userdetails)
    //   .then((response) => {
    //     console.log(response.data); 
    //     if(response.status===200){
    //       const user = response.data;
    //       localStorage.setItem("Username",userdetails.username);
    //       alert("Login successfully ");
    //       navigate("/converter");
    //     } else {
    //       alert("error");
    //     }
    //   })
    //   .catch((error) => {
    //     alert("Invalid credentials");
    //   });
  }

  return (
    
    <div className="main">
      <div className="header"></div>

      <div className="loginform">
        <h2>Login form</h2>
        <div className="user">
          <label>Username</label>
          <input
            type="username"
            className="u_name"
            value={username}
            onChange={(event) => setusername(event.target.value)}
            required
          />
        </div>

        <div className="pass">
          <label>Password</label>
          <input
            type="password"
            className="pass"
            value={password}
            onChange={(event) => setpassword(event.target.value)}
            required
          />
        </div>

        <div className="loginbutton">
          <button className="button" onClick={handlesubmit}>Login</button>
        </div>

        <p>Don't have an account? <Link to="/signup">Signup</Link></p>
      </div>
    </div>
  );
}

export default Signin;
