"use client";

import styled from "styled-components";
import MainSlider from "../../components/main_slide";
import MainProduct from "../../components/main_product";

export default function Home() {
    return (
        <PageContainer>
            <MainSlider/>
            <MainProduct/>
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
