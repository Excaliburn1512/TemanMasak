import React from 'react';
import { getUserInitials } from '../utils/userProfile';
import './UserAvatar.css';

function UserAvatar({ username = '', size = 'md', className = '' }) {
    return (
        <div className={`user-avatar user-avatar-${size} ${className}`.trim()} title={username || 'User'}>
            {getUserInitials(username)}
        </div>
    );
}

export default UserAvatar;
