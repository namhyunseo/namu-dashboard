(function renderDesignProjects() {
  const mount = document.querySelector("#design-list");
  const count = document.querySelector("#design-count");
  const projects = window.NAMU_DESIGN_PROJECTS || [];

  if (!mount) return;

  if (count) {
    count.textContent = `${projects.length}개`;
  }

  const fragment = document.createDocumentFragment();

  projects.forEach((project) => {
    const isReady = project.url && project.url !== "#";
    const card = document.createElement("article");
    card.className = "design-card";

    const header = document.createElement("div");
    header.className = "design-card-header";

    const titleBlock = document.createElement("div");
    titleBlock.className = "design-title-block";

    const title = document.createElement("h3");
    title.textContent = project.title;

    const client = document.createElement("p");
    client.textContent = project.client;

    titleBlock.append(title, client);

    const status = document.createElement("span");
    status.className = `design-status ${getStatusClass(project.status)}`;
    status.textContent = project.status;

    header.append(titleBlock, status);

    const description = document.createElement("p");
    description.className = "design-description";
    description.textContent = project.description;

    const meta = document.createElement("div");
    meta.className = "design-meta";

    const updatedAt = document.createElement("span");
    updatedAt.textContent = `업데이트 ${project.updatedAt}`;

    const note = document.createElement("span");
    note.textContent = project.note;

    meta.append(updatedAt, note);

    const action = document.createElement(isReady ? "a" : "span");
    action.className = isReady ? "design-action" : "design-action is-disabled";
    action.textContent = isReady ? "시안 보기" : "링크 준비 중";

    if (isReady) {
      action.href = project.url;
      action.target = "_blank";
      action.rel = "noreferrer";
    }

    card.append(header, description, meta, action);
    fragment.append(card);
  });

  mount.append(fragment);
})();

function getStatusClass(status) {
  if (status === "검토 중") return "review";
  if (status === "완료") return "done";
  if (status === "보관") return "archived";
  return "pending";
}
