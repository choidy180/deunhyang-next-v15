"use client";

import styled from "styled-components";

const MemberInput = () => {
    return (
        <Container>
            <h4>회원 가입</h4>
        </Container>
    )
}

const Container = styled.div`
    width: 800px;

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    h4 {
        font-size: 1.6rem;
        margin: 2rem;
    }
`

export default MemberInput;