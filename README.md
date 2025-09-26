# 📋 TODO BOARD

칸반 보드 스타일의 할일 관리 애플리케이션입니다. 드래그 앤 드롭을 통해 태스크의 상태를 손쉽게 변경할 수 있어요. 총 4개 상태(진행전, 진행중, 완료, 아카이브)로 태스크를 관리해요.




https://github.com/user-attachments/assets/1fc54e71-00ee-453a-960a-da24e81afb0d




## 🚀 로컬 실행 방법

### version
```
- yarn : 1.22.17
- node : 22.13.0
```

### 1. 의존성 설치
```bash
yarn install
```

### 2. Mock 서버 실행
```bash
yarn server
```
Mock 서버가 `http://localhost:3001`에서 실행됩니다.

### 3. 프론트엔드 실행
```bash
yarn start
```
애플리케이션이 `http://localhost:3000`에서 실행됩니다. 서버 CORS 설정으로 인해 3000번 포트를 이용해야 합니다.

### 트러블슈팅
- `yarn install`시 패키지 설치가 안될 경우, 최상단에 있는 `yarn.lock`파일을 삭제 후 시도해보세요.



## ✨ 주요 기능

- 드래그 앤 드롭: 직관적인 상태 변경 - `@hello-pangea/dnd`
- 실시간 검색: 디바운싱을 활용한 효율적인 검색 - `es-toolkit`
- 스크롤 그림자: 스크롤 가능 여부를 시각적으로 표시 
- 모달 편집: 오버레이를 통한 할일 편집 - `framer-motion`, `overlay-kit`

  

## 🎯 기술 선택 이유

### react query
- `useInfiniteQuery`로 간편한 페이지네이션 구현 가능

### emtoion
- css-in-js 중 준수한 런타임 성능
- material ui와 같은디자인 시스템을 사용할 수 없는 한계로 인해 사용

### @hello-pangea/dnd
- `react-beautiful-dnd(deprecaated)` 숙련도가 높다보니 동일한 인터페이스를 제공해주는 해당 라이브러리 선택



## 📁 디렉토리 구조
```
src/
├── api/ # API 통신 로직
│ └── todoApi.ts # Todo CRUD API
├── components/ # 재사용 가능한 UI 컴포넌트
├── containers/ # 비동기 로직이 포함된 컴포넌트
├── hooks/ # 커스텀 훅
│ ├── useDebouncedValue.tsx # 디바운싱을 위한 유틸
│ ├── useScrollShadow.tsx # 칸반보드 컬럼 스크롤 시 상단/하단에 위치하는 그림자관련 계산 뢱
│ └── useTodoAction.tsx # Todo 관련 액션
├── mocks/ # Mock 서버 및 데이터
│ ├── handlers.ts
│ ├── mockData.ts # 초기값
│ ├── route.ts # Express 라우트
│ └── server.ts # Express 서버
└── types/ # ts interface 정의
```



## ⚠️ 제약사항 및 추가 작업
- 태스크를 드래그 앤 드롭으로 다른 상태로 변경 시 상태 드롭한 컬럼영역에서 index가 꼬이는 이슈
  - index 역시도 서버에 저장이 필요
  - 상태 영역별 sorting 기능 추가 필요 (index 갱신)
- 불필요한 api call
  - 태스크의 신규 생성 혹은 업데이트가 있을때마다 query key통해 리스트 조회 api 캐시 업데이트 (4개의 상태 모두 초기화됨)
  - 업데이트 상황에 맞게 필요한 query만 캐시 초기화 (ex. 신규 생성 후에는 `진행전` 상태 query만 초기화)
