"use client";

import Image from "next/image";
import styled from "styled-components";

const Navigation = () => {
    return (
        <NavContainer>
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
                <Image
                    src={'https://deunhyang.com/_idio/img/my_bk.svg'}
                    width={28}
                    height={28}
                    alt="..."
                />
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

const NavContainer = styled.div`
    width: 100%;
    min-width: 980px;  // 최소 980px
    max-width: 1240px; // 최대 1,240px

    display: flex;
    justify-content: space-between;
    align-items: end;

    padding-bottom: 1rem;

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
        }
    }
`

export default Navigation;