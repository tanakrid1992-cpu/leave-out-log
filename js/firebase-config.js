// ===== ตั้งค่า Firebase (คัดลอกจาก Firebase Console > Project settings > Your apps) =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDKY2Lk-OaVRCmP--lj8FLd7vWUdIx2hLY",
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

// ===== ระบบขอใช้รถส่วนกลาง =====
export const CAR = { REQ: "car_requests", CARS: "cars", SIGNERS: "signers", SECRETS: "signer_secrets", SIGS: "signatures", COUNTERS: "counters", SETTINGS: "settings" };
export const ROLES = { req: "ผู้ขอ", head: "ผู้อำนวยการกอง", appr: "ผู้สั่งใช้รถ" };
export const CAR_DEFAULT = {
  orgName: "เทศบาลตำบลคลองตำหรุ",
  address: "อำเภอเมืองชลบุรี จังหวัดชลบุรี",
  toTitle: "นายกเทศมนตรีตำบลคลองตำหรุ",
  headTitle: "",
  headName: "",
  approverTitle: "รองนายกเทศมนตรี ปฏิบัติราชการแทน",
  approverTitle2: "นายกเทศมนตรีตำบลคลองตำหรุ",
  approverName: "นายประสาน ผ่องภิญโญ",
  approverList: "นายประสาน ผ่องภิญโญ,นางวรรณลักษณ์ เทศริต"
};
export const SEED_CAR = { plate: "งจ 4782 ชลบุรี", brand: "รถยนต์ส่วนกลาง", type: "รถกระบะ", seats: "5", driver: "", active: true };
// ผู้ดูแลหลัก (เพิ่มผู้ดูแลอื่นได้ที่ Firestore: admins/{อีเมล})
export const OWNER = "tanakrid1992@gmail.com";
