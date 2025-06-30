"use client"

import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";

const MemberJoin = () => {
    return (
        <Container>
            <h3>Deun Hyang</h3>

            <p className="title">회원가입</p>

            <p className="sub">아이디와 비밀번호 입력하기 귀찮으시죠?<br/>구글 회원가입으로 입력없이 간편하게 회원가입 하세요.</p>

            <div className="btnGoogle">
                <FcGoogle />
                <span className="sns_text">구글 계정으로 회원가입</span>
            </div>

            <div className="or">
                <div />
                <span>또는</span>
            </div>

            <div className="joinBtn">
                <span className="sns_text">ID / PW 입력이 필요한 회원가입</span>
            </div>
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
        word-spacing: 2px;
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

    .joinBtn {
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

        font-size: .8rem;
    }
`

export default MemberJoin;