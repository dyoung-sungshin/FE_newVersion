import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // groupId를 동적으로 받기 위한 useParams 사용
import './MemoryForm.css';

const MemoryForm = () => {
    const { groupId } = useParams(); // groupId를 URL에서 가져옴

    const [formData, setFormData] = useState({
        nickname: '',
        title: '',
        tags: '',
        location: '',
        moment: '',
        imageUrl: '',
        content: '',
        postPassword: '',
        isPublic: true
    });

    const [generatedImageUrl, setGeneratedImageUrl] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            imageUrl: file,
        });

        const imageData = new FormData();
        imageData.append('image', file);

        fetch(`https://jogakjip-dymj.onrender.com/api/image`, {
            method: 'POST',
            body: imageData
        })
        .then(response => response.json())
        .then(data => {
            if (data.imageUrl) {
                setGeneratedImageUrl(data.imageUrl);
            }
        })
        .catch(error => {
            console.error('Error uploading image:', error);
        });
    };

    const handleToggle = () => {
        setFormData({
            ...formData,
            isPublic: !formData.isPublic,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const postData = new FormData();
        postData.append('nickname', formData.nickname);
        postData.append('title', formData.title);
        postData.append('tags', formData.tags.split(','));
        postData.append('location', formData.location);
        postData.append('moment', formData.moment);
        postData.append('content', formData.content);
        postData.append('postPassword', formData.postPassword);
        postData.append('isPublic', formData.isPublic);
        if (generatedImageUrl) {
            postData.append('imageUrl', generatedImageUrl);
        }

        fetch(`https://jogakjip-dymj.onrender.com/api/groups/${groupId}/posts`, {
            method: 'POST',
            body: postData,
        })
        
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <form className="memoryCreate-form" onSubmit={handleSubmit}>
            <h2 className="memoryCreate-title">추억 올리기</h2>
            <div className="memoryCreate-container">
                <div className="memoryCreate-left">
                    {/* 폼 입력 필드들 */}
                    <div className="memoryCreate-form-group">
                        <label>닉네임</label>
                        <input
                            type="text"
                            name="nickname"
                            value={formData.nickname}
                            onChange={handleChange}
                            placeholder="닉네임을 입력해 주세요"
                        />
                    </div>
                    <div className="memoryCreate-form-group">
                        <label>제목</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="제목을 입력해 주세요"
                        />
                    </div>
                    <div className="memoryCreate-form-group">
                        <label>이미지</label>
                        <div className="memoryCreate-form-group-file">
                            <input
                                type="text"
                                className="memoryCreate-file-input"
                                placeholder="파일을 선택해 주세요"
                                readOnly
                                value={formData.imageUrl ? formData.imageUrl.name : ''}
                            />
                            <label className="memoryCreate-file-button">
                                파일 선택
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                />
                            </label>
                        </div>
                    </div>
                    {generatedImageUrl && (
                        <div className="memoryCreate-form-group">
                            <label>생성된 이미지</label>
                            <img src={generatedImageUrl} alt="Generated" style={{ maxWidth: '100%' }} />
                        </div>
                    )}
                    <div className="memoryCreate-form-group">
                        <label>본문</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            placeholder="본문 내용을 입력해 주세요"
                        />
                    </div>
                </div>
                <div className="memoryCreate-right">
                    {/* 기타 폼 입력 필드들 */}
                    <div className="memoryCreate-form-group">
                        <label>태그</label>
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            placeholder="태그 입력 후 Enter"
                        />
                    </div>
                    <div className="memoryCreate-form-group">
                        <label>장소</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="장소를 입력해 주세요"
                        />
                    </div>
                    <div className="memoryCreate-form-group">
                        <label>추억의 순간</label>
                        <input
                            type="date"
                            name="moment"
                            value={formData.moment}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="memoryCreate-form-group">
                        <label>추억 공개 선택</label>
                        <div className="memoryCreate-toggle">
                            <span>공개</span>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={formData.isPublic}
                                    onChange={handleToggle}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                    <div className="memoryCreate-form-group">
                        <label>비밀번호</label>
                        <input
                            type="password"
                            name="postPassword"
                            value={formData.postPassword}
                            onChange={handleChange}
                            placeholder="비밀번호를 입력해 주세요"
                        />
                    </div>
                </div>
            </div>
            <button type="submit" className="memoryCreate-submit">올리기</button>
        </form>
    );
};

export default MemoryForm;
