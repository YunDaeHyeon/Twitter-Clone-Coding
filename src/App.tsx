import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loading-screen";
import { auth } from "./firebase";

const router = createBrowserRouter([
  {
    path: "/",
    // 부모 컴포넌트 지정
    element: <Layout/>,
    // 라우트(자식) 컴포넌트 지정
    children: [
      {
        path: "",
        element: <Home/>,
      },
      {
        path: "profile",
        element: <Profile/>,
      }
    ]
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/create-account",
    element: <CreateAccount/>
  }
])

// 전역 styled-components 정의
const GlobalStyles = createGlobalStyle`
  // styled-reset을 사용하여 브라우저 기본 스타일 초기화
  ${reset}
  *{
    box-sizing: border-box;
  }
  body{
    background-color: black;
    color: white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  const [isLoading, setLoading] = useState(true);
  const init = async() => {
    // firebase의 사용자 인증이 될 때까지의 로딩화면
    await auth.authStateReady(); // 최초 호출 시 Promise 반환
    setLoading(false);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <Wrapper>
      <GlobalStyles/>
      {isLoading ? // Loading 로직 구현
        <LoadingScreen/> : 
        <RouterProvider router={router}/>}
    </Wrapper>
  )
}

export default App
