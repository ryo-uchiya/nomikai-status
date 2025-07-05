// --- ローカルストレージ版 飲み会状況通知 ---

// 状況・履歴の保存キー
const STATUS_KEY = "nomikaiStatus";
const HISTORY_KEY = "nomikaiStatusHistory";

// 状況を更新（履歴として追加）
function updateStatus(status) {
  const nickname = document.getElementById("nicknameInput")?.value?.trim() || "匿名";
  const now = new Date();
  const entry = {
    status: status,
    nickname: nickname,
    updatedAt: now.toLocaleString("ja-JP"),
    timestamp: now.getTime()
  };
  // 最新状況を保存
  localStorage.setItem(STATUS_KEY, JSON.stringify(entry));
  // 履歴を保存
  const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  history.push(entry);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  renderStatus();
  renderHistory();
}

// 最新状況を取得して表示
function renderStatus() {
  const data = JSON.parse(localStorage.getItem(STATUS_KEY) || "null");
  const statusElem = document.getElementById("currentStatus");
  if (data && data.status) {
    statusElem.textContent = data.status + "（更新: " + (data.updatedAt || "") + "）";
  } else {
    statusElem.textContent = "未設定";
  }
}

// 履歴を取得して表示
function renderHistory() {
  let historyArea = document.getElementById("historyArea");
  if (!historyArea) {
    historyArea = document.createElement("div");
    historyArea.id = "historyArea";
    historyArea.style.marginTop = "18px";
    document.querySelector(".container").appendChild(historyArea);
  }
  const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  const list = history.map(d => {
    const name = d.nickname ? `（${d.nickname}）` : "";
    return `<div>【${d.updatedAt}】${d.status}${name}</div>`;
  });
  if (list.length > 0) {
    historyArea.innerHTML = "<b>履歴</b><br>" + list.reverse().join("");
  } else {
    historyArea.innerHTML = "";
  }
}

// 履歴クリア機能
function clearHistory() {
  if (confirm("本当に履歴を全て削除しますか？")) {
    localStorage.removeItem(HISTORY_KEY);
    renderHistory();
    alert("履歴をクリアしました。");
  }
}

document.getElementById("clearHistoryBtn").addEventListener("click", clearHistory);

// ダークモード切り替え
const darkModeBtn = document.getElementById("toggleDarkModeBtn");
function setDarkMode(enabled) {
  if (enabled) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "1");
    darkModeBtn.textContent = "☀️";
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", "0");
    darkModeBtn.textContent = "🌙";
  }
}
darkModeBtn.addEventListener("click", () => {
  setDarkMode(!document.body.classList.contains("dark-mode"));
});
// 初期状態
if (localStorage.getItem("darkMode") === "1" ||
    (localStorage.getItem("darkMode") === null && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
  setDarkMode(true);
} else {
  setDarkMode(false);
}

// 初期表示
window.addEventListener("DOMContentLoaded", () => {
  renderStatus();
  renderHistory();
});
