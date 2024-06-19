import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

// 사용자 로그인 판별 컴포넌트
export default function ProtectedRoute({children} : {children:React.ReactNode}){

    // 로그인된 사용자는 user 객체 반환, 아니면 null 반환
    const user = auth.currentUser;
    if(user === null){ // 로그인 상태가 아니라면 회원가입 페이지로 리다이렉트
        <Navigate to="/create-account"/>
    }
     return children;
}