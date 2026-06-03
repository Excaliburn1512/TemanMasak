import React, { useState } from 'react';
import Button from '../components/Button';
import Text from '../components/Text';
import '../styles/sidebar.css'; 

const Sidebar = () => {
    // State untuk mengontrol buka/tutup sidebar
    // Jika lebar layar > 768px (Laptop), sidebar terbuka. Jika HP, otomatis tertutup.
    const [isOpen, setIsOpen] = useState(window.innerWidth > 768);

    const IconPlus = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
    const IconRecipe = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 14l1.48-1.48C3.8 12.15 4 11.6 4 11V7a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v4c0 .6.2 1.15.52 1.52L9 14"></path></svg>;
    const IconSettings = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;
    const IconHelp = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
    
    // Ikon Panah Kiri dan Kanan untuk tombol toggle
    const IconChevronLeft = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>;
    const IconChevronRight = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>;

    return (
        // Wrapper luar yang dikontrol lebarnya oleh state isOpen
        <div className={`sidebar-wrapper ${isOpen ? 'open' : 'closed'}`}>
            
            {/* Tombol Panah Buka-Tutup */}
            <button 
                className="btn-sidebar-toggle"
                onClick={() => setIsOpen(!isOpen)}
                title={isOpen ? "Tutup Sidebar" : "Buka Sidebar"}
            >
                {isOpen ? IconChevronLeft : IconChevronRight}
            </button>

            {/* Container yang menyembunyikan overlow */}
            <aside className="sidebar-container">
                {/* Konten tetap 280px agar tidak gepeng */}
                <div className="sidebar-content">
                    
                    <div style={{ marginBottom: '2rem', paddingRight: '2rem' }}>
                        <Text type="subtitle">Teman Masak</Text>
                        <Text type="caption">AI-CHEF</Text>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                        <Button text="New Kitchen Chat" variant="primary" iconLeft={IconPlus} fullWidth={true} justify="flex-start" />
                        <Button text="Saved Recipes" variant="secondary" iconLeft={IconRecipe} fullWidth={true} justify="flex-start" />
                    </div>

                    <div className="history-section" style={{ marginTop: '1.5rem' }}>
                        
                        <div style={{ marginBottom: '0.5rem' }}>
                            <Text type="caption">TODAY</Text>
                        </div>
                        <ul className="history-list">
                            <li className="history-item active">Garlic Lemon Chicken & Spinach</li>
                            <li className="history-item">Quick Breakfast Ideas</li>
                        </ul>

                        <div style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                            <Text type="caption">YESTERDAY</Text>
                        </div>
                        <ul className="history-list">
                            <li className="history-item">Soto Betawi Recipe</li>
                            <li className="history-item">Ayam Bakar Madu</li>
                            <li className="history-item">Vegetarian Meal Prep</li>
                        </ul>
                    </div>

                    <div className="sidebar-footer" style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <Button text="Settings" variant="ghost" iconLeft={IconSettings} fullWidth={true} justify="flex-start" />
                        <Button text="Help" variant="ghost" iconLeft={IconHelp} fullWidth={true} justify="flex-start" />
                    </div>

                </div>
            </aside>
        </div>
    );
};

export default Sidebar;