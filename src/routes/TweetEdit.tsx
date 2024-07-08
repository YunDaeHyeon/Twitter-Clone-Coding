import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { auth, database, storage } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ITweet } from "../components/timeline";
import PhotoIcon from "../components/style/icon/photo-icon";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const TextArea = styled.textarea`
  width: 80%;
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: white;
  background-color: black;
  resize: none;
  &::placeholder {
    font-size: 16px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

const EditImgContainer = styled.div`
  width: 20%;
  border: 2px solid white;
  margin-left: 5px;
  border-radius: 5px;
`;

const EditImg = styled.img`
  width: 100%;
  height: 100%;
  background-size: cover;
`;

const EditFileButton = styled.label`
  padding: 10px 0px;
  color: #1d9bf0;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #1d9bf0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const EditFileInput = styled.input`
  display: none;
`;

const SubmitButton = styled.input`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.8;
  }
`;

const BackButton = styled.button`
  background-color: transparent;
  color: tomato;
  border: 1px solid tomato;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.8;
  }
`;
export default function TweetEdit() {
  // 수정하려는 트윗 ID
  const { tweetId } = useParams<{ tweetId: string }>();
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string>("");

  const navigate = useNavigate();

  // 트윗 입력창
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };

  // 파일 입력
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      if (files[0].size < 1 * 1024 * 1024) {
        console.log(files[0]);
        setFile(files[0]);
      } else {
        alert("파일의 크기가 1MB보다 적어야 합니다.");
      }
    }
  };

  // 수정
  const onEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    const ok = confirm("수정하시겠습니까?");
    if (!ok || !user || isLoading || tweet === "" || tweet.length > 180) return;
    try {
      setLoading(true);
      await updateDoc(doc(database, `tweets/${tweetId}`), {
        tweet,
        createdAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId: user.uid,
      });
      if (file) {
        const locationRef = ref(storage, `tweets/${user.uid}/${tweetId}`);
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc(database, `tweets/${tweetId}`), {
          photo: url,
        });
        setTweet("");
        setFile(null);
        alert("수정되었습니다.");
      }
    } catch (e) {
      console.log(e);
      alert("트윗 수정에 실패하였습니다.");
    } finally {
      setLoading(false);
      navigate("/");
    }
  };

  // 뒤로가기
  const onBackClick = () => {
    const ok = confirm("취소하시겠습니까?");
    if (ok) {
      navigate("/");
    }
  };

  // 최초 컴포넌트 마운트 시 트윗 데이터 로드
  useEffect(() => {
    const fetchTweet = async () => {
      try {
        const snapshot = await getDoc(doc(database, `tweets/${tweetId}`));
        // 해당 문서가 존재한다면
        if (snapshot.exists()) {
          const tweetData = snapshot.data() as ITweet;
          setTweet(tweetData.tweet);
          setImage(tweetData.photo || "");
        }
      } catch (e) {
        console.log("데이터를 불러오는데 실패하였습니다.", e);
      }
    };
    fetchTweet();
    // 트윗 ID 변경 감지
  }, [tweetId]);

  return (
    <Form onSubmit={onEditSubmit}>
      <Container>
        <TextArea
          rows={5}
          maxLength={180}
          value={tweet}
          placeholder="무슨일이 있었나요?"
          onChange={onChange}
        />
        <EditImgContainer>
          {image ? <EditImg src={image} /> : <PhotoIcon />}
        </EditImgContainer>
      </Container>
      <EditFileButton htmlFor="file">
        {file ? "Photo Changed✅" : "Change Photo"}
      </EditFileButton>
      <EditFileInput
        type="file"
        id="file"
        accept="image/*"
        onChange={onFileChange}
      />
      <SubmitButton
        type="submit"
        value={isLoading ? "Editing..." : "Edit Post Tweet"}
      />
      <BackButton type="button" onClick={onBackClick}>
        Go Home
      </BackButton>
    </Form>
  );
}
