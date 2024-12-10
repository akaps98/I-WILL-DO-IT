import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LogIn.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  // 이메일 입력값 업데이트
  const handleEmailChange = (e) => {
    const email = e.target.value;
    checkEmail(email);  // 이메일 중복 체크 함수 호출
  };

  // 패스워드 입력값 업데이트
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // 비밀번호 확인 입력값 업데이트
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  // 이메일 중복 확인
  const checkEmail = async (email) => {
    try {
      const response = await fetch('http://localhost:5001/api/auth/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);  // 에러 메시지 전달
      }
  
      const data = await response.json();
      console.log(data.message);  // "Email is available" 또는 "Email is already registered"
    } catch (error) {
      console.error("Error checking email:", error);
    }
  };

  // 폼 제출 시 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호 확인
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    } else {
      setPasswordError("");
    }

    try {
      // 사용자 등록 API 호출
      const response = await axios.post(
        "http://localhost:5001/api/auth/register",
        { email, password }, // 이메일과 비밀번호를 JSON 형태로 보냄
        {
          headers: {
            "Content-Type": "application/json", // JSON 형식으로 보내도록 설정
          },
        }
      );

      // 성공적으로 등록된 경우
      if (response.status === 201) {
        window.location.href = "/login"; // 로그인 페이지로 리다이렉트
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error("Register error:", err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Register</h1>
        {/* 에러 메시지 표시 */}
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              onBlur={checkEmail}  // 이메일 중복 확인
              required
            />
            {emailError && <div className="error-message">{emailError}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            {passwordError && <div className="error-message">{passwordError}</div>}
          </div>
          <button type="submit" className="login-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
