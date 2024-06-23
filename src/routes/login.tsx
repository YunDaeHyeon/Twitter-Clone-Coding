import { auth } from "../firebase";

export default function Login(){
    console.log("현재 접속중인 사용자 : ", auth.currentUser?.email);
    return <h1>login</h1>
}