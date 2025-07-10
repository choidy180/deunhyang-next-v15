"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import GoogleLoginBtn from "../../../../components/googleLoginBtn";
import { loginWithEmail } from "../../../../lib/login";
import { toast } from "react-toastify";

const MemberLogin = () => {
    const router = useRouter();
    const [reveal, setReveal] = useState(false);   // 텍스트 감추기
    const [mounted, setMounted] = useState(false); // 로딩여부

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            if(email === ''){
                toast.error('이메일을 입력하지 않았습니다.');
            }
            if(password === ''){
                toast.error('패스워드를 입력하지 않았습니다.');
            }
            await loginWithEmail(email, password);
        } catch (error: any) {
            if (error.code === 'auth/user-not-found') {
                toast.error('해당 이메일로 등록된 사용자가 없습니다.');
            } else if (error.code === 'auth/wrong-password') {
                toast.error('비밀번호가 틀렸습니다.');
            } else {
                toast.error('로그인에 실패했습니다.');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <>
            {
                mounted &&
                (
                    <Container>
                        <h3>Deun Hyang</h3>

                        <p className="title">로그인</p>

                        <p className="sub">아이디와 비밀번호 입력하기 귀찮으시죠?<br/>구글 계정으로 입력없이 간편하게 로그인 하세요.</p>

                        <GoogleLoginBtn type={'login'}/>

                        <div className="or">
                            <div />
                            <span>또는</span>
                        </div>
                        {
                            mounted  && (
                                <MemberInput type="text" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="아이디" />
                            )
                        }
                        {
                            mounted  && (
                                <div className="inputBox_passwd">
                                    <MemberInput 
                                        type={reveal ? 'text' : 'password'} 
                                        value={password} 
                                        onChange={(e)=> setPassword(e.target.value)}
                                        placeholder="패스워드" 
                                    />
                                    <Image
                                        src={ reveal
                                            ? 'https://storage.keepgrow.com/admin/20230629004733880.png'
                                            : 'https://storage.keepgrow.com/admin/20230627044452575.png'
                                        }
                                        width={40}
                                        height={reveal ? 40 : 30}
                                        alt="eyes"
                                        onClick={()=> setReveal(!reveal)}
                                    />
                                </div>
                            )
                        }
                        {
                            mounted &&
                            (
                                <LoginBtn onClick={handleLogin} disabled={loading}>기존 회원 로그인</LoginBtn>
                            )
                        }

                        {
                            mounted &&
                            (
                                <UtilMenu>
                                    <div className="left">
                                        <span>아이디 찾기</span>
                                        <span className="line">|</span>
                                        <span>비밀번호 찾기</span>
                                    </div>
                                    <div className="right">
                                        <span onClick={() => router.push('/member/join')}>회원가입</span>
                                    </div>
                                </UtilMenu>
                            )
                        }
                    </Container>
                )
            }
        </>
    )
}

const Container = styled.div`
    width: 380px;
    height: auto;

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    margin: 1rem;

    .title {
        width: 100%;
        font-size: 1.2rem;
        font-weight: 700;
        text-align: left;
        margin-top: 2rem;
        margin-bottom: .7rem;
    }

    .sub {
        width: 100%;
        font-size: .93rem;
        line-height: 1.2rem;
    }

    .or {
        width: 100%;
        text-align: center;
        font-size: .8rem;
        margin: 2rem 0 1rem 0;

        div {
            position: absolute;
            top: 50%;
            z-index: -1;
            background-color: #ECECEC;

            width: 100%;
            height: 1px;
        }
        span {
            background-color: white;
            padding: 0 10px;
            color: #a5a5a5;
        }
    }

    .inputBox_passwd {
        width: 100%;

        img {
            position: absolute;
            top: 50%;
            right: 0px;
            transform: translateY(calc(-50% + .5rem));
            padding: 0.6rem;
            cursor: pointer;
        }
    }
`

const MemberInput = styled.input`
    width: 100%;
    border: none;
    outline: none;
    border-bottom: 1px solid #e5e5e5;
    padding: 0.3rem 0;
    margin-top: 1rem;
`

const LoginBtn = styled.button`
    width: 100%;
    border-radius: 8px;
    background-color: #f6f7f9;
    color: #222;
    font-weight: 500;
    font-family: 'Paperlogy-4Regular';
    border: none;
    word-spacing: 4px;
    font-size: .8rem;
    
    padding: .8rem;
    margin-top: 2rem;
    cursor: pointer;
`

const UtilMenu = styled.div`
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    margin: 1rem;
    .left {
        width: calc(100% - 100px);

        display: flex;
        justify-content: start;
        align-items: center;

        font-size: .8rem;
        gap: 4px;

        span {
            cursor: pointer;
            color: #888;

            &.line {
                cursor: auto;
            }
        }
    }
    .right {
        width: 100px;
        text-align: right;

        span {
            font-size: .8rem;
            cursor: pointer;
        }
    }
`
export default MemberLogin;