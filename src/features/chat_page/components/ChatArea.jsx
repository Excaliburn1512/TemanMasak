import React, { useState } from 'react';
import Button from '../../../components/Button';
import Text from '../../../components/Text';
import ChatBubble from '../components/ChatBubble';
import RecipeCard from '../components/Recipecard';
import '../../../styles/chat_page.css';

const ChatArea = () => {
    // State untuk menyimpan teks yang sedang diketik
    const [messageInput, setMessageInput] = useState('');
    
    // State BARU: Mengontrol apakah animasi titik tiga (...) tampil atau tidak
    const [isBotTyping, setIsBotTyping] = useState(false);

    const tanganiKirimPesan = (e) => {
        e.preventDefault();
        
        // Cek apakah input tidak kosong
        if (messageInput.trim() !== '') {
            // 1. Kosongkan kotak ketik
            setMessageInput('');
            
            // 2. Munculkan animasi bot sedang mengetik (titik tiga)
            setIsBotTyping(true);

            // 3. Matikan animasi setelah 3 detik (Simulasi bot selesai berpikir/membalas)
            setTimeout(() => {
                setIsBotTyping(false);
            }, 3000);
        }
    };

    // Ikon-ikon
    const IconSend = <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2"></path></svg>;
    const IconBot = <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"></path><line x1="6" y1="17" x2="18" y2="17"></line></svg>;

    return (
        <div className="chat-area-container">
            <div className="chat-timestamp">
                <Text type="caption" align="center">Today, 10:42 AM</Text>
            </div>
            
            <div className="chat-messages-scroll">
                
                <ChatBubble 
                    isUser={true} 
                    message="I have some chicken breast, half a lemon, some wilting spinach, and a few cloves of garlic. What can I make? I want something quick." 
                />

                <ChatBubble 
                    isUser={false} 
                    avatar={IconBot}
                    message="Perfect! We can whip up a fantastic <strong>Garlic Lemon Chicken with Wilted Spinach</strong> in about 15 minutes. It's light, zesty, and uses exactly what you have."
                >
                    <RecipeCard 
                        title="Garlic Lemon Chicken & Spinach"
                        tags={[
                            { label: "15 Min", className: "tag-time" },
                            { label: "High Protein", className: "tag-protein" }
                        ]}
                        description="Just sear the chicken, deglaze with a little lemon juice, and quickly toss the spinach in the flavorful pan juices. Want the step-by-step instructions?"
                        onStartCooking={() => console.log('Mulai Masak')}
                        onSaveLater={() => console.log('Simpan Resep')}
                    />
                </ChatBubble>
                
                {/* LOGIKA BARU: Animasi titik tiga hanya muncul jika isBotTyping bernilai true */}
                {isBotTyping && (
                    <div className="message-row bot-message-row typing-indicator-row">
                        <div className="typing-indicator">
                            <span className="dot"></span><span className="dot"></span><span className="dot"></span>
                        </div>
                    </div>
                )}
                
            </div>

            <div className="chat-input-wrapper">
                <form onSubmit={tanganiKirimPesan} className="chat-input-box">

                    <input 
                        type="text" 
                        className="chat-input-field"
                        placeholder="Type ingredients or ask for a recipe..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        style={{ backgroundColor: 'transparent' }} 
                    />
                    
                    {/* LOGIKA BARU ala WhatsApp: 
                        Tombol Kirim (hijau) HANYA muncul ketika ada teks yang diketik. 
                        Jika kosong, tombolnya menghilang. */}
                    {messageInput.trim() !== '' && (
                        <Button type="submit" variant="icon-only" iconLeft={IconSend} />
                    )}
                    
                </form>
                
                <div style={{ marginTop: '0.8rem', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ maxWidth: '85%', opacity: 0.8 }}>
                        <Text type="caption" align="center">
                            Teman Masak AI can make mistakes. Consider verifying safety guidelines.
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatArea;