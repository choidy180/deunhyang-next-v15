import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";

const imageList = [
    "https://deunhyang.com/_images/mainBnr_01.jpg",
    "https://deunhyang.com/_images/mainBnr_02.jpg"
]

const MainSlider = () => {
    const [index, setIndex] = useState<number>(0); // 순서
    const [fade, setFade] = useState(true);        // 페이드
    useEffect(()=> {
        const interval = setInterval(() => {
            setFade(false); // 페이드 아웃
            setTimeout(()=> {
                setIndex((prev) => (prev + 1) % imageList.length); // 이미지 변경
                setFade(true); // 페이드 인
            }, 300); // 페이드 아웃 시간
        }, 5000); // 이미지 전환 주기

        return () => clearInterval(interval);
    },[]);
    return (
        <Container>
            <Image
                src={imageList[index]}
                width={1300}
                height={700}
                alt="mainBnr_01"
                className={`${fade ? 'fadeIn' : 'fadeOut'}`}
            />
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    min-width: 980px;  // 최소 980px
    max-width: 1240px; // 최대 1,240px

    display: flex;
    justify-content: center;
    align-items: start;

    img {
        transition: all ease-in-out .15s;
    }
    .fadeIn {
        opacity: 1;
    }

    .fadeOut {
        opacity: 0;
    }
`

export default MainSlider;