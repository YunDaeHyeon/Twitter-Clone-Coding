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

const Name = styled.span`
  font-size: 22px;
`;

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
      <Name>{user?.displayName ? user.displayName : "Anonymous"}</Name>
      <Tweets>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </Tweets>
    </Wrapper>
  );
}
