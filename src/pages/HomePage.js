import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GNB from "../components/GNB";
import "./HomePage.css";
import noGroupsImage from "../assets/icon=empty.svg";
import searchIcon from "../assets/icon=search.svg"; // 검색 아이콘 이미지 임포트
import flowerIcon from "../assets/size=64_64.png"; // 꽃 아이콘 이미지 임포트
import GroupData from '../data/GroupData.json'; // 더미 데이터 임포트

const HomePage = () => {
  const [isPublic, setIsPublic] = useState(true);
  const [sortOption, setSortOption] = useState("likes"); // 기본값을 '공감순'으로 설정
  const [groups, setGroups] = useState([]); // 그룹 데이터를 위한 상태
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null); // 에러 상태 추가

  useEffect(() => {
    // 더미 데이터를 직접 불러옴
    const loadGroups = async () => {
      setLoading(true); // 데이터 로딩 시작
      try {
        const fetchedGroups = GroupData.data; // 더미 데이터에서 그룹 정보 가져오기
        setGroups(fetchedGroups); // 가져온 그룹 데이터 상태에 저장
      } catch (error) {
        setError('그룹 목록을 불러오는 중 오류가 발생했습니다.');
        console.error('그룹 목록을 가져오는 중 오류 발생', error);
      } finally {
        setLoading(false); // 데이터 로딩 완료
      }
    };
    loadGroups();
  }, []);

  const getDaysSinceCreation = (createdAt) => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - createdDate.getTime();
    return Math.floor(differenceInTime / (1000 * 3600 * 24)); // 일수 계산
  };

  const formatLikeCount = (likeCount) => {
    if (likeCount >= 1000000) {
      return `${Math.floor(likeCount / 1000000)}M`;
    } else if (likeCount >= 1000) {
      return `${Math.floor(likeCount / 1000)}K`;
    }
    return likeCount.toString();
  };

  // 선택된 정렬 옵션에 따라 그룹을 정렬하는 함수
  const sortGroups = (groups) => {
    switch (sortOption) {
      case "recent":
        return [...groups].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "posts":
        return [...groups].sort((a, b) => b.postCount - a.postCount);
      case "likes":
        return [...groups].sort((a, b) => b.likeCount - a.likeCount);
      case "badges":
        return [...groups].sort((a, b) => b.badges.length - a.badges.length);
      default:
        return groups;
    }
  };

  // 선택된 공개/비공개 옵션에 따라 그룹 필터링 및 정렬
  const filteredGroups = sortGroups(
    groups
      .filter((group) => group.isPublic === isPublic)
      .filter((group) =>
        group.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="home-page">
      <GNB />
      <div className="group-section">
        <div className="group-toggle">
          <button
            className={`toggle-button ${isPublic ? "active" : ""}`}
            onClick={() => setIsPublic(true)}
          >
            공개
          </button>
          <button
            className={`toggle-button ${!isPublic ? "active" : ""}`}
            onClick={() => setIsPublic(false)}
          >
            비공개
          </button>
          <div className="group-search-container">
            <img src={searchIcon} alt="검색 아이콘" className="search-icon" />
            <input
              type="text"
              placeholder="그룹명을 검색해 주세요"
              className="group-search"
              value={searchTerm} // 검색어 상태값
              onChange={(e) => setSearchTerm(e.target.value)} // 검색어 변경 핸들러
            />
          </div>
          <select
            className="group-sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="likes">공감순</option>
            <option value="recent">최신순</option>
            <option value="posts">게시글 많은순</option>
            {isPublic && <option value="badges">획득 배지순</option>}
          </select>
        </div>
        <div className="group-content">
          {filteredGroups.length === 0 ? (
            searchTerm ? (
              <div className="no-group">
                <p>'{searchTerm}' 그룹이 조회되지 않습니다.</p>
              </div>
            ) : (
              <div className="no-group">
                <img src={noGroupsImage} alt="No Groups" />
                <p>등록된 공개 그룹이 없습니다.</p>
                <p>가장 먼저 그룹을 만들어보세요!</p>
              </div>
            )
          ) : (
            <div className="group-list">
              {filteredGroups.map((group) => (
                <Link
                  key={group.id}
                  to={group.isPublic ? `/group/${group.id}` : `/privategroup/${group.id}`}
                  className={`group-item ${group.isPublic ? "" : "no-image"}`}
                >
                  {group.isPublic && group.imageUrl && (
                    <img
                      src={group.imageUrl}
                      alt={group.name}
                      className="group-item-image"
                    />
                  )}
                  <div className="group-item-info">
                    <div className="group-item-header">
                      <span className="group-days">
                        D+{getDaysSinceCreation(group.createdAt)}
                      </span>
                      <span className="separator"> | </span>
                      <span className="group-visibility">
                        {group.isPublic ? "공개" : "비공개"}
                      </span>
                    </div>
                    <h3 className="group-item-title">{group.name}</h3>
                    {group.isPublic && (
                      <p className="group-item-description">
                        {group.introduction}
                      </p>
                    )}
                    <div className="group-item-meta">
                      {group.isPublic && (
                        <div className="meta-item">
                          <span className="group-meta-label">획득 배지</span>
                          <span className="group-meta-value">
                            {group.badgeCount}
                          </span>
                        </div>
                      )}
                      <div className="meta-item">
                        <span className="group-meta-label">추억</span>
                        <span className="group-meta-value">
                          {group.postCount}
                        </span>
                      </div>
                      <div className="meta-item">
                        <span className="group-meta-label">그룹 공감</span>
                        <span className="group-meta-value">
                          <img
                            src={flowerIcon}
                            alt="flower icon"
                            className="flower-icon"
                          />{" "}
                          {formatLikeCount(group.likeCount)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        {filteredGroups.length === 0 && (
          <Link to="/GroupForm">
            <button className="create-group-button">그룹 만들기</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomePage;
