"use client";

import styled from "styled-components";
import { useAuthStore } from "../../../store/useAuthStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const MemberPage = () => {
    const router = useRouter();

    const { refreshToken, userPhotoURL, userDisplayName, userEmail, provider } = useAuthStore();
    useEffect(()=> {
        if(refreshToken === ''){
            alert('현재 로그인 상태에 문제가 있습니다. 다시 로그인 해주세요.');
            router.push('/member/login');
        }
    },[]);
    return (
        <Container>
            <h2>마이페이지</h2>

            <UserWrapper>
                <Image
                    src={userPhotoURL}
                    width={60}
                    height={60}
                    alt="userPhotoURL"
                />
                <div className="textBox">
                    <p className="name">
                        {userDisplayName}
                        {provider !== '' && provider.includes('google') && '/ (Google)'}
                    </p>
                    <p>{userEmail}</p>
                </div>
            </UserWrapper>
        </Container>
    );
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

const UserWrapper = styled.div`
    width: 100%;

    background-color: #f5f5f5;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 2rem 0;
    margin-top: 2rem;
    gap: 1rem;

    img {
        border-radius: 9999px;
    }

    .textBox {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;

        p {
            &.name {
                font-weight: 700;
            }
        }
    }
`

export default MemberPage;