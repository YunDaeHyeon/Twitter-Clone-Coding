import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import styled from 'styled-components';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
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

    const onSubmit = async(e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // submit 방지
        // name, email, password 중 하나라도 공백이라면 함수 종료
        if(name === "" || email === "" || password === "") return;
        try{
            setLoading(true);
            /*
            <계정 생성> 
            props 중 auth는 firebase.ts에서 export 시킨 auth를 뜻한다.
            성공적으로 수행되었을 시 UserCredntial이라는 Promise 객체를 반환한다.
            */
            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            console.log(credentials.user);

            // 회원가입된 계정의 프로필 이름을 설정한다.
            await updateProfile(credentials.user, {
                displayName: name,
            })

            // 회원가입 성공 시 메인 페이지로 리다이렉션
            navigate("/");
        }catch(e){
            console.error(e);
        }finally{
            setLoading(false);
        }
        console.log(name, email, password);
    }

    return (
        <Wrapper>
            <Title>🍳 회원가입</Title>
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