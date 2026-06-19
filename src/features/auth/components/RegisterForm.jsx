import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../../components/inputField";
import Button from "../../../components/Button";
import Text from "../../../components/Text";
import CustomDialog from "../../../components/CustomDialog";
import { handleUserRegister } from "../services/authService";

const RegisterForm = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [dialog, setDialog] = useState({
        show: false,
        type: "success",
        title: "",
        message: "",
        autoClose: false,
    });

    const showDialog = (type, title, message, autoClose = false) => {
        setDialog({
            show: true,
            type,
            title,
            message,
            autoClose,
        });
    };

    const closeDialog = () => {
        setDialog({
            show: false,
            type: "success",
            title: "",
            message: "",
            autoClose: false,
        });
    };

    const IconUser = (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>
    );

    const IconEmail = (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
    );

    const IconLock = (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
    );

    const IconEye = (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
        </svg>
    );

    const IconEyeOff = (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C5 20 1 12 1 12a21.81 21.81 0 0 1 5.06-5.94"></path>
            <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.81 21.81 0 0 1-3.17 4.35"></path>
            <path d="M14.12 14.12A3 3 0 0 1 9.88 9.88"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>
    );


    const tanganiFormSubmit = async (e) => {
        e.preventDefault();

        if (!username.trim()) {
            showDialog(
                "error",
                "Username belum diisi",
                "Masukkan username terlebih dahulu untuk membuat akun."
            );
            return;
        }

        if (!email.trim()) {
            showDialog(
                "error",
                "Email belum diisi",
                "Masukkan email terlebih dahulu untuk membuat akun."
            );
            return;
        }

        if (!password) {
            showDialog(
                "error",
                "Password belum diisi",
                "Masukkan password terlebih dahulu."
            );
            return;
        }

        if (password.length < 6) {
            showDialog(
                "warning",
                "Password terlalu pendek",
                "Password minimal harus 6 karakter."
            );
            return;
        }

        if (password !== confirmPassword) {
            showDialog(
                "error",
                "Password tidak sama",
                "Konfirmasi password harus sama dengan password."
            );
            return;
        }

        setIsLoading(true);

        try {
            await handleUserRegister({
                username,
                email,
                password,
            });

            showDialog(
                "success",
                "Daftar Berhasil",
                "Akun berhasil dibuat. Kamu akan diarahkan ke halaman login.",
                true
            );

            setTimeout(() => {
                navigate('/login', { replace: true });
            }, 1200);
        } catch (error) {
            showDialog(
                "error",
                "Daftar Gagal",
                error.message || "Terjadi kesalahan saat membuat akun."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <form
                onSubmit={tanganiFormSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%'
                }}
            >
                <div style={{ marginBottom: '1.5rem' }}>
                    <Text type="subtitle">Teman Masak</Text>
                    <Text type="title">
                        Buat Akun<br />Baru!
                    </Text>
                    <Text type="body">
                        Daftar dulu untuk mulai mencari rekomendasi resep sesuai bahan yang kamu punya.
                    </Text>
                </div>

                <InputField
                    label="Username"
                    type="text"
                    placeholder="nama pengguna"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    prefixIcon={IconUser}
                />

                <InputField
                    label="Email"
                    type="email"
                    placeholder="chef@dapur.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    prefixIcon={IconEmail}
                />

                <InputField
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    prefixIcon={IconLock}
                    suffixWidget={
                        <Button
                            variant="ghost"
                            type="button"
                            iconLeft={showPassword ? IconEyeOff : IconEye}
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    }
                />

                <InputField
                    label="Konfirmasi Password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    prefixIcon={IconLock}
                    suffixWidget={
                        <Button
                            variant="ghost"
                            type="button"
                            iconLeft={showConfirmPassword ? IconEyeOff : IconEye}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        />
                    }
                />

                <div style={{ marginBottom: '1.5rem' }}></div>

                <Button
                    type="submit"
                    text={isLoading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
                    variant="primary"
                    fullWidth={true}
                    disabled={isLoading}
                />

                <Text type="body" align="center">
                    Sudah punya akun?{" "}
                    <span
                        onClick={() => navigate('/login')}
                        style={{
                            color: '#0d7a2d',
                            fontWeight: 700,
                            cursor: 'pointer'
                        }}
                    >
                        Masuk sekarang
                    </span>
                </Text>
            </form>

            <CustomDialog
                show={dialog.show}
                type={dialog.type}
                title={dialog.title}
                message={dialog.message}
                confirmText="Oke"
                onClose={closeDialog}
                autoClose={dialog.autoClose}
            />
        </>
    );
};

export default RegisterForm;