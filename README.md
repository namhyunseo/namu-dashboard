# Namu Dashboard

개인 블로그, 포트폴리오, 개발 프로젝트, 디자인 시안, 클라이언트 공유 페이지로 이동하는 정적 링크 허브입니다.

Live site: https://namhyunseo.github.io/namu-dashboard/

## Folder Structure

```text
.
├── index.html
├── src
│   ├── data
│   │   ├── designs.js
│   │   └── links.js
│   ├── scripts
│   │   ├── designs.js
│   │   └── app.js
│   └── styles
│       ├── base.css
│       └── layout.css
├── designs
│   └── index.html
├── projects
│   ├── index.html
│   └── ava-trip
│       ├── index.html
│       ├── docs
│       ├── research
│       └── meetings
├── .nojekyll
├── .gitignore
└── README.md
```

## Update Links

새로운 도메인이나 페이지를 추가할 때는 `src/data/links.js`만 수정하면 됩니다.

```js
{
  title: "Project Name",
  label: "프로젝트 이름",
  description: "방문자에게 보여줄 짧은 설명",
  url: "https://example.com",
  status: "운영 중"
}
```

`url`이 `"#"`이면 버튼은 준비 중 상태로 표시됩니다. 실제 주소를 넣으면 새 탭으로 이동합니다.

## Update Design Previews

프로젝트별 디자인 시안은 `src/data/designs.js`에서 관리합니다.

```js
{
  title: "프로젝트명",
  client: "클라이언트명",
  status: "검토 중",
  updatedAt: "2026-05-18",
  description: "시안 설명",
  url: "https://figma.com/...",
  note: "공유 범위나 버전 메모"
}
```

`url`이 `"#"`이면 링크 준비 중 상태로 표시됩니다.

## GitHub Pages

GitHub Pages에서는 저장소의 `main` 브랜치 루트(`/`)를 배포 대상으로 설정하면 됩니다.

## Update Project Share Pages

관광공모전처럼 팀 공유가 필요한 프로젝트 문서는 `projects/{project-id}/` 아래에 정적 HTML로 정리합니다. 프로젝트 선택 목록은 `projects/index.html`에서 관리하며, 현재 아바트립 자료는 `projects/ava-trip/`에서 관리합니다. 메인 허브의 `Projects` 링크는 `src/data/links.js`에서 연결합니다.
