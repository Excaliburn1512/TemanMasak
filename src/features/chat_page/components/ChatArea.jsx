import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import Text from '../../../components/Text';
import ChatBubble from './ChatBubble';
import RecipeCard from './RecipeCard';
import { STORAGE_KEYS, getRecipeCardsCacheKey } from '../../../constants/storageKeys';
import { normalizeRecipe, safeParseJson } from '../../../utils/recipe';
import '../../../styles/chat_page.css';
import {
    createChatSession,
    getSessionMessages,
    sendChatMessage,
    saveRecipe,
} from '../services/chatService';

const welcomeMessage = {
    id: 'welcome-message',
    sender_type: 'bot',
    message_text: 'Halo! Aku Teman Masak. Ceritakan bahan yang kamu punya, nanti aku bantu carikan ide resep yang cocok.',
    recipes: [],
};

const IconSend = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2 11 13" />
        <path d="m22 2-7 20-4-9-9-4Z" />
    </svg>
);

const IconBot = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8V4H8" />
        <rect width="16" height="12" x="4" y="8" rx="2" />
        <path d="M2 14h2" />
        <path d="M20 14h2" />
        <path d="M15 13v2" />
        <path d="M9 13v2" />
    </svg>
);

function ChatArea({
    activeSessionId = null,
    onActiveSessionChange = () => {},
    onSessionsChanged = () => {},
}) {
    const navigate = useNavigate();
    const messagesEndRef = useRef(null);

    const [messageInput, setMessageInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [isBotTyping, setIsBotTyping] = useState(false);
    const [isLoadingChat, setIsLoadingChat] = useState(false);

    function readCachedRecipes(sessionId) {
        if (!sessionId) return {};
        return safeParseJson(localStorage.getItem(getRecipeCardsCacheKey(sessionId)), {});
    }

    function writeCachedRecipes(sessionId, messageId, recipes) {
        if (!sessionId || !messageId || !recipes?.length) return;

        const cache = readCachedRecipes(sessionId);
        cache[String(messageId)] = recipes;
        localStorage.setItem(getRecipeCardsCacheKey(sessionId), JSON.stringify(cache));
    }

    function pickRecipeArray(...candidates) {
        const found = candidates.find((candidate) => Array.isArray(candidate) && candidate.length > 0);
        return found || [];
    }

    function getRecipesFromMessage(message, cachedRecipeMap = {}) {
        return pickRecipeArray(
            message?.recipes,
            message?.message_meta?.recipes,
            message?.metadata?.recipes,
            cachedRecipeMap[String(message?.id)]
        );
    }

    function getRecipesFromResponse(response) {
        return pickRecipeArray(
            response?.recipes,
            response?.recipe_cards,
            response?.recommendations,
            response?.data?.recipes,
            response?.bot_message?.recipes,
            response?.bot_message?.message_meta?.recipes,
            response?.bot_message?.metadata?.recipes,
            response?.message_meta?.recipes
        );
    }

    function handleAuthError(error) {
        const message = error?.message || '';
        const isAuthError = message.includes('Token') || message.includes('expired') || message.includes('401');

        if (!isAuthError) return false;

        localStorage.removeItem(STORAGE_KEYS.token);
        navigate('/login');
        return true;
    }

    function scrollToBottom() {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }

    function handleStartCooking(recipe) {
        if (!recipe) return;

        const normalizedRecipe = normalizeRecipe(recipe);

        localStorage.setItem(STORAGE_KEYS.selectedRecipe, JSON.stringify(normalizedRecipe));
        if (activeSessionId) {
            localStorage.setItem(STORAGE_KEYS.activeCookingSessionId, String(activeSessionId));
        }

        navigate('/ingredients', {
            state: {
                recipe: normalizedRecipe,
                returnSessionId: activeSessionId,
            },
        });
    }

    async function handleSaveRecipe(recipe) {
        if (!recipe) return;

        const normalizedRecipe = normalizeRecipe(recipe);

        try {
            await saveRecipe(normalizedRecipe);

            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    id: `local-bot-save-${Date.now()}`,
                    sender_type: 'bot',
                    message_text: `Resep "${normalizedRecipe.title}" sudah disimpan ke Resep Tersimpan.`,
                    recipes: [],
                },
            ]);
        } catch (error) {
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    id: `local-bot-save-error-${Date.now()}`,
                    sender_type: 'bot',
                    message_text: `Gagal menyimpan resep: ${error.message}`,
                    recipes: [],
                },
            ]);
        }
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages, isBotTyping]);

    useEffect(() => {
        async function loadMessages() {
            const token = localStorage.getItem(STORAGE_KEYS.token);

            if (!token) {
                navigate('/login');
                return;
            }

            if (!activeSessionId) {
                setMessages([welcomeMessage]);
                return;
            }

            try {
                setIsLoadingChat(true);
                const data = await getSessionMessages(activeSessionId);
                const cachedRecipeMap = readCachedRecipes(activeSessionId);
                const loadedMessages = (data.messages || []).map((message) => ({
                    ...message,
                    recipes: getRecipesFromMessage(message, cachedRecipeMap),
                }));

                setMessages(loadedMessages.length > 0 ? loadedMessages : [welcomeMessage]);
            } catch (error) {
                console.error('Gagal memuat pesan:', error);

                if (handleAuthError(error)) return;

                setMessages([
                    {
                        id: 'error-load-message',
                        sender_type: 'bot',
                        message_text: `Gagal memuat pesan: ${error.message}`,
                        recipes: [],
                    },
                ]);
            } finally {
                setIsLoadingChat(false);
            }
        }

        loadMessages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeSessionId]);

    async function handleSubmitMessage(event) {
        event.preventDefault();

        const cleanedMessage = messageInput.trim();
        if (!cleanedMessage || isBotTyping) return;

        setMessageInput('');
        setMessages((prevMessages) => [
            ...prevMessages.filter((message) => message.id !== 'welcome-message'),
            {
                id: `local-user-${Date.now()}`,
                sender_type: 'user',
                message_text: cleanedMessage,
                recipes: [],
            },
        ]);
        setIsBotTyping(true);

        try {
            let sessionIdToUse = activeSessionId;

            if (!sessionIdToUse) {
                const newSession = await createChatSession();
                sessionIdToUse = newSession.id;
                onActiveSessionChange(newSession.id);
            }

            const response = await sendChatMessage(sessionIdToUse, cleanedMessage);
            const recipes = getRecipesFromResponse(response);

            if ((response?.response_type === 'recipe_cards' || response?.intent === 'SIAP_MASAK') && recipes.length === 0) {
                console.warn('Backend sudah masuk mode SIAP_MASAK, tetapi payload recipes kosong:', response);
            }

            const botMessage = {
                id: response.bot_message?.id || `local-bot-${Date.now()}`,
                sender_type: 'bot',
                message_text:
                    response.bot_reply ||
                    response.bot_message?.message_text ||
                    'Aku menemukan beberapa rekomendasi resep buat kamu.',
                recipes,
                response_type: response.response_type || 'text',
            };

            writeCachedRecipes(sessionIdToUse, botMessage.id, recipes);
            setMessages((prevMessages) => [...prevMessages, botMessage]);
            onSessionsChanged();
        } catch (error) {
            console.error('Gagal mengirim pesan:', error);

            if (handleAuthError(error)) return;

            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    id: `error-bot-${Date.now()}`,
                    sender_type: 'bot',
                    message_text: `Gagal menghubungi backend: ${error.message}`,
                    recipes: [],
                },
            ]);
        } finally {
            setIsBotTyping(false);
        }
    }

    return (
        <div className="chat-area-container">
            <div className="chat-timestamp">
                <Text type="caption" align="center">Teman Masak AI</Text>
            </div>

            <div className="chat-messages-scroll">
                {isLoadingChat ? (
                    <div className="message-row bot-message-row typing-indicator-row">
                        <div className="typing-indicator" aria-label="Memuat pesan">
                            <span className="dot" />
                            <span className="dot" />
                            <span className="dot" />
                        </div>
                    </div>
                ) : (
                    messages.map((message) => (
                        <ChatBubble
                            key={message.id}
                            isUser={message.sender_type === 'user'}
                            avatar={message.sender_type === 'bot' ? IconBot : null}
                            message={message.message_text}
                        >
                            {message.recipes?.length > 0 && (
                                <div className="recipe-card-list">
                                    {message.recipes.map((recipe, index) => (
                                        <RecipeCard
                                            key={recipe.id || `${message.id}-recipe-${index}`}
                                            recipe={recipe}
                                            onStartCooking={handleStartCooking}
                                            onSaveLater={handleSaveRecipe}
                                        />
                                    ))}
                                </div>
                            )}
                        </ChatBubble>
                    ))
                )}

                {isBotTyping && (
                    <div className="message-row bot-message-row typing-indicator-row">
                        <div className="typing-indicator" aria-label="Bot sedang mengetik">
                            <span className="dot" />
                            <span className="dot" />
                            <span className="dot" />
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-wrapper">
                <form onSubmit={handleSubmitMessage} className="chat-input-box">
                    <input
                        type="text"
                        className="chat-input-field"
                        placeholder="Ketik bahan atau tanya resep..."
                        value={messageInput}
                        onChange={(event) => setMessageInput(event.target.value)}
                        disabled={isLoadingChat || isBotTyping}
                    />

                    {messageInput.trim() && (
                        <Button
                            type="submit"
                            variant="icon-only"
                            iconLeft={IconSend}
                            disabled={isLoadingChat || isBotTyping}
                        />
                    )}
                </form>

                <p className="chat-disclaimer">
                    Teman Masak AI bisa keliru. Tetap cek keamanan bahan dan proses memasak.
                </p>
            </div>
        </div>
    );
}

export default ChatArea;
