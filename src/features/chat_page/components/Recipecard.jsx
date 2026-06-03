import React from 'react';
import Text from '../../../components/Text';
import Button from '../../../components/Button';

const RecipeCard = ({ title, time, tags, description, onStartCooking, onSaveLater }) => {
    return (
        <div className="recipe-card">
            <div className="recipe-header">
                <div className="recipe-image-placeholder"></div>
                <div className="recipe-info">
                    <Text type="subtitle" color="#0d7a2d">{title}</Text>
                    <div className="recipe-tags">
                        {tags.map((tag, index) => (
                            <span key={index} className={`tag ${tag.className}`}>{tag.label}</span>
                        ))}
                    </div>
                </div>
            </div>
            
            <Text type="body" color="#4b5563">{description}</Text>
            
            <div className="recipe-actions" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <Button text="Start Cooking" variant="primary" onClick={onStartCooking} />
                <Button text="Save for Later" variant="social" onClick={onSaveLater} />
            </div>
        </div>
    );
};

export default RecipeCard;