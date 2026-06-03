import React from 'react';
import Sidebar from '../layouts/Sidebar';
import ChatArea from '../features/chat_page/components/ChatArea';
import '../styles/chat_page.css';

const ChatPage = () => {
    return (
        <div className="chat-page-layout">
            <Sidebar />
            <main className="chat-main-content">
                <ChatArea />
            </main>
        </div>
    );
};

export default ChatPage;