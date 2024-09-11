import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import groupDetailData from "../data/groupDetailDataList.json"; // groupDetailDataList.json 파일 임포트
import "./GroupDetailTest.css"; // CSS 파일 임포트

const GroupDetailTest = () => {
  const { id } = useParams(); // URL에서 그룹 ID를 추출
  const [group, setGroup] = useState({}); // 빈 객체로 초기화하여 항상 데이터를 가정

  useEffect(() => {
    // 그룹 ID에 맞는 그룹을 찾아서 상태로 설정
    const selectedGroup = groupDetailData.groups.find(
      (group) => group.id === parseInt(id)
    );
    if (selectedGroup) {
      setGroup(selectedGroup);
    }
  }, [id]);

  return (
    <div className="test-group-detail">
      <div className="test-group-header">
        <img
          src={group.imageUrl}
          alt={group.name}
          className="test-group-image"
        />
        <div className="test-group-info">
          <h1 className="test-group-title">{group.name}</h1>
          <p className="test-group-description">{group.introduction}</p>
          <div className="test-group-meta">
            <span>공개 여부: {group.isPublic ? "공개" : "비공개"}</span>
            <span> | 공감 수: {group.likeCount}</span>
            <span> | 게시글 수: {group.postCount}</span>
          </div>
        </div>
      </div>

      <div className="test-group-badges-section">
        <h3>획득 배지</h3>
        <div className="test-group-badges">
          {group.badges &&
            group.badges.map((badge) => (
              <span key={badge} className="test-badge">
                {groupDetailData.badges[badge]}
              </span>
            ))}
        </div>
      </div>
      {/* 추가적인 그룹 상세 정보 렌더링 */}
    </div>
  );
};

export default GroupDetailTest;
