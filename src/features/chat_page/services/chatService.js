const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.temanmasak.web.id';

const getToken = () => {
    return localStorage.getItem('token');
};

const getAuthHeader = () => {
    const token = getToken();

    if (!token) {
        throw new Error('Token tidak ditemukan. Silakan login ulang.');
    }

    return {
        Authorization: `Bearer ${token}`,
    };
};

const handleResponse = async (response) => {
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.detail || 'Terjadi kesalahan pada server.');
    }

    return data;
};

export const getChatSessions = async () => {
    const response = await fetch(`${API_BASE_URL}/chat_sessions/`, {
        method: 'GET',
        headers: {
            ...getAuthHeader(),
        },
    });

    return handleResponse(response);
};

export const createChatSession = async () => {
    const response = await fetch(`${API_BASE_URL}/chat_sessions/`, {
        method: 'POST',
        headers: {
            ...getAuthHeader(),
        },
    });

    return handleResponse(response);
};

export const getSessionMessages = async (sessionId) => {
    const response = await fetch(`${API_BASE_URL}/chat_sessions/${sessionId}/messages/`, {
        method: 'GET',
        headers: {
            ...getAuthHeader(),
        },
    });

    return handleResponse(response);
};

export const sendChatMessage = async (sessionId, messageText) => {
    const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/messages/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader(),
        },
        body: JSON.stringify({
            sender_type: 'user',
            message_text: messageText,
        }),
    });

    return handleResponse(response);
};

export const deleteChatSession = async (sessionId) => {
    const response = await fetch(`${API_BASE_URL}/chat_sessions/${sessionId}/`, {
        method: 'DELETE',
        headers: {
            ...getAuthHeader(),
        },
    });

    return handleResponse(response);
};


export const getSavedRecipes = async () => {
    const response = await fetch(`${API_BASE_URL}/recipes/`, {
        method: 'GET',
        headers: {
            ...getAuthHeader(),
        },
    });

    return handleResponse(response);
};

export const saveRecipe = async (recipe) => {
    const response = await fetch(`${API_BASE_URL}/recipes/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader(),
        },
        body: JSON.stringify({
            recipe_title: recipe.title,
            recipe_data: recipe,
        }),
    });

    return handleResponse(response);
};