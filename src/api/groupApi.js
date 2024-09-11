const API_BASE_URL = 'https://jogakjip-dymj.onrender.com';

// 그룹 만들기
export const createGroup = async (payload) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/groups`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('그룹 생성에 실패했습니다.');
    }

    const data = await response.json();
    const groupId = data?.id;

    if (groupId) {
      return groupId;
    } else {
      throw new Error('그룹 ID를 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error('그룹 생성 중 오류가 발생했습니다:', error);
    throw error;
  }
};

// 그룹 목록 조회
export const fetchGroups = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/groups/`);
    if (!response.ok) {
      throw new Error('그룹 목록 조회에 실패했습니다.');
    }
    return await response.json();
  } catch (error) {
    console.error('그룹 목록을 가져오는 중 오류가 발생했습니다:', error);
    throw error;
  }
};

// 그룹 수정 (그룹 정보 업데이트)
export const updateGroup = async (groupId, groupData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/groups/${groupId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(groupData),
    });

    if (!response.ok) {
      throw new Error('그룹 수정에 실패했습니다.');
    }

    return await response.json();
  } catch (error) {
    console.error('그룹 수정 중 오류가 발생했습니다:', error);
    throw error;
  }
};

// 그룹 삭제
export const deleteGroup = async (groupId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/groups/${groupId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('그룹 삭제에 실패했습니다.');
    }

    return await response.json();
  } catch (error) {
    console.error('그룹 삭제 중 오류가 발생했습니다:', error);
    throw error;
  }
};

// 그룹 상세 정보 조회
export const fetchGroupById = async (groupId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/groups/${groupId}`);
    if (!response.ok) {
      throw new Error('그룹 상세 정보 조회에 실패했습니다.');
    }

    return await response.json();
  } catch (error) {
    console.error('그룹 정보를 조회하는 중 오류가 발생했습니다:', error);
    throw error;
  }
};

// 비공개 그룹 비밀번호 확인
export const verifyGroupPassword = async (groupId, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/groups/${groupId}/verify-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      throw new Error('비밀번호 검증에 실패했습니다.');
    }

    return await response.json();
  } catch (error) {
    console.error('비밀번호 검증 중 오류가 발생했습니다:', error);
    throw error;
  }
};

// 그룹 공감하기
export const likeGroup = async (groupId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/groups/${groupId}/like`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('그룹 공감에 실패했습니다.');
    }

    return await response.json();
  } catch (error) {
    console.error('그룹 공감 중 오류가 발생했습니다:', error);
    throw error;
  }
};

// 그룹 공개 여부 확인
export const checkGroupIsPublic = async (groupId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/groups/${groupId}/is-public`);
    if (!response.ok) {
      throw new Error('그룹 공개 여부 확인에 실패했습니다.');
    }

    return await response.json();
  } catch (error) {
    console.error('그룹 공개 여부 확인 중 오류가 발생했습니다:', error);
    throw error;
  }
};
