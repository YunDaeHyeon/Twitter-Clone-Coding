import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
import { useEffect, useState } from "react";

// 사용자 로그인 판별 컴포넌트
// export default function ProtectedRoute({children} : {children:React.ReactNode}){

//     // 로그인된 사용자는 user 객체 반환, 아니면 null 반환
//     const user = auth.currentUser;
//     console.log(user);
//     if(user === null){ // 로그인 상태가 아니라면 회원가입 페이지로 리다이렉트
//         <Navigate to="/create-account"/>
//     }
//      return children;
// }

export default function ProtectedRoute({children} : {children:React.ReactNode}){
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        // Firebase의 Auth 객체 상태 변화를 모니터링
        const unSubscribe = auth.onAuthStateChanged(user => {
            setIsAuthenticated(!!user); // 사용자가 로그인하였으면 true, 그렇지 않으면 false
        });

        // 컴포넌트 언마운트시
        return() => unSubscribe();
    }, []);

    if(!isAuthenticated){
        // 인증되지 않은 사용자가 접근하였을 경우
        return <Navigate to="/create-account" replace />;
    }
    
    return children;
}