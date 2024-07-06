import {
  Unsubscribe,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { database } from "../firebase";
import Tweet from "./tweet";

// Tweet의 타입을 정의
export interface ITweet {
  id: string;
  // "?" 는 해당 변수가 반드시 있을 필요 없다라는 의미
  photo?: string;
  tweet: string;
  userId: string;
  username: string;
  createdAt: number;
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  overflow-y: scroll;
`;

const TWEET_LIMIT = 25;

export default function Tiemline() {
  // 트윗 데이터를 저장할 상태를 정의
  const [tweets, setTweets] = useState<ITweet[]>([]);

  // 컴포넌트가 마운트 될 때 트윗 데이터 호출
  useEffect(() => {
    // Unsubscribe 혹은 null를 가진다.
    let unsubscribe: Unsubscribe | null = null;
    // firestore에서 트윗 데이털르 가져오는 비동기 처리
    const fetchTweets = async () => {
      // firestore에서 "tweets" 이라는 collection을 호출하여 "createdAt" 필드 기준으로
      // 내림차순(desc) 정렬. (오름차순 = asc)
      const tweetsQuery = query(
        collection(database, "tweets"),
        orderBy("createdAt", "desc"),
        limit(TWEET_LIMIT) // 25개의 collection만 호출
      );

      // tweetsQuery에 리스너 추가
      unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
        // firestore에 있는 document에 실시간으로 변동될 시 해당 document를 array로 반환
        const tweets = snapshot.docs.map((doc) => {
          // firestore document에서 각 트윗 데이터를 구조분해 할당
          const { tweet, createdAt, userId, username, photo } = doc.data();
          return {
            tweet, // 트윗 내용
            createdAt, // 생성 시간
            userId, // 작성자 ID
            username, // 작성자 이름
            photo, // 트윗에 첨부된 사진
            id: doc.id, // 트윗의 문서 ID (고유 식별자, document ID = tweet ID)
          };
        });
        // 생성한 트윗 객체를 상태로 저장
        setTweets(tweets);
      });
    };
    fetchTweets();
    // useEffect의 clean up
    return () => {
      // unsubscribe가 null이 아니면 호출 (리스너 구독 취소)
      unsubscribe && unsubscribe();
    };
  }, []); // 빈 배열 = 컴포넌트가 처음 마운트될 때 실행

  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </Wrapper>
  );
}
