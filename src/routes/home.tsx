import styled from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
import Tiemline from "../components/timeline";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  gap: 50px;
  grid-template-rows: 1fr 5fr;
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; // Edge, IE의 경우
  scrollbar-width: none; // FireFox의 경우
`;

export default function Home() {
  return (
    <Wrapper>
      <PostTweetForm />
      <Tiemline />
    </Wrapper>
  );
}
