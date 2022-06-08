import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import ConfirmModal from '../Modal/ConfirmModals';
import KakaoLoginImg from '../../img/kakao_login_large_wide.png';
import Logo from '../../assets/Conimals_logo_horizontal1.png';
import Loading from '../../utils/LoadingIndicator';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './Login.css';

// 로그인 성공, 실패 Modal 알림 띄우기
function Login() {
  const inputRef = useRef(null);

  const [loginInfo, setLoginInfo] = useState({
    userEmail: '',
    password: '',
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const modalHandler = () => {
    setModalOpen(false);
  };

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  // 받은 인가코드를 KakaoLogin 컴포넌트에서 서버로 전달
  const kakaoLoginHandler = (e) => {
    e.preventDefault();
    window.location.assign(
      `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`
    );
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleLogin = () => {
    setLoading(true);
    const { userEmail, password } = loginInfo;
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        { userEmail: userEmail, password: password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.data.accessToken) {
          localStorage.setItem('user', res.data.data.accessToken);
        }
        if (localStorage.getItem('guest')) {
          localStorage.removeItem('guest');
        }
        setModalOpen(true);
        setModalMsg('로그인 되었습니다!');
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      {loading ? <Loading /> : null}
      <div>
        <div className='login-all'>
          <img src={Logo} alt='coniamls-logo'></img>
          <h2>로그인</h2>
          <div className='login-text'>
            이메일
            <br />
            <input
              className='input'
              type='email'
              placeholder='conimals@gmail.com'
              onChange={handleInputValue('userEmail')}
              ref={inputRef}
            />
          </div>

          <div className='login-text'>
            비밀번호
            <br />
            <input
              placeholder='8자 이상의 영문과 숫자'
              className='input'
              onChange={handleInputValue('password')}
            />
          </div>
          {/* <button className='btn' onClick={handleLogin}>
          로그인
        </button> */}
          {/* 상단: CSS 버튼 / 하단: MUI 버튼  */}
          <Stack className='btn-mui' direction='row'>
            <Button variant='contained' sx={{ mt: 1 }} onClick={handleLogin}>
              로그인
            </Button>
          </Stack>
          <span className='signup-line'>
            Conimals가 처음이신가요?
            <a href='/signup' className='signup-link'>
              회원가입
            </a>
          </span>
          <hr className='line' />
          <img
            className='kakao-img'
            src={KakaoLoginImg}
            alt='kakao-login-img'
            onClick={kakaoLoginHandler}
          />
        </div>
        {modalOpen ? (
          <ConfirmModal handleModal={modalHandler}>{modalMsg}</ConfirmModal>
        ) : null}
      </div>
    </>
  );
}

export default Login;
