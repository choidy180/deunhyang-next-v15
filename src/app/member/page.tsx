"use client";

import styled from "styled-components";
import { useAuthStore } from "../../../store/useAuthStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const MemberPage = () => {
    const router = useRouter();

    const refreshToken = useAuthStore((user) => user.refreshToken);
    useEffect(()=> {
        console.log(refreshToken);
        if(refreshToken === ''){
            alert('현재 로그인 상태에 문제가 있습니다. 다시 로그인 해주세요.');
            router.push('/member/login');
        }
    },[]);
    return (
        <Container>
            <h1>마이페이지</h1>
        </Container>
    )
}

const Container = styled.div`
    width: calc(100% - 20px);
    max-width: 800px;

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    padding: 2rem 0;
`

export default MemberPage;