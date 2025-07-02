"use client";
import styled from "styled-components";

const WelcomePage = () => {
    return (
        <Wrapper>
            <h2>반갑습니다</h2>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 800px;
    max-width: calc(100% - 10px);
    margin: 0 auto;
    padding: 40px 20px;
`

export default WelcomePage;