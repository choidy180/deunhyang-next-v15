"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import styled from "styled-components";

const MemberLogin = () => {
    const router = useRouter();

    const [reveal, setReveal] = useState(false);
    return (
        <Container>
            <h3>Deun Hyang</h3>

            <p className="title">로그인</p>

            <p className="sub">아이디와 비밀번호 입력하기 귀찮으시죠?<br/>구글 회원가입으로 입력없이 간편하게 로그인 하세요.</p>

            <div className="btnGoogle">
                <FcGoogle />
                <span className="sns_text">구글 계정으로 로그인 / 회원가입</span>
            </div>

            <div className="or">
                <div />
                <span>또는</span>
            </div>

            <MemberInput type="text" placeholder="아이디" />
            <div className="inputBox_passwd">
                <MemberInput type={reveal ? 'text' : 'password'} placeholder="패스워드" />
                {
                    reveal ?
                    (
                        <Image
                            src={'https://storage.keepgrow.com/admin/20230629004733880.png'}
                            width={40}
                            height={40}
                            alt="eyes"
                            onClick={()=> setReveal(false)}
                        />
                    ) :
                    (
                        <Image
                            src={'https://storage.keepgrow.com/admin/20230627044452575.png'}
                            width={40}
                            height={30}
                            alt="eyes"
                            onClick={()=> setReveal(true)}
                        />
                    )
                }
            </div>
            <LoginBtn>기존 회원 로그인</LoginBtn>
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
        </Container>
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

    .btnGoogle {
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
    }
    
    span.sns_text {
        font-family: 'Paperlogy-4Regular';
        pointer-events: none;
        user-select:none; // 드래그 방지
        font-size: .8rem;
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