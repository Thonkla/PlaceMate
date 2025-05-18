# [Senior project] PlaceMate – Your Personalized Travel Companion 📍 
**PlaceMate** is a smart location recommendation app designed to help users discover, save, and plan visits to interesting places based on tags, location, popularity, and discounts. Perfect for both casual travelers and organized adventurers.
---
## 🚀 Features

- 🔖 **List To Go** – Save and manage your must-visit places like a travel wishlist.
- 🗺️ **Route Recommendation** – Get optimal travel paths for your saved places.
- 💸 **Discount Checker** – View available promotions from registered stores.
- 📅 **Travel Planner** – Plan your trip with a calendar interface.
- 🕒 **Travel Time Estimation** – Calculate how long it takes to reach each destination.
- 🔍 **Search & Filter** – Find places by name or tags and filter by distance, ratings, or deals.
- 📝 **Reviews & Ratings** – Leave and read reviews for places and stores.
- ✍️ **Blog System** – Share travel experiences or browse travel stories.
- 👤 **User Profile** – Manage your profile, see recommended users, and track friends' activities.
- 🧠 **Smart Recommendation** – Personalized suggestions based on your preferences.
- 💤 **Rest Stop Suggestions** – Recommend places to relax on long trips.
- 🌆 **Popular Places** – Discover trending places in specific locations.
- 🛍️ **Store Management** – Store owners can manage profiles and promotions.

---
## 🛠️ Tech Stack

- **Frontend:** React Native (Expo)
- **Backend:** Node.js + Express
- **Database:** PostgreSQL (via Prisma ORM)
- **Authentication:** JSON Web Token (JWT)
- **Deployment:** Render / Vercel / Railway *(optional)*

---
## 🔧 How to Run the Project

1. **Clone the repo**

  ```bash
  git clone https://github.com/YOUR_USERNAME/placemate.git
  cd placemate

2. Install dependencies
  ```bash
  npm install
  ```

3. Set up environment variables
  Create a ```.env``` file and configure your API URLs, DB connection, and any secret keys.

4. Run the app
  ```bash
  npx expo start
  ```

## For backend

### 0. create env file
```bash
cp .env_example .env
```

### 1. create backend folder and create package.json
```bash
npm init -y
```

### 2. สร้าง Dependencies (ตัวกลางที่เชื่อมต่อ backend กับ database)
```bash
npm install express prisma @prisma/client body-parser cors
npm install --save-dev nodemon
```

### 3. ติดตั้งตัว Prisma setting
```bash
npx prisma init
```

### 4. ไปที่ไฟล์ .env เพื่อเปลี่ยนรหัสผ่านและ localhost ที่ตั้งค่าไว้

### 5. Get data from database using (you can check in prisma/schema.prisma file)
```bash
npx prisma db pull
```

### 6. สร้าง Prisma Client
```bash
npx prisma generate
```

### 7. สร้างไฟล์ index.js ในโฟลเดอร์ backend

### 8. เปลี่ยนชุดคำสั่ง scripts ใน package.json
```bash
"scripts": {
    "dev": "nodemon index.js"
  },
```

### 9. Install Swagger
```bash
npm install swagger-ui-express swagger-jsdoc
```

### 10. Install bcrypt
```bash
npm install bcrypt
```

### 11. Install jwtToken
```bash
npm install jsonwebtoken
```

### 12. ตรวจสอบการใช้งาน
```bash
npm run dev
```

## For frontend

### 1. ติดตั้ง Axios (library ตัวหนึ่งของ JavaScript, TypeScript ที่ใช้ในการจัดการกับ API ด้วยวิธี HTTP methods)
```bash
npm install axios
```

### 2. ติดตั้ง web vitals (library ของ react เพื่อบันทึกประสบการณ์ของผู้ใช้ในเว็บเพจ)
```bash
npm i web-vitals --save-dev
```

### 3
```bash
npm install react-router-dom
```

### เริ่มต้น react frontend (เข้า cd frontend ก่อนการทำงาน)
```bash
npm start
```

## Create Authentication System

### 1.ติดตั้ง cookie-parser ใน Express (backend)
```bash
npm install cookie-parser
```

### 2.ติดตั้ง js-cookies
```bash
npm install js-cookie
```

## About PostgreSQL database

### 1.ใช้ คำสั่ง npx prisma migrate status เพื่อเช็คว่า prisma มีการ apply หรือยัง

### 2.ใช้คำสั่ง npx prisma migrate resolve --applied "ชื่อที่ migration" (แจ้งให้ prisma รู้ว่า migration ถูกใช้งานแล้ว)

### 4.ใช้คำสั่ง npx prisma db push เพื่ออัปเดตโครงสร้าง Database หลังจากนั้นให้รัสตาร์ทโปรแกรมและเปิดใหม่

### For making A beautiful responsive for website(download in frontend)

## 1.Download sweetalert2
```bash
npm install sweetalert2
```

### 1.Download multer in backend
```bash
npm install multer
```

## About place data
```bash
Contact me at pongsakorn.srimang@gmail.com
```

# Contributors
```
Pongsakorn Srimang
Athiwat Nakkum
Phranaikarn Theerathampanya
```