import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { database } from "../firebase";
import Tweet from "./tweet";

// Tweet의 타입을 정의
export interface ITweet{
    id: string;
    // "?" 는 해당 변수가 반드시 있을 필요 없다라는 의미
    photo?: string;
    tweet: string;
    userId: string;
    username: string;
    createdAt: number;
}

const Wrapper = styled.div`
    
`;

export default function Tiemline(){
    // 트윗 데이터를 저장할 상태를 정의
    const [tweets, setTweets] = useState<ITweet[]>([]);

    // firestore에서 트윗 데이털르 가져오는 비동기 처리
    const fetchTweets = async() => {

        // firestore에서 "tweets" 이라는 collection을 호출하여 "createdAt" 필드 기준으로
        // 내림차순(desc) 정렬. (오름차순 = asc)
        const tweetsQuery = query(
            collection(database, "tweets"),
            orderBy("createdAt", "desc")
        );
        // 위에서 정의한 쿼리를 실행시켜 데이터를 호출
        const spanshot = await getDocs(tweetsQuery);
        // 스냅샷에서 각 document를 트윗 객체로 전환
        const tweets = spanshot.docs.map(doc => {
            // firestore document에서 각 트윗 데이터를 구조분해 할당
            const {tweet, createdAt, userId, username, photo} = doc.data();
            return{
                tweet,      // 트윗 내용 
                createdAt,  // 생성 시간
                userId,     // 작성자 ID
                username,   // 작성자 이름
                photo,      // 트윗에 첨부된 사진
                id: doc.id  // 트윗의 문서 ID (고유 식별자, document ID = tweet ID)
            }
        });

        // 생성한 트윗 객체를 상태로 저장
        setTweets(tweets);
    }
    
    // 컴포넌트가 마운트 될 때 트윗 데이터 호출
    useEffect(() => {
        fetchTweets();
    },[]); // 빈 배열 = 컴포넌트가 처음 마운트될 때 실행

    return(
        <Wrapper>
            {tweets.map((tweet) => (
                <Tweet key={tweet.id} {...tweet}/>
            ))}
        </Wrapper>
    )
}