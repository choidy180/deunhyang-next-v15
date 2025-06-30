'use client';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import styled from "styled-components";
import { auth } from "../lib/firebase";
import { useAuthStore } from "../store/useAuthStore";

interface Type {
    type: string;
}

const GoogleLoginBtn = ({type}:Type) => {
    const userId = useAuthStore();
    const loginWithGoogle = async () => {
        try {
            // 로그인 기능 제공 회사 (구글)
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            console.log('id: ', result.user.tenantId, result.user.email);
            console.log('name: ', result.user.displayName);
            console.log('image: ', result.user.photoURL);
            console.log('grade: ', 0);
            console.log('token: ', result.user.refreshToken);
        } catch (error:any) {
            if (error.code === 'auth/popup-closed-by-user') {
                console.log('사용자가 로그인 팝업을 닫았습니다.');
                // 선택: 사용자에게 안내 메시지를 띄우거나 무시
            } else {
                console.error('로그인 중 오류 발생:', error);
            }
        }
    }
    return (
        <GoogleButton onClick={loginWithGoogle}>
            <FcGoogle />
            <span className="sns_text">
                {type == 'login' ? '구글 계정으로 로그인' : '구글 계정으로 회원가입'}
            </span>
        </GoogleButton>
    )
}

const GoogleButton = styled.div`
    width: 100%;
    height: auto;

    border-radius: 8px;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
    
    margin-top: 2rem;
    padding: .8rem;
    background-color: #f6f7f9;
    border: 1.4px solid #222;

    font-size: .8rem;

    svg {
        position: absolute;
        left: 1rem;
        pointer-events: none;
        user-select:none;
    }

    span.sns_text {
        font-family: 'Paperlogy-4Regular';
        pointer-events: none;
        user-select:none; // 드래그 방지
        font-size: .8rem;
        word-spacing: 2px;
    }
`

export default GoogleLoginBtn;