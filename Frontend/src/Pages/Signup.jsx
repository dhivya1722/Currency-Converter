import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import '../Styles/Signup.css'

function Signup() {
  const navigate = useNavigate();

  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const handlesignsubmit = () => {
    if (!username || !email || !password) {
      alert("All fields are required");
      return;
    }

    const userdetails = {
      username,
      email,
      password,
    };

    axios.post("http://localhost:8081/signup", userdetails)
      .then((response) => {
        console.log(response.data);
        if (response.status === 201) {
          alert("Registered Successfully");
          navigate("/login");
        } else {
          alert("Please enter valid credentials");
        }
      })
      .catch((error) => {
        alert("Already exists username or password or email");
      });
  }

  return (
    <div className="main">
      <div className="header">
       
      </div>

      <div className="loginform">
        <h2>Registration form</h2>
        <div className="user">
          <label>Username</label>
          <input
            type="username"
            className="u_name"
            name={username}
            onChange={(event) => setusername(event.target.value)}
            required
          />
        </div>

        <div className="email">
          <label>Email</label>
          <input
            type="email"
            className="email"
            name={email}
            onChange={(event) => setemail(event.target.value)}
            required
          />
        </div>

        <div className="pass">
          <label>Password</label>
          <input
            type="password"
            className="pass"
            name={password}
            onChange={(event) => setpassword(event.target.value)}
            required
          />
        </div>

        <div className="signbutton">
          <button className="button" onClick={handlesignsubmit}>Signup</button>
        </div>

        <p>Already have an account? <Link to="/signin">Signin</Link></p>
      </div>

  
    </div>
  )
}

export default Signup;
