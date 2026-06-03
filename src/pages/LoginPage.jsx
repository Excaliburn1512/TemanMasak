import React from 'react';
import { useLottie } from 'lottie-react';
import LoginForm from '../features/auth/components/LoginForm';
import animasiMasak from '../assets/animasi-masak.json';
import '../styles/login_page.css';

const LoginPage = () => {
    const lottieOptions = {
        animationData: animasiMasak,
        loop: true,
        autoplay: true,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice" 
        }
    };

    const { View } = useLottie(lottieOptions);

    return (
        <div className="page-container">
            <div className="card-container">
                <div className="left-panel">
                    <div className="lottie-container">
                        {View}
                    </div>
                </div>
                <div className="right-panel">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;