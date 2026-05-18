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
      link.className = isReady ? "route-card" : "route-card is-disabled";

      if (isReady) {
        link.href = item.url;
        link.target = "_blank";
        link.rel = "noreferrer";
      } else {
        link.setAttribute("aria-disabled", "true");
      }

      const text = document.createElement("div");
      text.className = "route-card-text";

      const label = document.createElement("span");
      label.className = "route-label";
      label.textContent = item.label;

      const desc = document.createElement("span");
      desc.className = "route-description";
      desc.textContent = item.description;

      text.append(label, desc);

      const meta = document.createElement("span");
      meta.className = isReady ? "route-meta" : "route-meta pending";
      meta.textContent = isReady ? "이동" : item.status || "준비 중";

      link.append(text, meta);
      links.append(link);
    });

    groupElement.append(links);
    fragment.append(groupElement);
  });

  mount.append(fragment);
})();
