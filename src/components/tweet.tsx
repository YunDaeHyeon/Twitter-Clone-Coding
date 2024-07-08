import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, database, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const Column = styled.div``;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
  margin-bottom: 30px;
`;

const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const EditButton = styled.button`
  background-color: cadetblue;
  color: white;
  font-weight: 600;
  border: 0;
  margin-left: 5px;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

export default function Tweet({ userId, id, username, photo, tweet }: ITweet) {
  const navigate = useNavigate();
  const user = auth.currentUser;

  // 트윗 삭제
  const onDelete = async () => {
    const ok = confirm("정말 삭제하시겠습니까?");
    // 해당 트윗 작성자가 아니거나 삭제를 원하지 않는다면 함수 종료
    if (!ok || user?.uid !== userId) return;
    try {
      // 해당 firestore에 존재하는 "tweets" 경로에 존재하는 document ID(id)를 삭제
      await deleteDoc(doc(database, "tweets", id));
      // 삭제하고자 하는 트윗에 이미지가 존재하면
      if (photo) {
        // 이미지 id와 트윗 id는 동일하다는 것을 이용
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // 트윗 수정
  const onEdit = () => {
    const ok = confirm("수정하시겠습니까?");
    if (!ok || user?.uid !== userId) return;
    navigate(`/${id}`);
  };

  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        <Payload>{tweet}</Payload>
        {
          // user?.uid = user객체가 존재하면 user.uid 반환, 존재하지 않으면 undefined 반환
          // 해당 트윗에 작성자라면 delete 버튼 활성화
          user?.uid === userId ? (
            <Column>
              <DeleteButton onClick={onDelete}>Delete</DeleteButton>
              <EditButton onClick={onEdit}>Edit</EditButton>
            </Column>
          ) : null
        }
      </Column>
      <Column>
        {
          // 사진이 존재한다면 출력, 그렇지 않다면 공백
          photo ? <Photo src={photo} /> : null
        }
      </Column>
    </Wrapper>
  );
}
