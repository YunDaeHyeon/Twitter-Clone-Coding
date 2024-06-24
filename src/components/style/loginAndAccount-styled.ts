import styled from "styled-components";

// login, create-account component에서 사용되는 스타일 정의
export const Wrapper = styled.div`
    height: 100export default ;
    width: 420px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 0px;
`;

export const Title = styled.h1`
    font-size: 42px;
`;
 
export const Form = styled.form`
    width: 100%;
    margin-top: 50px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const Input = styled.input`
    width: 100%;
    padding: 10px 20px;
    border-radius: 50px;
    border: none;
    font-size: 16px;
    &[type="submit"]{
        // 만약, input의 type이 submit이라면 cursor를 pointer로 변경
        background-color: #1d9bf0;
        color: white;
        font-weight: bold;
        cursor: pointer;
        &:hover{ // 만약 마우스가 hover 상태라면
            opacity: 0.8;;
        }
    }
`;

export const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

export const Switcher = styled.span`
    margin-top: 20px;
    a{
        color: #1d9bf0;
    }
`;