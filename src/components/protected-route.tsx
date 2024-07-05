import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import LoadingScreen from "./loading-screen";

export default function ProtectedRoute({children} : {children:React.ReactNode}){
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(false);

    useEffect(() => {
        // Firebase Auth 상태 변화를 감지
        const unsubscribe = auth.onAuthStateChanged(user => {
            setIsAuthenticated(!!user); // 사용자가 로그인 상태이면 true, 아니면 false
            setIsCheckingAuth(true); // true -> 사용자 인증 확인중, false -> 인증 확인 완료
        });

        // 컴포넌트가 언마운트될 때 옵저버 해제
        return () => unsubscribe();
    }, []);

    // 인증 확인 중일땐 로딩스크린 출력
    if(!isCheckingAuth){
        return <LoadingScreen/>
    }

    if(!isAuthenticated){
        // 인증되지 않은 사용자가 접근하였을 경우 리다이렉션
        return <Navigate to="/login" replace />;
    }

    return children;
}
