import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 임포트
import "./GNB.css";
import logo from "../assets/logo.svg"; // 로고 경로를 맞게 설정하세요

const GNB = () => {
  const navigate = useNavigate(); // navigate 함수 생성

  const handleCreateGroupClick = () => {
    navigate("/GroupForm"); // "/GroupForm" 경로로 이동
  };

  return (
    <header className="gnb">
      <div className="gnb-logo">
        <img src={logo} alt="조각집 로고" className="gnb-logo-img" />
      </div>
      <button
        className="gnb-create-group-button"
        onClick={handleCreateGroupClick} // 버튼 클릭 시 페이지 이동
      >
        그룹 만들기
      </button>
    </header>
  );
};

export default GNB;
