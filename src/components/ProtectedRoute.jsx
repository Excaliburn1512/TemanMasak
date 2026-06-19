import { Navigate } from 'react-router-dom';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { useBrowserStackLock } from '../hooks/useBrowserStackLock';

function ProtectedRoute({ children }) {
    const token = localStorage.getItem(STORAGE_KEYS.token);

    useBrowserStackLock(Boolean(token));

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
