import styled from "styled-components";
import { auth, storage } from "../firebase";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";

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

const AvatarImg = styled.img``;

const AvatarInput = styled.input`
  display: none;
`;

const Name = styled.span`
  font-size: 22px;
`;

export default function Profile() {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);
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
  return (
    <Wrapper>
      <AvatarUpload htmlFor="avatar">
        {avatar ? (
          <AvatarImg src={avatar} />
        ) : (
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
          </svg>
        )}
      </AvatarUpload>
      <AvatarInput
        onChange={onAvatarChange}
        id="avatar"
        type="file"
        accept="image/*"
      />
      <Name>{user?.displayName ? user.displayName : "Anonymous"}</Name>
    </Wrapper>
  );
}
