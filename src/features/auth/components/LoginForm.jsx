import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import InputField from "../../../components/inputField";
import Button from "../../../components/Button";
import Text from "../../../components/Text";
import { handleUserLogin } from "../services/authService";

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Ikon-ikon SVG
    const IconEmail = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
    const IconLock = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;
    const IconEye = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>;
    const IconEyeOff = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle><line x1="1" y1="1" x2="23" y2="23"></line></svg>;

    const tanganiFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await handleUserLogin({ email, password });
            if (response.success) {
                navigate('/chat'); 
            }
        } catch (error) {
            alert('Gagal login, silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={tanganiFormSubmit} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            
            {/* Bagian Header */}
            <div style={{ marginBottom: '1.5rem' }}>
                <Text type="subtitle">Teman Masak</Text>
                <Text type="title">Selamat Datang<br/>Kembali!</Text>
                <Text type="body">Siap memasak hidangan lezat hari ini? Masuk untuk melanjutkan.</Text>
            </div>

            {/* Kolom Input pakai Widget */}
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

            <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
                <Text type="link">Lupa password?</Text>
            </div>

            {/* Tombol Utama */}
            <Button 
                type="submit" 
                text={isLoading ? 'Memproses...' : 'Mulai Masak'} 
                variant="primary" 
                fullWidth={true} 
                disabled={isLoading}
            />

            {/* Garis Pemisah (bisa ditaruh di login-page.css atau dibuat widget) */}
            <div className="divider">
                <span>atau masuk dengan</span>
            </div>

            {/* Tombol Sosial */}
            <div className="social-login-container">
                <Button text="Google" variant="social" fullWidth={true} />
                <Button text="Apple" variant="social" fullWidth={true} />
            </div>

            <Text type="body" align="center">
                Belum punya akun? <Text type="link">Daftar sekarang</Text>
            </Text>
        </form>
    );
};

export default LoginForm;