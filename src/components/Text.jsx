import React from 'react';
import '../styles/text.css';

const TYPE_CLASS = {
    bigsubtitle: 'app-bigsubtitle',
    title: 'app-title',
    subtitle: 'app-subtitle',
    body: 'app-description',
    caption: 'app-caption',
};

function Text({ type = 'body', children, align = 'left', color, className = '', as }) {
    const style = {
        textAlign: align,
        color: color || undefined,
    };

    if (type === 'link') {
        return (
            <a className={`app-link ${className}`.trim()} style={style}>
                {children}
            </a>
        );
    }

    const Component = as || 'div';

    return (
        <Component className={`${TYPE_CLASS[type] || TYPE_CLASS.body} ${className}`.trim()} style={style}>
            {children}
        </Component>
    );
}

export default Text;
