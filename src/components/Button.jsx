import React from 'react';
import '../styles/button.css'; 

const Button = ({ 
    text = '', 
    onClick, 
    type = 'button', 
    variant = 'primary', 
    fullWidth = false, 
    iconLeft = null, 
    iconRight = null,
    disabled = false,
    className = '',
    justify = 'center' 
}) => {
    
    let variantClass = '';
    if (variant === 'primary') variantClass = 'btn-primary';
    if (variant === 'secondary') variantClass = 'btn-secondary';
    if (variant === 'social') variantClass = 'btn-social';
    if (variant === 'ghost') variantClass = 'btn-ghost'; 
    if (variant === 'icon-only') variantClass = 'btn-icon-only'; 

    const finalClass = `widget-btn ${variantClass} ${className}`;

    const btnStyle = {
        width: fullWidth ? '100%' : (variant === 'icon-only' ? '40px' : 'max-content'),
        height: variant === 'icon-only' ? '40px' : undefined, 
        flexShrink: 0, 
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: variant === 'icon-only' ? 'center' : justify, 
        gap: '12px', 
        padding: variant === 'icon-only' ? '0' : undefined,
        borderRadius: variant === 'icon-only' ? '50%' : undefined,
    };

    return (
        <button type={type} className={finalClass} onClick={onClick} disabled={disabled} style={btnStyle}>
            {iconLeft && <span style={{ display: 'flex', alignItems: 'center' }}>{iconLeft}</span>}
            {text && <span>{text}</span>}
            {iconRight && <span style={{ display: 'flex', alignItems: 'center' }}>{iconRight}</span>}
        </button>
    );
};

export default Button;