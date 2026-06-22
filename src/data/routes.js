// Namu Dashboard — 전체 진실은 이 파일 하나.
// 새 링크 추가/수정은 여기만 고치면 된다.
//
// category   : 화면에서 묶이는 그룹 (사이트 / 진행 프로젝트 / 외주 / 아카이브 / 도구)
// visibility : "public"  공개 뷰에서도 보임
//              "private" 개인 뷰에서만 보임
// status     : "운영중" | "준비중" | "종료"
// url        : 항상 바깥으로 나가는 링크. 대시보드 내부에 페이지를 두지 않는다.

window.NAMU_ROUTES = [
  {
    category: "사이트",
    title: "Blog",
    desc: "개발 기록과 생각을 남기는 공간",
    url: "https://namhyunseo.github.io",
    visibility: "public",
    status: "운영중",
  },
  {
    category: "사이트",
    title: "Portfolio",
    desc: "대표 작업물과 소개",
    url: "#",
    visibility: "public",
    status: "준비중",
  },
  {
    category: "진행 프로젝트",
    title: "AVA-Trip",
    desc: "제주 여행 플래너 프로젝트",
    url: "#",
    visibility: "private",
    status: "운영중",
  },
  {
    category: "외주",
    title: "Loen",
    desc: "로엔 사이트 작업",
    url: "#",
    visibility: "private",
    status: "운영중",
  },
  {
    category: "외주",
    title: "OTT포럼 — 실사진 시안",
    desc: "포럼 실사진 적용 디자인 시안 (navy/origin 베이스)",
    url: "https://namhyunseo.github.io/previews/ott-forum/photo/",
    visibility: "public",
    status: "운영중",
  },
  {
    category: "아카이브",
    title: "Lab",
    desc: "실험과 테스트 모음",
    url: "#",
    visibility: "private",
    status: "준비중",
  },
];

// 카테고리 표시 순서 (여기 없는 카테고리는 뒤에 자동 추가)
window.NAMU_CATEGORY_ORDER = ["사이트", "진행 프로젝트", "외주", "도구", "아카이브"];
