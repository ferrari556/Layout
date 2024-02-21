
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import axios from 'axios';
import axiosInstance from './axiosConfig'; // axiosConfig 임포트
/*
// Card 컴포넌트 기본 스타일
const Card = (props) => {
  return (
    <div style={styles.Card}>
      {props.children}
    </div>
  );
};
*/
// Button 컴포넌트 스타일
const styles = {
  Button: {
    cursor: 'pointer',
    width: '170px',
    height: '100px',
    padding: '10px 15px',
    border: '0',
    boxSizing: 'border-box',
    borderRadius: '24px',
    backgroundColor: '#000050',
    color: '#ffffff',
    fontSize: '30px',
    fontFamily: 'Montserrat',
    fontWeight: 500,
    lineHeight: '39px',
    outline: 'none',
    margin: '10px', // 버튼 사이의 간격을 추가
  },
};

// Button 컴포넌트 기본 속성
const defaultProps = {
  label: 'Default Label', // 'image' 대신 'label' 속성의 기본값을 정의합니다.
};

// Button 컴포넌트 정의
const Button = ({ label, onClick }) => {
  return (
    <button style={styles.Button} onClick={onClick}>
      {label ?? defaultProps.label}
    </button>
  );
};
// 첫 번째 페이지 컴포넌트
function HomePage({ onLoginSuccess }) {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    padding: '20px',
    //backgroundImage: 'url("/startimage.png")', // 배경 이미지 설정
    backgroundSize: 'cover', // 이미지가 컨테이너를 꽉 채우도록 설정
    backgroundPosition: 'center', // 이미지를 중앙에 위치시킵니다.
    backgroundColor: '#f5f5f5', // 반투명한 흰색 레이어 추가
    backgroundBlendMode: 'overlay', // 이미지와 색상 레이어를 혼합
  };

  const [userId, setUserId] = useState(''); // 사용자 ID 상태
  const [password, setPassword] = useState(''); // 사용자 PW 상태
  const [currentPage, setCurrentPage] = useState('home');

  const handleLoginClick = async () => {
    try {
      // axiosInstance 사용하여 로그인 요청
      const response = await axiosInstance.post('/users/login', {
        login_id: userId,
        login_pw: password,
      });
  
      if (response.data.access_token) {
        console.log("Login successful", response.data);
        // 로그인 성공시 access_token 저장
        localStorage.setItem('userToken', response.data.access_token);
        localStorage.setItem('refreshToken', response.data.refresh_token); // 리프레시 토큰 저장
        onLoginSuccess(); // 로그인 성공 처리 함수 호출
        
        // 로그인 성공 시 페이지 전환
        setCurrentPage('upload'); // 예시로 'upload' 페이지로 전환
      } else {
        console.log("Login failed", response.data.message);
        alert("Login failed");
      }
    } catch (error) {
      console.error("Login error", error);
      alert("Login error: " + (error.response?.data?.detail || "An error occurred"));
    }
  };

  const loginContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'flex-start', // 이 속성은 column 방향에서는 주로 세로 정렬에 영향을 줍니다.
    justifyContent: 'center',
    margin: '30px 30px 30px 0px', // 좌우 마진을 제거하거나 조정
    padding: '0', // 필요에 따라 조정
    width: '70%', // 컨테이너 너비를 부모에 맞춤
  };
  
  const inputStyle = {
    margin: '10px 10px 10px 0', // 상하 마진만 적용, 좌우 마진 조정
    padding: '10px',
    fontSize: '1.5rem',
    borderRadius: '24px',
    border: '1px solid #ddd',
    width: '70%', // 입력 필드 너비를 조정하여 부모 컨테이너와 일치시킴
  };

  const handleSignupClick = async () => {
    try {
      // 회원가입 요청
      const response = await axios.post('/users/signup', {
        login_id: userId,
        login_pw: password,
      });
  
      if (response.status === 200) {
        console.log("Signup successful", response.data);
        alert("Signup successful: " + response.data.message);
        // 회원가입 성공 처리, 예: 로그인 페이지로 이동
      } else {
        console.log("Signup failed", response.data.message);
        alert("Signup failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Signup error", error);
      alert("Signup error: " + (error.response?.data?.detail || "An error occurred"));
    }
  };
  
  return (
    <div className="Home">
      <header className="header" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="header-left">
        <img src="logo2.png" alt="logo_img" className="logo-image" />
        <div className="logo-text"> Where is Audio</div>
      </div>
      <div className="header-middle">
        <button className="button-link">Home</button>
        <button className="button-link">Files</button>
        <button className="button-link">History</button>
      </div>
      <div className="header-right">
        <button className="button-link">Sign In</button>
        <button className="button-link">Log In</button>
        <img src="accountIcon.png" alt="account_img" className="header-icon" />
        <img src="searchIcon.png" alt="search_img" className="header-icon" />
        <img src="menuIcon.png" alt="menu_img" className="header-icon" />
      </div>
    </header>
      <div className="body">
  <div className="body-text-container">
    <div className="intro-text">
      Find perfect place for
    </div>
    <div className="intro-text">
      sound effects
    </div>
    <div className="intro-text">
      on your audio books.
    </div>
    <div className="intro-text2">
      오디오북 효과음 생성 위치 추천 및 효과음, 배경음악 생성 서비스
    </div>

    <div className="login-and-actions" style={{ display: 'flex', alignItems: 'center'}}>
          {/* ID 및 Password 입력 필드 컨테이너 */}
          <div style={{ ...loginContainerStyle, flexDirection: 'column', flex: 1}}>
            <input
              type="text"
              placeholder="ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* 버튼 컨테이너 */}
          <div style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column' }}>
            <button className="start-button" onClick={handleLoginClick} style={{ marginBottom: '20px' }}>Start</button>
            <button className="demo-button" onClick={handleSignupClick}>Sign Up</button>
          </div>
        </div>
      </div>

      <div className="body-left">
      <img src="home_main.png" alt="main Image" className="main-image" />
    </div>
  </div> 
</div>
  );
}


// 두 번째 페이지 컴포넌트
function UploadPage({ onGoBackClick, onTransformClick, setTransformedResults }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log("Uploading file:", selectedFile.name);
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleFileUpload = async () => {
    if (!file) return;
  
    const userToken = localStorage.getItem('userToken');
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await axios.post('/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${userToken}`,
        },
      });
  
      if (response.status === 200 && response.data.results) {
        console.log("File uploaded successfully");
        const results = response.data.results.map(result => ({
          result_id: result.result_id,
          audio_id: result.audio_id,
          Index: result.Index,
          Converted_Result: result.Converted_Result,
          ResultFilePath: result.ResultFilePath,
          ResultFileLength: result.ResultFileLength,
          Converted_Date: result.Converted_Date,
        }));
        setTransformedResults(results);
        onTransformClick();
      } else {
        console.log("Failed to upload file or missing results in response");
        onTransformClick();
      }
    } catch (error) {
      console.error("There was an error uploading the file:", error);
      onTransformClick();
    }
  };
  
  function Sidebar() {
    return (
      <div className="sidebar">
        <div className="profile-image"></div>
        <div className="menu-item1"><span className="icon">&#x1F4C8;</span>My Cloud</div>
        <div className="whitebackground">
          <div className="menu-item2"><span className="icon">&#x1F4C9;</span>Upload</div>
        </div>
        <div className="menu-item3"><span className="icon">&#x1F4CA;</span>Recent files</div>
        <div className="menu-item4"><span className="icon">&#x1F4CB;</span>Trash bins</div>
        <div className="menu-item5"><span className="icon">&#x1F4CC;</span>Settings</div>
        <div className="menu-item6"><span className="icon">&#x1F4CD;</span>Logout</div>
      </div>
    );
  }

  return (
    <div className="container">
      <Sidebar />
    <div className="upload-page">
    <div className="card">
      <h1>Upload files</h1>
      <div className="innercard">
        <img src="uploadIcon_big.png" alt="upload_img" className="upload-icon"/>
        <h2 className="upload-title">Drag & drop your files here</h2>
        <p className="upload-description">or</p>
        {file ? (
          <div className="file-name-display">{fileName}</div>
        ) : (
          <button className="upload-button" onClick={() => document.getElementById('file').click()}>
            Choose files from your computer
          </button>
        )}
        <input type="file" id="file" className="file-input" accept=".wav" onChange={handleFileChange} style={{ display: 'none' }} />
        <div className="upload-page-buttons">
          <button className="upload-button" onClick={onGoBackClick}>돌아가기</button>
          <button className="upload-button" onClick={handleFileUpload} disabled={!file}>변환하기</button>
        </div>
      </div>
    </div>
  </div>
  </div>
  );
}

// 세 번째 컴포넌트
function TransformingPage({ transformedResults, onTransformComplete }) {
  useEffect(() => {
    if (Array.isArray(transformedResults) && transformedResults.length > 0) {
      transformedResults.forEach(result => {
        console.log(`파일 URL: ${result.ResultFilePath}, 변환 결과: ${result.Converted_Result}`);
      });
    } else {
      console.log("사용 가능한 파일 URL이 없습니다.");
    }
    const timer = setTimeout(onTransformComplete, 5000); // 5초 후에 변환 완료 처리
  
    return () => clearTimeout(timer);
  }, [transformedResults, onTransformComplete]);

  return (
    <div className="transforming-page">
      <h1>변환 중...</h1>
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    </div>
  );
}

// 네 번째 페이지 컴포넌트
function TransformationCompletePage({ transformedResults, onRestart }) {
  const audioRefs = useRef([]);

  useEffect(() => {
    audioRefs.current = audioRefs.current.slice(0, transformedResults.length);
  }, [transformedResults]);

  const togglePlay = (index) => {
    const audio = audioRefs.current[index];
    if (audio) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  };

  const handleCheckboxChange = async (resultId, isChecked) => {

    // 우선 테스트용으로 effect_sound_id를 1로 고정
    const effectSoundId = 1;
    const endpoint = isChecked ? '/histories/apply' : '/histories/cancel'; 
    try {
      await axios.post(endpoint, {
        result_id: resultId,
        effect_sound_id: effectSoundId, // 여기에 고정된 effect_sound_id를 사용
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(`결과가 성공적으로 ${isChecked ? '적용' : '취소'}되었습니다.`);
    } catch (error) {
      console.error(`결과 ${isChecked ? '적용' : '취소'} 중 오류가 발생했습니다.`, error);
    }
  };

  return (
    <div className="transformation-complete-page">
      <h1>변환 완료!</h1>
      <div className="audio-players">
        {transformedResults.map((result, index) => (
          <div key={result.result_id} className="audio-player" style={{ marginBottom: '20px' }}>
            <audio ref={el => audioRefs.current[index] = el} src={result.ResultFilePath} controls>
              Your browser does not support the audio element.
            </audio>
            <div>
              <button onClick={() => togglePlay(index)}>Play/Pause</button>
              <input
                type="checkbox"
                onChange={e => handleCheckboxChange(result.result_id, e.target.checked)}
              />
            </div>
            <p>{result.Converted_Result}</p>
          </div>
        ))}
      </div>
      <Button label="메인" onClick={onRestart} />
    </div>
  );
}



// App 컴포넌트
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [transformedResults, setTransformedResults] = useState([]);

  // 로그인 성공 시 호출될 함수
  const handleLoginSuccess = () => {
    setCurrentPage('upload'); // 로그인 성공 시 업로드 페이지로 이동
  };

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem('userToken'); // 로컬 스토리지의 토큰 삭제
    setCurrentPage('home'); // 로그아웃 시 홈 페이지로 이동
  };

  const handleGoBackClick = () => {
    setCurrentPage('home'); // '돌아가기' 버튼 클릭 시 첫 페이지로 상태 변경
  };

  const handleTransformClick = () => {
    setCurrentPage('transforming'); // '변환하기' 버튼 클릭 시 변환중 페이지로 상태 변경
  };

  const handleTransformComplete = () => {
    setCurrentPage('transformationComplete'); // 변환이 완료되면 변환 완료 페이지로 상태 변경
  };

  const handleRestart = () => {
    setCurrentPage('home'); // 처음으로 버튼 클릭 시 첫 페이지로 상태 변경
  };
  const handleBackToUpload = () => {
    setCurrentPage('upload'); // 두 번째 페이지로 상태 변경
  };

  return (
    <div className="App">
      {currentPage === 'home' && <HomePage onLoginSuccess={handleLoginSuccess} />}
      {currentPage === 'upload' && (
        // Pass setTransformedResults to UploadPage to handle state update
        <UploadPage
          onGoBackClick={handleLogout}
          onTransformClick={handleTransformClick}
          setTransformedResults={setTransformedResults}
        />
      )}
      {currentPage === 'transforming' && (
        // Pass transformedResults to TransformingPage for display
        <TransformingPage
          transformedResults={transformedResults}
          onTransformComplete={handleTransformComplete}
        />
      )}
      {currentPage === 'transformationComplete' && (
  <TransformationCompletePage
  transformedResults={transformedResults}
  onRestart={handleRestart}
  onBackToUpload={handleBackToUpload} // 이 함수를 props로 전달
/>
)}
    </div>
  );
}

export default App;