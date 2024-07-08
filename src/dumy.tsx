import styled from "styled-components";
import { auth } from "./firebase";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

const Name = styled.span`
  font-size: 22px;
`;

export default function Profile() {
  const user = auth.currentUser;

  return (
    <Wrapper>
      <Name>{user?.displayName ? user.displayName : "Anonymous"}</Name>
    </Wrapper>
  );
}
