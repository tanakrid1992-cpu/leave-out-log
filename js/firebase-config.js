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

// ===== ลบข้อมูลพร้อมรหัสยืนยัน (ตรวจที่ Firestore Rules) + สำเนาใน deletions =====
import { doc as _doc, writeBatch as _wb, serverTimestamp as _ts } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
const _sha = async s => [...new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)))].map(b => b.toString(16).padStart(2, "0")).join("");
export async function secureDelete(col, id, data) {
  const pw = await askPw(); if (pw == null) return false;
  const b = _wb(db), clean = Object.fromEntries(Object.entries(data || {}).filter(([k]) => !k.startsWith("_") && k !== "id"));
  b.set(_doc(db, "deletions", `${col}_${id}`), { h: await _sha(`del:${pw}:klongtumru`), t: _ts(), by: auth.currentUser?.email || "", col, data: clean });
  b.delete(_doc(db, col, id));
  try { await b.commit(); return true; }
  catch (e) { throw new Error(e.code === "permission-denied" ? "รหัสยืนยันการลบไม่ถูกต้อง" : (e.message || e)); }
}
function askPw() {
  return new Promise(res => {
    const m = document.createElement("div"); m.className = "modal on"; m.style.zIndex = 90;
    m.innerHTML = `<div class="mbox" style="max-width:400px;text-align:center"><div style="font-size:42px">🗑️</div><h3 style="margin:6px 0">ยืนยันการลบข้อมูล</h3>
      <p class="muted" style="margin:0 0 14px;font-size:14px">กรอกรหัสยืนยันการลบ (ข้อมูลที่ลบจะถูกเก็บสำเนาไว้)</p>
      <input type="password" id="_pw" placeholder="รหัสยืนยันการลบ" autocomplete="off" style="text-align:center">
      <div style="display:flex;gap:10px;justify-content:center;margin-top:16px"><button class="btn btn-ghost" id="_c">ยกเลิก</button><button class="btn btn-bad" id="_o">🗑️ ลบข้อมูล</button></div></div>`;
    document.body.append(m); const i = m.querySelector("#_pw"); i.focus();
    const done = v => { m.remove(); res(v); };
    m.querySelector("#_c").onclick = () => done(null); m.querySelector("#_o").onclick = () => i.value && done(i.value);
    i.onkeydown = e => { if (e.key === "Enter" && i.value) done(i.value); if (e.key === "Escape") done(null); };
  });
}
