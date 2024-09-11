import React, { useState } from "react";
import "./CommentModal.css";
import closeIcon from "../assets/icon=x.png"; // X 아이콘 이미지 경로

function CommentModal({ isOpen, onClose }) {
  const [nickname, setNickname] = useState("");
  const [comment, setComment] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>
        <h2 className="modal-title">댓글 등록</h2>

        <label className="form-label">닉네임</label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임을 입력해 주세요"
          className="form-input"
        />

        <label className="form-label">댓글</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 입력해 주세요"
          className="form-input comment-textarea" // comment-textarea 클래스를 추가
        />

        <label className="form-label">비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해 주세요"
          className="form-input"
        />

        <button className="modal-submit-button">등록하기</button>
      </div>
    </div>
  );
}

export default CommentModal;
