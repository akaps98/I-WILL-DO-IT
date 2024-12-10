import React, { useState } from "react";
import axios from "axios";
import "./LogIn.css";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 이메일 입력값 업데이트
  const handleEmailChange = (e) => setEmail(e.target.value);

  // 패스워드 입력값 업데이트
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // 폼 제출 시 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 로그인 요청 시 headers와 함께 JSON 형태로 요청
      const response = await axios.post(
        "http://localhost:5001/api/auth/login",
        { email, password }, // 이메일과 비밀번호를 JSON 형태로 보냄
        {
          headers: {
            "Content-Type": "application/json", // JSON 형식으로 보내도록 설정
          },
        }
      );

      // 로그인 성공 시 JWT 토큰을 로컬 스토리지에 저장
      localStorage.setItem("token", response.data.token);

      // 로그인 성공 시 홈 페이지로 리다이렉트
      window.location.href = "/home";
    } catch (err) {
      // 에러 발생 시 메시지 설정
      setError("Invalid email or password");
      console.error("Login error:", err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Log In</h1>
        {/* 로그인 에러 메시지 표시 */}
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
              required
            />
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
          <button type="submit" className="login-button">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
