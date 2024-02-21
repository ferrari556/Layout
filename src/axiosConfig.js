import axios from 'axios';

// Axios 인스턴스 생성. 이제 baseURL 설정을 제거합니다.
const axiosInstance = axios.create();

const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken'); // 리프레시 토큰 가져오기
    const response = await axiosInstance.post('/users/refresh', null, {
      params: {
        refresh_token: refreshToken, // 요청의 쿼리 파라미터로 refresh_token을 보냄
      }
    });
    const { access_token } = response.data;
    localStorage.setItem('userToken', access_token); // 새 액세스 토큰 저장
    return access_token;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw new Error('Failed to refresh access token');
  }
};

// 요청 인터셉터
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('userToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// 응답 인터셉터
axiosInstance.interceptors.response.use(response => response, async error => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      const newToken = await refreshAccessToken();
      originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      console.error('Token refresh failed:', refreshError);
      // 로그아웃 처리 또는 사용자에게 알림 등의 추가 조치를 취할 수 있음
    }
  }
  return Promise.reject(error);
});

export default axiosInstance;