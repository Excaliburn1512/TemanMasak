import { useRef } from 'react';
import './IngredientItem.css';

function IngredientItem({ label, checked, onToggle }) {
    const itemRef = useRef(null);

    function createRipple(event) {
        const element = itemRef.current;
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        const ripple = document.createElement('span');

        ripple.className = 'ripple';
        ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
        element.appendChild(ripple);
        window.setTimeout(() => ripple.remove(), 500);
    }

    function handleClick(event) {
        createRipple(event);
        onToggle?.();
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onToggle?.();
        }
    }

    return (
        <div
            ref={itemRef}
            className={`ingredient-item ${checked ? 'checked' : ''}`}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="checkbox"
            tabIndex={0}
            aria-checked={checked}
        >
            <div className={`ingredient-checkbox ${checked ? 'checked' : ''}`}>
                {checked && <span className="ingredient-checkmark">✓</span>}
            </div>
            <span className="ingredient-label">{label}</span>
        </div>
    );
}

export default IngredientItem;
