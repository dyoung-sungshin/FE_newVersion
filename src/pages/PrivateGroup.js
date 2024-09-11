import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // useNavigate, useParams 추가
import "./PrivateGroup.css";

const PrivateGroup = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // 에러 메시지 상태 추가
  const navigate = useNavigate();
  const { groupId } = useParams(); // URL에서 groupId 가져옴

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch(`/api/groups/${groupId}/verify-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        // 비밀번호 확인 성공
        const data = await response.json();
        console.log(data.message);
        navigate(`/group/${groupId}`); // 인증 성공 후 그룹 상세 페이지로 이동
      } else if (response.status === 401) {
        setError("비밀번호가 틀렸습니다.");
      } else {
        setError("비공개 그룹에 접근할 수 없습니다.");
      }
    } catch (error) {
      console.error("비공개 그룹 접근 중 오류 발생:", error);
      setError("서버와의 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="private-group-access">
      <h1 className="title">비공개 그룹</h1>
      <p className="description">
        비공개 그룹에 접근하기 위해 권한 확인이 필요합니다.
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
        {error && <p className="error-message">{error}</p>} {/* 에러 메시지 표시 */}
        <button type="submit" className="submit-button">
          제출하기
        </button>
      </form>
    </div>
  );
};

export default PrivateGroup;
