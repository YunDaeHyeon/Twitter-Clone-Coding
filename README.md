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
- 2024년 6월 19일 기준  
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
+---src
    |   App.tsx
    |   firebase.ts
    |   main.tsx
    |   
    +---components
    |       layout.tsx
    |       loading-screen.tsx
    |       
    +---routes
            create-account.tsx
            home.tsx
            login.tsx
            profile.tsx
```