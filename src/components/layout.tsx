import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";
import HomeIcon from "./style/icon/home-icon";
import ProfileIcon from "./style/icon/profile-icon";
import LogoutIcon from "./style/icon/logout-icon";

// Outlet으로 렌더링되는 자식 컴포넌트의 범위 파악 용도
const Container = styled.div``;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  max-width: 860px;
  display: grid;
  grid-template-columns: 1fr 4fr;
  padding: 50px 0px;
  gap: 20px;
  /* 스크롤바 숨기기 */
  overflow-y: scroll; /* 수직 스크롤바만 필요 시 표시 */
  &::-webkit-scrollbar {
    display: none; /* WebKit 브라우저 (Chrome, Safari)에서 스크롤바 숨기기 */
    width: 0;
    height: 0;
  }

  -ms-overflow-style: none; /* IE, Edge에서 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const MenuItem = styled.div`
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  border-radius: 50%;
  cursor: pointer;
  svg {
    width: 30px;
    fill: white;
  }
  &.log-out {
    border-color: tomato;
    svg {
      fill: tomato;
    }
  }
`;

export default function Layout() {
  const navigate = useNavigate();
  const onLogout = async () => {
    const ok = confirm("로그아웃하시겠습니까?");
    if (ok) {
      // 사용자가 "예"를 클릭했을때
      await auth.signOut(); // 로그아웃이 완료될때까지 기다리기
      navigate("/login");
    }
  };
  return (
    <Wrapper>
      <Menu>
        <Link to="/">
          <MenuItem>
            <HomeIcon />
          </MenuItem>
        </Link>
        <Link to="/profile">
          <MenuItem>
            <ProfileIcon />
          </MenuItem>
        </Link>
        <MenuItem onClick={onLogout} className="log-out">
          <LogoutIcon />
        </MenuItem>
      </Menu>
      <Container>
        <Outlet />
      </Container>
    </Wrapper>
  );
}
