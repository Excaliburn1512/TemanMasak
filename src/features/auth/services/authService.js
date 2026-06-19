import { STORAGE_KEYS } from '../../../constants/storageKeys';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.temanmasak.web.id';

const handleResponse = async (response, fallbackMessage = 'Terjadi kesalahan pada server.') => {
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.detail || data.message || fallbackMessage);
    }

    return data;
};

const saveAuthSession = (data = {}) => {
    const token = data.token || data.access_token;
    const userId = data.user_id || data.id || data.user?.id;
    const username = data.username || data.name || data.user?.username || data.user?.name;

    if (!token) {
        throw new Error('Backend belum mengembalikan token aplikasi. Periksa endpoint login.');
    }

    localStorage.setItem(STORAGE_KEYS.token, token);

    if (userId) {
        localStorage.setItem(STORAGE_KEYS.userId, userId);
    }

    if (username) {
        localStorage.setItem(STORAGE_KEYS.username, username);
    }

    return {
        ...data,
        token,
        user_id: userId,
        username,
    };
};

export const handleUserLogin = async ({ email, password }) => {
    const response = await fetch(`${API_BASE_URL}/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    const data = await handleResponse(response, 'Email atau password salah.');

    return saveAuthSession(data);
};

export const handleUserRegister = async ({ username, email, password }) => {
    const response = await fetch(`${API_BASE_URL}/users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            email,
            password,
        }),
    });

    return handleResponse(response, 'Gagal membuat akun.');
};


export const updateUserAccount = async ({ username, password }) => {
    const token = localStorage.getItem(STORAGE_KEYS.token);

    if (!token) {
        throw new Error('Token tidak ditemukan. Silakan login ulang sebelum mengubah akun.');
    }

    const payload = {};

    if (username?.trim()) payload.username = username.trim();
    if (password) payload.password = password;

    if (Object.keys(payload).length === 0) {
        throw new Error('Tidak ada data akun yang diubah.');
    }

    const response = await fetch(`${API_BASE_URL}/me/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });

    const data = await handleResponse(response, 'Gagal memperbarui akun.');

    if (data.username) {
        localStorage.setItem(STORAGE_KEYS.username, data.username);
    }

    return data;
};

export const getCurrentUserProfile = async () => {
    const token = localStorage.getItem(STORAGE_KEYS.token);

    if (!token) {
        throw new Error('Token tidak ditemukan.');
    }

    const response = await fetch(`${API_BASE_URL}/me/`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await handleResponse(response, 'Gagal mengambil profil user.');

    if (data.username) {
        localStorage.setItem(STORAGE_KEYS.username, data.username);
    }

    if (data.id) {
        localStorage.setItem(STORAGE_KEYS.userId, data.id);
    }

    return data;
};

export const requestBackendLogout = async () => {
    const token = localStorage.getItem(STORAGE_KEYS.token);

    if (!token) return null;

    const response = await fetch(`${API_BASE_URL}/logout/`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return handleResponse(response, 'Gagal logout dari server.');
};

export const handleUserLogout = () => {
    localStorage.removeItem(STORAGE_KEYS.token);
    localStorage.removeItem(STORAGE_KEYS.userId);
    localStorage.removeItem(STORAGE_KEYS.username);
    localStorage.removeItem(STORAGE_KEYS.selectedRecipe);
    localStorage.removeItem(STORAGE_KEYS.activeCookingSessionId);

    Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('teman_masak_recipe_cards_')) {
            localStorage.removeItem(key);
        }
    });
};

export const getAuthToken = () => {
    return localStorage.getItem(STORAGE_KEYS.token);
};

export const getAuthHeader = () => {
    const token = getAuthToken();

    if (!token) {
        return {};
    }

    return {
        Authorization: `Bearer ${token}`,
    };
};
