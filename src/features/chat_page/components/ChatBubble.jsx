import React from 'react';
import Text from '../../../components/Text';

const ChatBubble = ({ isUser = false, message, avatar, children }) => {
    return (
        <div className={`message-row ${isUser ? 'user-message-row' : 'bot-message-row'}`}>
            {/* Tampilkan Avatar Bot jika yang ngirim bukan user */}
            {!isUser && avatar && (
                <div className="bot-avatar">
                    {avatar}
                </div>
            )}
            
            <div className={`message-bubble ${isUser ? 'user-bubble' : 'bot-bubble'}`}>
                {/* Render teks pesan */}
                {message && (
                    <Text type="body" color={isUser ? "#374151" : "#1f2937"}>
                        {/* Menggunakan dangerouslySetInnerHTML agar tag <strong> dll bisa terbaca */}
                        <span dangerouslySetInnerHTML={{ __html: message }} />
                    </Text>
                )}
                {/* Render Widget tambahan (seperti RecipeCard) di dalam gelembung */}
                {children}
            </div>
        </div>
    );
};

export default ChatBubble;