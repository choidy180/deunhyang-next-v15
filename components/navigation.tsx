"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuthStore } from "../store/useAuthStore";

const Navigation = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [isHidden, setIsHidden] = useState(false);

    const [userMenu, setUserMenu] = useState(false);

    // 로그아웃 핸들러 상태변경 함수
    const setUserId = useAuthStore((user) => user.setUserId);
    const setUserDisplayName = useAuthStore((user) => user.setUserDisplayName);
    const setUserEmail = useAuthStore((user) => user.setUserEmail);
    const setUserPhotoURL = useAuthStore((user) => user.setUserPhotoURL);
    const setUserGrade = useAuthStore((user) => user.setUserGrade);
    const setRefreshToken = useAuthStore((user) => user.setRefreshToken);

    // 유저 정보
    const userEmail = useAuthStore((user) => user.userEmail);
    const userPhothURL = useAuthStore((user) => user.userPhotoURL);

    const [mounted, setMounted] = useState(false); // 로딩여부

    useEffect(() => {
        setIsHidden(pathname.includes('member'));
        setMounted(true);
    }, [pathname]);

    // 로그아웃
    const logoutHandler = () => {
        setUserId('');
        setUserDisplayName('');
        setUserEmail('');
        setUserPhotoURL('');
        setUserGrade(0);
        setRefreshToken('');

        alert('로그아웃 되었습니다.');

        return router.push('/');
    }

    return (
        <>
            {
                mounted && 
                (
                    <NavContainer $hide={isHidden}>
                        <div className="logoDiv">
                            Deun Hyang
                        </div>
                        <div className="d1Box">
                            <span>든향</span>
                            <span>모든 제품</span>
                            <span>향수</span>
                            <span>인센스 스틱</span>
                            <span>퍼퓸 디퓨저</span>
                            <span>룸 & 패브릭 스프레이</span>
                        </div>
                        <div className="stateBox">
                            {
                                userEmail === '' ?
                                (
                                    <>
                                        <Image
                                            src={'https://deunhyang.com/_idio/img/my_bk.svg'}
                                            width={28}
                                            height={28}
                                            alt="..."
                                            onClick={()=> router.push('/member/login')}
                                        />
                                    </>
                                ) : (
                                    <div className="photoBox">
                                        <Image
                                            src={userPhothURL}
                                            width={31}
                                            height={31}
                                            alt="..."
                                            className="photo"
                                            onClick={()=> setUserMenu(!userMenu)}
                                        />
                                        {
                                            userMenu &&
                                            (
                                                <UserMenuBox>
                                                    <p>마이페이지</p>
                                                    <p onClick={logoutHandler}>로그아웃</p>
                                                </UserMenuBox>
                                            )
                                        }
                                    </div>
                                )
                            }
                            <Image
                                src={'https://deunhyang.com/_idio/img/cart_bk.svg'}
                                width={28}
                                height={28}
                                alt="..."
                            />
                            <Image
                                src={'https://deunhyang.com/_idio/img/sch_bk.svg'}
                                width={28}
                                height={28}
                                alt="..."
                            />
                        </div>
                    </NavContainer>
                )
            }
        </>
    )
}

const NavContainer = styled.div<{$hide: boolean}>`
    width: 100%;
    min-width: 980px;  // 최소 980px
    max-width: 1240px; // 최대 1,240px

    display: flex;
    justify-content: space-between;
    align-items: end;

    padding-bottom: 1rem;
    
    visibility: ${({ $hide }) => ($hide ? 'hidden' : 'visible')};
    opacity: ${({ $hide }) => ($hide ? 0 : 1)};
    pointer-events: ${({ $hide }) => ($hide ? 'none' : 'auto')};

    .logoDiv {
        width: 200px;
        height: 80px;
        font-size: 1.4rem;
        font-weight: 700;
        word-spacing: -2px;

        display: flex;
        justify-content: start;
        align-items: end;
    }


    .d1Box {
        width: calc(100% - 460px);
        height: 80px;

        display: flex;
        justify-content: center;
        align-items: end;
        gap: 2rem;

        span {
            font-size: 1rem;
            font-weight: 300;
            word-spacing: -1.4px;
            cursor: pointer;
            border-bottom: 2px solid transparent;
            transition: all ease-in-out .15s;

            &:hover {
                border-bottom: 2px solid #000000;
            }
        }
    }

    .stateBox {
        width: 260px;
        height: 80px;

        display: flex;
        justify-content: end;
        align-items: end;

        gap: 1rem;

        img {
            cursor: pointer;

            &.photo {
                border-radius: 9999px;
            }
        }

        .photoBox {
            height: 31px;
        }
    }
`

const UserMenuBox = styled.div`
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 8px;

    width: 140px;
    padding: 1rem;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

    z-index: 5;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 6px;

    p {
        width: 100%;
        text-align: center;
        cursor: pointer;
    }
    p:hover {
        text-decoration: underline;
    }
`

export default Navigation;