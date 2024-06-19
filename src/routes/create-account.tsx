import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    height: 100;
    width: 420px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 0px;
`;

const Title = styled.h1`
    font-size: 42px;
`;
 
const Form = styled.form`
    width: 100%;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px 20px;
    border-radius: 50px;
    border: none;
    font-size: 16px;
    &[type="submit"]{
        // 만약, input의 type이 submit이라면 cursor를 pointer로 변경
        cursor: pointer;
        &:hover{ // 만약 마우스가 hover 상태라면
            opacity: 0.8;;
        }
    }
`;

const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

export default function CreateAccount(){
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // 오류 관리 State
    const [error, setError] = useState("");

    // 객체 e의 타입과 <input> 요소의 변경 이벤트에 대한 타입 정의
    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name, value } = e.target; // 구조분해 할당으로 event 객체 호출
        if(name == "name"){
            setName(value);
        }else if(name == "email"){
            setEmail(value);
        }
        else if(name === "password"){
            setPassword(value);
        }
    }

    const onSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // submit 방지
        try{
            // 계정 생성
            // 사용자 프로필 이름 추가
            // 회원가입 성공 시 메인 페이지로 리다이렉션
        }catch(e){
            console.error(e);
        }finally{
            setLoading(false);
        }
        console.log(name, email, password);
    }

    return (
        <Wrapper>
            <Title>🍳 로그인</Title>
            <Form onSubmit={onSubmit}>
                <Input 
                    onChange={onChange}
                    name="name"
                    value={name}
                    placeholder='Name'
                    type="text"
                />
                <Input 
                    onChange={onChange}
                    name="email"
                    value={email}
                    placeholder='Email' 
                    type="email" 
                    required
                />
                <Input 
                    onChange={onChange}
                    name="password"
                    value={password}
                    placeholder='Passowrd' 
                    type="password" 
                    required
                />
                <Input
                    type="submit"
                    value={isLoading ? "Loading..." : "Create Account"}
                />
            </Form>
                {error !== "" ? <Error>{error}</Error> : null }
        </Wrapper>
    )
}