// --- Firebaseの設定 ---
// 下記のconfigを自身のFirebaseプロジェクトのものに書き換えてください
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   databaseURL: "YOUR_DATABASE_URL",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID"
// };
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBs1nJUuPrVqnnaZhouKyk1gYjBDx3mry8",
  authDomain: "nomikai-status.firebaseapp.com",
  databaseURL: "https://nomikai-status-default-rtdb.firebaseio.com",
  projectId: "nomikai-status",
  storageBucket: "nomikai-status.firebasestorage.app",
  messagingSenderId: "761236070783",
  appId: "1:761236070783:web:1afda794322f5c702e3a4a",
  measurementId: "G-NWZQX5B61E"
};

// Firebase初期化
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const statusRef = db.ref("nomikaiStatus");

// 状況を更新
function updateStatus(status) {
  statusRef.set({
    status: status,
    updatedAt: new Date().toLocaleString("ja-JP")
  });
}

// 状況をリアルタイムで取得して表示
statusRef.on("value", (snapshot) => {
  const data = snapshot.val();
  const statusElem = document.getElementById("currentStatus");
  if (data && data.status) {
    statusElem.textContent = data.status + "（更新: " + (data.updatedAt || "") + "）";
  } else {
    statusElem.textContent = "未設定";
  }
});
