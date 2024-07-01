# 트위터 클론 코딩
## ✏ 개요
- 해당 저장소는 (구)트위터 클론코딩에 따른 코드들을 기록합니다.  
- 플랫폼 : VS Code  
- 기간 : 2024.06.17 ~ ing  
- 에러노트 및 개념정리 : [트위터 클론코딩](https://daegom.notion.site/9a523c6a1e4f45e39651021e8cecf8d2?pvs=74)  
---  
## 🛠 세팅
- nodejs v20.14.8  
- vite v5.2.3 + typescript + swc  
- react-router-dom v6.14.2  
- style-reset  
- styled-components@6.0.7  
- @types/styled-components -D  
- firebase v10.12.2  
---  
## 🛠 스택
- React  
- Firebase  
- npm  
- Github Pages  
- Vite + TypeScript + SWC  
---
## 프로젝트 구조
- 2024년 7월 1일 기준  
```
+ twitter-reloaded
|   .env
|   .eslintrc.cjs
|   .gitignore
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
    |               loginAndAccount-styled.ts
    |
    |       layout.tsx
    |       loading-screen.tsx
    |       post-tweet-form.tsx
    |       protected-route.tsx
    |       github-connection.tsx
    |       
    +---routes
            create-account.tsx
            find-password.tsx
            home.tsx
            login.tsx
            profile.tsx
```
---
## Git Commit Convention
- Feat - 새로운 기능을 추가할 경우  
- Fix - 버그를 고친 경우  
- Design - CSS 등 사용자 UI 디자인 변경  
- !BREAKING CHANGE - 커다란 API 변경의 경우  
- !HOTFIX - 급하게 치명적인 버그를 고쳐야하는 경우  
- Style - 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우  
- Refactor - 프로덕션 코드 리팩토링  
- Comment - 필요한 주석 추가 및 변경  
- Docs - 문서를 수정한 경우  
- Test - 테스트 추가, 테스트 리팩토링(프로덕션 코드 변경 X)  
- Chore - 빌드 태스트 업데이트, 패키지 매니저를 설정하는 경우(프로덕션 코드 변경 X)  
- Rename - 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우  
- Remove - 파일을 삭제하는 작업만 수행한 경우  