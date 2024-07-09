import styled from "styled-components";
import { auth, database, storage } from "../firebase";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { ITweet } from "../components/timeline";
import Tweet from "../components/tweet";
import UserIcon from "../components/style/icon/user-icon";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

const AvatarUpload = styled.label`
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: 80px;
  border-radius: 50%;
  background-color: #1d9bf0;
  cursor: pointer;
  svg {
    width: 50px;
  }
`;

const AvatarImg = styled.img`
  width: 100%;
`;

const AvatarInput = styled.input`
  display: none;
`;

// 닉네임 변경 시작
const Name = styled.span`
  font-size: 22px;
`;

const EditContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const EditInput = styled.input`
  font-size: 16px;
  border-radius: 20px;
  border: 1px solid white;
  margin-right: 10px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: gray;
  padding-left: 5px;
  background-color: black;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const SaveButton = styled.button`
  border-radius: 20px;
  background-color: #1d9bf0;
  color: white;
`;

const CancelButton = styled.button`
  margin-left: 10px;
  border-radius: 20px;
  background-color: black;
  border: 1px solid tomato;
  color: tomato;
`;

// 닉네임 변경 끝

const Tweets = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;

const TWEET_LIMIT = 25;

/*
  주의
  프로필 컴포넌트에 존재하는 트윗 호출의 경우 timeline 컴포넌트와 같은
  로직이 아님. (QuerySnaoshot 사용 X)
  따라서 real time이 아니므로 트윗 삭제 혹은 변경 시 새로고침이 필요함.
*/
export default function Profile() {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  // 닉네임 수정중인지 여부
  const [isEditing, setIsEditing] = useState(false);

  // 아바타 이미지 변경
  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!user) return; // 사용자가 존재하지 않는다면 취소
    if (files && files.length === 1) {
      const file = files[0];
      // 사용자 이미지 크기 1MB 미만으로
      if (file.size < 1 * 1024 * 1024) {
        // avatar 폴더에 유저 ID로 유저 이미지 업로드 하기위한 reference 생성
        const locationRef = ref(storage, `avatar/${user?.uid}`);
        // 해당 reference와 file을 사용하여 이미지 업로드
        const result = await uploadBytes(locationRef, file);
        // 업로드한 이미지의 경로 호출
        const avatarURL = await getDownloadURL(result.ref);
        setAvatar(avatarURL);
        await updateProfile(user, {
          photoURL: avatarURL,
        });
      }
    }
  };

  // 닉네임 변경 모드
  const onChangeName = () => {
    setIsEditing(true);
  };

  // 닉네임 변경 input change handler
  const onDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  };

  // 닉네임 변경 - 완료
  const handleSaveClick = async () => {
    const ok = confirm("변경하시겠습니까?");
    if (!ok || !user) return;
    if (displayName.length > 8) {
      alert("닉네임은 8자 이내여야 합니다.");
      return;
    }
    try {
      await updateProfile(user, {
        displayName, // 닉네임 변경
      });
    } catch (e) {
      alert("변경에 실패하였습니다.");
      console.log("닉네임 변경 에러 : ", e);
    } finally {
      alert("변경되었습니다.");
      setIsEditing(false);
    }
  };

  // 닉네임 변경 - 취소
  const handleCancelClick = () => {
    setIsEditing(false);
  };

  // 컴포넌트 최초 마운트 데이터 불러오기
  const fetchTweets = async () => {
    const tweetQuery = query(
      // "tweets" collection에 있는 모든 트윗 중
      // collection 필드에 있는 userId와 현재 접속중인 user id가 동일한 트윗을
      // "createdAt" 필드 기준으로 내림차순 정렬, 25개까지
      collection(database, "tweets"),
      where("userId", "==", user?.uid),
      orderBy("createdAt", "desc"),
      limit(TWEET_LIMIT)
    );

    // 생성한 쿼리를 전송시켜 document 가져오기
    const snapshot = await getDocs(tweetQuery);
    const tweets = snapshot.docs.map((doc) => {
      const { tweet, createdAt, userId, username, photo } = doc.data();
      return {
        tweet,
        createdAt,
        userId,
        username,
        photo,
        id: doc.id,
      };
    });
    setTweets(tweets);
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <Wrapper>
      <AvatarUpload htmlFor="avatar">
        {avatar ? <AvatarImg src={avatar} /> : <UserIcon />}
      </AvatarUpload>
      <AvatarInput
        onChange={onAvatarChange}
        id="avatar"
        type="file"
        accept="image/*"
      />
      {!isEditing ? (
        <Name onClick={onChangeName}>
          {user?.displayName ? user.displayName : "Anonymous"}
        </Name>
      ) : (
        <EditContainer>
          <EditInput
            type="text"
            value={displayName}
            onChange={onDisplayNameChange}
            autoFocus
          />
          <ButtonContainer>
            <SaveButton onClick={handleSaveClick}>Save</SaveButton>
            <CancelButton onClick={handleCancelClick}>Cancel</CancelButton>
          </ButtonContainer>
        </EditContainer>
      )}
      <Tweets>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </Tweets>
    </Wrapper>
  );
}
