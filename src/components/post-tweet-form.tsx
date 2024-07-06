import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components";
import { auth, database, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  width: 100%;
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

const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #1d9bf0;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #1d9bf0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const AttachFileInput = styled.input`
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

export default function PostTweetForm() {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // 트윗 입력창
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };

  // 파일 입력
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    // 여러개의 파일이 업로드 되는것을 방지한다.
    // e.target.files에 파일이 존재하며 그 파일이 1개라면 수행
    if (files && files.length === 1) {
      // 업로드한 파일의 크기가 1MB 미만이라면
      if (files[0].size < 1 * 1024 * 1024) {
        setFile(files[0]);
        console.log(files[0].size);
      } else {
        // 파일의 크기가 1MB보다 크다면
        alert("파일의 크기가 1MB보다 적어야 합니다.");
      }
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    // 로그인 X, 로딩중이거나, 트윗이 비어있거나, 180자가 넘으면 X
    if (!user || isLoading || tweet === "" || tweet.length > 180) return;
    try {
      setLoading(true);
      const doc = await addDoc(collection(database, "tweets"), {
        tweet,
        createdAt: Date.now(),
        // 닉네임이 존재하지 않는다면 (일부 SNS로 연동한 경우)
        username: user.displayName || "Anonymous",
        userId: user.uid,
      });
      // 파일 업로드가 되어있는 상태라면 -> storage에 저장
      if (file) {
        // 해당 파일을 "tweets/{유저ID}-{유저닉네임}/{트윗ID}" 경로에 저장한다. (없으면 생성)
        const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
        // locationRef에서 지정한 경로에 file을 업로드
        const result = await uploadBytes(locationRef, file);
        // 업로드한 이미지의 url 가져오기
        const url = await getDownloadURL(result.ref);
        // 업로드한 이미지(storage)를 트윗(firestore)에 추가
        await updateDoc(doc, {
          // firestore document에 photo 필드 추가
          photo: url,
        });
        // 업로드 성공 시 트윗 및 파일 입력창 초기화
        setTweet("");
        setFile(null);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <TextArea
        rows={5}
        maxLength={180}
        value={tweet}
        placeholder="무슨일이 있었나요?"
        onChange={onChange}
      />
      <AttachFileButton htmlFor="file">
        {file ? "Photo Added✅" : "Add Photo"}
      </AttachFileButton>
      <AttachFileInput
        type="file"
        id="file"
        accept="image/*"
        onChange={onFileChange}
      />
      <SubmitButton
        type="submit"
        value={isLoading ? "Posting..." : "Post Tweet"}
      />
    </Form>
  );
}
