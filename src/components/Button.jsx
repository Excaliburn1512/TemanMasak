import React from 'react';
import '../styles/button.css';

const VARIANT_CLASS = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    social: 'btn-social',
    ghost: 'btn-ghost',
    danger: 'btn-danger',
    'icon-only': 'btn-icon-only',
};

function Button({
    children,
    text = '',
    onClick,
    type = 'button',
    variant = 'primary',
    fullWidth = false,
    iconLeft = null,
    iconRight = null,
    disabled = false,
    className = '',
    justify = 'center',
}) {
    const isIconOnly = variant === 'icon-only';
    const content = children || text;
    const variantClass = VARIANT_CLASS[variant] || VARIANT_CLASS.primary;

    const buttonStyle = {
        width: fullWidth ? '100%' : isIconOnly ? '40px' : undefined,
        height: isIconOnly ? '40px' : undefined,
        justifyContent: isIconOnly ? 'center' : justify,
    };

    return (
        <button
            type={type}
            className={`widget-btn ${variantClass} ${className}`.trim()}
            onClick={onClick}
            disabled={disabled}
            style={buttonStyle}
        >
            {iconLeft && <span className="widget-btn-icon">{iconLeft}</span>}
            {content && <span>{content}</span>}
            {iconRight && <span className="widget-btn-icon">{iconRight}</span>}
        </button>
    );
}

export default Button;
