import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import LandingPage from './pages/Home';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';

import Home from './pages/Home';
import IngredientsPage from './pages/ingredients/IngredientsPage';
import CookingStepPage from './pages/CookingStepPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat" element={<ChatPage />} />

        <Route path="/home" element={<Home />} />
        <Route path="/ingredients" element={<IngredientsPage />} />
        <Route path="/cooking" element={<CookingStepPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;