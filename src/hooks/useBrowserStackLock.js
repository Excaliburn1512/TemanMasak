import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function getCurrentPath() {
    return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

export function useBrowserStackLock(enabled = true) {
    const location = useLocation();
    const navigate = useNavigate();
    const lockedPathRef = useRef(getCurrentPath());

    useEffect(() => {
        if (!enabled) return;

        lockedPathRef.current = `${location.pathname}${location.search}${location.hash}`;

        const state = {
            ...(window.history.state || {}),
            temanMasakLocked: true,
        };

        window.history.replaceState(state, '', lockedPathRef.current);
        window.history.pushState(state, '', lockedPathRef.current);
    }, [enabled, location.pathname, location.search, location.hash]);

    useEffect(() => {
        if (!enabled) return undefined;

        function handlePopState() {
            const lockedPath = lockedPathRef.current || getCurrentPath();
            window.history.pushState({ temanMasakLocked: true }, '', lockedPath);
            navigate(lockedPath, { replace: true });
        }

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [enabled, navigate]);
}
