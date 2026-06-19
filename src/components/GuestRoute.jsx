import { Navigate } from 'react-router-dom';
import { STORAGE_KEYS } from '../constants/storageKeys';

function GuestRoute({ children }) {
    const token = localStorage.getItem(STORAGE_KEYS.token);

    if (token) {
        return <Navigate to="/chat" replace />;
    }

    return children;
}

export default GuestRoute;
