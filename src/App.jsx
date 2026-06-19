import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import RegisterPage from './pages/RegisterPage';
import Home from './pages/Home';
import IngredientsPage from './pages/ingredients/IngredientsPage';
import CookingStepPage from './pages/CookingStepPage';
import SavedRecipesPage from './pages/SavedRecipesPage';
import ProtectedRoute from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';
import './styles/responsive.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
        <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />

        <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/ingredients" element={<ProtectedRoute><IngredientsPage /></ProtectedRoute>} />
        <Route path="/cooking" element={<ProtectedRoute><CookingStepPage /></ProtectedRoute>} />
        <Route path="/saved-recipes" element={<ProtectedRoute><SavedRecipesPage /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
