import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Text from '../components/Text';
import ConfirmDialog from '../components/ConfirmDialog';
import UserAvatar from '../components/UserAvatar';
import ProfileSettingsModal from '../components/ProfileSettingsModal';
import HelpFaqModal from '../components/HelpFaqModal';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { getStoredUsername, USER_PROFILE_EVENT } from '../utils/userProfile';
import { handleUserLogout, requestBackendLogout } from '../features/auth/services/authService';
import '../styles/sidebar.css';
import {
    createChatSession,
    getChatSessions,
    deleteChatSession,
} from '../features/chat_page/services/chatService';

const IconPlus = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const IconRecipe = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 14l1.48-1.48C3.8 12.15 4 11.6 4 11V7a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v4c0 .6.2 1.15.52 1.52L9 14" />
    </svg>
);

const IconSettings = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.14.31.22.65.22 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </svg>
);

const IconHelp = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <path d="M12 17h.01" />
    </svg>
);

const IconLogout = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
);

const IconTrash = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14H6L5 6" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
        <path d="M9 6V4h6v2" />
    </svg>
);

const IconChevronLeft = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" />
    </svg>
);

const IconChevronRight = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
    </svg>
);

function isSameDay(dateString, targetDate) {
    const date = new Date(dateString);

    return (
        date.getDate() === targetDate.getDate() &&
        date.getMonth() === targetDate.getMonth() &&
        date.getFullYear() === targetDate.getFullYear()
    );
}

const getSessionTitle = (session) => {
  if (session?.preview_user && session.preview_user.trim()) {
    return session.preview_user;
  }

  return 'New Chat';
};

function Sidebar({
    activeSessionId = null,
    onSelectSession = () => {},
    onSessionCreated = () => {},
    onSessionDeleted = () => {},
    refreshKey = 0,
    autoSelectFirstSession = true,
}) {
    const navigate = useNavigate();
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
    const [sessions, setSessions] = useState([]);
    const [isLoadingSessions, setIsLoadingSessions] = useState(false);
    const [username, setUsername] = useState(getStoredUsername());
    const [showSettings, setShowSettings] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const groupedSessions = useMemo(() => {
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        return {
            today: sessions.filter((session) => isSameDay(session.created_at, today)),
            yesterday: sessions.filter((session) => isSameDay(session.created_at, yesterday)),
            older: sessions.filter((session) => (
                !isSameDay(session.created_at, today) && !isSameDay(session.created_at, yesterday)
            )),
        };
    }, [sessions]);

    function handleAuthError(error) {
        const message = error?.message || '';
        const isAuthError = message.includes('Token') || message.includes('expired') || message.includes('401');

        if (!isAuthError) return false;

        localStorage.removeItem(STORAGE_KEYS.token);
        navigate('/login');
        return true;
    }

    async function loadSessions() {
        if (!localStorage.getItem(STORAGE_KEYS.token)) {
            navigate('/login');
            return;
        }

        try {
            setIsLoadingSessions(true);
            const data = await getChatSessions();
            const sessionList = Array.isArray(data) ? data : [];

            setSessions(sessionList);

            if (autoSelectFirstSession && !activeSessionId && sessionList.length > 0) {
                onSelectSession(sessionList[0].id);
            }
        } catch (error) {
            console.error('Gagal memuat sesi chat:', error);
            handleAuthError(error);
        } finally {
            setIsLoadingSessions(false);
        }
    }

    useEffect(() => {
        loadSessions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshKey]);

    useEffect(() => {
        function syncUsername() {
            setUsername(getStoredUsername());
        }

        window.addEventListener(USER_PROFILE_EVENT, syncUsername);
        window.addEventListener('storage', syncUsername);

        return () => {
            window.removeEventListener(USER_PROFILE_EVENT, syncUsername);
            window.removeEventListener('storage', syncUsername);
        };
    }, []);

    async function handleNewChat() {
        try {
            const newSession = await createChatSession();
            onSessionCreated(newSession.id);

            if (window.innerWidth <= 768) {
                setIsOpen(false);
            }
        } catch (error) {
            console.error('Gagal membuat chat baru:', error);
            handleAuthError(error);
        }
    }

    function handleSelectSession(sessionId) {
        onSelectSession(sessionId);

        if (window.innerWidth <= 768) {
            setIsOpen(false);
        }
    }


    function openLogoutDialog() {
        setShowLogoutConfirm(true);
    }

    function closeLogoutDialog() {
        if (!isLoggingOut) setShowLogoutConfirm(false);
    }

    async function handleLogout() {
        try {
            setIsLoggingOut(true);
            await requestBackendLogout();
        } catch (error) {
            console.warn('Logout backend gagal, token lokal tetap dihapus:', error);
        } finally {
            handleUserLogout();
            setIsLoggingOut(false);
            setShowLogoutConfirm(false);
            navigate('/login', { replace: true });
        }
    }

    function openDeleteDialog(event, session) {
        event.stopPropagation();
        setDeleteTarget(session);
    }

    function closeDeleteDialog() {
        if (!isDeleting) setDeleteTarget(null);
    }

    async function handleDeleteSession() {
        if (!deleteTarget) return;

        try {
            setIsDeleting(true);
            await deleteChatSession(deleteTarget.id);
            setSessions((prevSessions) => prevSessions.filter((session) => session.id !== deleteTarget.id));
            onSessionDeleted(deleteTarget.id);
            setDeleteTarget(null);
        } catch (error) {
            console.error('Gagal menghapus sesi chat:', error);

            if (handleAuthError(error)) return;
            alert(error.message || 'Gagal menghapus riwayat chat.');
        } finally {
            setIsDeleting(false);
        }
    }

    function renderSessionList(label, list) {
        if (!list?.length) return null;

        return (
            <section className="history-group">
                <Text type="caption" className="history-group-title">{label}</Text>

                <ul className="history-list">
                    {list.map((session) => {
                        const title = getSessionTitle(session);

                        return (
                            <li
                                key={session.id}
                                className={`history-item ${activeSessionId === session.id ? 'active' : ''}`}
                                onClick={() => handleSelectSession(session.id)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') handleSelectSession(session.id);
                                }}
                                title={title}
                            >
                                <span className="history-item-title">{title}</span>

                                <button
                                    type="button"
                                    className="history-delete-button"
                                    onClick={(event) => openDeleteDialog(event, session)}
                                    title="Hapus riwayat chat"
                                >
                                    {IconTrash}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </section>
        );
    }

    return (
        <div className={`sidebar-wrapper ${isOpen ? 'open' : 'closed'}`}>
            <button
                className="btn-sidebar-toggle"
                onClick={() => setIsOpen((current) => !current)}
                title={isOpen ? 'Tutup Sidebar' : 'Buka Sidebar'}
                aria-label={isOpen ? 'Tutup Sidebar' : 'Buka Sidebar'}
                type="button"
            >
                {isOpen ? IconChevronLeft : IconChevronRight}
                {!isOpen && <span className="sidebar-toggle-label">Buka</span>}
            </button>

            <aside className="sidebar-container">
                <div className="sidebar-content">
                    <div className="sidebar-brand">
                        <Text type="subtitle">Teman Masak</Text>
                        <Text type="caption">AI Chef</Text>
                    </div>

                    <div className="sidebar-profile-card">
                        <UserAvatar username={username} size="md" />
                        <div className="sidebar-profile-text">
                            <span>{username}</span>
                            <small>Pengguna aktif</small>
                        </div>
                    </div>

                    <div className="sidebar-actions">
                        <Button
                            text="Chat Baru"
                            variant="primary"
                            iconLeft={IconPlus}
                            fullWidth
                            justify="flex-start"
                            onClick={handleNewChat}
                        />

                        <Button
                            text="Resep Tersimpan"
                            variant="secondary"
                            iconLeft={IconRecipe}
                            fullWidth
                            justify="flex-start"
                            onClick={() => {
                                navigate('/saved-recipes');
                                if (window.innerWidth <= 768) setIsOpen(false);
                            }}
                        />
                    </div>

                    <div className="history-section">
                        {isLoadingSessions && <Text type="caption">Memuat riwayat...</Text>}
                        {!isLoadingSessions && sessions.length === 0 && <Text type="caption">Belum ada riwayat chat</Text>}
                        {!isLoadingSessions && renderSessionList('Hari Ini', groupedSessions.today)}
                        {!isLoadingSessions && renderSessionList('Kemarin', groupedSessions.yesterday)}
                        {!isLoadingSessions && renderSessionList('Lebih Lama', groupedSessions.older)}
                    </div>

                    <div className="chat-sidebar-footer">
                        <Button
                            text="Pengaturan"
                            variant="ghost"
                            iconLeft={IconSettings}
                            fullWidth
                            justify="flex-start"
                            onClick={() => setShowSettings(true)}
                        />
                        <Button
                            text="Bantuan"
                            variant="ghost"
                            iconLeft={IconHelp}
                            fullWidth
                            justify="flex-start"
                            onClick={() => setShowHelp(true)}
                        />
                        <Button
                            text="Logout"
                            variant="danger"
                            iconLeft={IconLogout}
                            fullWidth
                            justify="flex-start"
                            onClick={openLogoutDialog}
                        />
                    </div>
                </div>
            </aside>

            <ConfirmDialog
                show={!!deleteTarget}
                title="Hapus Riwayat Chat?"
                message={deleteTarget ? `Riwayat "${getSessionTitle(deleteTarget)}" akan dihapus permanen.` : ''}
                confirmText="Hapus"
                cancelText="Batal"
                isLoading={isDeleting}
                onConfirm={handleDeleteSession}
                onCancel={closeDeleteDialog}
            />

            <ConfirmDialog
  open={showLogoutConfirm}
  type="danger"
  title="Logout dari Akun?"
  message="Kamu akan keluar dari sesi saat ini. Riwayat chat tetap tersimpan dan bisa dibuka lagi setelah login."
  cancelText="Batal"
  confirmText="Logout"
  loadingText="Logout..."
  isLoading={isLoggingOut}
  onCancel={() => setShowLogoutConfirm(false)}
  onConfirm={handleLogout}
/>

            <ProfileSettingsModal
                show={showSettings}
                onClose={() => setShowSettings(false)}
            />

            <HelpFaqModal
                show={showHelp}
                onClose={() => setShowHelp(false)}
            />
        </div>
    );
}

export default Sidebar;
