import React, { useState } from "react";
import "./MemoryDetail.css";
import fishingImage from "../assets/image=img4.png"; // 낚시 이미지 경로
import flowerIcon from "../assets/size=16.png";
import editIcon from "../assets/icon=edit.png";
import deleteIcon from "../assets/icon=delete.png";
import MemoryEditModal from "./MemoryEditModal"; // 추억 수정 모달 컴포넌트 가져오기
import MemoryDeleteModal from "./MemoryDeleteModal"; // 추억 삭제 모달 컴포넌트 가져오기
import CommentModal from "./CommentModal"; // 댓글 등록 모달 컴포넌트 가져오기
import CommentEditModal from "./CommentEditModal"; // 댓글 수정 모달 컴포넌트 가져오기
import CommentDeleteModal from "./CommentDeleteModal"; // 댓글 삭제 모달 컴포넌트 가져오기

const MemoryDetail = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isCommentEditModalOpen, setIsCommentEditModalOpen] = useState(false);
  const [isCommentDeleteModalOpen, setIsCommentDeleteModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleCommentClick = () => {
    setIsCommentModalOpen(true);
  };

  const handleCloseCommentModal = () => {
    setIsCommentModalOpen(false);
  };

  const handleCommentEditClick = (comment) => {
    setSelectedComment(comment);
    setIsCommentEditModalOpen(true);
  };

  const handleCloseCommentEditModal = () => {
    setIsCommentEditModalOpen(false);
  };

  const handleCommentDeleteClick = (comment) => {
    setSelectedComment(comment);
    setIsCommentDeleteModalOpen(true);
  };

  const handleCloseCommentDeleteModal = () => {
    setIsCommentDeleteModalOpen(false);
  };

  const handleCommentSave = (commentId, newText) => {
    console.log(`Comment ${commentId} saved with new text: ${newText}`);
    // 여기에 댓글 수정 로직을 추가하세요.
  };

  const handleCommentDelete = (commentId) => {
    console.log(`Comment ${commentId} deleted`);
    // 여기에 댓글 삭제 로직을 추가하세요.
  };

  return (
    <div className="memory-detail-page">
      <MemoryHeader 
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
      <MemoryContent onCommentClick={handleCommentClick} />
      <CommentSection 
        onCommentEditClick={handleCommentEditClick}
        onCommentDeleteClick={handleCommentDeleteClick}
      />
      {isEditModalOpen && <MemoryEditModal onClose={handleCloseEditModal} />}
      {isDeleteModalOpen && <MemoryDeleteModal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal} />}
      {isCommentModalOpen && <CommentModal isOpen={isCommentModalOpen} onClose={handleCloseCommentModal} />}
      {isCommentEditModalOpen && (
        <CommentEditModal
          isOpen={isCommentEditModalOpen}
          onClose={handleCloseCommentEditModal}
          commentData={selectedComment}
          onSave={handleCommentSave}
        />
      )}
      {isCommentDeleteModalOpen && (
        <CommentDeleteModal
          isOpen={isCommentDeleteModalOpen}
          onClose={handleCloseCommentDeleteModal}
          commentData={selectedComment}
          onDelete={handleCommentDelete}
        />
      )}
    </div>
  );
};

const MemoryHeader = ({ onEditClick, onDeleteClick }) => {
  return (
    <div className="memory-header-section">
      <div className="memory-meta">
        <div>
          <span className="memory-category">달봉이아들</span>
          <span className="memory-divider"> | </span>
          <span className="memory-visibility">공개</span>
        </div>
        <div className="memory-actions">
          <button className="edit-memory" onClick={onEditClick}>
            추억 수정하기
          </button>
          <button className="delete-memory" onClick={onDeleteClick}>
            추억 삭제하기
          </button>
        </div>
      </div>
      <h1 className="memorypage-title">인천 앞바다에서 무려 60cm 월척을 낚다!</h1>
      <div className="memory-tags">
        <span className="memory-tag">#인천</span>
        <span className="memory-tag">#낚시</span>
      </div>
      <div className="memory-header-bottom">
        <div>
          <span className="memory-date">인천 앞바다 · 24.01.19 18:00</span>
          <span className="memory-likes">
            <img src={flowerIcon} alt="꽃 아이콘" className="flower-icon" /> 120
          </span>
          <span className="memory-comments"> 💬 8</span>
        </div>
        <div className="send-like-container">
          <button className="memory-send-like">
            <img src={flowerIcon} alt="꽃 아이콘" className="flower-icon" />{" "}
            공감 보내기
          </button>
        </div>
      </div>
    </div>
  );
};

const MemoryContent = ({ onCommentClick }) => {
  return (
    <div className="memory-content">
      <img
        src={fishingImage}
        alt="낚시하는 모습"
        className="memory-image"
      />
      <p className="memory-text">
        인천 앞바다에서 월척을 낚았습니다!
        <br />
        가족들과 기억에 오래도록 남을 멋진 하루였어요.
      </p>
      <div className="comment-form">
        <button className="comment-submit-button" onClick={onCommentClick}>
          댓글 등록하기
        </button>
      </div>
    </div>
  );
};

const CommentSection = ({ onCommentEditClick, onCommentDeleteClick }) => {
  const comments = [
    {
      id: 1,
      name: "달봉이아빠",
      date: "24.01.18 21:50",
      text: "우와 60cm 월척! 나도 가보고 싶어요",
    },
    {
      id: 2,
      name: "참가자",
      date: "24.01.18 21:50",
      text: "굉장히 즐거웠겠어요!",
    },
    {
      id: 3,
      name: "참견러",
      date: "24.01.18 21:50",
      text: "다음에는 저도 초대해 주세요!",
    },
  ];

  return (
    <div className="comment-section">
      <h2 className="comment-title">댓글 8</h2>
      <div className="comment-list">
        {comments.map((comment) => (
          <div className="comment-item" key={comment.id}>
            <div>
              <div className="comment-meta">
                <span className="comment-author">{comment.name}</span>
                <span className="comment-date">{comment.date}</span>
              </div>
              <p className="comment-text">{comment.text}</p>
            </div>
            <div className="comment-actions">
              <img
                src={editIcon}
                alt="수정 아이콘"
                className="comment-edit-icon"
                onClick={() => onCommentEditClick(comment)}
              />
              <img
                src={deleteIcon}
                alt="삭제 아이콘"
                className="comment-delete-icon"
                onClick={() => onCommentDeleteClick(comment)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryDetail;
