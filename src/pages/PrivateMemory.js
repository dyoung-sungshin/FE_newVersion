import React, { useState } from "react";
import "./PrivateGroup.css";

const PrivateGroup = () => {
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // 비밀번호 제출 처리 로직 추가 (예: 서버에 전송)
    console.log("Submitted password:", password);
  };

  return (
    <div className="private-group-access">
      <h1 className="title">비공개 추억</h1>
      <p className="description">
        비공개 추억에 접근하기 위해 권한 확인이 필요합니다.
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="password" className="password-label">
          비밀번호를 입력해 주세요
        </label>
        <input
          type="password"
          id="password"
          placeholder="비밀번호를 입력해 주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="password-input"
        />
        <button type="submit" className="submit-button">
          제출하기
        </button>
      </form>
    </div>
  );
};

export default PrivateGroup;
