// ===== ตั้งค่า Firebase (คัดลอกจาก Firebase Console > Project settings > Your apps) =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDovLKo3djdRbs963vqKdbj-geRWyzMTrg",
  authDomain: "klongtamru-leave-out-log.firebaseapp.com",
  projectId: "klongtamru-leave-out-log",
  storageBucket: "klongtamru-leave-out-log.firebasestorage.app",
  messagingSenderId: "222241851964",
  appId: "1:222241851964:web:80214c0753356594561139"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const ORG_NAME = "เทศบาลตำบลคลองตำหรุ";
export const COLLECTION = "leave_out_logs";
export const DIVISIONS = [
  "สำนักปลัดเทศบาล",
  "กองคลัง",
  "กองช่าง",
  "กองการศึกษา",
  "กองสาธารณสุขและสิ่งแวดล้อม",
  "กองสวัสดิการสังคม",
  "กองยุทธศาสตร์และงบประมาณ"
];
export const DIV_COLORS = ["#6366f1", "#0ea5e9", "#f59e0b", "#10b981", "#ef4444", "#ec4899", "#8b5cf6"];
