# My Travel Planner

### 👨‍🏫프로젝트 소개
---
__My Travel Planner__ 은 사용자가 지도와 다양한 추천 패널을 통해 여행 명소를 추천받고, 
그 정보를 바탕으로 여행 계획을 세울 수 있는 풀스택 웹 애플리케이션입니다.
여행을 다녀온 후에는 여행 일지를 작성할 수 있는 기능도 제공하고 있습니다.

### 🧾목차
---
1. 프로젝트 개요
2. 기술 스택
3. Front-End
   + 설치 및 실행
   + 구조
   + 주요 기능

### 📝프로젝트 개요
---
이 프로젝트는 __React.js__ 와 __Node.js__ 기반의 풀스택 애플리케이션입니다. 프론트엔드는 사용자의 요청을 받아 백엔드 서버와 통신하고, 백엔드는 데이터베이스와 상호작용하여 데이터를 처리하고 응답합니다.

### 🔧기술 스택
---
__Front-End__: React, Redux, Tailwind CSS, Axios

__Back-End__: Node.js, PostgreSQL

__Database__: PostgreSQL

__Version Control__: Git, GitHub

### 🖥️Front-End
---
프론트엔드는 __React__ 기반으로 구축되었으며, 사용자에게 동적인 웹 인터페이스를 제공합니다. __Redux__ 를 통해 상태 관리를 하고, __Axios__ 를 사용하여 백엔드 API와 통신합니다.

#### Front-End 설치 및 실행
---
1. 프로젝트의 __front-end__ 폴더로 이동합니다.
2. 필요한 패키지를 설치합니다:
<img src="./src/assets/프론트 설치 실행 과정 1.PNG">
3. 애플리케이션을 실행합니다:
<img src="./src/assets/프론트 설치 실행 과정 2.PNG">
4. http://localhost:3000 에서 애플리케이션을 확인할 수 있습니다.

#### Front-End 구조
---
```
front-end/
│
├── public/                # 정적 파일 (favicon, index.html 등)
├── src/
│   ├── assets/            # 이미지, 아이콘 등
│   ├── components/        # 재사용 가능한 UI 컴포넌트
│   │   ├── Auth/          # 인증 관련 컴포넌트
│   │   ├── CalendarPage/  # 달력 페이지 컴포넌트
│   │   ├── Home/          # 홈 페이지 컴포넌트
│   │   ├── Map/           # 지도 관련 컴포넌트
│   │   ├── Planner/       # 여행 플래너 관련 컴포넌트
│   │   ├── Project/       # 프로젝트 관련 컴포넌트
│   │   ├── Footer.jsx     # 푸터 컴포넌트
│   │   ├── Modal.jsx      # 모달 컴포넌트
│   │   ├── Navbar.jsx     # 네비게이션 바 컴포넌트
│   │   ├── PlannerBar.jsx # 플래너 바 컴포넌트
│   │   ├── Sidebar.jsx    # 사이드바 컴포넌트
│   │   └── SlideSection.jsx # 슬라이드 섹션 컴포넌트
│   │
│   ├── constants/         # 상수 파일 및 mock 데이터
│   │   └── mockData.js    # 가짜 데이터 파일
│   │
│   ├── redux/             # Redux 상태 관리
│   │   ├── slices/        # Redux 슬라이스 (리듀서 및 액션)
│   │   └── store.js       # Redux 스토어 설정
│   │
│   ├── utils/             # 유틸리티 함수 및 API 메서드
│   │   ├── apiUrl.js      # API URL 관리
│   │   └── requestMethods.js # HTTP 요청 메서드 관리
│   │
│   ├── App.js             # 메인 앱 컴포넌트
│   ├── index.css          # 전역 스타일
│   └── index.js           # ReactDOM 렌더링 시작점
│
├── package.json           # 프로젝트 메타데이터 및 의존성
└── README.md              # 프로젝트 설명서
```

#### Front-End 주요 기능
---
1. __사용자 인증__
   + 사용자 로그인 및 회원가입 기능.

3. __여행 명소 추천__
   + 사용자의 위치나 선호도에 기반하여, 여행 명소와 관광지를 지도에 표시합니다.
   + 인공지능 또는 추천 알고리즘을 통해 사용자 맞춤형 명소를 추천합니다.

4. __실시간 지도 탐색__
   + 사용자는 지도에서 여행지를 선택하고, 해당 위치에 대한 정보를 실시간으로 확인할 수 있습니다.
   + 마커 및 정보 창을 통해 각 명소에 대한 상세 정보를 제공합니다.

5. __여행 일정 관리__
   + 사용자가 여행 날짜를 선택하고, 각 날짜에 맞는 여행 일정을 관리할 수 있습니다.
   + 캘린더 UI와 연동되어 일정을 쉽게 추가, 수정, 삭제할 수 있습니다.
