# 🔥트위터 클론코딩

    해당 프로젝트는 트위터의 트윗(Tweet) 업로드 및 수정에 집중하여 효과적으로 TypeScript와 Firebase를 학습하고자 진행한 프로젝트입니다.

- 해당 저장소는 (구)트위터 클론코딩에 따른 코드들을 기록합니다.
- 플랫폼 : VS Code
- 기간 : 2024.06.17 ~ ing
- 에러노트 및 개념정리 : [트위터 클론코딩](https://daegom.notion.site/9a523c6a1e4f45e39651021e8cecf8d2?pvs=74)
- 배포주소 : [twitter-clone](https://twitter-clone-95820.web.app)

# 💡개요 및 설명

- 해당 저장소는 트위터 기능 구현에 따른 코드들을 기록합니다.
- 프로젝트 기간 : `2024.06.17` ~ `2024.07.08`
- 프로젝트 노션(Notion) : [트위터 클론코딩](https://daegom.notion.site/9a523c6a1e4f45e39651021e8cecf8d2?pvs=74)

# 💡배포 링크 및 사진

- 배포 주소 : [twitter-clone](https://twitter-clone-95820.web.app)
- 프로젝트 이미지
  <img width="983" alt="스크린샷 2024-07-11 오후 6 29 18" src="https://github.com/YunDaeHyeon/Twitter-Clone-Coding/assets/62231651/a3d0aa25-2656-4b66-be05-66d8cce650f7">
  <img width="983" alt="스크린샷 2024-07-11 오후 6 30 50" src="https://github.com/YunDaeHyeon/Twitter-Clone-Coding/assets/62231651/07a946eb-2afe-4442-8be5-575ca5de9728">

# 💡진행 팀원

| <img src="https://avatars.githubusercontent.com/u/62231651?v=4" width="150" height="150"/> |
| :----------------------------------------------------------------------------------------: |
|              Daehyeon Yun<br/>[@YunDaeHyeon](https://github.com/YunDaeHyeon)               |

# 🪜폴더 구조

```
+ twitter-reloaded
|   .env
|   .eslintrc.cjs
|   .gitignore
|   .firebaserc
|   firebase.json
|   env.d.ts
|   index.html
|   package-lock.json
|   package.json
|   README.md
|   tree_output.txt
|   tsconfig.json
|   tsconfig.node.json
|   vite.config.ts
|
+---src
    |   App.tsx
    |   firebase.ts
    |   main.tsx
    |
    +---components
    |       |
    |       |
    |       +---style
    |            |  loginAndAccount-styled.ts
    |            |
    |            +---icon
    |                   home-icon.tsx
    |                   logout-icon.tsx
    |                   photo-icon.tsx
    |                   profile-icon.tsx
    |                   user-icon.tsx
    |
    |       github-connection.tsx
    |       layout.tsx
    |       loading-screen.tsx
    |       post-tweet-form.tsx
    |       protected-route.tsx
    |       timeline.tsx
    |       tweets.tsx
    |
    +---routes
            create-account.tsx
            find-password.tsx
            home.tsx
            login.tsx
            profile.tsx
            TweetEdit.tsx
```

# 🛠️스택 및 라이브버리

## Front

<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>  
<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>  
<img src="https://img.shields.io/badge/Vite-FFCA28?style=flat-square&logo=Vite&logoColor=red"/>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white"/>  
<img src="https://img.shields.io/badge/styled components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>

## Back & Deploy

<img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black"/>

## Dependencies

- nodejs v20.14.8
- vite v5.2.3 + typescript + swc
- react-router-dom v6.14.2
- style-reset
- styled-components@6.0.7
- @types/styled-components -D
- firebase v10.12.2

# 💡Git Commit Convention

- Feat : 새로운 기능을 추가할 경우
- Fix : 버그를 고친 경우
- Design : CSS 등 사용자 UI 디자인 변경
- !BREAKING CHANGE : 커다란 API 변경의 경우
- !HOTFIX : 급하게 치명적인 버그를 고쳐야하는 경우
- Style - 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우
- Refactor : 프로덕션 코드 리팩토링
- Comment : 필요한 주석 추가 및 변경
- Docs : 문서를 수정한 경우
- Test : 테스트 추가, 테스트 리팩토링(프로덕션 코드 변경 X)
- Chore : 빌드 태스트 업데이트, 패키지 매니저를 설정하는 경우(프로덕션 코드 변경 X)
- Rename : 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우
- Remove : 파일을 삭제하는 작업만 수행한 경우

# 💡후기

    군 복무 후, 잊고 있던 프론트엔드 지식을 되찾기 위해 노마드코더님의 강의를 보며 조금씩 학습을 시작했습니다. 처음에는 다소 생소했지만 점점 실력이 늘어나는 것을 느끼며 다시금 개발의 재미를 느낄 수 있던 것 같습니다.
    특히, Vite라는 새로운 프레임워크를 처음 사용해본 경험은 매우 인상적이었습니다. 러닝커브가 거의 없어 빠르게 사용법을 익힐 수 있었고, 그 결과 개발 과정이 정말 재미있었습니다. 또한 평소에는 RDBMS 기반 프로젝트와 공부만 해왔었지만 Firebase는 정말 신세계였습니다. NoSQL 기반 RealTime 데이터베이스와 클라우드 기반 개발 방식은 정말 매력적으로 느껴졌던 것 같습니다.
    앞으로도 꾸준한 학습과 실습을 토대로 즐거운 개발 생활을 진행하고 싶습니다. >_<

## 🤔구현한 기능

- Vite(클라이언트 사이드)에서의 환경변수 관리
- React Router를 이용한 프로젝트 라우팅
- TypeScript를 이용한 타입 정의 방법
- Firebase를 이용한 인증처리 (회원가입, 로그인, 로그아웃, 인증된 사용자만 접근 등)
- Firebase에서의 Github Authentication Login
- Firebase를 이용한 비밀번호 재설정 (이메일 전송)
- FireStore, Storage를 이용한 트윗과 이미지, 프로필 작성, 수정, 삭제
- Firebase를 이용한 프로젝트 Deploy
