import { STORAGE_KEYS } from '../constants/storageKeys';

export const USER_PROFILE_EVENT = 'temanmasak:user-profile-updated';

export function getStoredUsername() {
    const username = localStorage.getItem(STORAGE_KEYS.username);
    return username?.trim() || 'Chef Teman Masak';
}

export function getUserInitials(username = getStoredUsername()) {
    const cleanedName = username.trim();

    if (!cleanedName) return 'TM';

    const words = cleanedName
        .split(/\s+/)
        .filter(Boolean);

    if (words.length === 1) {
        return words[0].slice(0, 2).toUpperCase();
    }

    return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}

export function saveLocalUsername(username) {
    const normalizedUsername = username.trim();

    if (!normalizedUsername) {
        throw new Error('Username tidak boleh kosong.');
    }

    localStorage.setItem(STORAGE_KEYS.username, normalizedUsername);
    window.dispatchEvent(
        new CustomEvent(USER_PROFILE_EVENT, {
            detail: { username: normalizedUsername },
        })
    );

    return normalizedUsername;
}
