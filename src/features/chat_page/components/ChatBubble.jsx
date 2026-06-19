import React from 'react';
import Text from '../../../components/Text';

function ChatBubble({ isUser = false, message, avatar, children }) {
    return (
        <div className={`message-row ${isUser ? 'user-message-row' : 'bot-message-row'}`}>
            {!isUser && avatar && <div className="bot-avatar">{avatar}</div>}

            <div className={`message-bubble ${isUser ? 'user-bubble' : 'bot-bubble'}`}>
                {message && (
                    <Text type="body" color={isUser ? 'var(--color-text-secondary)' : 'var(--color-text-primary)'}>
                        <span className="message-text">{message}</span>
                    </Text>
                )}

                {children}
            </div>
        </div>
    );
}

export default ChatBubble;
