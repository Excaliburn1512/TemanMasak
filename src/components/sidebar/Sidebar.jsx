import { useState } from 'react';
import IconIngredients from '../icons/IconIngredients';
import IconCurrentStep from '../icons/IconCurrentStep';
import NavItem from '../ui/NavItem';
import './Sidebar.css';

const NAV_ITEMS = [
    {
        id: 'ingredients',
        label: 'Bahan',
        icon: (isActive) => (
            <IconIngredients color={isActive ? 'var(--color-primary)' : 'var(--color-text-muted)'} size={16} />
        ),
    },
    {
        id: 'current-step',
        label: 'Langkah Masak',
        icon: (isActive) => (
            <IconCurrentStep color={isActive ? 'var(--color-primary)' : 'var(--color-text-muted)'} size={18} />
        ),
    },
];

function Sidebar({ recipe, activeTab, onTabChange, onSelesai }) {
    const { thumbnail = '', name = '', duration = '', difficulty = '' } = recipe ?? {};
    const [isFinishConfirming, setIsFinishConfirming] = useState(false);

    function handleFinish() {
        if (isFinishConfirming) {
            onSelesai?.();
            setIsFinishConfirming(false);
            return;
        }

        setIsFinishConfirming(true);
        window.setTimeout(() => setIsFinishConfirming(false), 3000);
    }

    return (
        <aside className="recipe-workflow-sidebar">
            <div className="recipe-sidebar-info">
                <div className="recipe-sidebar-thumbnail-wrapper">
                    <img
                        src={thumbnail || 'https://placehold.co/120x120?text=TM'}
                        alt={name || 'Resep'}
                        className="recipe-sidebar-thumbnail"
                    />
                </div>
                <h2 className="recipe-sidebar-name">{name}</h2>
                <p className="recipe-sidebar-meta">{duration} • {difficulty}</p>
            </div>

            <nav className="recipe-sidebar-nav">
                {NAV_ITEMS.map((item) => (
                    <NavItem
                        key={item.id}
                        id={item.id}
                        label={item.label}
                        icon={item.icon}
                        isActive={activeTab === item.id}
                        onClick={onTabChange}
                    />
                ))}
            </nav>

            <div className="recipe-sidebar-footer">
                <button
                    type="button"
                    className={`recipe-finish-btn ${isFinishConfirming ? 'confirm' : ''}`}
                    onClick={handleFinish}
                >
                    {isFinishConfirming ? 'Yakin selesai?' : 'Selesai Memasak'}
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;
