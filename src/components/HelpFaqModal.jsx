import React from 'react';
import './ProfileSettingsModal.css';
import './HelpFaqModal.css';

const FAQ_ITEMS = [
    {
        question: 'Bagaimana cara mulai mencari resep?',
        answer: 'Masuk ke halaman chat, lalu tulis bahan yang kamu punya. Contoh: "aku punya ayam, telur, bawang putih".',
    },
    {
        question: 'Kenapa AI menanyakan alergi, selera, waktu makan, dan alat masak?',
        answer: 'Jawaban itu dipakai untuk mempersempit rekomendasi agar resepnya lebih cocok dengan kondisi pengguna.',
    },
    {
        question: 'Bagaimana cara lanjut ke bahan-bahan?',
        answer: 'Pilih salah satu recipe card dari hasil chat, lalu tekan tombol untuk melihat bahan atau mulai memasak.',
    },
    {
        question: 'Apa fungsi halaman bahan-bahan?',
        answer: 'Halaman ini menampilkan daftar bahan, estimasi nutrisi, porsi, dan tombol untuk masuk ke langkah memasak.',
    },
    {
        question: 'Bagaimana cara mengikuti langkah memasak?',
        answer: 'Di halaman langkah masak, gunakan tombol berikutnya dan sebelumnya untuk berpindah antar instruksi.',
    },
    {
        question: 'Bagaimana menyimpan resep?',
        answer: 'Tekan tombol simpan pada recipe card di chat. Resep yang tersimpan akan muncul di menu Resep Tersimpan.',
    },
];

function HelpFaqModal({ show = false, onClose = () => {} }) {
    if (!show) return null;

    return (
        <div className="help-modal-overlay" role="dialog" aria-modal="true">
            <div className="help-modal-card">
                <button
                    type="button"
                    className="help-modal-close"
                    onClick={onClose}
                    aria-label="Tutup bantuan"
                >
                    ×
                </button>

                <div className="help-modal-header">
                    <span className="help-modal-kicker">Bantuan</span>
                    <h2>FAQ Teman Masak</h2>
                    <p>Panduan singkat penggunaan fitur utama aplikasi.</p>
                </div>

                <div className="help-modal-body">
                    <div className="faq-list">
                    {FAQ_ITEMS.map((item, index) => (
                        <div key={item.question} className="faq-item">
                            <span className="faq-number">{String(index + 1).padStart(2, '0')}</span>
                            <div>
                                <h3>{item.question}</h3>
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HelpFaqModal;
