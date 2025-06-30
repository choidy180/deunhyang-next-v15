"use client";

import Image from "next/image";
import styled from "styled-components";
import MainSlider from "./components/main_slide";

export default function Home() {
    return (
        <PageContainer>
            <MainSlider/>
        </PageContainer>
    );
}

const PageContainer = styled.div`
    width: 100%;
    min-width: 980px;  // 최소 980px
    max-width: 1240px; // 최대 1,240px

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
`
