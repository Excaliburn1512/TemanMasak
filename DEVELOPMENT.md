# Teman Masak Landing Page

Aplikasi React landing page untuk Teman Masak - Platform AI untuk rekomendasi resep berdasarkan bahan yang Anda punya.

## Struktur Proyek

Proyek ini mengikuti struktur folder dan konvensi penamaan yang ketat sesuai dengan `rules.txt`:

```
TemanMasak/
├── node_modules/           # Pustaka dan dependensi
├── public/                 # File statis
├── src/
│   ├── assets/            # Gambar, font, ikon lokal
│   ├── components/        # Komponen global yang dapat digunakan ulang
│   │   ├── Hero.jsx
│   │   ├── Features.jsx
│   │   ├── HowItWorks.jsx
│   │   └── RecipeShowcase.jsx
│   ├── layouts/           # Layout/wrapper komponen
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── pages/             # Halaman utama
│   │   └── Home.jsx
│   ├── styles/            # File CSS/Tailwind global
│   ├── utils/             # Fungsi pembantu
│   ├── App.jsx            # Komponen root
│   ├── App.css            # Style spesifik App
│   ├── index.css          # Tailwind directives
│   └── main.jsx           # Entry point
├── package.json
├── tailwind.config.js     # Konfigurasi Tailwind CSS
├── postcss.config.js      # Konfigurasi PostCSS
├── eslint.config.js       # Konfigurasi ESLint
└── vite.config.js         # Konfigurasi Vite
```

## Konvensi Penamaan

Proyek ini mengikuti standar penamaan yang ketat:

### File dan Folder
- ✅ Folder menggunakan **huruf kecil dengan tanda hubung**: `my-folder/`
- ✅ Komponen React menggunakan **PascalCase**: `Header.jsx`, `Features.jsx`
- ✅ Helper functions menggunakan **camelCase**: `formatDate.js`, `calculateNutrition.js`

### Komponen dan Fungsi
- ✅ Komponen menggunakan **PascalCase**: `function Header() {}`
- ✅ Variabel menggunakan **camelCase**: `const userName = '...'`
- ✅ Handler functions menggunakan **awalan kata kerja**: `handleClick()`, `fetchRecipe()`
- ✅ CSS classes menggunakan **huruf kecil dengan tanda hubung**: `btn-primary`, `card-header`

### Bahasa Pemrograman
- ✅ **Nama variabel**: Bahasa Inggris
- ✅ **Komentar**: Bahasa Indonesia (untuk logika kompleks)

## Teknologi

- **React 19** - UI Framework
- **Tailwind CSS 3** - Styling utility
- **Vite** - Build tool
- **ESLint** - Code quality

## Setup dan Instalasi

### Prerequisites
- Node.js 16+
- npm atau yarn

### Langkah-langkah

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Jalankan development server:**
   ```bash
   npm run dev
   ```
   Server akan berjalan di `http://localhost:5173`

3. **Build untuk production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

5. **Lint code:**
   ```bash
   npm run lint
   ```

## Struktur Komponen

### Layouts
- **Header**: Navigasi utama dengan responsive menu
- **Footer**: Footer dengan links dan informasi copyright

### Components
- **Hero**: Section utama dengan CTA (Call-to-Action)
- **Features**: Menampilkan 3 fitur utama aplikasi
- **HowItWorks**: Menampilkan 3 langkah cara kerja
- **RecipeShowcase**: Showcase resep dengan info nutrisi

### Pages
- **Home**: Menggabungkan semua komponen menjadi landing page

## Styling

Proyek menggunakan **Tailwind CSS** untuk styling. Konfigurasi custom colors:

```javascript
colors: {
  primary: "#22c55e",      // Warna hijau utama
  secondary: "#fbbf24",    // Warna kuning
  accent: "#f87171",       // Warna merah accent
  dark: "#1f2937",         // Warna teks gelap
  light: "#f3f4f6",        // Warna background terang
}
```

## Best Practices yang Diterapkan

1. ✅ **Functional Components with Hooks**: Menggunakan React Hooks untuk state management
2. ✅ **Props dengan Default Values**: Mencegah error saat data kosong
3. ✅ **Separation of Concerns**: API calls terpisah dari komponen (siap di services/)
4. ✅ **Responsive Design**: Mobile-first approach dengan Tailwind breakpoints
5. ✅ **Clean Code**: Tidak ada console.log di production, variable names jelas
6. ✅ **Component Reusability**: Komponen dirancang untuk dapat digunakan ulang

## Pengembangan Lebih Lanjut

### Menambah Komponen Baru

1. Buat file di `src/components/` atau `src/layouts/`
2. Gunakan PascalCase untuk nama file
3. Export sebagai default export:
   ```javascript
   export default function MyComponent() {
     return <div>...</div>
   }
   ```
4. Import dan gunakan di halaman yang sesuai

### Menambah Helper Functions

1. Buat file di `src/utils/`
2. Gunakan camelCase untuk nama file
3. Export fungsi yang diperlukan:
   ```javascript
   export function formatDate(date) {
     // implementation
   }
   ```

### Menambah API Services

1. Buat folder di `src/services/`
2. Buat file untuk setiap service (e.g., `recipeService.js`)
3. Import dan gunakan di komponen sesuai kebutuhan

## ESLint Configuration

ESLint sudah dikonfigurasi dengan:
- ESLint recommended rules
- React Hooks plugin
- React Refresh plugin

Jalankan linting dengan:
```bash
npm run lint
```

## Tips Pengembangan

- 🔄 Tailwind CSS akan automatically rebuild saat mengubah class
- 🔥 Hot Module Replacement (HMR) aktif untuk development
- 📱 Test responsiveness dengan DevTools device emulation
- 🎨 Gunakan Tailwind CSS utilities daripada custom CSS

## Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vite.dev)

---

**Dibuat untuk kemudahan memasak dengan AI ✨**
