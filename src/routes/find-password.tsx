import React, { useState } from 'react';
import { Input, Switcher, Title, Wrapper, Error, Form } from '../components/style/loginAndAccount-styled';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

const Description = styled.p`
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
`;

const Message = styled.p`
  font-weight: 500;
  color: blue;
`;

export default function FindPassword(){
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState("");

    // Error State
    const [error, setError] = useState("");

    // 메일 전송 여부 알려주기
    const [message, setMessage] = useState("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");
        if(isLoading || email === "") return;
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setMessage("비밀번호 재설정 메일이 전송되었습니다.");
            })
            .then(() => { 
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
            })
    }

    return (
        <Wrapper>
            <Title>비밀번호 찾기</Title>
            <Form onSubmit={onSubmit}>
             <Description>이메일을 입력해주세요</Description>
                <Input 
                    onChange={onChange}
                    name="email"
                    value={email}
                    placeholder='Email' 
                    type="email" 
                    required
                />
                <Input
                    type="submit"
                    value={isLoading ? "Loading..." : "Find Password"}
                />
            </Form>
                <span>{message !== "" ? <Message>{message}</Message> : null}</span>
                {error !== "" ? <Error>{error}</Error> : null }
            <Switcher>
                되돌아가기 <Link to="/login">Login →</Link>
            </Switcher>
        </Wrapper>
    )
}