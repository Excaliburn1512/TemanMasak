import React, { useEffect, useState } from 'react';
import Button from './Button';
import UserAvatar from './UserAvatar';
import { getStoredUsername, saveLocalUsername } from '../utils/userProfile';
import { updateUserAccount } from '../features/auth/services/authService';
import './ProfileSettingsModal.css';

function ProfileSettingsModal({ show = false, onClose = () => {} }) {
    const [username, setUsername] = useState(getStoredUsername());
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [feedback, setFeedback] = useState({ type: '', message: '' });

    useEffect(() => {
        if (!show) return;

        setUsername(getStoredUsername());
        setPassword('');
        setConfirmPassword('');
        setFeedback({ type: '', message: '' });
    }, [show]);

    if (!show) return null;

    async function handleSubmit(event) {
        event.preventDefault();

        const trimmedUsername = username.trim();
        const wantsPasswordChange = password.length > 0 || confirmPassword.length > 0;

        if (!trimmedUsername) {
            setFeedback({ type: 'error', message: 'Username tidak boleh kosong.' });
            return;
        }

        if (wantsPasswordChange && password.length < 6) {
            setFeedback({ type: 'error', message: 'Password minimal 6 karakter.' });
            return;
        }

        if (wantsPasswordChange && password !== confirmPassword) {
            setFeedback({ type: 'error', message: 'Konfirmasi password belum sama.' });
            return;
        }

        try {
            setIsSaving(true);
            setFeedback({ type: '', message: '' });

            const updatedUser = await updateUserAccount({
                username: trimmedUsername,
                password: wantsPasswordChange ? password : undefined,
            });

            saveLocalUsername(updatedUser.username || trimmedUsername);
            setPassword('');
            setConfirmPassword('');
            setFeedback({
                type: 'success',
                message: wantsPasswordChange
                    ? 'Username dan password berhasil diperbarui.'
                    : 'Username berhasil diperbarui.',
            });
        } catch (error) {
            setFeedback({
                type: 'error',
                message: error.message || 'Gagal menyimpan perubahan akun ke backend.',
            });
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <div className="profile-modal-overlay" role="dialog" aria-modal="true">
            <div className="profile-modal-card">
                <button
                    type="button"
                    className="profile-modal-close"
                    onClick={onClose}
                    aria-label="Tutup pengaturan"
                >
                    ×
                </button>

                <div className="profile-modal-header">
                    <UserAvatar username={username} size="lg" />
                    <div>
                        <span>Pengaturan Akun</span>
                        <h2>Profil Pengguna</h2>
                        <p>Ubah username dan password akun.</p>
                    </div>
                </div>

                <div className="profile-modal-body">
                    <form className="profile-settings-form" onSubmit={handleSubmit}>
                    <label className="profile-field">
                        <span>Username</span>
                        <input
                            type="text"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            placeholder="Masukkan username baru"
                            autoComplete="username"
                        />
                    </label>

                    <label className="profile-field">
                        <span>Password Baru</span>
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Kosongkan jika tidak ingin mengubah"
                            autoComplete="new-password"
                        />
                    </label>

                    <label className="profile-field">
                        <span>Konfirmasi Password</span>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            placeholder="Ulangi password baru"
                            autoComplete="new-password"
                        />
                    </label>

                    <p className="profile-modal-note">
                        Perubahan username dan password disimpan ke backend. Kosongkan kolom password jika hanya ingin mengubah username.
                    </p>

                    {feedback.message && (
                        <div className={`profile-feedback ${feedback.type}`}>
                            {feedback.message}
                        </div>
                    )}

                    <div className="profile-modal-actions">
                        <Button text="Batal" variant="secondary" onClick={onClose} disabled={isSaving} />
                        <Button
                            text={isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                            variant="primary"
                            type="submit"
                            disabled={isSaving}
                        />
                    </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProfileSettingsModal;
