import React, { useState } from "react";
import "./CommentDeleteModal.css";
import closeIcon from "../assets/icon=x.png"; 

function CommentDeleteModal({ isOpen, onClose }) {
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>
        <h2 className="modal-title">댓글 삭제</h2>

        <label className="form-label">삭제 권한 인증</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해 주세요"
          className="form-input"
        />

        <button className="modal-submit-button">
          삭제하기
        </button>
      </div>
    </div>
  );
}

export default CommentDeleteModal;