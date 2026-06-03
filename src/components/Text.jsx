import React from 'react';
import '../styles/text.css'; 

const Text = ({ type = 'body', children, align = 'left', color }) => {
    let textClass = '';
    if (type === 'bigsubtitle') textClass = 'app-bigsubtitle';
    if (type === 'subtitle') textClass = 'app-subtitle';
    if (type === 'title') textClass = 'app-title';
    if (type === 'body') textClass = 'app-description';

    const inlineStyle = {
        textAlign: align,
        color: color || undefined, 
    };

    if (type === 'link') {
        return (
            <a style={{ ...inlineStyle, color: color || '#16a34a', fontWeight: 600, textDecoration: 'none', cursor: 'pointer' }}>
                {children}
            </a>
        );
    }

    // Khusus untuk caption teks kecil (seperti tulisan "TODAY" atau jam)
    if (type === 'caption') {
        return (
            <div style={{ ...inlineStyle, color: color || '#9ca3af', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1px' }}>
                {children}
            </div>
        );
    }

    // Mengembalikan elemen div dengan class dan gaya yang sudah disesuaikan
    return (
        <div className={textClass} style={inlineStyle}>
            {children}
        </div>
    );
};

export default Text;