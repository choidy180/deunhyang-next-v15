"use client";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import styled from 'styled-components';
import { auth } from '../../../../lib/firebase';
import { useRouter } from 'next/navigation';

const SignupForm = () => {
    const router = useRouter();

    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    

    // 아이디 체크
    const isValidId = (id: string) => /^[a-z0-9]{4,16}$/.test(id);

    // 비밀번호 체크
    const isValidPassword = (pw: string) => /^(?=.*[a-z])(?=.*[0-9])[a-z0-9]{10,}$/.test(pw);

    // 회원가입 핸들러
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!isValidId(id)) {
            console.log('아이디 형식이 올바르지 않습니다.');
            setError('아이디 형식이 올바르지 않습니다.');
            e.stopPropagation();
            return;
        }
        if (!isValidPassword(password)) {
            console.log('비밀번호 형식이 올바르지 않습니다.');
            setError('비밀번호 형식이 올바르지 않습니다.');
            e.stopPropagation();
            return;
        }

        // 회원가입 로딩 시작
        setLoading(true);

        // ✅ 여기서부터 회원가입 로직 진행
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });
            setLoading(false);
            router.push('/welcome');
        } catch (error:any) {
            if(error.code === 'auth/email-already-in-use') {
                setError('이미 사용중인 이메일입니다');
                setLoading(false);
                return;
            }
            setLoading(false);
            setError(error.message);
        }
        
    };

    return (
        <Wrapper>
            <Title>회원 가입</Title>
            <Form>
                <Row>
                    <Label>아이디 *</Label>
                    <div style={{ flex: 1 }}>
                        <Input placeholder='(영문소문자/숫자, 4~16자)' value={id} onChange={(e) => setId(e.target.value)} required />
                    </div>
                </Row>

                <Row>
                    <Label>비밀번호 *</Label>
                    <div style={{ flex: 1 }}>
                        <Input placeholder='(영문 소문자 + 숫자 조합, 10글자 이상' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                </Row>

                <Row>
                    <Label>이름 *</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} required />
                </Row>

                <Row className='final'>
                    <Label>이메일 *</Label>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Row>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <SubmitButton type="button" onClick={handleSubmit}>회원가입하기</SubmitButton>
            </Form>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 800px;
    max-width: calc(100% - 10px);
    margin: 0 auto;
    padding: 40px 20px;
`;

const Title = styled.h1`
    text-align: center;
    font-size: 28px;
    margin-bottom: 30px;
`;

const Form = styled.div`
    width: 100%;

    p.idcheck {
        margin-left: 136px;
        font-size: .8rem;
    }
    @media (max-width: 768px) {
        p.idcheck {
            margin-left: 0;
        }
    }
`;

const Row = styled.div`
    display: flex;
    align-items: flex-start;
    margin-top: 20px;
    gap: 1rem;

    div {
        display: flex;
    }

    &.final {
        margin-bottom: 2rem;
    }

    @media (max-width: 768px) {
        div {
            width: 100%;
            display: flex;
            gap: .6rem;
        }
        flex-direction: column;
        gap: 0;
    }
`;

const Label = styled.label`
    width: 120px;
    height: 44px;
    padding-left: 10px;
    font-weight: bold;
    padding-top: 10px;
    background-color: #f2f2f2;
    font-size: .8rem;

    @media (max-width: 768px) {
        width: 100%;
        margin-bottom: 8px;
        padding-left: 0px;
        height: auto;
        background-color: transparent;
    }
`;

const Input = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    min-width: 0;
    width: 100%;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 14px 0;
    background-color: #333;
    color: white;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #555;
    }

    @media (max-width: 768px) {
        font-size: 1rem;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 1rem;
    width: 100%;
    text-align: center;
    margin: 2rem 0 1rem 0;
`;

export default SignupForm;
