import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import groupDataList from "../data/groupDetailDataList.json"; // 그룹 데이터
import memoryDataList from "../data/memoryDataList.json"; // 추억 데이터
import flowerIcon from "../assets/size=32_32.png"; // 꽃 아이콘
import bubbleIcon from "../assets/icon=bubble.png"; // 말풍선 아이콘
import noMemoriesImage from "../assets/icon=empty.svg"; // 추억 없음 이미지
import flowerEffectIcon from "../assets/size=64_64.png"; // 꽃 효과 아이콘
import searchIcon from "../assets/icon=search.svg"; // 검색 아이콘
import GroupEditModal from "./GroupEditModal"; // 그룹 수정 모달
import GroupDeleteModal from "./GroupDeleteModal"; // 그룹 삭제 모달
import "./GroupDetail.css"; // 스타일 파일 임포트

const GroupDetail = () => {
  const { id } = useParams(); // URL 파라미터에서 그룹 ID 가져옴
  const [group, setGroup] = useState(null);
  const [isPublic, setIsPublic] = useState(true); // 공개/비공개 상태 추가
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [sortOption, setSortOption] = useState("최신순"); // 정렬 옵션 상태
  const [memories, setMemories] = useState([]); // 추억 리스트 상태
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 그룹 수정 모달 상태
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 그룹 삭제 모달 상태

  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate hook

  // 배지 정보 정의
  const badges = {
    badge1: "🌸 7일 연속 게시글 등록",
    badge2: "👾 게시글 수 20개 이상 등록",
    badge3: "🥳 그룹 생성 후 1년 달성",
    badge4: "🌟 그룹 공감 1만 개 이상 받기",
    badge5: "❤️ 추억 공감 1만 개 이상 받기",
  };

  useEffect(() => {
    // 그룹 데이터를 ID로 필터링하여 해당 그룹을 가져옴
    if (groupDataList && groupDataList.data) {
      const groupDetails = groupDataList.data.find(
        (group) => group.id === parseInt(id) // id를 정수로 변환 후 비교
      );
      if (groupDetails) {
        setGroup(groupDetails); // 그룹 데이터가 있으면 상태에 저장
      } else {
        console.error("해당 그룹을 찾을 수 없습니다.");
      }
    } else {
      console.error("그룹 데이터가 없습니다.");
    }

    // 추억 데이터를 설정
    setMemories(memoryDataList.data);
  }, [id]);

  // 숫자를 K나 M으로 변환하는 함수
  const formatLikeCount = (likeCount) => {
    if (likeCount >= 1000000) {
      return Math.floor(likeCount / 1000000) + "M"; // 백만 단위로 변환
    } else if (likeCount >= 1000) {
      return Math.floor(likeCount / 1000) + "K"; // 천 단위로 변환
    }
    return likeCount.toString(); // 천 단위 이하의 숫자는 그대로 반환
  };

  // 꽃 애니메이션을 트리거하는 함수
  const handleSendLike = () => {
    const container = document.querySelector(".memory-flower-animation-container");

    for (let i = 0; i < 5; i++) {
      const flower = document.createElement("img");
      flower.src = flowerEffectIcon; // 꽃 아이콘 이미지 사용
      flower.className = "memory-flower-animation"; // CSS 애니메이션 클래스 적용
      flower.style.left = `${Math.random() * 50 - 25}px`; // 퍼지는 방향 무작위 설정
      flower.style.animationDelay = `${i * 0.1}s`; // 시간 차이를 주어 애니메이션이 순차적으로 발생
      container.appendChild(flower);

      // 애니메이션이 끝나면 꽃 이미지를 제거
      flower.addEventListener("animationend", () => {
        flower.remove();
      });
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // 검색어로 추억 필터링
  const filteredMemories = memories.filter(
    (memory) =>
      memory.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      memory.nickname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 정렬 옵션에 따른 추억 정렬
  const sortedMemories = filteredMemories.sort((a, b) => {
    if (sortOption === "최신순") {
      return new Date(b.moment) - new Date(a.moment);
    } else if (sortOption === "인기순") {
      return b.likeCount - a.likeCount;
    } else if (sortOption === "댓글순") {
      return b.commentCount - a.commentCount;
    }
    return 0;
  });

  if (!group) {
    return <div>그룹 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="memory-group-detail">
      <div className="memory-group-header">
        <img src={group.imageUrl} alt="그룹 이미지" className="memory-group-image" />
        <div className="memory-group-info">
          <div className="memory-group-meta">
            <span className="memory-group-id">
              D+
              {Math.floor(
                (new Date() - new Date(group.createdAt)) / (1000 * 60 * 60 * 24)
              )}
            </span>
            <span className="memory-group-visibility">
              {" "}
              | {group.isPublic ? "공개" : "비공개"}
            </span>
          </div>
          <div className="memory-group-title-container">
            <h1 className="memory-group-title">{group.name}</h1>
            <div className="memory-group-submeta">
              <span className="memory-group-memories">추억 {group.postCount}</span>
              <span className="memory-group-likes">
                {" "}
                | 그룹 공감 {formatLikeCount(group.likeCount)}
              </span>
            </div>
          </div>
          <p className="memory-group-description">{group.introduction}</p>

          <div className="memory-group-badges-and-like">
            <div className="memory-group-badges-section">
              <span className="memory-badges-title">획득 배지</span>
              <div className="memory-group-badges">
                {group.badges.length > 0 ? (
                  group.badges.map((badge, index) => (
                    <span className="memory-badge" key={index}>
                      {badges[badge]} {/* 배지 정보를 badges 객체에서 가져옴 */}
                    </span>
                  ))
                ) : (
                  <span className="no-badge-message">
                    획득한 배지가 없습니다. 배지를 획득해 보세요!
                  </span>
                )}
              </div>
            </div>

            <div className="memory-like-container">
              <button
                className="memory-group-send-like"
                onClick={handleSendLike}
              >
                <img
                  src={flowerIcon}
                  alt="공감 아이콘"
                  className="memory-flower-icon"
                />
                공감 보내기
              </button>
              <div className="memory-flower-animation-container"></div>
            </div>
          </div>

          <hr className="memory-image-divider" />
        </div>

        <div className="memory-group-actions">
          <button
            className="memory-group-edit-button"
            onClick={() => setIsEditModalOpen(true)}
          >
            그룹 정보 수정하기
          </button>
          <button
            className="memory-group-delete-button"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            그룹 삭제하기
          </button>
        </div>
      </div>

      {/* 추억 목록 섹션 */}
      <div className="memory-section">
        <div className="memory-header">
          <h2 className="memorysection-title">추억 목록</h2>
          <button
            className="memory-upload-button"
            // navigate에서 groupId를 포함한 경로로 이동
            onClick={() => navigate(`/group/${group.id}/memoryForm`)}
          >
            추억 올리기
          </button>
        </div>

        {/* 공개/비공개 토글 버튼 및 검색창, 정렬 드롭다운 */}
        <div className="memory-controls">
          <div className="memory-group-toggle">
            <button
              className={`memory-toggle-button ${isPublic ? "active" : ""}`}
              onClick={() => setIsPublic(true)}
            >
              공개
            </button>
            <button
              className={`memory-toggle-button ${!isPublic ? "active" : ""}`}
              onClick={() => setIsPublic(false)}
            >
              비공개
            </button>
          </div>

          {/* 검색창 */}
          <div className="memory-search-container">
            <img src={searchIcon} alt="search icon" className="memory-search-icon" />
            <input
              type="text"
              className="memory-search-field"
              placeholder="태그 혹은 제목을 입력해 주세요"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <select
            value={sortOption}
            onChange={handleSortChange}
            className="memory-sort-dropdown"
          >
            <option value="최신순">최신순</option>
            <option value="오래된순">오래된순</option>
            <option value="인기순">인기순</option>
          </select>
        </div>

        {/* 추억 목록 내용 */}
        {sortedMemories.length > 0 ? (
          <div className="memory-memories-list">
            {sortedMemories
              .filter((memory) => memory.isPublic === isPublic) // 공개/비공개에 따라 필터링
              .map((memory) => (
                <div key={memory.id} className="memory-item">
                  <img
                    src={memory.imageUrl}
                    alt={memory.title}
                    className="memory-image"
                  />
                  <div className="memory-nickname-visibility">
                    <span className="memory-nickname">{memory.nickname}</span>
                    <span className="nickname-separator"> | </span>
                    <span className="memory-ispublic-toggle">
                      {memory.isPublic ? "공개" : "비공개"}
                    </span>
                  </div>
                  <h3 className="memory-title">{memory.title}</h3>
                  <div className="memory-tags">
                    {memory.tags.map((tag, index) => (
                      <span key={index}>#{tag} </span>
                    ))}
                  </div>
                  <div className="memory-date-meta">
                    <span>
                      {memory.location} ·{" "}
                      {new Date(memory.moment).toLocaleDateString()}
                    </span>
                    <div className="memory-meta">
                      <div className="memory-like-count">
                        <img src={flowerIcon} alt="like" />
                        <span>{memory.likeCount}</span>
                      </div>
                      <div className="memory-comment-count">
                        <img src={bubbleIcon} alt="comment" />
                        <span>{memory.commentCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="memory-no-memories">
            <img
              src={noMemoriesImage}
              alt="추억 없음"
              className="memory-no-memories-image"
            />
            <p>게시된 추억이 없습니다.</p>
          </div>
        )}
      </div>

      {/* 그룹 정보 수정 모달 */}
      <GroupEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        group={group} // 그룹 데이터 전달
      />

      {/* 그룹 삭제 모달 */}
      <GroupDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default GroupDetail;
