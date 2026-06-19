import React from 'react';
import Text from '../../../components/Text';
import Button from '../../../components/Button';
import { getNutritionCards, getNutritionMatchText, normalizeNutrition } from '../../../utils/nutrition';
import { normalizeRecipe } from '../../../utils/recipe';

function RecipeCard({
    recipe = null,
    title = '',
    tags = [],
    description = '',
    onStartCooking = () => {},
    onSaveLater = () => {},
}) {
    const normalizedRecipe = normalizeRecipe(recipe);
    const finalTitle = title || normalizedRecipe.title;
    const finalTags = tags.length > 0
        ? tags
        : normalizedRecipe.tags || [
            {
                label: normalizedRecipe.category || 'Resep',
                className: 'tag-protein',
            },
        ];
    const finalDescription =
        description ||
        normalizedRecipe.description ||
        'Resep ini cocok dengan bahan dan preferensi yang kamu berikan.';

    const nutrition = normalizeNutrition(normalizedRecipe);
    const nutritionCards = getNutritionCards(nutrition);
    const nutritionMatchText = getNutritionMatchText(nutrition);

    return (
        <article className="recipe-card">
            <div className="recipe-header">
                <div className="recipe-image-placeholder">
                    {normalizedRecipe.thumbnail ? (
                        <img
                            src={normalizedRecipe.thumbnail}
                            alt={finalTitle}
                            className="recipe-image"
                        />
                    ) : (
                        <div className="recipe-image-empty">🍳</div>
                    )}
                </div>

                <div className="recipe-info">
                    <Text type="subtitle" color="var(--color-primary)">
                        {finalTitle}
                    </Text>

                    <div className="recipe-tags">
                        {finalTags.map((tag, index) => (
                            <span key={`${tag.label}-${index}`} className={`tag ${tag.className || ''}`.trim()}>
                                {tag.label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <Text type="body" color="var(--color-text-secondary)">
                {finalDescription}
            </Text>

            {nutritionCards.length > 0 && (
                <div className="recipe-nutrition-panel">
                    <div className="recipe-nutrition-header">
                        <span>Estimasi Nutrisi</span>
                        <small>{nutrition.basis}</small>
                    </div>

                    <div className="recipe-nutrition-grid">
                        {nutritionCards.map((item) => (
                            <div key={item.key} className="recipe-nutrition-item">
                                <strong>{item.value}</strong>
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>

                    {nutritionMatchText && (
                        <p className="recipe-nutrition-match">
                            {nutritionMatchText}
                        </p>
                    )}
                </div>
            )}

            <div className="recipe-actions">
                <Button
                    text="Mulai Masak"
                    variant="primary"
                    onClick={() => onStartCooking(normalizedRecipe)}
                />

                <Button
                    text="Simpan Resep"
                    variant="social"
                    onClick={() => onSaveLater(normalizedRecipe)}
                />
            </div>
        </article>
    );
}

export default RecipeCard;
