import { categories } from "./links-data.js";

const searchInput = document.querySelector("#searchInput");
const clearBtn = document.querySelector("#clearBtn");
const categoryTabs = document.querySelector("#categoryTabs");
const listContainer = document.querySelector("#listContainer");

const state = {
  activeCategory: "all",
  keyword: ""
};

const normalize = (value) => value.trim().toLowerCase();

const matchLink = (link, keyword) => {
  if (!keyword) return true;
  const bucket = [link.name, link.description, ...(link.tags || [])].join(" ").toLowerCase();
  return bucket.includes(keyword);
};

const buildTabs = () => {
  const entries = [{ id: "all", title: "全部" }, ...categories.map(({ id, title }) => ({ id, title }))];
  categoryTabs.innerHTML = entries
    .map(
      ({ id, title }) =>
        `<button class="tab ${state.activeCategory === id ? "active" : ""}" type="button" data-id="${id}">${title}</button>`
    )
    .join("");
};

const getFilteredCategories = () => {
  const keyword = state.keyword;
  const pool = state.activeCategory === "all" ? categories : categories.filter(({ id }) => id === state.activeCategory);
  return pool
    .map((category) => ({
      ...category,
      links: category.links.filter((link) => matchLink(link, keyword))
    }))
    .filter((category) => category.links.length > 0);
};

const renderLinks = () => {
  const result = getFilteredCategories();
  if (!result.length) {
    listContainer.innerHTML = `<article class="empty">没有找到符合条件的站点，换个关键词试试吧。</article>`;
    return;
  }

  listContainer.innerHTML = result
    .map(
      (category) => `
      <article class="category">
        <h2>${category.title}</h2>
        <p class="category-desc">${category.description}</p>
        <div class="links">
          ${category.links
            .map(
              (link) => `
            <a class="link-card" href="${link.url}" target="_blank" rel="noreferrer noopener">
              <span class="link-title">${link.name}</span>
              <span class="link-desc">${link.description}</span>
              <span class="meta">${(link.tags || []).map((tag) => `<span class="tag">${tag}</span>`).join("")}</span>
            </a>`
            )
            .join("")}
        </div>
      </article>`
    )
    .join("");
};

const bindEvents = () => {
  categoryTabs.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-id]");
    if (!button) return;
    state.activeCategory = button.dataset.id;
    buildTabs();
    renderLinks();
  });

  searchInput.addEventListener("input", (event) => {
    state.keyword = normalize(event.target.value);
    renderLinks();
  });

  clearBtn.addEventListener("click", () => {
    state.keyword = "";
    searchInput.value = "";
    renderLinks();
  });
};

buildTabs();
renderLinks();
bindEvents();
