(function renderRouteHub() {
  const mount = document.querySelector("#route-list");
  const groups = window.NAMU_LINK_GROUPS || [];

  if (!mount) return;

  const fragment = document.createDocumentFragment();

  groups.forEach((group) => {
    const groupElement = document.createElement("article");
    groupElement.className = "route-group";

    const groupHeader = document.createElement("header");
    groupHeader.className = "route-group-header";

    const titleWrap = document.createElement("div");

    const title = document.createElement("h2");
    title.textContent = group.title;

    const description = document.createElement("p");
    description.textContent = group.description;

    titleWrap.append(title, description);
    groupHeader.append(titleWrap);
    groupElement.append(groupHeader);

    const links = document.createElement("div");
    links.className = "route-items";

    group.links.forEach((item) => {
      const isReady = item.url && item.url !== "#";
      const link = document.createElement(isReady ? "a" : "div");
      link.className = isReady ? "route-card route-row" : "route-card route-row is-disabled";
      link.dataset.label = item.label;
      link.dataset.description = item.description;
      link.dataset.url = isReady ? item.url : "";
      link.dataset.status = item.status || (isReady ? "이동" : "준비 중");

      if (isReady) {
        link.href = item.url;
        if (/^https?:\/\//.test(item.url)) {
          link.target = "_blank";
          link.rel = "noreferrer";
        }
      } else {
        link.setAttribute("aria-disabled", "true");
      }

      const text = document.createElement("div");
      text.className = "route-card-text";

      const icon = document.createElement("span");
      icon.className = "route-icon";
      icon.textContent = getRouteIcon(group.id, item.url);

      const label = document.createElement("span");
      label.className = "route-label";
      label.textContent = item.label;

      const desc = document.createElement("span");
      desc.className = "route-description";
      desc.textContent = item.description;

      text.append(label, desc);

      const meta = document.createElement("span");
      meta.className = isReady ? "route-meta" : "route-meta pending";
      meta.textContent = item.shortcut || item.status || (isReady ? "이동" : "준비 중");

      const action = document.createElement("span");
      action.className = isReady ? "route-action" : "route-action pending";
      action.textContent = item.status || (isReady ? "이동" : "준비 중");

      link.append(icon, text, meta, action);
      links.append(link);
    });

    groupElement.append(links);
    fragment.append(groupElement);
  });

  mount.append(fragment);
})();

(function renderWorkspaceTree() {
  const mount = document.querySelector("#workspace-tree");
  const groups = window.NAMU_LINK_GROUPS || [];

  if (!mount) return;

  const fragment = document.createDocumentFragment();

  groups.forEach((group) => {
    const groupElement = document.createElement("section");
    groupElement.className = "tree-group";

    const title = document.createElement("h2");
    title.className = "tree-group-title";
    title.textContent = group.title.toLowerCase();
    groupElement.append(title);

    const list = document.createElement("div");
    list.className = "tree-items";

    group.links.forEach((item) => {
      const isReady = item.url && item.url !== "#";
      const route = document.createElement(isReady ? "a" : "span");
      route.className = isReady ? "tree-item" : "tree-item is-disabled";
      route.dataset.label = item.label;
      route.dataset.description = item.description;
      route.dataset.url = isReady ? item.url : "";
      route.dataset.status = item.status || (isReady ? "이동" : "준비 중");

      if (isReady) route.href = item.url;

      const icon = document.createElement("span");
      icon.className = "tree-icon";
      icon.textContent = getRouteIcon(group.id, item.url);

      const name = document.createElement("span");
      name.textContent = `${item.title}.link`;

      route.append(icon, name);
      list.append(route);
    });

    groupElement.append(list);
    fragment.append(groupElement);
  });

  mount.append(fragment);
})();

(function setupRouteInspector() {
  const title = document.querySelector("#inspector-current-title");
  const description = document.querySelector("#inspector-current-desc");
  const action = document.querySelector("#inspector-current-link");
  const routes = document.querySelectorAll(".route-row, .tree-item");

  if (!title || !description || !action || !routes.length) return;

  function updateInspector(route) {
    title.textContent = route.dataset.label || "선택 없음";
    description.textContent = route.dataset.description || "";

    if (route.dataset.url) {
      action.href = route.dataset.url;
      action.textContent = "open route";
      action.classList.remove("is-disabled");
      action.removeAttribute("aria-disabled");
    } else {
      action.removeAttribute("href");
      action.textContent = route.dataset.status || "pending";
      action.classList.add("is-disabled");
      action.setAttribute("aria-disabled", "true");
    }
  }

  routes.forEach((route) => {
    route.addEventListener("pointerenter", () => updateInspector(route));
    route.addEventListener("focus", () => updateInspector(route));
  });
})();

(function setupCommandPalette() {
  const groups = window.NAMU_LINK_GROUPS || [];
  const palette = document.querySelector("#command-palette");
  const openButton = document.querySelector("#command-open");
  const input = document.querySelector("#command-search");
  const results = document.querySelector("#command-results");

  if (!palette || !openButton || !input || !results) return;

  const routes = groups.flatMap((group) =>
    group.links.map((item) => ({
      ...item,
      group: group.title,
      isReady: item.url && item.url !== "#",
    })),
  );

  function renderResults(query = "") {
    const keyword = query.trim().toLowerCase();
    const visibleRoutes = routes.filter((route) => {
      if (!keyword) return true;
      return [route.title, route.label, route.description, route.group]
        .join(" ")
        .toLowerCase()
        .includes(keyword);
    });

    results.replaceChildren();

    visibleRoutes.forEach((route) => {
      const item = document.createElement(route.isReady ? "a" : "div");
      item.className = route.isReady ? "command-item" : "command-item is-disabled";

      if (route.isReady) {
        item.href = route.url;
      } else {
        item.setAttribute("aria-disabled", "true");
      }

      const text = document.createElement("span");
      text.className = "command-item-text";
      text.innerHTML = `<strong>${route.label}</strong><small>${route.group} · ${route.description}</small>`;

      const status = document.createElement("span");
      status.className = route.isReady ? "command-status" : "command-status pending";
      status.textContent = route.status || "이동";

      item.append(text, status);
      results.append(item);
    });
  }

  function openPalette() {
    palette.hidden = false;
    renderResults();
    requestAnimationFrame(() => input.focus());
  }

  function closePalette() {
    palette.hidden = true;
    input.value = "";
  }

  openButton.addEventListener("click", openPalette);
  input.addEventListener("input", () => renderResults(input.value));
  palette.addEventListener("click", (event) => {
    if (event.target.matches("[data-command-close]")) closePalette();
  });
  document.addEventListener("keydown", (event) => {
    const isCommandSearch = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
    if (isCommandSearch) {
      event.preventDefault();
      openPalette();
    }
    if (event.key === "Escape" && !palette.hidden) closePalette();
  });
})();

function getRouteIcon(groupId, url) {
  if (url === "#") return "○";
  if (groupId === "main") return "◇";
  if (groupId === "client") return "◆";
  return "△";
}
