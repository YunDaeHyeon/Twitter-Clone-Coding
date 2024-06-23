import { auth } from "../firebase";

export default function Home(){
    console.log("현재 접속중인 사용자 : ", auth.currentUser?.email);
    const logOut = () => {
        // 현재 접속중인 세션을 로그아웃 시킨다.
        auth.signOut();
    }
    return (
        <>
            <h1><button onClick={logOut}>로그아웃</button></h1>
        </>
    );
}