import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 임포트
import "./GroupForm.css";
import GroupModal from "./GroupModal"; // GroupModal 컴포넌트 임포트

function GroupForm() {
  const [groupName, setGroupName] = useState("");
  const [groupImage, setGroupImage] = useState(null);
  const [groupDescription, setGroupDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });
  const [fileName, setFileName] = useState(""); // 파일 이름을 저장할 상태

  const navigate = useNavigate(); // useNavigate 훅 사용

  // 그룹명 변경 핸들러
  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  // 파일 변경 핸들러
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGroupImage(file);
      setFileName(file.name); // 파일 이름 상태 업데이트
    }
  };

  // 클라이언트 측 입력값 검증 함수
  const validateForm = () => {
    // 그룹명 검증
    if (!groupName) {
      setModalContent({
        title: "그룹 만들기 실패",
        message: "그룹명을 입력해 주세요.",
      });
      setModalVisible(true);
      return false;
    }

    // 이미지 검증
    if (!groupImage) {
      setModalContent({
        title: "그룹 만들기 실패",
        message: "대표 이미지를 선택해 주세요.",
      });
      setModalVisible(true);
      return false;
    }

    // 그룹 소개 검증
    if (!groupDescription) {
      setModalContent({
        title: "그룹 만들기 실패",
        message: "그룹 소개를 입력해 주세요.",
      });
      setModalVisible(true);
      return false;
    }

    // 비밀번호 검증
    if (!password) {
      setModalContent({
        title: "그룹 만들기 실패",
        message: "비밀번호를 입력해 주세요.",
      });
      setModalVisible(true);
      return false;
    }

    return true;
  };

  // 이미지 업로드 함수
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("https://jogakjip-dymj.onrender.com/api/image", {
        method: "POST",
        body: formData, // FormData로 이미지 파일 전송
      });

      if (response.ok) {
        const data = await response.json();
        return data.imageUrl; // 서버에서 반환한 imageUrl을 리턴
      } else {
        throw new Error("이미지 업로드 실패");
      }
    } catch (error) {
      setModalContent({
        title: "이미지 업로드 실패",
        message: "이미지 업로드 중 오류가 발생했습니다.",
      });
      setModalVisible(true);
      return null;
    }
  };

  // 그룹 생성 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 클라이언트 측 검증 실패 시 그룹 만들기 실패 모달 띄우기
    if (!validateForm()) {
      return;
    }

    // 이미지를 업로드하고 imageUrl을 받아옴
    const imageUrl = groupImage ? await uploadImage(groupImage) : "";

    if (!imageUrl && groupImage) {
      // 이미지가 있으나 업로드에 실패한 경우
      return;
    }

    const requestBody = {
      name: groupName,
      password: password,
      imageUrl: imageUrl, // 업로드된 imageUrl을 사용
      isPublic: isPublic,
      introduction: groupDescription,
    };

    try {
      const response = await fetch("https://jogakjip-dymj.onrender.com/api/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.status === 201) {
        setModalContent({
          title: "그룹 만들기 성공",
          message: "그룹이 성공적으로 등록되었습니다.",
        });
        setModalVisible(true);
        setGroupName(""); // 폼 초기화
        setGroupImage(null);
        setGroupDescription("");
        setPassword("");
        setFileName("");
      } else if (response.status >= 400 && response.status < 500) {
        // 400번대 에러: 잘못된 요청 (모달로 처리)
        setModalContent({
          title: "그룹 만들기 실패",
          message: "그룹 등록에 실패했습니다.",
        });
        setModalVisible(true);
      } else if (response.status >= 500) {
        // 500번대 에러: 서버 오류 (에러 페이지로 리다이렉트)
        navigate("/ErrorPage");
      }
    } catch (error) {
      // 서버와의 통신 중 오류 발생 시 에러 페이지로 리다이렉트
      navigate("/ErrorPage");
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="group-form">
        <h2 className="form-title">그룹 만들기</h2>

        <label className="form-label">그룹명</label>
        <input
          type="text"
          value={groupName}
          onChange={handleGroupNameChange}
          placeholder="그룹명을 입력하세요"
          className="form-input"
        />

        <label className="form-label">대표 이미지</label>
        <div className="form-input-file">
          <input
            type="text"
            placeholder="파일을 선택해 주세요"
            className="file-input-text"
            value={fileName} // 파일 이름을 표시
            readOnly
          />
          <label className="file-button">
            파일 선택
            <input
              type="file"
              onChange={handleFileChange} // 파일 변경 핸들러 연결
              style={{ display: "none" }}
            />
          </label>
        </div>

        <label className="form-label">그룹 소개</label>
        <textarea
          value={groupDescription}
          onChange={(e) => setGroupDescription(e.target.value)}
          placeholder="그룹을 소개해 주세요"
          className="form-textarea"
        />

        <label className="form-label">그룹 공개 선택</label>
        <div className="form-public-toggle">
          <label className="toggle-label">공개</label>
          <label className="switch">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
            <span className="slider round"></span>
          </label>
        </div>

        <label className="form-label">비밀번호 생성</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="그룹 비밀번호를 생성해 주세요"
          className="form-input"
        />

        <button type="submit" className="form-button">
          만들기
        </button>
      </form>

      {modalVisible && (
        <GroupModal
          title={modalContent.title}
          message={modalContent.message}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default GroupForm;
