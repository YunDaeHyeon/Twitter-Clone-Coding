import styled from "styled-components";
import { auth } from "../firebase";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Button = styled.span`
    width: 100%;
    background-color: white;
    color: black;
    font-weight: 500;
    margin-top: 20px;
    padding: 10px 20px;
    border-radius: 50px;
    border: 0;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const Logo = styled.img`
    height: 25px;
`;

export default function GithubConnection(){
    const navigate = useNavigate();
    const onClick = async() => {
        try{
            const provider = new GithubAuthProvider();
            // 버튼 클릭 시 github 로그인 팝업을 출력하여 github 계정 연동
            await signInWithPopup(auth, provider);
            // 연동 성공 시 메인페이지 이동
            navigate("/");
        }catch(e){
            console.error("오류발생 :", e);
        }
    }
    return(
        <Button onClick={onClick}>
            <Logo src="/github-logo.svg"/>
            Continue with Github
        </Button>
    );
}