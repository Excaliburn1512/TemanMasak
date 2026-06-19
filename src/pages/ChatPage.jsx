import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../layouts/Sidebar';
import ChatArea from '../features/chat_page/components/ChatArea';
import CustomDialog from '../components/CustomDialog';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { createChatSession } from '../features/chat_page/services/chatService';
import '../styles/chat_page.css';

function ChatPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const hasProcessedCookingFinish = useRef(false);

    const [activeSessionId, setActiveSessionId] = useState(null);
    const [sessionsRefreshKey, setSessionsRefreshKey] = useState(0);
    const [finishDialog, setFinishDialog] = useState({
        show: false,
        title: '',
        message: '',
    });

    function refreshSessions() {
        setSessionsRefreshKey((prevKey) => prevKey + 1);
    }

    useEffect(() => {
        if (location.state?.cookingFinished) return;

        const returnSessionId =
            location.state?.returnSessionId ||
            localStorage.getItem(STORAGE_KEYS.activeCookingSessionId);

        if (returnSessionId) {
            setActiveSessionId(Number(returnSessionId));
        }
    }, [location.state]);

    useEffect(() => {
        async function handleCookingFinish() {
            const {
                cookingFinished,
                startNewChat,
                finishedRecipeTitle,
                returnSessionId: stateReturnSessionId,
            } = location.state || {};

            if (!cookingFinished || hasProcessedCookingFinish.current) return;

            const returnSessionId =
                stateReturnSessionId ||
                localStorage.getItem(STORAGE_KEYS.activeCookingSessionId);

            hasProcessedCookingFinish.current = true;
            setFinishDialog({
                show: true,
                title: 'Masakan Siap Disajikan! 🍽️',
                message: finishedRecipeTitle
                    ? `"${finishedRecipeTitle}" sudah selesai dimasak. Mantap chef! ${startNewChat ? 'Aku sudah siapkan chat baru buat kamu.' : 'Kamu kembali ke chat sebelumnya.'}`
                    : `Masakan kamu sudah selesai. Mantap chef! ${startNewChat ? 'Aku sudah siapkan chat baru buat kamu.' : 'Kamu kembali ke chat sebelumnya.'}`,
            });

            if (startNewChat) {
                try {
                    const newSession = await createChatSession();
                    setActiveSessionId(newSession.id);
                    refreshSessions();
                } catch (error) {
                    console.error('Gagal membuat chat baru setelah memasak:', error);
                    setActiveSessionId(returnSessionId ? Number(returnSessionId) : null);
                }
            } else if (returnSessionId) {
                setActiveSessionId(Number(returnSessionId));
            }

            localStorage.removeItem(STORAGE_KEYS.selectedRecipe);
            localStorage.removeItem(STORAGE_KEYS.activeCookingSessionId);

            navigate('/chat', { replace: true, state: {} });
        }

        handleCookingFinish();
    }, [location.state, navigate]);

    function closeFinishDialog() {
        setFinishDialog({ show: false, title: '', message: '' });
    }

    return (
        <div className="chat-page-layout">
            <Sidebar
                activeSessionId={activeSessionId}
                onSelectSession={setActiveSessionId}
                onSessionCreated={(newSessionId) => {
                    setActiveSessionId(newSessionId);
                    refreshSessions();
                }}
                onSessionDeleted={(deletedSessionId) => {
                    if (activeSessionId === deletedSessionId) {
                        setActiveSessionId(null);
                    }
                    refreshSessions();
                }}
                refreshKey={sessionsRefreshKey}
            />

            <main className="chat-main-content">
                <ChatArea
                    activeSessionId={activeSessionId}
                    onActiveSessionChange={setActiveSessionId}
                    onSessionsChanged={refreshSessions}
                />
            </main>

            <CustomDialog
                show={finishDialog.show}
                type="success"
                title={finishDialog.title}
                message={finishDialog.message}
                confirmText="Mantap!"
                onClose={closeFinishDialog}
            />
        </div>
    );
}

export default ChatPage;
