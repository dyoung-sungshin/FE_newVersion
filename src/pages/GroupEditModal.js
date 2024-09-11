import React, { useState, useEffect } from "react";
import closeIcon from "../assets/icon=x.png";
import "./GroupEditModal.css";

const GroupEditModal = ({ isOpen, onClose, group, onGroupUpdated }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); // 실제 파일을 상태로 저장
  const [groupDescription, setGroupDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState(""); // 비밀번호 상태 추가

  useEffect(() => {
    if (group) {
      setGroupName(group.name);
      setSelectedFileName(group.imageUrl ? group.imageUrl.split("/").pop() : "");
      setGroupDescription(group.introduction);
      setIsPublic(group.isPublic);
    }
  }, [group]);

  if (!isOpen) return null;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFileName(file.name); // 선택한 파일의 이름을 상태로 설정
      setSelectedFile(file); // 실제 파일도 저장
    } else {
      setSelectedFileName(""); // 파일이 선택되지 않았을 경우
      setSelectedFile(null); // 파일을 null로 설정
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = group.imageUrl; // 기본 이미지 URL 설정
    if (selectedFile) {
      // 이미지 업로드 처리
      const formData = new FormData();
      formData.append("image", selectedFile);

      try {
        const imageUploadResponse = await fetch("https://jogakjip-dymj.onrender.com/api/image", {
          method: "POST",
          body: formData,
        });

        if (imageUploadResponse.ok) {
          const imageData = await imageUploadResponse.json();
          imageUrl = imageData.imageUrl; // 업로드된 이미지 URL 사용
        } else {
          alert("이미지 업로드에 실패했습니다.");
          return;
        }
      } catch (error) {
        alert("이미지 업로드 중 오류가 발생했습니다.");
        return;
      }
    }

    // 그룹 수정 요청
    const requestBody = {
      name: groupName,
      password: password, // 비밀번호 추가
      imageUrl: imageUrl,
      isPublic: isPublic,
      introduction: groupDescription,
    };

    try {
      const response = await fetch(`https://jogakjip-dymj.onrender.com/api/groups/${group.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const updatedGroup = await response.json();
        alert("그룹 정보가 성공적으로 수정되었습니다.");
        onGroupUpdated(updatedGroup); // 수정된 그룹을 부모로 전달하여 상태 업데이트
        onClose(); // 수정 후 모달 닫기
      } else if (response.status === 403) {
        alert("비밀번호가 틀렸습니다.");
      } else if (response.status === 404) {
        alert("그룹을 찾을 수 없습니다.");
      } else {
        alert("그룹 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("그룹 수정 중 오류 발생:", error);
      alert("서버와의 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="groupeditmodal-modal-overlay">
      <div className="groupeditmodal-modal-content">
        <button className="groupeditmodal-modal-close-button" onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>
        <h2 className="groupeditmodal-modal-title">그룹 정보 수정</h2>
        <form className="groupeditmodal-modal-form" onSubmit={handleSubmit}>
          <label className="groupeditmodal-modal-label">그룹명</label>
          <input
            type="text"
            className="groupeditmodal-modal-input"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />

          <label className="groupeditmodal-modal-label">대표 이미지</label>
          <div className="groupeditmodal-modal-input-file">
            <input
              type="text"
              className="groupeditmodal-file-input-text"
              readOnly
              value={selectedFileName} // 파일명을 텍스트 필드에 표시
            />
            <label className="groupeditmodal-file-button">
              파일 선택
              <input
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange} // 파일 선택 이벤트 핸들러 연결
              />
            </label>
          </div>

          <label className="groupeditmodal-modal-label">그룹 소개</label>
          <textarea
            className="groupeditmodal-modal-textarea"
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
          />

          <label className="groupeditmodal-modal-label">그룹 공개 선택</label>
          <div className="groupeditmodal-modal-public-toggle">
            <label className="groupeditmodal-toggle-label">공개</label>
            <label className="groupeditmodal-switch">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
              <span className="groupeditmodal-slider round"></span>
            </label>
          </div>

          <label className="groupeditmodal-modal-label">수정 권한 인증</label>
          <input
            type="password"
            className="groupeditmodal-modal-input"
            placeholder="비밀번호를 입력해 주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="groupeditmodal-modal-submit-button">
            수정하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default GroupEditModal;
