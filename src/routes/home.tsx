import { auth } from "../firebase";

export default function Home(){
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