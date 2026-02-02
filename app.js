const STORAGE_KEY = "3dpkentiku-mock";

const placeholderSvg =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%23111927'/%3E%3Cstop offset='1' stop-color='%230c1220'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='320' height='320' fill='url(%23g)'/%3E%3Cpath d='M0 40h320M0 80h320M0 120h320M0 160h320M0 200h320M0 240h320M0 280h320' stroke='%231c2435' stroke-width='1'/%3E%3Cpath d='M40 0v320M80 0v320M120 0v320M160 0v320M200 0v320M240 0v320M280 0v320' stroke='%231c2435' stroke-width='1'/%3E%3Crect x='70' y='90' width='180' height='140' rx='10' fill='rgba(69,99,163,0.22)' stroke='%234b6fd1' stroke-width='2'/%3E%3C/svg%3E";

const seedData = {
  project: { id: "project-1", name: "3DPKENTIKU" },
  objects: [
    {
      id: "Obj-001",
      name: "渋谷スカイタワー計画",
      description: "外壁パネルA",
      preview: "previews/object-1.png",
      createdAt: "2026/02/01 10:12",
      updatedAt: "2026/02/03 09:10",
      logs: [
        "2026/02/01 10:12 佐藤 健太 オブジェクトを追加",
        "2026/02/02 09:32 佐藤 健太 データを整理",
        "2026/02/03 09:10 佐藤 健太 分割データを確認",
      ],
    },
    {
      id: "Obj-002",
      name: "大阪ウォーターフロント計画",
      description: "コア筒体B",
      preview: "previews/object-2.png",
      createdAt: "2026/02/01 11:04",
      updatedAt: "2026/02/03 08:42",
      logs: [
        "2026/02/01 11:04 山田 太郎 オブジェクトを追加",
        "2026/02/02 15:20 山田 太郎 データ置換を実施",
        "2026/02/03 08:42 山田 太郎 分割データの確認依頼",
      ],
    },
  ],
  splits: [
    {
      id: "Split-001",
      objectId: "Obj-001",
      status: "draft",
      coords: "x:0–120, y:0–80, z:0–60",
      description: "北面外壁セクション",
      preview: "previews/split-1.png",
      confirmedAt: "",
      updatedAt: "2026/02/03 09:12",
      logs: [
        "2026/02/01 10:20 山田 太郎 (x:0–120,y:0–80,z:0–60)で分割データを生成",
        "2026/02/01 10:22 山田 太郎 分割データをダウンロード",
      ],
    },
    {
      id: "Split-002",
      objectId: "Obj-001",
      status: "confirmed",
      coords: "x:120–240, y:0–80, z:0–60",
      description: "南面外壁セクション",
      preview: "previews/split-2.png",
      confirmedAt: "2026/02/02 13:40",
      updatedAt: "2026/02/03 09:02",
      logs: [
        "2026/02/02 13:40 山田 太郎 分割データを確定",
        "2026/02/02 13:55 山田 太郎 パーツを追加（作業場所：北西コーナー）",
        "2026/02/02 14:10 山田 太郎 パーツファイルを置換",
        "2026/02/02 14:12 山田 太郎 パーツを作成完了に変更",
      ],
    },
    {
      id: "Split-003",
      objectId: "Obj-001",
      status: "conflict",
      coords: "x:110–230, y:0–80, z:0–60",
      description: "北面外壁セクション（重なり）",
      preview: "previews/split-3.png",
      confirmedAt: "",
      updatedAt: "2026/02/03 08:55",
      logs: [
        "2026/02/02 16:00 山田 太郎 分割データの座標を調整",
        "2026/02/02 16:05 山田 太郎 重なりを検知",
      ],
    },
    {
      id: "Split-101",
      objectId: "Obj-002",
      status: "confirmed",
      coords: "x:0–140, y:0–90, z:0–65",
      description: "低層部コア筒体",
      preview: "previews/split-1.png",
      confirmedAt: "2026/02/02 14:15",
      updatedAt: "2026/02/03 09:01",
      logs: [
        "2026/02/02 14:15 佐藤 健太 分割データを確定",
        "2026/02/02 15:10 佐藤 健太 パーツを追加（作業場所：コア南面）",
      ],
    },
  ],
  parts: [
    {
      id: "Part-001",
      splitId: "Split-002",
      name: "北西コーナー基礎",
      description: "連結部の補強パネル",
      location: "北西コーナー基礎",
      status: "inProgress",
      preview: "previews/part-1.png",
      uploaded: false,
      logs: [
        "2026/02/02 13:55 山田 太郎 パーツを追加（作業場所：北西コーナー）",
      ],
      fileHistory: [
        { date: "2026/02/02", user: "山田 太郎", file: "core-nw-v1.step" },
      ],
    },
    {
      id: "Part-002",
      splitId: "Split-002",
      name: "開口部補強",
      description: "外壁開口部の補強パネル",
      location: "南面開口部",
      status: "done",
      preview: "previews/part-2.png",
      uploaded: true,
      logs: [
        "2026/02/02 14:12 山田 太郎 パーツを作成完了に変更",
      ],
      fileHistory: [
        { date: "2026/02/02", user: "山田 太郎", file: "opening-reinforce-v2.step" },
        { date: "2026/02/03", user: "山田 太郎", file: "opening-reinforce-v3.step" },
      ],
    },
    {
      id: "Part-101",
      splitId: "Split-101",
      name: "コア南面パネル",
      description: "中層部の補強パネル",
      location: "コア南面",
      status: "inProgress",
      preview: "previews/part-3.png",
      uploaded: false,
      logs: [
        "2026/02/02 15:10 佐藤 健太 パーツを追加（作業場所：コア南面）",
      ],
      fileHistory: [
        { date: "2026/02/02", user: "佐藤 健太", file: "core-south-v1.step" },
      ],
    },
  ],
  listStatus: {
    "Split-002": false,
    "Split-101": false,
  },
};

const state = loadState();

const routes = {
  objects: "/formwork/objects",
};

const headerEl = document.getElementById("page-header");
const contentEl = document.getElementById("page-content");
const modalRoot = document.getElementById("modal-root");
const modalBackdrop = document.getElementById("modal-backdrop");
const toastContainer = document.getElementById("toast-container");

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (_) {
      return structuredClone(seedData);
    }
  }
  return structuredClone(seedData);
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function formatNow() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  return `${y}/${m}/${d} ${hh}:${mm}`;
}

function toast(message) {
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = message;
  toastContainer.appendChild(el);
  setTimeout(() => {
    el.remove();
  }, 3000);
}

function navigate(path) {
  history.pushState({}, "", path);
  render();
}

window.addEventListener("popstate", render);

function getPath() {
  const cleaned = location.pathname.replace(/\/index\.html$/, "");
  if (cleaned.includes("/formwork/")) {
    return cleaned;
  }
  return routes.objects;
}

function getObjectById(id) {
  return state.objects.find((obj) => obj.id === id);
}

function getSplitById(id) {
  return state.splits.find((split) => split.id === id);
}

function getPartsBySplitId(id) {
  return state.parts.filter((part) => part.splitId === id);
}

function getProgressBySplit(id) {
  const parts = getPartsBySplitId(id);
  const total = parts.length;
  const done = parts.filter((part) => part.status === "done").length;
  return { done, total };
}

function renderHeader({ title, subtitle, breadcrumbs, actions }) {
  const breadcrumbHtml = breadcrumbs
    ? `<div class="breadcrumbs">${breadcrumbs
        .map((crumb) => `<span>${crumb}</span>`)
        .join("")}</div>`
    : "";

  headerEl.innerHTML = `
    <div class="header-title">
      <h1>${title}</h1>
      ${subtitle ? `<p>${subtitle}</p>` : ""}
      ${breadcrumbHtml}
    </div>
    <div class="header-actions">${actions || ""}</div>
  `;
}

function render() {
  const path = getPath();
  modalRoot.innerHTML = "";
  closeModal();

  if (path === routes.objects) {
    renderObjects();
    return;
  }

  const splitRouteMatch = path.match(/\/formwork\/objects\/([^/]+)\/splits/);
  if (splitRouteMatch) {
    renderSplits(splitRouteMatch[1]);
    return;
  }

  const partsRouteMatch = path.match(/\/formwork\/splits\/([^/]+)\/parts/);
  if (partsRouteMatch) {
    renderParts(partsRouteMatch[1]);
    return;
  }

  navigate(routes.objects);
}

function renderObjects() {
  renderHeader({
    title: "型枠作成リスト",
    subtitle: "オブジェクト一覧",
    actions: `<button class="button primary" id="add-object">オブジェクトの追加</button>`,
  });

  const cards = state.objects
    .map((obj) => {
      const splits = state.splits.filter((split) => split.objectId === obj.id);
      const totalParts = splits.reduce((sum, split) => sum + getProgressBySplit(split.id).total, 0);
      const doneParts = splits.reduce((sum, split) => sum + getProgressBySplit(split.id).done, 0);

      return `
        <article class="card">
          <div class="card-row">
            <div class="preview">
              <img src="${obj.preview}" alt="${obj.name}" onerror="this.src='${placeholderSvg}'" onload="this.parentElement.classList.add('loaded')" />
              <div class="fallback">プレビュー</div>
            </div>
            <div class="info-block">
              <div class="info-title">
                <span data-id="${obj.id}" class="object-name">${obj.name}</span>
                <button class="icon-button edit-object" data-id="${obj.id}">✎</button>
              </div>
              <div class="info-meta">${obj.description}</div>
              <div class="info-meta">分割データ：${splits.length}件</div>
              <div class="info-meta">パーツ：${doneParts}/${totalParts}</div>
              <div class="log-box">${obj.logs
                .map((log) => `<div class="log-line">${log}</div>`)
                .join("")}</div>
            </div>
            <div class="button-stack">
              <button class="button secondary" data-action="open-splits" data-id="${obj.id}">詳細を開く</button>
              <button class="button outline" data-action="replace-object" data-id="${obj.id}">データ置換</button>
              <button class="button outline" data-action="download-object" data-id="${obj.id}">ダウンロード</button>
              <button class="button outline" data-action="archive-object" data-id="${obj.id}">アーカイブ</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  contentEl.innerHTML = `
    <div class="chips">
      <div class="chip">変更日↑</div>
      <div class="chip">作成日↑</div>
      <div class="chip">オブジェクト名↑</div>
    </div>
    <div class="card-stack">${cards}</div>
  `;

  document.getElementById("add-object").addEventListener("click", () => {
    const nextIndex = state.objects.length + 1;
    const id = `Obj-${String(nextIndex).padStart(3, "0")}`;
    state.objects.push({
      id,
      name: `新規オブジェクト ${nextIndex}`,
      description: "追加されたオブジェクト",
      preview: "previews/object-1.png",
      createdAt: formatNow(),
      updatedAt: formatNow(),
      logs: [`${formatNow()} 佐藤 健太 オブジェクトを追加`],
    });
    saveState();
    toast("オブジェクトを追加しました");
    renderObjects();
  });

  contentEl.querySelectorAll("[data-action='open-splits']").forEach((btn) => {
    btn.addEventListener("click", () => {
      navigate(`/formwork/objects/${btn.dataset.id}/splits`);
    });
  });

  bindObjectActions();
}

function bindObjectActions() {
  contentEl.querySelectorAll(".edit-object").forEach((btn) => {
    btn.addEventListener("click", () => {
      const obj = getObjectById(btn.dataset.id);
      const nameEl = contentEl.querySelector(`.object-name[data-id='${obj.id}']`);
      const input = document.createElement("input");
      input.className = "inline-edit";
      input.value = obj.name;
      nameEl.replaceWith(input);
      input.focus();
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          obj.name = input.value.trim() || obj.name;
          obj.updatedAt = formatNow();
          obj.logs.unshift(`${formatNow()} 佐藤 健太 オブジェクト名を更新`);
          saveState();
          renderObjects();
        }
      });
      input.addEventListener("blur", () => renderObjects());
    });
  });

  contentEl.querySelectorAll("[data-action='replace-object']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const obj = getObjectById(btn.dataset.id);
      obj.logs.unshift(`${formatNow()} 佐藤 健太 データ置換を実施`);
      obj.updatedAt = formatNow();
      saveState();
      toast("データ置換を実行しました");
      renderObjects();
    });
  });

  contentEl.querySelectorAll("[data-action='download-object']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const obj = getObjectById(btn.dataset.id);
      obj.logs.unshift(`${formatNow()} 佐藤 健太 データをダウンロード`);
      saveState();
      toast("ダウンロードを開始しました");
      renderObjects();
    });
  });

  contentEl.querySelectorAll("[data-action='archive-object']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const obj = getObjectById(btn.dataset.id);
      obj.logs.unshift(`${formatNow()} 佐藤 健太 アーカイブを実行`);
      saveState();
      toast("アーカイブしました");
      renderObjects();
    });
  });
}

function renderSplits(objectId) {
  const obj = getObjectById(objectId);
  if (!obj) {
    navigate(routes.objects);
    return;
  }

  renderHeader({
    title: "型枠作成リスト",
    subtitle: null,
    breadcrumbs: ["オブジェクト一覧", "分割データ一覧"],
    actions: `<button class="button primary" id="add-split">分割データの追加</button>`,
  });

  const splits = state.splits.filter((split) => split.objectId === objectId);
  const cards = splits
    .map((split) => {
      const { done, total } = getProgressBySplit(split.id);
      const progressWidth = total === 0 ? 0 : Math.round((done / total) * 100);
      const isDraft = split.status === "draft";
      const isConfirmed = split.status === "confirmed";
      const isConflict = split.status === "conflict";
      const bannerText = isDraft
        ? "分割データを確定させてください"
        : isConfirmed
        ? "パーツを登録してください"
        : "他の分割データと座標が重なっています";
      const bannerClass = isDraft ? "" : isConfirmed ? "warning" : "danger";
      const actionLabel = isDraft || isConflict ? "分割データを確定" : "編集中にもどす";

      return `
        <article class="card">
          <div class="card-row">
            <div class="preview">
              <img src="${split.preview}" alt="${split.id}" onerror="this.src='${placeholderSvg}'" onload="this.parentElement.classList.add('loaded')" />
              <div class="fallback">プレビュー</div>
            </div>
            <div class="info-block">
              <div class="info-meta">分割データ確定日：${split.confirmedAt || ""}</div>
              <div class="info-meta">最終編集日：${split.updatedAt}</div>
              <div class="info-title">
                <span>${split.coords}</span>
                <button class="icon-button" disabled>✎</button>
              </div>
              <div class="info-meta">${split.description}</div>
              <div class="progress">
                <div>${done}/${total}</div>
                <div class="progress-bar"><span style="width:${progressWidth}%"></span></div>
              </div>
              <div class="banner ${bannerClass}">${bannerText}</div>
              <div class="log-box">${split.logs
                .map((log) => `<div class="log-line">${log}</div>`)
                .join("")}</div>
            </div>
            <div class="button-stack">
              <button class="button secondary" data-action="open-parts" data-id="${split.id}">詳細を開く</button>
              <button class="button outline" data-action="toggle-split" data-id="${split.id}" ${
                isConflict ? "disabled" : ""
              }>${actionLabel}</button>
              <button class="button outline" data-action="replace-split" data-id="${split.id}">データ置換</button>
              <button class="button outline" data-action="download-split" data-id="${split.id}">ダウンロード</button>
              <button class="button outline" data-action="archive-split" data-id="${split.id}">アーカイブ</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  contentEl.innerHTML = `
    <div class="chips">
      <div class="chip">変更日↑</div>
      <div class="chip">確定日↑</div>
      <div class="chip">座標↑</div>
      <div class="chip">データ説明↑</div>
    </div>
    <div class="card-grid">${cards}</div>
  `;

  document.getElementById("add-split").addEventListener("click", () => {
    const nextIndex = state.splits.length + 1;
    const id = `Split-${String(nextIndex).padStart(3, "0")}`;
    state.splits.push({
      id,
      objectId,
      status: "draft",
      coords: "x:0–120, y:0–80, z:0–60",
      description: "追加された分割データ",
      preview: "previews/split-1.png",
      confirmedAt: "",
      updatedAt: formatNow(),
      logs: [`${formatNow()} 佐藤 健太 分割データを生成`],
    });
    saveState();
    toast("分割データを追加しました");
    renderSplits(objectId);
  });

  contentEl.querySelectorAll("[data-action='open-parts']").forEach((btn) => {
    btn.addEventListener("click", () => {
      navigate(`/formwork/splits/${btn.dataset.id}/parts`);
    });
  });

  bindSplitActions(objectId);
}

function bindSplitActions(objectId) {
  contentEl.querySelectorAll("[data-action='toggle-split']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const split = getSplitById(btn.dataset.id);
      if (split.status === "conflict") return;
      if (split.status === "draft") {
        split.status = "confirmed";
        split.confirmedAt = formatNow();
        split.logs.unshift(`${formatNow()} 山田 太郎 分割データを確定`);
      } else {
        split.status = "draft";
        split.logs.unshift(`${formatNow()} 山田 太郎 編集中にもどす`);
      }
      split.updatedAt = formatNow();
      saveState();
      renderSplits(objectId);
    });
  });

  contentEl.querySelectorAll("[data-action='replace-split']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const split = getSplitById(btn.dataset.id);
      split.logs.unshift(`${formatNow()} 山田 太郎 データ置換を実施`);
      split.updatedAt = formatNow();
      saveState();
      toast("データ置換を実行しました");
      renderSplits(objectId);
    });
  });

  contentEl.querySelectorAll("[data-action='download-split']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const split = getSplitById(btn.dataset.id);
      split.logs.unshift(`${formatNow()} 山田 太郎 分割データをダウンロード`);
      saveState();
      toast("ダウンロードを開始しました");
      renderSplits(objectId);
    });
  });

  contentEl.querySelectorAll("[data-action='archive-split']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const split = getSplitById(btn.dataset.id);
      split.logs.unshift(`${formatNow()} 山田 太郎 アーカイブを実行`);
      saveState();
      toast("アーカイブしました");
      renderSplits(objectId);
    });
  });
}

function renderParts(splitId) {
  const split = getSplitById(splitId);
  if (!split) {
    navigate(routes.objects);
    return;
  }

  const progress = getProgressBySplit(splitId);
  const progressWidth = progress.total === 0 ? 0 : Math.round((progress.done / progress.total) * 100);
  const listDone = state.listStatus[splitId];

  renderHeader({
    title: "型枠作成リスト",
    subtitle: null,
    breadcrumbs: ["オブジェクト一覧", "分割データ一覧", "パーツ作成リスト"],
    actions: `
      <button class="button secondary" id="open-versions">バージョン一覧</button>
      <button class="button primary" id="complete-list">リスト作成完了</button>
    `,
  });

  const parts = getPartsBySplitId(splitId);
  const combinedLogs = [
    ...split.logs,
    ...parts.flatMap((part) => part.logs.slice(0, 2)),
  ].slice(0, 10);
  const cards = parts
    .map((part) => {
      return `
        <article class="card">
          <div class="card-row">
            <div class="preview" style="width:140px;height:140px;">
              <img src="${part.preview}" alt="${part.name}" onerror="this.src='${placeholderSvg}'" onload="this.parentElement.classList.add('loaded')" />
              <div class="fallback">プレビュー</div>
            </div>
            <div class="info-block">
              <div class="info-title">
                <span data-part="${part.id}" class="part-name">${part.name}</span>
                <button class="icon-button edit-part" data-id="${part.id}">✎</button>
              </div>
              <div class="info-meta">${part.description}</div>
              <div class="info-meta">利用箇所：${part.location}</div>
              <div class="log-box">${part.logs
                .map((log) => `<div class="log-line">${log}</div>`)
                .join("")}</div>
            </div>
            <div class="button-stack">
              <button class="button secondary" data-action="toggle-part" data-id="${part.id}">${
                part.status === "done" ? "作成中にもどす" : "パーツ作成完了"
              }</button>
              <button class="button outline" data-action="detail-part" data-id="${part.id}">詳細を開く</button>
              <button class="button outline" data-action="upload-part" data-id="${part.id}">アップロード</button>
              <button class="button outline" data-action="download-part" data-id="${part.id}">ダウンロード</button>
              <button class="button outline" data-action="code-part" data-id="${part.id}">コードダウンロード</button>
              <button class="button outline" data-action="duplicate-part" data-id="${part.id}">複製</button>
              <button class="button outline" data-action="delete-part" data-id="${part.id}">削除</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  contentEl.innerHTML = `
    <div class="version-row">
      <div class="status-label">適応中</div>
      <div class="version-meta">
        <div>${split.confirmedAt ? split.confirmedAt.split(" ")[0] : "2026/02/02"} / バージョン 1.0.0</div>
        <div class="badge">${listDone ? "作成完了" : "リスト作成中"}</div>
      </div>
      <div class="progress">
        <div>${progress.done}/${progress.total}</div>
        <div class="progress-bar"><span style="width:${progressWidth}%"></span></div>
      </div>
    </div>

    <div class="log-box">${combinedLogs
      .map((log) => `<div class="log-line">${log}</div>`)
      .join("")}</div>

    <div class="parts-header">
      <div></div>
      <button class="button secondary" id="open-add-part">パーツの追加</button>
    </div>

    <div class="chips">
      <div class="chip">変更日↑</div>
      <div class="chip">確定日↑</div>
      <div class="chip">座標↑</div>
      <div class="chip">データ説明↑</div>
    </div>
    <div class="card-stack">${cards}</div>
  `;

  document.getElementById("open-versions").addEventListener("click", () => openVersionModal());
  document.getElementById("open-add-part").addEventListener("click", () => openAddPartModal(splitId));
  document.getElementById("complete-list").addEventListener("click", () => {
    state.listStatus[splitId] = true;
    split.logs.unshift(`${formatNow()} 山田 太郎 リスト作成を完了`);
    saveState();
    toast("リスト作成完了に更新しました");
    renderParts(splitId);
  });

  bindPartActions(splitId);
}

function bindPartActions(splitId) {
  contentEl.querySelectorAll(".edit-part").forEach((btn) => {
    btn.addEventListener("click", () => {
      const part = state.parts.find((p) => p.id === btn.dataset.id);
      const nameEl = contentEl.querySelector(`.part-name[data-part='${part.id}']`);
      const input = document.createElement("input");
      input.className = "inline-edit";
      input.value = part.name;
      nameEl.replaceWith(input);
      input.focus();
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          part.name = input.value.trim() || part.name;
          part.logs.unshift(`${formatNow()} 山田 太郎 パーツ名を更新`);
          saveState();
          renderParts(splitId);
        }
      });
      input.addEventListener("blur", () => renderParts(splitId));
    });
  });

  contentEl.querySelectorAll("[data-action='toggle-part']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const part = state.parts.find((p) => p.id === btn.dataset.id);
      part.status = part.status === "done" ? "inProgress" : "done";
      part.logs.unshift(
        `${formatNow()} 山田 太郎 パーツを${part.status === "done" ? "作成完了" : "作成中"}に変更`
      );
      saveState();
      renderParts(splitId);
    });
  });

  contentEl.querySelectorAll("[data-action='detail-part']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const part = state.parts.find((p) => p.id === btn.dataset.id);
      openPartDetailModal(part, splitId);
    });
  });

  contentEl.querySelectorAll("[data-action='upload-part']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const part = state.parts.find((p) => p.id === btn.dataset.id);
      part.uploaded = true;
      part.logs.unshift(`${formatNow()} 山田 太郎 パーツファイルを置換`);
      saveState();
      toast("アップロードを反映しました");
      renderParts(splitId);
    });
  });

  contentEl.querySelectorAll("[data-action='download-part']").forEach((btn) => {
    btn.addEventListener("click", () => {
      toast("ダウンロードを開始しました");
    });
  });

  contentEl.querySelectorAll("[data-action='code-part']").forEach((btn) => {
    btn.addEventListener("click", () => {
      toast("コードをダウンロードしました");
    });
  });

  contentEl.querySelectorAll("[data-action='duplicate-part']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const part = state.parts.find((p) => p.id === btn.dataset.id);
      const nextIndex = state.parts.length + 1;
      const id = `Part-${String(nextIndex).padStart(3, "0")}`;
      state.parts.push({
        ...part,
        id,
        name: `${part.name}（複製）`,
        status: "inProgress",
        logs: [`${formatNow()} 山田 太郎 パーツを複製`],
      });
      saveState();
      toast("パーツを複製しました");
      renderParts(splitId);
    });
  });

  contentEl.querySelectorAll("[data-action='delete-part']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = state.parts.findIndex((p) => p.id === btn.dataset.id);
      state.parts.splice(index, 1);
      saveState();
      toast("パーツを削除しました");
      renderParts(splitId);
    });
  });
}

function openPartDetailModal(part, splitId) {
  const modalId = "part-detail-modal";
  const historyRows = part.fileHistory
    .map(
      (row) => `
      <tr>
        <td>${row.date}</td>
        <td>${row.user}</td>
        <td>${row.file}</td>
      </tr>
    `
    )
    .join("");

  modalRoot.innerHTML = `
    <div class="modal open" id="${modalId}">
      <div class="modal-header">
        <div class="modal-title">パーツ詳細</div>
        <button class="icon-button" data-close="modal">✕</button>
      </div>
      <div class="modal-body modal-grid">
        <div class="card-stack">
          <button class="button secondary" id="mark-done">パーツ作成を完了する</button>
          <div class="field">
            <label>パーツ名</label>
            <input type="text" value="${part.name}" id="detail-name" />
          </div>
          <div class="field">
            <label>パーツの説明</label>
            <textarea id="detail-desc">${part.description}</textarea>
          </div>
          <div class="info-meta">この分割データに利用されている数：4</div>
          <div class="info-meta">利用パス一覧</div>
          <div class="log-box">
            <div class="log-line">${part.name}_${splitId}_1.0.0_${part.location}</div>
            <div class="log-line">${part.name}_${splitId}_1.0.0_${part.location}_copy</div>
            <div class="log-line">${part.name}_${splitId}_0.9.0_${part.location}</div>
          </div>
        </div>
        <div class="card-stack">
          <div class="preview" style="width:100%;height:220px;">
            <img src="${part.preview}" alt="${part.name}" onerror="this.src='${placeholderSvg}'" onload="this.parentElement.classList.add('loaded')" />
            <div class="fallback">プレビュー</div>
          </div>
          <div class="field">
            <label>ファイルの置換</label>
            <div class="log-box" style="height:120px; display:flex; align-items:center; justify-content:center;">ドラッグ&ドロップ</div>
            <button class="button outline" id="replace-file">ファイル選択</button>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th>日付</th>
                <th>ユーザー</th>
                <th>ファイル名</th>
              </tr>
            </thead>
            <tbody id="history-body">${historyRows}</tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  openModal(modalId);

  document.getElementById("mark-done").addEventListener("click", () => {
    part.status = "done";
    part.logs.unshift(`${formatNow()} 山田 太郎 パーツを作成完了に変更`);
    saveState();
    toast("パーツを作成完了にしました");
    renderParts(splitId);
    closeModal();
  });

  document.getElementById("replace-file").addEventListener("click", () => {
    const newRow = {
      date: formatNow().split(" ")[0],
      user: "山田 太郎",
      file: `part-${Date.now()}.step`,
    };
    part.fileHistory.unshift(newRow);
    part.logs.unshift(`${formatNow()} 山田 太郎 パーツファイルを置換`);
    saveState();
    openPartDetailModal(part, splitId);
  });

  document.getElementById("detail-name").addEventListener("change", (event) => {
    part.name = event.target.value.trim() || part.name;
    saveState();
  });

  document.getElementById("detail-desc").addEventListener("change", (event) => {
    part.description = event.target.value.trim() || part.description;
    saveState();
  });
}

function openAddPartModal(splitId) {
  const otherParts = state.parts.filter((part) => part.splitId !== splitId);
  const modalId = "add-part-modal";

  modalRoot.innerHTML = `
    <div class="modal open" id="${modalId}">
      <div class="modal-header">
        <div class="modal-title">パーツの追加</div>
        <button class="icon-button" data-close="modal">✕</button>
      </div>
      <div class="modal-body">
        <div class="tabs">
          <button class="tab active" data-tab="existing">既存パーツを選択する</button>
          <button class="tab" data-tab="new">新しいパーツを追加する</button>
        </div>
        <div class="modal-grid">
            <div class="card-stack scroll-list" id="existing-list">
            ${otherParts
              .map(
                (part) => `
                <div class="card" data-select="${part.id}">
                  <div class="card-row" style="grid-template-columns: 120px 1fr;">
                    <div class="preview" style="width:120px;height:120px;">
                      <img src="${part.preview}" alt="${part.name}" onerror="this.src='${placeholderSvg}'" onload="this.parentElement.classList.add('loaded')" />
                      <div class="fallback">プレビュー</div>
                    </div>
                    <div class="info-block">
                      <div class="info-title">${part.name}</div>
                      <div class="info-meta">${part.description}</div>
                    </div>
                  </div>
                </div>
              `
              )
              .join("")}
          </div>
          <div class="card-stack">
            <div class="field">
              <label>パーツ名</label>
              <input type="text" id="new-part-name" placeholder="例：北西コーナー基礎" />
            </div>
            <div class="field">
              <label>作業場所（利用箇所）</label>
              <input type="text" id="new-part-location" placeholder="例：北西コーナー" />
            </div>
            <div class="field">
              <label>パーツの説明</label>
              <textarea id="new-part-desc" placeholder="説明を入力"></textarea>
            </div>
            <button class="button primary" id="confirm-add">決定</button>
          </div>
        </div>
      </div>
    </div>
  `;

  openModal(modalId);

  let selectedPartId = null;

  modalRoot.querySelectorAll("[data-select]").forEach((card) => {
    card.addEventListener("click", () => {
      modalRoot.querySelectorAll("[data-select]").forEach((c) => c.classList.remove("selected"));
      card.classList.add("selected");
      selectedPartId = card.dataset.select;
      const selected = state.parts.find((p) => p.id === selectedPartId);
      modalRoot.querySelector("#new-part-name").value = selected.name;
      modalRoot.querySelector("#new-part-location").value = selected.location;
      modalRoot.querySelector("#new-part-desc").value = selected.description;
    });
  });

  modalRoot.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      modalRoot.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });

  modalRoot.querySelector("#confirm-add").addEventListener("click", () => {
    const name = modalRoot.querySelector("#new-part-name").value || "新規パーツ";
    const location = modalRoot.querySelector("#new-part-location").value || "利用箇所未設定";
    const desc = modalRoot.querySelector("#new-part-desc").value || "追加されたパーツ";
    const nextIndex = state.parts.length + 1;
    const id = `Part-${String(nextIndex).padStart(3, "0")}`;
    state.parts.push({
      id,
      splitId,
      name,
      description: desc,
      location,
      status: "inProgress",
      preview: "previews/part-1.png",
      uploaded: false,
      logs: [`${formatNow()} 山田 太郎 パーツを追加（作業場所：${location}）`],
      fileHistory: [{ date: formatNow().split(" ")[0], user: "山田 太郎", file: "new-part.step" }],
    });
    const split = getSplitById(splitId);
    split.logs.unshift(`${formatNow()} 山田 太郎 パーツを追加（作業場所：${location}）`);
    saveState();
    toast("パーツを追加しました");
    closeModal();
    renderParts(splitId);
  });
}

function openVersionModal() {
  const modalId = "version-modal";
  modalRoot.innerHTML = `
    <div class="modal open" id="${modalId}">
      <div class="modal-header">
        <div class="modal-title">バージョン一覧</div>
        <button class="icon-button" data-close="modal">✕</button>
      </div>
      <div class="modal-body">
        <table class="table">
          <thead>
            <tr>
              <th>作成日</th>
              <th>バージョン名</th>
              <th>パーツ（完了/総数）</th>
              <th>ステータス</th>
              <th>適応</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2026/02/02</td>
              <td>1.0.0</td>
              <td>7/12</td>
              <td>リスト作成中</td>
              <td>☑</td>
            </tr>
            <tr>
              <td>2026/02/01</td>
              <td>0.9.0</td>
              <td>5/12</td>
              <td>作成完了</td>
              <td>☐</td>
            </tr>
          </tbody>
        </table>
        <div style="display:flex;justify-content:flex-end;">
          <button class="button outline">編集する</button>
        </div>
      </div>
    </div>
  `;

  openModal(modalId);
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modalBackdrop.classList.add("show");
  modal.querySelectorAll("[data-close='modal']").forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });
  modalBackdrop.addEventListener("click", closeModal, { once: true });
}

function closeModal() {
  modalBackdrop.classList.remove("show");
  modalRoot.innerHTML = "";
}

render();
