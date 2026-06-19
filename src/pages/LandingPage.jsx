import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as LottieReact from 'lottie-react';

import Button from '../components/Button';
import GradientText from '../components/GradientText';

import animasiCooking from '../assets/Cooking.json';
import '../styles/landing_page.css';

const Lottie =
  LottieReact.default?.default ||
  LottieReact.default ||
  LottieReact.LottiePlayer ||
  LottieReact.Player;

const fiturUtama = [
  {
    title: 'Rekomendasi Resep AI',
    description:
      'Cukup tulis bahan yang kamu punya. Sistem akan membaca kebutuhanmu lalu memilih resep yang paling relevan untuk dicoba.',
    icon: 'AI',
    featured: true,
  },
  {
    title: 'Dataset Resep Luas',
    description:
      'Rekomendasi berasal dari kumpulan resep Indonesia dan internasional yang sudah diproses.',
    icon: 'DATA',
  },
  {
    title: 'Estimasi Nutrisi',
    description:
      'Setiap resep dilengkapi estimasi kalori, protein, lemak, dan karbohidrat.',
    icon: 'NUTRI',
  },
  {
    title: 'Preferensi Pengguna',
    description:
      'Sesuaikan dengan pantangan, selera rasa, waktu makan, dan alat masak yang tersedia.',
    icon: 'PREF',
  },
  {
    title: 'Panduan Memasak',
    description:
      'Setelah memilih resep, kamu diarahkan ke bahan dan langkah memasak secara bertahap.',
    icon: 'STEP',
  },
];

const langkahPenggunaan = [
  {
    number: '01',
    title: 'Masukkan bahan',
    description:
      'Ketik bahan yang tersedia atau ceritakan kebutuhan masakmu dengan bahasa biasa.',
  },
  {
    number: '02',
    title: 'Sesuaikan preferensi',
    description:
      'Tentukan pantangan, selera rasa, waktu makan, atau alat masak yang kamu punya.',
  },
  {
    number: '03',
    title: 'Pilih resep dan mulai masak',
    description:
      'Sistem menampilkan rekomendasi resep, estimasi nutrisi, bahan, dan langkah memasak.',
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  const scrollToCaraKerja = () => {
    const section = document.getElementById('cara-kerja');

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className="landing-container">
      <nav className="landing-nav">
        <div className="nav-logo">
          <GradientText
            colors={['#006E0A', '#47FF47']}
            animationSpeed={8}
            showBorder={false}
            style={{
              fontSize: '48px',
              fontFamily: 'Quicksand, sans-serif',
              fontWeight: 'bold',
            }}
          >
            Teman Masak
          </GradientText>
        </div>

        <div className="nav-actions">
          <Button
            text="Masuk"
            variant="ghost"
            onClick={() => navigate('/login')}
          />

          <Button
            text="Daftar"
            variant="primary"
            onClick={() => navigate('/register')}
          />
        </div>
      </nav>

      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Masak Enak, <span>Tanpa Pusing</span> Mikir Resep.
          </h1>

          <p className="hero-subtitle">
            Kulkas penuh bahan tapi bingung mau masak apa? Biarkan AI-Chef kami
            meracik resep lezat khusus untukmu dalam hitungan detik.
          </p>

          <div className="hero-buttons">
            <Button
              text="Coba Sekarang"
              variant="primary"
              onClick={() => navigate('/chat')}
            />

            <Button
              text="Cara Kerja"
              variant="social"
              onClick={scrollToCaraKerja}
            />
          </div>
        </div>

        <div className="hero-image-container">
          <div className="hero-image-backdrop" />

          <div className="hero-phone-mockup">
            {Lottie && (
              <Lottie
                animationData={animasiCooking}
                loop
                autoplay
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            )}
          </div>
        </div>
      </header>

      <section className="landing-feature-section" id="fitur-utama">
        <div className="section-heading">
          <span className="section-badge">FITUR UTAMA</span>

          <h2>Apa yang bisa dilakukan Teman Masak?</h2>

          <p>
            Fitur dirancang supaya proses mencari resep terasa cepat, relevan,
            dan mudah dipakai.
          </p>
        </div>

        <div className="feature-grid">
          {fiturUtama.map((item, index) => (
            <div
              key={index}
              className={`feature-card ${
                item.featured ? 'feature-card--featured' : ''
              }`}
            >
              <div className="feature-icon-wrap">
                <span className="feature-icon-text">{item.icon}</span>
              </div>

              <div className="feature-content">
                <h3 className="feature-card-title">{item.title}</h3>
                <p className="feature-card-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-steps-section" id="cara-kerja">
        <div className="section-heading">
          <span className="section-badge">CARA KERJA</span>

          <h2>Tiga langkah sederhana</h2>

          <p>
            Alurnya singkat: input bahan, sesuaikan preferensi, lalu pilih resep
            yang paling cocok.
          </p>
        </div>

        <div className="steps-grid">
          {langkahPenggunaan.map((step, index) => (
            <div className="step-card" key={index}>
              <div className="step-number-badge">{step.number}</div>

              <h3>{step.title}</h3>

              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="landing-footer">
        <p>&copy; 2026 Teman Masak AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;