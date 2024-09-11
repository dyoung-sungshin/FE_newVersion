import React, { useState } from "react";
import "./GroupDeleteModal.css";
import closeIcon from "../assets/icon=x.png";  // X 아이콘 이미지 경로

function GroupDeleteModal({ isOpen, onClose, groupId, onDeleteSuccess }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // 오류 메시지 상태 추가

  if (!isOpen) return null;

  // 그룹 삭제 요청 함수
  const handleDelete = async () => {
    try {
      const response = await fetch(`https://jogakjip-dymj.onrender.com/api/groups/${groupId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }), // 비밀번호를 요청 본문에 포함
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message || "그룹이 성공적으로 삭제되었습니다.");
        onDeleteSuccess(); // 삭제 후 부모 컴포넌트에서 필요한 후속 작업 수행
        onClose(); // 모달 닫기
      } else if (response.status === 403) {
        setError("비밀번호가 틀렸습니다.");
      } else if (response.status === 404) {
        setError("그룹을 찾을 수 없습니다.");
      } else if (response.status === 400) {
        setError("잘못된 요청입니다.");
      } else {
        setError("그룹 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("그룹 삭제 중 오류 발생:", error);
      setError("서버와의 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>
        <h2 className="modal-title">그룹 삭제</h2>

        <label className="form-label">삭제 권한 인증</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해 주세요"
          className="form-input"
        />

        {error && <p className="error-message">{error}</p>} {/* 오류 메시지 표시 */}

        <button className="modal-submit-button" onClick={handleDelete}>
          삭제하기
        </button>
      </div>
    </div>
  );
}

export default GroupDeleteModal;
