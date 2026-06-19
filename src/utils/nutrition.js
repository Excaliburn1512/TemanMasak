export const toNutritionNumber = (value) => {
    if (value === null || value === undefined || value === '') return null;

    const number = Number(String(value).replace(',', '.'));
    return Number.isFinite(number) ? number : null;
};

export const formatNutritionValue = (value, suffix = '') => {
    const number = toNutritionNumber(value);

    if (number === null) return '-';

    const rounded = Math.round(number * 10) / 10;
    return `${rounded}${suffix}`;
};

export const normalizeNutrition = (recipe = {}) => {
    const source =
        recipe?.nutrition ||
        recipe?.nutrition_estimate ||
        recipe?.raw?.nutrition ||
        recipe?.raw?.nutrition_estimate ||
        recipe?.rawData?.nutrition ||
        recipe?.rawData?.nutrition_estimate ||
        null;

    if (!source || typeof source !== 'object') return null;

    const calories = toNutritionNumber(
        source.calories ?? source.kcal ?? source.energy_kcal
    );
    const proteins = toNutritionNumber(
        source.proteins ?? source.protein ?? source.protein_g
    );
    const fat = toNutritionNumber(source.fat ?? source.fat_g);
    const carbohydrate = toNutritionNumber(
        source.carbohydrate ?? source.carbs ?? source.carb ?? source.carbohydrate_g
    );

    if (
        calories === null &&
        proteins === null &&
        fat === null &&
        carbohydrate === null
    ) {
        return null;
    }

    return {
        ...source,
        calories,
        proteins,
        fat,
        carbohydrate,
        basis:
            source.basis ||
            source.per ||
            source.serving_basis ||
            'Estimasi per 100 gram bahan yang cocok',
        matched_items: Array.isArray(source.matched_items)
            ? source.matched_items
            : [],
    };
};

export const getNutritionCards = (nutrition) => {
    if (!nutrition) return [];

    return [
        {
            key: 'calories',
            label: 'Kalori',
            value: formatNutritionValue(nutrition.calories, ' kkal'),
        },
        {
            key: 'proteins',
            label: 'Protein',
            value: formatNutritionValue(nutrition.proteins, ' g'),
        },
        {
            key: 'fat',
            label: 'Lemak',
            value: formatNutritionValue(nutrition.fat, ' g'),
        },
        {
            key: 'carbohydrate',
            label: 'Karbo',
            value: formatNutritionValue(nutrition.carbohydrate, ' g'),
        },
    ];
};

export const getNutritionMatchText = (nutrition) => {
    if (!nutrition?.matched_items?.length) return '';

    const names = nutrition.matched_items
        .map((item) => item?.name)
        .filter(Boolean)
        .slice(0, 3);

    if (!names.length) return '';

    return `Berdasarkan kecocokan: ${names.join(', ')}`;
};
