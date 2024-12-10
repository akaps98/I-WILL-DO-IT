import React from "react";
import "./LogIn.css";

const LogIn = () => {
    return (
        <div className="login-container">
        <div className="login-box">
          <h1>Log In</h1>
          <form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter your password" />
            </div>
            <button type="submit" className="login-button">Log In</button>
          </form>
        </div>
      </div>
    );
}

export default LogIn;