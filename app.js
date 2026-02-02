const { useMemo, useState, useEffect } = React;

const CURRENT_USER = "佐藤 健太";

const initialObjects = [
  {
    id: "obj-1",
    projectName: "渋谷スカイタワー計画",
    name: "外壁パネルA",
    updatedAt: "2026/02/03 09:10",
    createdAt: "2026/02/01 10:12",
    logs: [
      "2026/02/03 04:07 佐藤 健太 データ置換を実施",
      "2026/02/02 09:32 佐藤 健太 データを整理",
      "2026/02/01 10:12 佐藤 健太 オブジェクトを追加",
      "2026/02/03 09:10 佐藤 健太 分割データを確認",
    ],
  },
  {
    id: "obj-2",
    projectName: "大阪ウォーターフロント計画",
    name: "コア筒体B",
    updatedAt: "2026/02/03 08:42",
    createdAt: "2026/02/01 11:04",
    logs: [
      "2026/02/03 08:42 山田 太郎 分割データを確認",
      "2026/02/02 15:20 山田 太郎 データ置換を実施",
      "2026/02/01 11:04 山田 太郎 オブジェクトを追加",
      "2026/02/02 10:15 山田 太郎 データを整理",
    ],
  },
];

const initialSplits = [
  {
    id: "split-1",
    objectId: "obj-1",
    status: "draft",
    coords: { x1: 12.5, x2: 45.0, y1: 8.0, y2: 31.2, z1: 0.0, z2: 22.0 },
    description: "北面外壁セクション",
    confirmedAt: "",
    updatedAt: "2026/02/03 09:12",
    totalParts: 0,
    logs: [
      "2026/02/01 10:20 山田 太郎 分割データを生成",
      "2026/02/01 10:22 山田 太郎 分割データをダウンロード",
    ],
  },
  {
    id: "split-2",
    objectId: "obj-1",
    status: "confirmed",
    coords: { x1: 45.0, x2: 92.4, y1: 8.0, y2: 31.2, z1: 0.0, z2: 22.0 },
    description: "南面外壁セクション",
    confirmedAt: "2026/02/02 13:40",
    updatedAt: "2026/02/03 09:02",
    totalParts: 12,
    logs: [
      "2026/02/02 13:40 山田 太郎 分割データを確定",
      "2026/02/02 13:55 山田 太郎 パーツを追加（作業場所：北西コーナー）",
      "2026/02/02 14:10 山田 太郎 パーツを置換",
      "2026/02/02 14:12 山田 太郎 パーツを完了に変更",
    ],
  },
  {
    id: "split-3",
    objectId: "obj-1",
    status: "conflict",
    coords: { x1: 40.5, x2: 88.2, y1: 8.0, y2: 31.2, z1: 0.0, z2: 22.0 },
    description: "北面外壁セクション（重なり）",
    confirmedAt: "",
    updatedAt: "2026/02/03 08:55",
    totalParts: 0,
    logs: [
      "2026/02/02 16:00 山田 太郎 分割データの座標を調整",
      "2026/02/02 16:05 山田 太郎 重なりを検知",
    ],
  },
  {
    id: "split-4",
    objectId: "obj-2",
    status: "confirmed",
    coords: { x1: 10.0, x2: 52.8, y1: 6.0, y2: 28.4, z1: 0.0, z2: 20.5 },
    description: "低層部コア筒体",
    confirmedAt: "2026/02/02 14:15",
    updatedAt: "2026/02/03 09:01",
    totalParts: 8,
    logs: [
      "2026/02/02 14:15 佐藤 健太 分割データを確定",
      "2026/02/02 15:10 佐藤 健太 パーツを追加（作業場所：コア南面）",
    ],
  },
];

const initialParts = [
  {
    id: "part-1",
    splitId: "split-2",
    name: "北西コーナー基礎",
    description: "連結部の補強パネル",
    location: "北西コーナー基礎",
    done: false,
    logs: ["2026/02/02 13:55 山田 太郎 パーツを追加（作業場所：北西コーナー）"],
    fileHistory: [
      { date: "2026/02/02", user: "山田 太郎", file: "core-nw-v1.step" },
    ],
    usageList: ["Split-002", "Split-008", "Split-010", "Split-014"],
    locationList: ["北西コーナー", "基礎梁", "外周壁", "構造補強"],
  },
  {
    id: "part-2",
    splitId: "split-2",
    name: "開口部補強",
    description: "外壁開口部の補強パネル",
    location: "南面開口部",
    done: true,
    logs: ["2026/02/02 14:12 山田 太郎 パーツを完了に変更"],
    fileHistory: [
      { date: "2026/02/02", user: "山田 太郎", file: "opening-reinforce-v2.step" },
      { date: "2026/02/03", user: "山田 太郎", file: "opening-reinforce-v3.step" },
    ],
    usageList: ["Split-002", "Split-009", "Split-012", "Split-019"],
    locationList: ["南面開口部", "外壁パネル", "補強枠", "中層部"],
  },
  {
    id: "part-3",
    splitId: "split-4",
    name: "コア南面パネル",
    description: "中層部の補強パネル",
    location: "コア南面",
    done: false,
    logs: ["2026/02/02 15:10 佐藤 健太 パーツを追加（作業場所：コア南面）"],
    fileHistory: [
      { date: "2026/02/02", user: "佐藤 健太", file: "core-south-v1.step" },
    ],
    usageList: ["Split-101", "Split-105", "Split-112", "Split-119"],
    locationList: ["コア南面", "補強パネル", "中層部", "躯体接合"],
  },
];

const initialVersions = [
  {
    id: "ver-1",
    name: "1.0.0",
    createdAt: "2026/02/02",
    status: "適用中",
    partsDone: 3,
    partsTotal: 12,
    applied: true,
  },
  {
    id: "ver-0",
    name: "0.0.0",
    createdAt: "2026/02/01",
    status: "履歴",
    partsDone: 0,
    partsTotal: 12,
    applied: false,
  },
];

const partsLibrary = [
  {
    id: "lib-1",
    name: "基礎補強パネル",
    description: "角部の補強用パネル",
    location: "北東コーナー",
  },
  {
    id: "lib-2",
    name: "開口部フレーム",
    description: "開口部周りの固定フレーム",
    location: "南面開口部",
  },
  {
    id: "lib-3",
    name: "外壁ジョイント",
    description: "外壁パネル連結部",
    location: "外周壁",
  },
];

function formatNow() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  return `${y}/${m}/${d} ${hh}:${mm}`;
}

function formatDateOnly(date) {
  if (typeof date === "string") return date;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}/${m}/${d}`;
}

function App() {
  const [page, setPage] = useState("objects");
  const [objects, setObjects] = useState(initialObjects);
  const [splits, setSplits] = useState(initialSplits);
  const [parts, setParts] = useState(initialParts);
  const [versions, setVersions] = useState(initialVersions);
  const [selectedObjectId, setSelectedObjectId] = useState(initialObjects[0].id);
  const [selectedSplitId, setSelectedSplitId] = useState("split-2");
  const [openMenuId, setOpenMenuId] = useState("");
  const [modal, setModal] = useState({ type: "", data: null });
  const [toasts, setToasts] = useState([]);
  const [editTotalId, setEditTotalId] = useState("");
  const [editTotalValue, setEditTotalValue] = useState("0");

  useEffect(() => {
    const handleClick = () => setOpenMenuId("");
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const selectedObject = objects.find((obj) => obj.id === selectedObjectId) || objects[0];
  const selectedSplit = splits.find((split) => split.id === selectedSplitId) || splits[0];

  const objectSplits = splits.filter((split) => split.objectId === selectedObject?.id);
  const splitsById = useMemo(() => Object.fromEntries(splits.map((s) => [s.id, s])), [splits]);

  const partsBySplitId = useMemo(() => {
    const map = {};
    parts.forEach((part) => {
      if (!map[part.splitId]) map[part.splitId] = [];
      map[part.splitId].push(part);
    });
    return map;
  }, [parts]);

  const currentSplitParts = partsBySplitId[selectedSplit?.id] || [];

  const addToast = (message) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 2600);
  };

  const updateSplit = (splitId, updater) => {
    setSplits((prev) =>
      prev.map((split) => (split.id === splitId ? updater({ ...split }) : split))
    );
  };

  const addSplitLog = (splitId, message) => {
    updateSplit(splitId, (split) => {
      split.logs = [`${formatNow()} ${message}`, ...split.logs].slice(0, 8);
      split.updatedAt = formatNow();
      return split;
    });
  };

  const addPartLog = (partId, message) => {
    setParts((prev) =>
      prev.map((part) =>
        part.id === partId
          ? { ...part, logs: [`${formatNow()} ${message}`, ...part.logs].slice(0, 6) }
          : part
      )
    );
  };

  const confirmSplit = (split) => {
    updateSplit(split.id, (next) => {
      next.status = "confirmed";
      next.confirmedAt = formatNow();
      next.updatedAt = formatNow();
      const partCount = (partsBySplitId[split.id] || []).length;
      next.totalParts = next.totalParts > 0 ? next.totalParts : Math.max(12, partCount);
      return next;
    });
    addSplitLog(split.id, `${CURRENT_USER} 分割データを確定`);
    addToast("分割データを確定しました");
  };

  const revertSplit = (split) => {
    updateSplit(split.id, (next) => {
      next.status = "draft";
      next.confirmedAt = "";
      next.updatedAt = formatNow();
      return next;
    });
    addSplitLog(split.id, `${CURRENT_USER} 分割データを差し戻し`);
    addToast("ドラフトに戻しました");
  };

  const togglePartDone = (part) => {
    setParts((prev) =>
      prev.map((item) =>
        item.id === part.id ? { ...item, done: !item.done } : item
      )
    );
    if (!part.done) {
      addPartLog(part.id, `${CURRENT_USER} パーツを完了に変更`);
      addSplitLog(part.splitId, `${CURRENT_USER} パーツを完了に変更（${part.name}）`);
      addToast("パーツを完了に変更しました");
    } else {
      addPartLog(part.id, `${CURRENT_USER} パーツを差し戻し`);
      addSplitLog(part.splitId, `${CURRENT_USER} パーツを差し戻し（${part.name}）`);
      addToast("作成中に戻しました");
    }
  };

  const addPart = (splitId, payload) => {
    const newPart = {
      id: `part-${Date.now()}`,
      splitId,
      name: payload.name,
      description: payload.description,
      location: payload.location,
      done: false,
      logs: [`${formatNow()} ${CURRENT_USER} パーツを追加（作業場所：${payload.location}）`],
      fileHistory: [],
      usageList: ["Split-002", "Split-009", "Split-012", "Split-019"],
      locationList: [payload.location, "外周壁", "補強枠", "中層部"],
    };
    setParts((prev) => [...prev, newPart]);
    addSplitLog(splitId, `${CURRENT_USER} パーツを追加（作業場所：${payload.location}）`);
    updateSplit(splitId, (next) => {
      const partCount = (partsBySplitId[splitId] || []).length + 1;
      next.totalParts = Math.max(next.totalParts || 0, partCount);
      return next;
    });
    addToast("パーツを追加しました");
  };

  const replacePartFile = (part) => {
    const nextHistory = {
      date: formatDateOnly(new Date()),
      user: CURRENT_USER,
      file: `${part.name.replace(/\s+/g, "")}-v${Math.floor(Math.random() * 3) + 2}.step`,
    };
    setParts((prev) =>
      prev.map((item) =>
        item.id === part.id
          ? { ...item, fileHistory: [nextHistory, ...item.fileHistory] }
          : item
      )
    );
    addPartLog(part.id, `${CURRENT_USER} パーツを置換`);
    addSplitLog(part.splitId, `${CURRENT_USER} パーツを置換（${part.name}）`);
    addToast("パーツを置換しました");
  };

  const duplicatePart = (part) => {
    const copy = {
      ...part,
      id: `part-${Date.now()}`,
      name: `${part.name}（複製）`,
      done: false,
      logs: [`${formatNow()} ${CURRENT_USER} パーツを複製`],
    };
    setParts((prev) => [...prev, copy]);
    addSplitLog(part.splitId, `${CURRENT_USER} パーツを複製（${part.name}）`);
    addToast("パーツを複製しました");
  };

  const deletePart = (part) => {
    setParts((prev) => prev.filter((item) => item.id !== part.id));
    addSplitLog(part.splitId, `${CURRENT_USER} パーツを削除（${part.name}）`);
    addToast("パーツを削除しました");
  };

  const openPartsPage = (split) => {
    setSelectedSplitId(split.id);
    setSelectedObjectId(split.objectId);
    setPage("parts");
  };

  const openSplitsPage = (objectId) => {
    setSelectedObjectId(objectId);
    const firstSplit = splits.find((split) => split.objectId === objectId) || splits[0];
    if (firstSplit) setSelectedSplitId(firstSplit.id);
    setPage("splits");
  };

  const currentPartsProgress = (split) => {
    const list = partsBySplitId[split.id] || [];
    const done = list.filter((part) => part.done).length;
    const total = split.totalParts || 0;
    return { done, total };
  };

  const handleEditTotalStart = (split) => {
    setEditTotalId(split.id);
    setEditTotalValue(String(split.totalParts || 0));
  };

  const handleEditTotalSave = (split) => {
    const nextValue = Math.max(0, Number(editTotalValue || 0));
    updateSplit(split.id, (next) => ({ ...next, totalParts: nextValue }));
    setEditTotalId("");
    addSplitLog(split.id, `${CURRENT_USER} パーツ総数を更新（${nextValue}件）`);
    addToast("パーツ総数を更新しました");
  };

  const openModal = (type, data = null) => setModal({ type, data });
  const closeModal = () => setModal({ type: "", data: null });

  const applyVersion = (versionId) => {
    setVersions((prev) => prev.map((ver) => ({ ...ver, applied: ver.id === versionId })));
    addToast("バージョンを適用しました");
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <div className="sidebar__brand">
            <div className="logo-mark"></div>
            <div className="logo-text">3DPKENTIKU</div>
          </div>
          <nav className="sidebar__nav">
            <div className="nav-section">
              <div className="nav-item disabled">プロジェクト情報</div>
              <div className="nav-item disabled">連絡</div>
              <div className="nav-item disabled">スケジュール</div>
            </div>
            <div className="nav-divider"></div>
            <div className="nav-section">
              <div className={`nav-item ${page === "objects" ? "active" : ""}`}>型枠作成リスト</div>
              <div className="nav-item disabled">パーツ一覧</div>
              <div className="nav-item disabled">3Dビュー作成リスト</div>
              <div className="nav-item disabled">印刷割り当て</div>
              <div className="nav-item disabled">印刷状況</div>
              <div className="nav-item disabled">発送割り当て</div>
            </div>
          </nav>
        </div>
        <div className="sidebar__footer">
          <div className="nav-item disabled">アカウント</div>
          <div className="nav-item disabled">設定</div>
          <div className="nav-item disabled">ログアウト</div>
        </div>
      </aside>

      <main className="main">
        {page === "objects" && (
          <PageHeader
            title="型枠作成リスト"
            subtitle="オブジェクト一覧"
            actions={
              <button className="button primary" onClick={() => addToast("オブジェクトを追加しました")}>オブジェクトの追加</button>
            }
          />
        )}
        {page === "splits" && (
          <PageHeader
            title="型枠作成リスト"
            breadcrumbs={["オブジェクト一覧", "分割データ一覧"]}
            actions={
              <button className="button primary" onClick={() => addToast("分割データを追加しました")}>分割データの追加</button>
            }
          />
        )}
        {page === "parts" && (
          <PageHeader
            title="型枠作成リスト"
            breadcrumbs={["オブジェクト一覧", "分割データ一覧", "パーツ作成リスト"]}
            actions={
              <button className="button primary" onClick={() => addToast("リスト作成完了を記録しました")}>リスト作成完了</button>
            }
          />
        )}

        {page === "objects" && (
          <section className="page-content">
            <div className="chips">
              <div className="chip">変更日↑</div>
              <div className="chip">作成日↑</div>
              <div className="chip">オブジェクト名↑</div>
            </div>
            <div className="card-stack">
              {objects.map((obj) => {
                const splitsForObj = splits.filter((split) => split.objectId === obj.id);
                const partsForObj = parts.filter((part) => splitsById[part.splitId]?.objectId === obj.id);
                const doneCount = partsForObj.filter((part) => part.done).length;
                return (
                  <article key={obj.id} className="card">
                    <div className="card-row">
                      <Viewport />
                      <div className="info-block">
                        <div className="info-title">
                          <span className="object-name">{obj.name}</span>
                          <button className="icon-button" onClick={() => addToast("編集モードは準備中です")}>✎</button>
                        </div>
                        <div className="info-meta">プロジェクト名：{obj.projectName}</div>
                        <div className="info-meta">オブジェクト名：{obj.name}</div>
                        <div className="info-meta">分割データ：{splitsForObj.length}件</div>
                        <div className="info-meta">パーツ：{doneCount}/{partsForObj.length}</div>
                        <div className="log-box">
                          {obj.logs.slice(0, 4).map((log) => (
                            <div key={log} className="log-line">{log}</div>
                          ))}
                        </div>
                      </div>
                      <div className="action-row">
                        <button className="button secondary" onClick={() => openSplitsPage(obj.id)}>詳細を開く</button>
                        <Menu
                          open={openMenuId === obj.id}
                          onToggle={(event) => {
                            event.stopPropagation();
                            setOpenMenuId(openMenuId === obj.id ? "" : obj.id);
                          }}
                          items={[
                            { label: "データ置換", onClick: () => addToast("データを置換しました") },
                            { label: "ダウンロード", onClick: () => addToast("ダウンロードを開始しました") },
                            { label: "アーカイブ", onClick: () => addToast("アーカイブしました") },
                          ]}
                        />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {page === "splits" && (
          <section className="page-content">
            <div className="chips">
              <div className="chip">変更日↑</div>
              <div className="chip">確定日↑</div>
              <div className="chip">座標↑</div>
              <div className="chip">データ説明↑</div>
            </div>
            <div className="card-stack">
              {objectSplits.map((split) => {
                const progress = currentPartsProgress(split);
                const progressPercent = progress.total ? Math.round((progress.done / progress.total) * 100) : 0;
                return (
                  <article key={split.id} className="card">
                    <div className="card-row">
                      <Viewport compact />
                      <div className="info-block">
                        <div className="meta-row">
                          <div>
                            <div className="info-meta">分割データ確定日：{split.confirmedAt || "-"}</div>
                            <div className="info-meta">最終編集日：{split.updatedAt}</div>
                          </div>
                          <div className={`status-pill ${split.status}`}>{
                            split.status === "draft" ? "ドラフト" : split.status === "confirmed" ? "確定済み" : "座標重なり"
                          }</div>
                        </div>
                        <div className="info-title">{split.description}</div>
                        <div className="coords">
                          x:{split.coords.x1}–{split.coords.x2} / y:{split.coords.y1}–{split.coords.y2} / z:{split.coords.z1}–{split.coords.z2}
                        </div>
                        {split.status === "confirmed" ? (
                          <div className="progress-line">
                            <span>パーツ：{progress.done}/{progress.total}</span>
                            <div className="progress-bar thin"><span style={{ width: `${progressPercent}%` }} /></div>
                            {editTotalId === split.id ? (
                              <div className="inline-edit-wrap">
                                <input
                                  className="inline-input"
                                  value={editTotalValue}
                                  type="number"
                                  min="0"
                                  onChange={(event) => setEditTotalValue(event.target.value)}
                                />
                                <button className="mini-button" onClick={() => handleEditTotalSave(split)}>更新</button>
                                <button className="mini-button ghost" onClick={() => setEditTotalId("")}>取消</button>
                              </div>
                            ) : (
                              <button className="mini-button ghost" onClick={() => handleEditTotalStart(split)}>総数を編集</button>
                            )}
                          </div>
                        ) : (
                          <div className="progress-line">
                            <span>パーツ：0/未設定</span>
                          </div>
                        )}
                        <div className={`banner ${split.status === "conflict" ? "danger" : split.status === "confirmed" ? "" : "warning"}`}>
                          {split.status === "draft" && "分割データを確定してください"}
                          {split.status === "confirmed" && "パーツを登録してください"}
                          {split.status === "conflict" && "他の分割データと座標が重なっています"}
                        </div>
                        <div className="log-box">
                          {split.logs.slice(0, 4).map((log) => (
                            <div key={log} className="log-line">{log}</div>
                          ))}
                        </div>
                      </div>
                      <div className="action-row">
                        {split.status === "confirmed" ? (
                          <button className="button secondary" onClick={() => revertSplit(split)}>編集中にもどす</button>
                        ) : (
                          <button className="button secondary" onClick={() => confirmSplit(split)}>分割データを確定</button>
                        )}
                        <Menu
                          open={openMenuId === split.id}
                          onToggle={(event) => {
                            event.stopPropagation();
                            setOpenMenuId(openMenuId === split.id ? "" : split.id);
                          }}
                          items={[
                            { label: "詳細を開く", onClick: () => openPartsPage(split) },
                            { label: "データ置換", onClick: () => addToast("データを置換しました") },
                            { label: "ダウンロード", onClick: () => addToast("ダウンロードを開始しました") },
                            { label: "アーカイブ", onClick: () => addToast("アーカイブしました") },
                          ]}
                        />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {page === "parts" && selectedSplit && (
          <section className="page-content">
            <div className="version-panel">
              <div className="version-info">
                <div className="badge">適用中</div>
                <div className="version-meta">
                  <div className="version-title">Version 1.0.0</div>
                  <div>更新日：2026/02/02</div>
                </div>
              </div>
              <div className="version-progress">
                <span>パーツ：{currentSplitParts.filter((part) => part.done).length}/{selectedSplit.totalParts}</span>
                <div className="progress-bar thin">
                  <span
                    style={{
                      width: selectedSplit.totalParts
                        ? `${Math.round((currentSplitParts.filter((part) => part.done).length / selectedSplit.totalParts) * 100)}%`
                        : "0%",
                    }}
                  />
                </div>
              </div>
              <div className="version-actions">
                <button className="button outline" onClick={() => openModal("versions")}>バージョン一覧</button>
                <button className="button secondary" onClick={() => openModal("addPart")}>パーツの追加</button>
              </div>
            </div>

            <div className="log-box">
              {selectedSplit.logs.slice(0, 4).map((log) => (
                <div key={log} className="log-line">{log}</div>
              ))}
            </div>

            <div className="card-stack">
              {currentSplitParts.map((part) => (
                <article key={part.id} className="card">
                  <div className="card-row">
                    <Viewport compact />
                    <div className="info-block">
                      <div className="info-title">
                        {part.name}
                        <button className="icon-button" onClick={() => addToast("編集モードは準備中です")}>✎</button>
                      </div>
                      <div className="info-meta">{part.description}</div>
                      <div className="info-meta">利用箇所：{part.location}</div>
                      <div className="status-line">
                        <span className={part.done ? "status-done" : "status-progress"}>
                          {part.done ? "作成完了" : "作成中"}
                        </span>
                        <button className="button secondary" onClick={() => togglePartDone(part)}>
                          {part.done ? "作成中に戻す" : "パーツ作成完了"}
                        </button>
                      </div>
                    </div>
                    <div className="action-row">
                      <button className="button outline" onClick={() => openModal("partDetail", part)}>詳細を開く</button>
                      <Menu
                        open={openMenuId === part.id}
                        onToggle={(event) => {
                          event.stopPropagation();
                          setOpenMenuId(openMenuId === part.id ? "" : part.id);
                        }}
                        items={[
                          { label: "アップロード", onClick: () => replacePartFile(part) },
                          { label: "ダウンロード", onClick: () => addToast("ダウンロードを開始しました") },
                          { label: "コードダウンロード", onClick: () => addToast("コードを出力しました") },
                          { label: "複製", onClick: () => duplicatePart(part) },
                          { label: "削除", onClick: () => deletePart(part) },
                        ]}
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      {modal.type && (
        <Modal onClose={closeModal}>
          {modal.type === "versions" && (
            <VersionModal versions={versions} onApply={applyVersion} onClose={closeModal} />
          )}
          {modal.type === "partDetail" && (
            <PartDetailModal
              part={modal.data}
              onReplace={() => replacePartFile(modal.data)}
              onToggle={() => togglePartDone(modal.data)}
              onClose={closeModal}
            />
          )}
          {modal.type === "addPart" && (
            <AddPartModal
              library={partsLibrary}
              onAdd={(payload) => {
                addPart(selectedSplit.id, payload);
                closeModal();
              }}
              onClose={closeModal}
            />
          )}
        </Modal>
      )}

      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast">{toast.message}</div>
        ))}
      </div>
    </div>
  );
}

function PageHeader({ title, subtitle, breadcrumbs, actions }) {
  return (
    <header className="page-header">
      <div className="header-title">
        <div className="breadcrumbs">
          {breadcrumbs
            ? breadcrumbs.map((item) => <span key={item}>{item}</span>)
            : <span>{title}</span>}
        </div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <div className="header-actions">{actions}</div>
    </header>
  );
}

function Viewport({ compact }) {
  return (
    <div className={`viewport ${compact ? "compact" : ""}`}>
      <div className="viewport-grid"></div>
      <div className="viewport-box"></div>
      <div className="viewport-axis">
        <span>X</span>
        <span>Y</span>
        <span>Z</span>
      </div>
      <div className="viewport-hud">
        <div className="hud-row">
          <span>Perspective</span>
          <span>mm</span>
        </div>
        <div className="hud-row">
          <span>1:120</span>
          <span>CAD</span>
        </div>
      </div>
    </div>
  );
}

function Menu({ open, onToggle, items }) {
  return (
    <div className="menu-wrap" onClick={(event) => event.stopPropagation()}>
      <button className="menu-button" onClick={onToggle}>⋯</button>
      <div className={`menu ${open ? "open" : ""}`}>
        {items.map((item) => (
          <button key={item.label} className="menu-item" onClick={item.onClick}>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <>
      <div className="modal-backdrop show" onClick={onClose}></div>
      <div className="modal open">{children}</div>
    </>
  );
}

function VersionModal({ versions, onApply, onClose }) {
  return (
    <div>
      <div className="modal-header">
        <div className="modal-title">バージョン一覧</div>
        <button className="icon-button" onClick={onClose}>✕</button>
      </div>
      <div className="modal-body">
        <table className="table">
          <thead>
            <tr>
              <th>作成日</th>
              <th>バージョン名</th>
              <th>パーツ</th>
              <th>ステータス</th>
              <th>適応</th>
            </tr>
          </thead>
          <tbody>
            {versions.map((ver) => (
              <tr key={ver.id}>
                <td>{ver.createdAt}</td>
                <td>{ver.name}</td>
                <td>{ver.partsDone}/{ver.partsTotal}</td>
                <td>{ver.status}</td>
                <td>
                  <input
                    type="radio"
                    checked={ver.applied}
                    onChange={() => onApply(ver.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="button outline" onClick={() => onApply(versions[0].id)}>編集する</button>
      </div>
    </div>
  );
}

function PartDetailModal({ part, onReplace, onToggle, onClose }) {
  if (!part) return null;
  return (
    <div>
      <div className="modal-header">
        <div className="modal-title">パーツ詳細</div>
        <button className="icon-button" onClick={onClose}>✕</button>
      </div>
      <div className="modal-body modal-grid">
        <div className="card-stack">
          <div className="info-title">{part.name}</div>
          <div className="info-meta">{part.description}</div>
          <button className="button secondary" onClick={onToggle}>
            {part.done ? "作成中に戻す" : "パーツ作成完了"}
          </button>
          <div className="banner">この分割データに利用されている数：4</div>
          <div className="log-box">
            {part.usageList.map((item) => (
              <div key={item} className="log-line">{item}</div>
            ))}
          </div>
          <div className="banner">利用箇所</div>
          <div className="log-box">
            {part.locationList.map((item) => (
              <div key={item} className="log-line">{item}</div>
            ))}
          </div>
        </div>
        <div className="card-stack">
          <Viewport />
          <div className="field">
            <label>ファイル置換</label>
            <div className="log-box dropzone">ドラッグ&ドロップ</div>
            <button className="button outline" onClick={onReplace}>ファイル選択</button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>日付</th>
                <th>username</th>
                <th>ファイル名</th>
              </tr>
            </thead>
            <tbody>
              {part.fileHistory.slice(0, 3).map((row, index) => (
                <tr key={`${row.file}-${index}`}>
                  <td>{row.date}</td>
                  <td>{row.user}</td>
                  <td>{row.file}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AddPartModal({ library, onAdd, onClose }) {
  const [tab, setTab] = useState("existing");
  const [form, setForm] = useState({ name: "", description: "", location: "" });

  const handleSelect = (item) => {
    setForm({
      name: item.name,
      description: item.description,
      location: item.location,
    });
  };

  const handleSubmit = () => {
    if (!form.name) return;
    onAdd(form);
  };

  return (
    <div>
      <div className="modal-header">
        <div className="modal-title">パーツの追加</div>
        <button className="icon-button" onClick={onClose}>✕</button>
      </div>
      <div className="modal-body">
        <div className="tabs">
          <button className={`tab ${tab === "existing" ? "active" : ""}`} onClick={() => setTab("existing")}>
            パーツを選択する
          </button>
          <button className={`tab ${tab === "new" ? "active" : ""}`} onClick={() => setTab("new")}>
            新しいパーツを追加する
          </button>
        </div>
        <div className="modal-grid">
          <div className="card-stack scroll-list">
            {library.map((item) => (
              <div key={item.id} className="card" onClick={() => handleSelect(item)}>
                <div className="card-row compact">
                  <Viewport compact />
                  <div className="info-block">
                    <div className="info-title">{item.name}</div>
                    <div className="info-meta">{item.description}</div>
                    <div className="info-meta">利用箇所：{item.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="card-stack">
            <div className="field">
              <label>パーツ名</label>
              <input
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                disabled={tab === "existing"}
              />
            </div>
            <div className="field">
              <label>説明</label>
              <textarea
                value={form.description}
                onChange={(event) => setForm({ ...form, description: event.target.value })}
                disabled={tab === "existing"}
              />
            </div>
            <div className="field">
              <label>利用箇所</label>
              <input
                value={form.location}
                onChange={(event) => setForm({ ...form, location: event.target.value })}
                disabled={tab === "existing"}
              />
            </div>
            <div className="field">
              <label>ファイル添付</label>
              <div className="log-box dropzone">アップロードは不要です</div>
            </div>
            <button className="button primary" onClick={handleSubmit}>決定</button>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
