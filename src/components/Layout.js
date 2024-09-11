import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅을 import
import "./Layout.css";
import logo from "../assets/logo.svg";

function Layout({ children }) {
  const navigate = useNavigate(); // navigate 훅을 사용

  const handleLogoClick = () => {
    navigate("/"); // 로고 클릭 시 homepage로 이동
  };

  return (
    <div className="layout">
      <header className="header">
        <img
          src={logo}
          alt="조각집 로고"
          className="logo"
          onClick={handleLogoClick} // 클릭 이벤트 추가
          style={{ cursor: "pointer" }} // 클릭 가능하도록 커서 스타일 추가
        />
      </header>
      <main className="content">{children}</main>
    </div>
  );
}

export default Layout;
