import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { Input, Switcher, Title, Wrapper, Error, Form } from '../components/auth-components';

// FirebaseError에 존재하는 Code에 대응하는 에러메시지 생성
// const errors = {
//     "auth/email-already-in-use":"이미 존재하는 이메일입니다.",
// };

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
        const { name, value } = e.target; // 구조분해 할당으로 event 객체 호출
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
        setError("");
        // name, email, password 중 하나라도 공백 혹은 로딩중이라면 함수 종료
        if(isLoading || name === "" || email === "" || password === "") return;
        try{
            setLoading(true);
            /*
            <계정 생성> 
            props 중 auth는 firebase.ts에서 export 시킨 auth를 뜻한다.
            성공적으로 수행되었을 시 UserCredntial이라는 Promise 객체를 반환한다.
            */
            const credentials = await createUserWithEmailAndPassword(auth, email, password);

            // 회원가입된 계정의 프로필 이름을 설정한다.
            await updateProfile(credentials.user, {
                displayName: name,
            })

            // 회원가입 성공 시 메인 페이지로 리다이렉션
            console.log("로그인성공 : ",credentials.user);
            navigate("/");
        }catch(e){
            if(e instanceof FirebaseError){
                setError(e.message);
            }
        }finally{
            setLoading(false);
        }
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
            <Switcher>
                이미 계정이 있나요? <Link to="/login">Login →</Link>
            </Switcher>
        </Wrapper>
    )
}