import React, { useState } from "react";
import "./MemoryEditModal.css";
import closeIcon from "../assets/icon=x.png"; 

const MemoryEditModal = ({ onClose }) => {
  const [isPublic, setIsPublic] = useState(true);
  const [selectedFile, setSelectedFile] = useState("");

  const handleToggle = () => {
    setIsPublic(!isPublic);
  };

  const handleFileSelect = (event) => {
    const fileInput = event.target;
    const fileName = fileInput.files[0] ? fileInput.files[0].name : '';
    setSelectedFile(fileName);
  };

  return (
    <div className="memory-edit-modal-overlay">
      <div className="memory-edit-modal-container">
        <div className="memory-edit-modal-header">
          <h1>추억 수정</h1>
          <img
            src={closeIcon}
            alt="Close"
            className="close-icon"
            onClick={onClose}
          />
        </div>
        <div className="memory-form">
          <div className="form-left">
            <label>닉네임</label>
            <input type="text" placeholder="닉네임을 입력해 주세요" />

            <label>제목</label>
            <input type="text" placeholder="제목을 입력해 주세요" />

            <div className="image-upload">
              <label className="image-upload-label">이미지</label>
              <div className="image-upload-wrapper">
                <input
                  type="text"
                  placeholder="파일을 선택해 주세요"
                  className="image-upload-input"
                  value={selectedFile}
                  readOnly
                />
                <label htmlFor="file-upload" className="file-select-button">
                  파일 선택
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="file-upload-input"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }} // 파일 입력 필드를 숨김
                />
              </div>
            </div>

            <label>본문</label>
            <textarea placeholder="본문 내용을 입력해 주세요" />
          </div>

          <div className="vertical-line"></div>

          <div className="form-right">
            <label>태그</label>
            <input type="text" placeholder="태그 입력 후 Enter" />

            <label>장소</label>
            <input type="text" placeholder="장소를 입력해 주세요" />

            <label>추억의 순간</label>
            <input type="date" />

            <label>추억 공개 선택</label>
            <div className="toggle-container" onClick={handleToggle}>
              <span className="toggle-label">공개</span>
              <div
                className={`toggle ${isPublic ? "public" : "private"}`}
              ></div>
            </div>

            <label>수정 권한 인증</label>
            <input type="password" placeholder="비밀번호를 입력해 주세요" />
          </div>
        </div>
        <button className="submit-button">수정하기</button>
      </div>
    </div>
  );
};

export default MemoryEditModal;
