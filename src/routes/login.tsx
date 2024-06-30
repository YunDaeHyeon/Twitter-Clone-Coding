import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Input, Switcher, Title, Wrapper, Error, Form } from '../components/style/loginAndAccount-styled';
import GithubConnection from '../components/github-connection';

export default function Login(){
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // 오류 관리 State
    const [error, setError] = useState("");

    // 객체 e의 타입과 <input> 요소의 변경 이벤트에 대한 타입 정의
    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target; // 구조분해 할당으로 event 객체 호출
        if(name == "email"){
            setEmail(value);
        }
        else if(name === "password"){
            setPassword(value);
        }


    }

    const onSubmit = async(e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // submit 방지
        setError("");
        // email, password 중 하나라도 공백 혹은 로딩중이라면 함수 종료
        if(isLoading || email === "" || password === "") return;
        try{
            setLoading(true);
            // 성공적으로 수행되면 UserCredential(사용자) 반환
            const user = await signInWithEmailAndPassword(auth, email, password);
            console.log("로그인된 사용자 : ", user);
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
            <Title>🎁 로그인</Title>
            <Form onSubmit={onSubmit}>
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
                    value={isLoading ? "Loading..." : "Login"}
                />
            </Form>
                {error !== "" ? <Error>{error}</Error> : null }
            <Switcher>
                계정이 없나요? <Link to="/create-account">Create Account →</Link>
            </Switcher>
            <Switcher>
                암호를 잊었나요? <Link to="/find-password">Find Password →</Link>
            </Switcher>
            <GithubConnection/>
        </Wrapper>
    )
}