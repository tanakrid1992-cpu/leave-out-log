# ระบบบันทึกการออกนอกสถานที่ (ธุระส่วนตัวในเวลาราชการ) — เทศบาลตำบลคลองตำหรุ

เว็บ static (GitHub Pages) + Firebase Firestore/Auth

- `index.html` แบบบันทึก (ไม่ต้องล็อกอิน, จำชื่อ/ตำแหน่ง/กองไว้ในเครื่อง, คำนวณระยะเวลาอัตโนมัติ)
- `dashboard.html` แดชบอร์ด (ล็อกอินผู้ดูแล): KPI, กราฟแนวโน้ม, สัดส่วนกอง, ชั่วโมงรวมรายกอง, Top 10, ตาราง+ค้นหา+ลบ
- Export Excel รายสัปดาห์/เดือน/ปี → ชีต "สรุป" + ชีตแยกแต่ละสำนัก/กอง (กรองเฉพาะกองได้)

## ติดตั้ง
1. Firebase Console → สร้างโปรเจกต์ → **Firestore Database** (production mode, region asia-southeast1)
2. **Authentication** → เปิด Email/Password → Add user (บัญชีผู้ดูแลที่ดูแดชบอร์ด)
3. Project settings → Add web app → คัดลอก config ใส่ `js/firebase-config.js`
4. Firestore → Rules → วางเนื้อหา `firestore.rules` → Publish
5. Authentication → Settings → Authorized domains → เพิ่ม `<username>.github.io`

## ขึ้น GitHub Pages
```bash
git init && git add . && git commit -m "init"
git branch -M main
git remote add origin https://github.com/<username>/leave-out-log.git
git push -u origin main
```
Settings → Pages → Deploy from branch `main` / root → เปิด `https://<username>.github.io/leave-out-log/`
