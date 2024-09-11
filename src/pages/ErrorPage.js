import React from "react";
import "./ErrorPage.css";
import ErrorImage from "../assets/404.png";

const ErrorPage = () => {
  return (
    <div className="error-page-container">
      <div className="image-container">
        <img src={ErrorImage} alt="404 이미지" />
      </div>
      <h1>찾을 수 없는 페이지입니다.</h1>
      <p>요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨어요.</p>
    </div>
  );
};

export default ErrorPage;
