/**
 * Template untuk membuat komponen React yang mengikuti rules.txt
 * 
 * Panduan:
 * 1. Ganti "MyComponent" dengan nama komponen (PascalCase)
 * 2. Ganti "myComponentData" dengan variabel data (camelCase)
 * 3. Tambahkan props yang diperlukan
 * 4. Berikan default value untuk props
 */

// ✅ Import hanya yang diperlukan
// import { useState, useEffect } from 'react';

/**
 * MyComponent - Deskripsi singkat komponen
 * 
 * @param {Object} props - Props komponen
 * @param {string} props.title - Judul komponen
 * @param {Array} props.data - Data untuk ditampilkan
 * @returns {JSX.Element} Rendered component
 */
export default function MyComponent({ 
  title = 'Default Title',
  data = []
}) {
  // ✅ Gunakan camelCase untuk variabel lokal
  // const [isLoading, setIsLoading] = useState(false);

  // ✅ Handler functions dimulai dengan kata kerja: handle, fetch, toggle, etc
  // const handleClick = () => {
  //   setIsLoading(true);
  // }

  return (
    <div className="container">
      <h2 className="text-2xl font-bold">{title}</h2>
      
      {/* ✅ Selalu berikan fallback untuk data yang mungkin kosong */}
      {data.length > 0 ? (
        <ul>
          {data.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

/**
 * ✅ RULES YANG DITERAPKAN:
 * 
 * PENAMAAN FILE DAN FOLDER:
 * - File komponen: MyComponent.jsx (PascalCase)
 * - Folder: my-folder/ (lowercase dengan tanda hubung)
 * 
 * PENAMAAN VARIABEL:
 * - Komponen: PascalCase (function MyComponent)
 * - Variabel lokal: camelCase (const isLoading)
 * - Handler: handleClick, fetchData, toggleMenu (kata kerja di depan)
 * - CSS class: kebab-case (class-name)
 * 
 * BAHASA:
 * - Variabel: English
 * - Komentar kompleks: Indonesian
 * 
 * STRUKTUR:
 * - Functional components dengan React Hooks
 * - Props dengan default values
 * - Error handling dan fallback UI
 * - JSDoc comments untuk dokumentasi
 */
