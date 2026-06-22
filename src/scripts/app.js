(function () {
  const routes = window.NAMU_ROUTES || [];
  const order = window.NAMU_CATEGORY_ORDER || [];

  const mount = document.querySelector("#routes");
  const empty = document.querySelector("#empty");
  const search = document.querySelector("#search");
  const toggle = document.querySelector(".toggle");

  let view = "all"; // "all" | "public"
  let query = "";

  function categories(list) {
    const seen = [...new Set(list.map((r) => r.category))];
    return seen.sort((a, b) => {
      const ia = order.indexOf(a);
      const ib = order.indexOf(b);
      return (ia < 0 ? 999 : ia) - (ib < 0 ? 999 : ib);
    });
  }

  function matches(route) {
    if (view === "public" && route.visibility !== "public") return false;
    if (!query) return true;
    const hay = `${route.title} ${route.desc} ${route.category}`.toLowerCase();
    return hay.includes(query);
  }

  function card(route) {
    const ready = route.url && route.url !== "#";
    const el = document.createElement(ready ? "a" : "div");
    el.className = "card" + (ready ? "" : " is-disabled");

    if (ready) {
      el.href = route.url;
      if (/^https?:\/\//.test(route.url)) {
        el.target = "_blank";
        el.rel = "noreferrer";
      }
    } else {
      el.setAttribute("aria-disabled", "true");
    }

    const title = document.createElement("span");
    title.className = "card__title";
    title.textContent = route.title;

    const desc = document.createElement("span");
    desc.className = "card__desc";
    desc.textContent = route.desc || "";

    const meta = document.createElement("span");
    meta.className = "card__meta";

    if (route.visibility === "private") {
      const lock = document.createElement("span");
      lock.className = "tag tag--private";
      lock.textContent = "개인";
      meta.append(lock);
    }
    const status = document.createElement("span");
    status.className = "tag tag--status";
    status.dataset.status = route.status || "";
    status.textContent = route.status || "";
    meta.append(status);

    el.append(title, desc, meta);
    return el;
  }

  function render() {
    const visible = routes.filter(matches);
    mount.innerHTML = "";

    if (!visible.length) {
      empty.hidden = false;
      return;
    }
    empty.hidden = true;

    categories(visible).forEach((cat) => {
      const items = visible.filter((r) => r.category === cat);
      if (!items.length) return;

      const section = document.createElement("section");
      section.className = "group";

      const head = document.createElement("h2");
      head.className = "group__title";
      head.textContent = cat;

      const count = document.createElement("span");
      count.className = "group__count";
      count.textContent = items.length;
      head.append(count);

      const grid = document.createElement("div");
      grid.className = "grid";
      items.forEach((r) => grid.append(card(r)));

      section.append(head, grid);
      mount.append(section);
    });
  }

  // 검색
  search.addEventListener("input", (e) => {
    query = e.target.value.trim().toLowerCase();
    render();
  });

  // "/" 로 검색 포커스, Esc 로 초기화
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== search) {
      e.preventDefault();
      search.focus();
    }
    if (e.key === "Escape" && document.activeElement === search) {
      search.value = "";
      query = "";
      search.blur();
      render();
    }
  });

  // 공개 범위 토글
  toggle.addEventListener("click", (e) => {
    const btn = e.target.closest(".toggle__btn");
    if (!btn) return;
    view = btn.dataset.view;
    toggle.querySelectorAll(".toggle__btn").forEach((b) =>
      b.classList.toggle("is-active", b === btn)
    );
    render();
  });

  render();
})();
