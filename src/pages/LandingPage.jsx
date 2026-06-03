import React from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react'; 
import Button from '../components/Button';
import Text from '../components/Text';
import animasiCooking from '../assets/Cooking.json'; 
import '../styles/landing_page.css';
import GradientText from '../components/GradientText';
import TextType from '../components/TextType';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-container">
            <nav className="landing-nav">
                <div className="nav-logo">
                    <GradientText
                    colors={["#006E0A","#47FF47"]}
                    animationSpeed={8}
                    showBorder={false}
                    className="custom-class"
                    style={{ 
                    fontSize: '48px', 
                    fontFamily: 'Quicksand, sans-serif',
                    fontWeight: 'bold' 
                    }}        
                    >
                    Teman Masak
                    </GradientText></div>
                <div className="nav-actions">
                    <Button text="Masuk" variant="ghost" onClick={() => navigate('/login')} />
                    <Button text="Daftar" variant="primary" onClick={() => navigate('/login')} />
                </div>
            </nav>

            <header className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">Masak Enak, <span>Tanpa Pusing</span> Mikir Resep.</h1>
                   <p className="hero-subtitle">
                        Kulkas penuh bahan tapi bingung mau masak apa? Biarkan AI-Chef kami meracik resep lezat khusus untuk Anda dalam hitungan detik.
                    </p>
                    <div className="hero-buttons">
                        <Button text="Coba Sekarang" variant="primary" onClick={() => navigate('/chat')} />
                        <Button 
                            text="Cara Kerja" 
                            variant="social" 
                            iconLeft={<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>}
                            onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })} 
                        />
                    </div>
                </div>
                <div className="hero-image-container">
                    <div className="hero-image-backdrop"></div>
                    <div className="hero-phone-mockup" style={{ width: '100%', height: '100%' }}>
                        <Lottie.default
                            animationData={animasiCooking}
                            loop={true}
                            autoplay={true}
                            style={{ width: '100%', height: '100%' }}/>
                    </div>
                </div>
            </header>

            {/* ================= FITUR UNGGULAN ================= */}
            <section className="features-section">
                {/* Kolom Kiri: Fitur */}
                <div>
                    <h2>Fitur Utama</h2>
                    <Text> </Text>
                    <div className="feature-card"><h3>IndoBERT AI</h3><p>Memahami istilah masakan informal.</p></div>
                    <div className="feature-card"><h3>1000+ Resep</h3><p>Rekomendasi resep domestik & internasional.</p></div>
                    <div className="feature-card"><h3>Info Nutrisi</h3><p>Tracking kalori otomatis.</p></div>
                </div>

                {/* Kolom Kanan: Cara Kerja */}
                <div>
                    <h2>Cara Kerja</h2>
                    <Text type="subtitle" align='center'>3 Langkah Mudah</Text>
                    <Text> </Text>
                    <div className="step-item"><div className="step-number">1</div> <div><h3>Ceritakan Bahan</h3><p>"Aku punya ayam dan santan"</p></div></div>
                    <div className="step-item"><div className="step-number">2</div> <div><h3>AI Memproses</h3><p>Menggunakan IndoBERT + Gemini</p></div></div>
                    <div className="step-item"><div className="step-number">3</div> <div><h3>Dapat Resep</h3><p>Opor Ayam Modern</p></div></div>
                </div>
            </section>

            {/* ================= FOOTER ================= */}
            <footer className="landing-footer">
                <p>&copy; 2026 Teman Masak AI. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;