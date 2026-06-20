# TemanMasak

**TemanMasak** adalah aplikasi web rekomendasi resep berbasis chat. Pengguna dapat mengirim bahan makanan yang tersedia, lalu sistem memberikan rekomendasi resep, daftar bahan, estimasi nutrisi, langkah memasak, serta fitur menyimpan resep favorit.

Project ini merupakan **frontend** yang dibangun menggunakan **React + Vite**. Aplikasi membutuhkan backend API agar fitur login, register, chat, session, dan penyimpanan resep dapat berjalan penuh.

---

## Daftar Isi

- [Gambaran Umum](#gambaran-umum)
- [Fitur Utama](#fitur-utama)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Struktur Folder](#struktur-folder)
- [Prasyarat](#prasyarat)
- [Instalasi dan Menjalankan Project](#instalasi-dan-menjalankan-project)
- [Konfigurasi Environment](#konfigurasi-environment)
- [Routing Halaman](#routing-halaman)
- [Integrasi Backend API](#integrasi-backend-api)
- [Alur Penggunaan Aplikasi](#alur-penggunaan-aplikasi)
- [Script NPM](#script-npm)
- [Build dan Deployment](#build-dan-deployment)
- [Troubleshooting](#troubleshooting)
- [Catatan Pengembangan](#catatan-pengembangan)

---

## Gambaran Umum

TemanMasak dirancang untuk membantu pengguna menemukan ide masakan berdasarkan bahan yang dimiliki. Aplikasi menggunakan antarmuka chat agar pengguna dapat menulis bahan secara natural, misalnya:

```text
Saya punya ayam, bawang putih, telur, dan nasi. Bisa masak apa?
```

Setelah pesan dikirim, frontend meneruskan input tersebut ke backend. Backend kemudian mengembalikan balasan chat dan, jika tersedia, daftar rekomendasi resep dalam bentuk recipe card. Recipe card dapat dibuka untuk melihat detail bahan, nutrisi, dan langkah memasak.

---

## Fitur Utama

### 1. Landing Page

Halaman awal untuk memperkenalkan aplikasi, manfaat, fitur, dan alur penggunaan TemanMasak.

### 2. Autentikasi Pengguna

Aplikasi menyediakan halaman:

- Login
- Register
- Logout
- Update profil sederhana melalui modal pengaturan

Token autentikasi disimpan di `localStorage` dan digunakan untuk mengakses endpoint yang membutuhkan otorisasi.

### 3. Chat Rekomendasi Resep

Pengguna dapat membuat sesi chat, mengirim bahan makanan, dan menerima respons dari bot. Jika backend mengembalikan rekomendasi resep, frontend menampilkannya sebagai recipe card.

### 4. Manajemen Sesi Chat

Sidebar menampilkan daftar sesi chat yang dikelompokkan berdasarkan waktu, seperti hari ini, kemarin, dan tanggal sebelumnya. Pengguna juga dapat membuat sesi baru atau menghapus sesi yang sudah ada.

### 5. Recipe Card

Setiap rekomendasi resep dapat menampilkan:

- Nama resep
- Deskripsi singkat
- Durasi memasak
- Tingkat kesulitan
- Kategori
- Estimasi porsi
- Gambar atau fallback image
- Informasi nutrisi jika tersedia

### 6. Halaman Bahan

Setelah memilih resep, pengguna diarahkan ke halaman bahan untuk melihat daftar bahan yang dibutuhkan sebelum mulai memasak.

### 7. Halaman Langkah Memasak

Aplikasi menyediakan halaman step-by-step cooking. Pengguna dapat berpindah antar langkah memasak dan menyelesaikan proses memasak.

### 8. Resep Disimpan

Pengguna dapat menyimpan resep dari recipe card. Resep yang tersimpan dapat dibuka kembali melalui halaman `Resep Disimpan`.

### 9. Estimasi Nutrisi

Frontend memiliki utilitas untuk menormalisasi data nutrisi dari backend, seperti:

- Kalori
- Protein
- Lemak
- Karbohidrat

Jika data nutrisi tidak tersedia, aplikasi akan menampilkan nilai kosong atau fallback.

---

## Teknologi yang Digunakan

| Kategori | Teknologi |
|---|---|
| Frontend | React 19 |
| Build Tool | Vite |
| Routing | React Router DOM |
| Styling | CSS modular per halaman, Tailwind CSS, PostCSS |
| Animasi | Lottie React, Motion, GSAP |
| Icon | React Icons, SVG lokal |
| Font | Quicksand, Plus Jakarta Sans |
| Linting | ESLint |
| State Sederhana | React Hooks dan `localStorage` |

---

## Struktur Folder

```text
TemanMasak-main/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── index.html
├── src/
│   ├── assets/                  # Gambar, animasi Lottie, dan ikon lokal
│   ├── components/              # Komponen global reusable
│   ├── constants/               # Konstanta aplikasi, termasuk key localStorage
│   ├── data/                    # Data fallback, contoh fallback recipe
│   ├── features/                # Modul fitur spesifik
│   │   ├── auth/                # Login, register, dan service auth
│   │   ├── chat_page/           # Chat area, bubble, recipe card, service chat
│   │   └── cooking/             # Komponen cooking step
│   ├── hooks/                   # Custom hooks
│   ├── layouts/                 # Layout utama seperti sidebar dan header
│   ├── pages/                   # Halaman route aplikasi
│   │   ├── ingredients/         # Halaman detail bahan resep
│   │   ├── ChatPage.jsx
│   │   ├── CookingStepPage.jsx
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── SavedRecipesPage.jsx
│   ├── styles/                  # CSS global dan per halaman
│   ├── utils/                   # Helper recipe, nutrition, dan user profile
│   ├── App.jsx                  # Routing utama aplikasi
│   └── main.jsx                 # Entry point React
├── DEVELOPMENT.md               # Dokumentasi pengembangan awal
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## Prasyarat

Sebelum menjalankan project, pastikan sudah terpasang:

- Node.js versi 20 atau lebih baru, disarankan Node.js 22
- npm
- Backend API TemanMasak yang aktif

Cek versi Node.js dan npm:

```bash
node -v
npm -v
```

---

## Instalasi dan Menjalankan Project

### 1. Clone atau ekstrak project

Jika menggunakan ZIP, ekstrak terlebih dahulu:

```bash
unzip TemanMasak-main.zip
cd TemanMasak-main
```

Jika menggunakan Git:

```bash
git clone https://github.com/Excaliburn1512/TemanMasak
cd TemanMasak-main
```

### 2. Install dependency

```bash
npm install
```

### 3. Buat file environment

Buat file `.env` di root project:

```env
VITE_API_BASE_URL=http://127.0.0.1:8001
```

Sesuaikan URL tersebut dengan alamat backend yang digunakan.

Contoh untuk backend production:

```env
VITE_API_BASE_URL=https://api.temanmasak.web.id
```

### 4. Jalankan development server

```bash
npm run dev
```

Secara default, aplikasi berjalan di:

```text
http://127.0.0.1:5173
```

---

## Konfigurasi Environment

Frontend membaca base URL backend dari environment variable berikut:

| Variable | Fungsi | Contoh |
|---|---|---|
| `VITE_API_BASE_URL` | Base URL backend API | `http://127.0.0.1:8001` |

Jika `VITE_API_BASE_URL` tidak diatur, aplikasi akan menggunakan fallback:

```text
https://api.temanmasak.web.id
```

Konfigurasi tersebut digunakan pada:

```text
src/features/auth/services/authService.js
src/features/chat_page/services/chatService.js
```

---

## Routing Halaman

Routing utama berada di `src/App.jsx`.

| Route | Halaman | Proteksi | Fungsi |
|---|---|---|---|
| `/` | LandingPage | Publik | Halaman pengenalan aplikasi |
| `/login` | LoginPage | Guest only | Login pengguna |
| `/register` | RegisterPage | Guest only | Registrasi pengguna |
| `/chat` | ChatPage | Login required | Chat rekomendasi resep |
| `/home` | Home | Login required | Halaman home internal |
| `/ingredients` | IngredientsPage | Login required | Detail bahan resep |
| `/cooking` | CookingStepPage | Login required | Langkah memasak |
| `/saved-recipes` | SavedRecipesPage | Login required | Daftar resep tersimpan |

Route yang tidak dikenali akan diarahkan kembali ke `/`.

---

## Integrasi Backend API

Frontend ini bergantung pada backend API. Berikut endpoint yang digunakan berdasarkan service di project.

### Auth API

| Method | Endpoint | Fungsi | Auth |
|---|---|---|---|
| `POST` | `/login/` | Login pengguna | Tidak |
| `POST` | `/users/` | Register pengguna | Tidak |
| `GET` | `/me/` | Mengambil profil user login | Bearer token |
| `PATCH` | `/me/` | Update username atau password | Bearer token |
| `POST` | `/logout/` | Logout dari backend | Bearer token |

Contoh payload login:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Frontend mengharapkan respons login memiliki salah satu field token berikut:

```json
{
  "token": "jwt-token"
}
```

atau:

```json
{
  "access_token": "jwt-token"
}
```

### Chat dan Recipe API

| Method | Endpoint | Fungsi | Auth |
|---|---|---|---|
| `GET` | `/chat_sessions/` | Mengambil daftar sesi chat | Bearer token |
| `POST` | `/chat_sessions/` | Membuat sesi chat baru | Bearer token |
| `GET` | `/chat_sessions/{sessionId}/messages/` | Mengambil pesan dalam sesi | Bearer token |
| `POST` | `/sessions/{sessionId}/messages/` | Mengirim pesan user ke sesi chat | Bearer token |
| `DELETE` | `/chat_sessions/{sessionId}/` | Menghapus sesi chat | Bearer token |
| `GET` | `/recipes/` | Mengambil resep tersimpan | Bearer token |
| `POST` | `/recipes/` | Menyimpan resep | Bearer token |

Contoh payload kirim pesan:

```json
{
  "sender_type": "user",
  "message_text": "Saya punya ayam, telur, dan nasi. Bisa masak apa?"
}
```

Contoh struktur respons rekomendasi resep yang kompatibel:

```json
{
  "bot_reply": "Aku menemukan beberapa rekomendasi resep buat kamu.",
  "response_type": "recipe_cards",
  "bot_message": {
    "id": 1,
    "message_text": "Aku menemukan beberapa rekomendasi resep buat kamu."
  },
  "recipes": [
    {
      "title": "Nasi Goreng Ayam",
      "description": "Resep sederhana dengan bahan ayam, telur, dan nasi.",
      "duration": "20 menit",
      "difficulty": "Mudah",
      "category": "Main Course",
      "servesText": "Untuk 2 porsi",
      "ingredients": [
        "Nasi putih",
        "Ayam",
        "Telur",
        "Bawang putih",
        "Kecap manis"
      ],
      "steps": [
        "Tumis bawang putih hingga harum.",
        "Masukkan ayam dan masak hingga matang.",
        "Tambahkan telur dan nasi.",
        "Bumbui dengan kecap, garam, dan merica.",
        "Aduk rata lalu sajikan."
      ],
      "nutrition": {
        "calories": 250,
        "proteins": 14,
        "fat": 8,
        "carbohydrate": 30,
        "basis": "Estimasi per porsi"
      }
    }
  ]
}
```

Frontend sudah memiliki normalisasi data resep di:

```text
src/utils/recipe.js
```

Karena itu, beberapa variasi field seperti `name`, `title`, `image_url`, `thumbnail`, `steps`, dan `instructions` masih dapat ditangani selama struktur datanya masuk akal.

---

## Alur Penggunaan Aplikasi

1. Pengguna membuka landing page.
2. Pengguna register atau login.
3. Setelah login, token disimpan ke `localStorage`.
4. Pengguna masuk ke halaman chat.
5. Pengguna membuat sesi chat atau memakai sesi yang sudah ada.
6. Pengguna mengirim bahan makanan melalui chat.
7. Backend memproses input dan mengembalikan balasan serta rekomendasi resep.
8. Frontend menampilkan recipe card.
9. Pengguna dapat:
   - Menyimpan resep
   - Melihat bahan resep
   - Memulai langkah memasak
   - Membuka resep tersimpan
10. Setelah selesai memasak, pengguna kembali ke chat dan aplikasi menampilkan dialog bahwa masakan siap disajikan.

---

## Penyimpanan Lokal

Aplikasi menggunakan `localStorage` untuk menyimpan data sementara.

| Key | Fungsi |
|---|---|
| `token` | Token autentikasi user |
| `user_id` | ID user login |
| `username` | Nama user |
| `teman_masak_selected_recipe` | Resep yang sedang dipilih |
| `teman_masak_active_cooking_session_id` | Session ID yang sedang digunakan untuk cooking flow |
| `teman_masak_recipe_cards_{sessionId}` | Cache recipe card per sesi chat |

Definisi key berada di:

```text
src/constants/storageKeys.js
```

---

## Script NPM

| Script | Perintah | Fungsi |
|---|---|---|
| Development | `npm run dev` | Menjalankan Vite dev server |
| Build | `npm run build` | Membuat build production ke folder `dist/` |
| Preview | `npm run preview` | Preview hasil build production |
| Lint | `npm run lint` | Mengecek kualitas kode dengan ESLint |

---

## Build dan Deployment

### 1. Build production

```bash
npm run build
```

Output build akan dibuat di folder:

```text
dist/
```

### 2. Preview build

```bash
npm run preview
```

### 3. Deployment

Frontend dapat dideploy ke layanan seperti:

- Vercel
- Netlify
- Cloudflare Pages
- VPS dengan Nginx
- Static hosting lain yang mendukung SPA React

Pastikan environment variable berikut sudah diatur di dashboard deployment:

```env
VITE_API_BASE_URL=https://alamat-backend-api
```

Untuk deployment SPA, pastikan semua route diarahkan ke `index.html`. Jika tidak, route seperti `/chat` atau `/saved-recipes` dapat menghasilkan error 404 saat di-refresh langsung dari browser.

---

## Konfigurasi Vite

File konfigurasi berada di:

```text
vite.config.js
```

Konfigurasi server development saat ini:

```js
server: {
  host: "127.0.0.1",
  port: 5173,
  strictPort: true,
  allowedHosts: [
    "temanmasak.web.id",
    "www.temanmasak.web.id",
  ],
}
```

Artinya, saat development lokal aplikasi akan berjalan pada host `127.0.0.1` dan port `5173`.

Jika ingin mengakses dari perangkat lain dalam jaringan lokal, ubah host menjadi:

```js
host: "0.0.0.0"
```

Jika menggunakan domain atau tunnel lain, tambahkan domain tersebut ke `allowedHosts`.

---

## Troubleshooting

### 1. Error `Blocked request. This host is not allowed.`

Penyebab: domain yang digunakan belum masuk ke `allowedHosts` di `vite.config.js`.

Solusi:

```js
allowedHosts: [
  "temanmasak.web.id",
  "www.temanmasak.web.id",
  "domain-baru-anda.com"
]
```

Lalu jalankan ulang dev server:

```bash
npm run dev
```

### 2. Login gagal atau token tidak tersimpan

Cek respons endpoint `/login/`. Frontend membutuhkan field:

```json
{
  "token": "..."
}
```

atau:

```json
{
  "access_token": "..."
}
```

Jika backend mengembalikan nama field berbeda, sesuaikan fungsi `saveAuthSession` di:

```text
src/features/auth/services/authService.js
```

### 3. `Failed to fetch` saat chat

Kemungkinan penyebab:

- Backend belum berjalan
- `VITE_API_BASE_URL` salah
- Backend tidak mengizinkan CORS dari frontend
- Backend menggunakan HTTP, tetapi frontend diakses melalui HTTPS
- Endpoint backend berbeda dengan endpoint yang dipanggil frontend

Cek file:

```text
src/features/chat_page/services/chatService.js
```

### 4. Halaman `/chat` kembali ke `/login`

Penyebab: token tidak ditemukan di `localStorage` atau token dianggap tidak valid.

Solusi:

- Login ulang
- Cek apakah backend mengembalikan token saat login
- Cek apakah token belum kedaluwarsa

### 5. Recipe card tidak muncul

Penyebab umum:

- Backend hanya mengembalikan teks, bukan array `recipes`
- `response_type` bukan `recipe_cards`
- Struktur data resep tidak sesuai dengan normalisasi frontend

Pastikan respons backend memiliki field seperti:

```json
{
  "response_type": "recipe_cards",
  "recipes": []
}
```

atau struktur lain yang masih dapat dibaca oleh `normalizeRecipe`.

### 6. Styling tidak sesuai

Pastikan file CSS global dan Tailwind sudah dimuat dari:

```text
src/main.jsx
src/styles/global.css
src/styles/responsive.css
```

---

## Catatan Pengembangan

Project ini mengikuti beberapa aturan dari `rules.txt`, antara lain:

- Folder menggunakan huruf kecil dan tanda hubung jika lebih dari satu kata.
- Komponen React menggunakan PascalCase.
- Variabel dan fungsi menggunakan camelCase.
- Handler aksi menggunakan awalan kata kerja.
- Komunikasi API diletakkan di folder `services`.
- Komponen dibuat menggunakan functional component dan React Hooks.
- Komentar digunakan untuk menjelaskan logika kompleks.

---

## Rekomendasi Pengembangan Lanjutan

Beberapa hal yang sebaiknya ditambahkan agar project lebih siap produksi:

1. Tambahkan file `.env.example` agar konfigurasi backend lebih jelas.
2. Tambahkan validasi respons API agar error backend lebih mudah dilacak.
3. Tambahkan loading skeleton untuk recipe card dan saved recipes.
4. Tambahkan unit test untuk utility `recipe.js` dan `nutrition.js`.
5. Tambahkan fallback khusus jika backend chat lambat atau timeout.
6. Tambahkan dokumentasi backend terpisah agar kontrak API tidak ambigu.
7. Hindari menyimpan token sensitif terlalu lama di `localStorage` jika aplikasi dipakai produksi sungguhan.

---

## Status Project

| Bagian | Status |
|---|---|
| Landing page | Tersedia |
| Login dan register | Tersedia, membutuhkan backend |
| Chat page | Tersedia, membutuhkan backend |
| Recipe card | Tersedia |
| Halaman bahan | Tersedia |
| Langkah memasak | Tersedia |
| Resep disimpan | Tersedia, membutuhkan backend |
| Backend | Tidak termasuk dalam repository frontend ini |

---

## Penutup

TemanMasak adalah frontend aplikasi rekomendasi resep berbasis chat. Agar seluruh fitur berjalan, pastikan backend API aktif, URL backend sudah dikonfigurasi melalui `VITE_API_BASE_URL`, dan endpoint backend sesuai dengan kontrak yang digunakan oleh service frontend.
