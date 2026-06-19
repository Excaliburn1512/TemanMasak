import { FALLBACK_RECIPE, FALLBACK_RECIPE_IMAGE } from '../data/fallbackRecipe';

const INGREDIENT_MARKERS = [
    'cooking spray',
    'large eggs',
    'large egg',
    'egg whites',
    'egg yolks',
    'vegetable oil',
    'olive oil',
    'sesame oil',
    'coconut oil',
    'soy sauce',
    'sweet soy sauce',
    'kecap manis',
    'fish sauce',
    'oyster sauce',
    'tomato sauce',
    'chili sauce',
    'green chile peppers',
    'green chili peppers',
    'garlic cloves',
    'clove garlic',
    'ground coriander',
    'ground cumin',
    'ground pepper',
    'black pepper',
    'white pepper',
    'cold cooked white rice',
    'cooked white rice',
    'white rice',
    'brown rice',
    'skinless boneless chicken breasts',
    'boneless chicken breasts',
    'chicken breasts',
    'chicken breast',
    'chicken thighs',
    'pound skinless boneless chicken breasts',
    'pound peeled deveined shrimp',
    'peeled deveined shrimp',
    'green onion',
    'spring onion',
    'red onion',
    'yellow onion',
    'brown sugar',
    'white sugar',
    'all purpose flour',
    'plain flour',
    'bread flour',
    'cornstarch',
    'baking powder',
    'baking soda',
    'cream cheese',
    'cheddar cheese',
    'mozzarella cheese',
    'chicken',
    'shrimp',
    'beef',
    'fish',
    'eggs',
    'egg',
    'rice',
    'flour',
    'garlic',
    'onion',
    'leek',
    'spinach',
    'carrot',
    'potato',
    'tomato',
    'salt',
    'pepper',
    'sugar',
    'butter',
    'milk',
    'water',
    'noodles',
    'noodle',
    'daging ayam',
    'ayam fillet',
    'dada ayam',
    'paha ayam',
    'ayam',
    'telur',
    'tepung terigu',
    'tepung',
    'nasi putih',
    'nasi',
    'beras',
    'bawang putih',
    'bawang merah',
    'bawang bombay',
    'daun bawang',
    'cabai merah',
    'cabai rawit',
    'cabe merah',
    'cabe rawit',
    'sawi hijau',
    'sawi putih',
    'sawi',
    'bayam',
    'wortel',
    'kentang',
    'tomat',
    'udang',
    'ikan',
    'daging sapi',
    'sapi',
    'tahu',
    'tempe',
    'mie',
    'minyak goreng',
    'minyak zaitun',
    'minyak',
    'kecap manis',
    'saus tiram',
    'saus tomat',
    'saus sambal',
    'garam',
    'gula',
    'merica',
    'lada',
    'kaldu ayam',
    'kaldu bubuk',
    'air',
    'santan',
    'mentega',
    'margarin',
];

const STEP_ACTION_MARKERS = [
    'preheat',
    'heat',
    'coat',
    'spray',
    'pour',
    'add',
    'mix',
    'stir',
    'cook',
    'saute',
    'sauté',
    'fry',
    'boil',
    'simmer',
    'bake',
    'grill',
    'remove',
    'serve',
    'season',
    'place',
    'combine',
    'transfer',
    'cover',
    'reduce',
    'increase',
    'let',
    'allow',
    'panaskan',
    'masukkan',
    'tambahkan',
    'aduk',
    'tumis',
    'goreng',
    'rebus',
    'kukus',
    'panggang',
    'campurkan',
    'siapkan',
    'angkat',
    'sajikan',
    'bumbui',
    'tuang',
    'iris',
    'potong',
    'haluskan',
];

export function safeParseJson(rawValue, fallbackValue = null) {
    if (!rawValue) return fallbackValue;

    try {
        return JSON.parse(rawValue);
    } catch (error) {
        console.error('Gagal membaca JSON:', error);
        return fallbackValue;
    }
}

export function cleanText(text) {
    return String(text || '')
        .replace(/\s+/g, ' ')
        .replace(/^\s*[-•*]+\s*/g, '')
        .trim();
}

function escapeRegExp(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function splitByDelimiters(text) {
    return cleanText(text)
        .split(/\n|,|;|\|/)
        .map(cleanText)
        .filter(Boolean);
}

function splitByKnownMarkers(text, markers) {
    const originalText = cleanText(text);
    if (!originalText) return [];

    const lowerText = originalText.toLowerCase();
    const matches = markers
        .map((marker) => marker.toLowerCase())
        .sort((a, b) => b.length - a.length)
        .flatMap((marker) => {
            const regex = new RegExp(`\\b${escapeRegExp(marker)}\\b`, 'g');
            const positions = [];
            let match;

            while ((match = regex.exec(lowerText)) !== null) {
                positions.push({
                    start: match.index,
                    end: match.index + marker.length,
                    length: marker.length,
                });
            }

            return positions;
        })
        .sort((a, b) => (a.start === b.start ? b.length - a.length : a.start - b.start));

    if (matches.length === 0) return [originalText];

    const selectedMatches = [];
    let lastEnd = -1;

    matches.forEach((match) => {
        if (match.start < lastEnd) return;
        selectedMatches.push(match);
        lastEnd = match.end;
    });

    const starts = [...new Set([
        ...(selectedMatches[0]?.start === 0 ? [] : [0]),
        ...selectedMatches.map((match) => match.start),
    ])].sort((a, b) => a - b);

    const parts = starts
        .map((start, index) => cleanText(originalText.slice(start, starts[index + 1] ?? originalText.length)))
        .filter((item) => item.length > 1);

    return parts.length > 1 ? parts : [originalText];
}

export function parseIngredients(ingredients) {
    const rawItems = Array.isArray(ingredients) ? ingredients : [ingredients];

    return rawItems
        .filter((item) => item !== null && item !== undefined)
        .flatMap((item) => {
            if (typeof item === 'object') {
                return item.name || item.ingredient || item.label || item.text || '';
            }

            return String(item);
        })
        .flatMap((item) => {
            const delimiterParts = splitByDelimiters(item);
            return delimiterParts.length > 1
                ? delimiterParts
                : splitByKnownMarkers(item, INGREDIENT_MARKERS);
        })
        .map(cleanText)
        .filter(Boolean);
}

export function parseSteps(steps) {
    const rawItems = Array.isArray(steps) ? steps : [steps];

    return rawItems
        .filter((item) => item !== null && item !== undefined)
        .flatMap((item) => {
            if (typeof item === 'object') {
                return item.description || item.text || item.step || item.instruction || '';
            }

            return String(item);
        })
        .flatMap((item) => {
            const cleaned = cleanText(item);
            if (!cleaned) return [];

            const delimiterSplit = cleaned
                .split(/\n|(?:\d+\.\s*)|\.\s+/)
                .map(cleanText)
                .filter(Boolean);

            return delimiterSplit.length > 1
                ? delimiterSplit
                : splitByKnownMarkers(cleaned, STEP_ACTION_MARKERS).filter((step) => step.length > 8);
        })
        .map(cleanText)
        .filter(Boolean);
}

function getRecipeImage(recipe) {
    return (
        recipe?.thumbnail ||
        recipe?.image_url ||
        recipe?.image ||
        recipe?.raw?.image_url ||
        recipe?.raw?.image ||
        FALLBACK_RECIPE_IMAGE
    );
}

export function normalizeRecipe(recipe = null, options = {}) {
    if (!recipe) return FALLBACK_RECIPE;

    const ingredients = parseIngredients(recipe.ingredients);
    const steps = parseSteps(recipe.steps);
    const title = recipe.title || recipe.name || 'Resep Rekomendasi';
    const image = getRecipeImage(recipe);

    return {
        ...FALLBACK_RECIPE,
        ...recipe,
        thumbnail: image,
        image_url: recipe.image_url || image,
        name: title,
        title,
        category: recipe.category || recipe.predicted_category || FALLBACK_RECIPE.category,
        duration: recipe.duration || FALLBACK_RECIPE.duration,
        difficulty: recipe.difficulty || FALLBACK_RECIPE.difficulty,
        servesText: recipe.servesText || recipe.serves || FALLBACK_RECIPE.servesText,
        nutrition:
            recipe.nutrition ||
            recipe.nutrition_estimate ||
            recipe.raw?.nutrition ||
            recipe.raw?.nutrition_estimate ||
            null,
        ingredients: ingredients.length > 0
            ? ingredients
            : options.emptyIngredients || ['Bahan belum tersedia secara detail'],
        steps: steps.length > 0 ? steps : FALLBACK_RECIPE.steps,
    };
}

function makeStepTitle(stepText, index) {
    const lower = cleanText(stepText).toLowerCase();

    if (lower.includes('siapkan') || lower.includes('prepare')) return 'Siapkan Bahan';
    if (lower.includes('panaskan') || lower.includes('heat')) return 'Panaskan Wajan';
    if (lower.includes('tumis') || lower.includes('saute') || lower.includes('sauté')) return 'Tumis Bahan';
    if (lower.includes('goreng') || lower.includes('fry')) return 'Goreng Bahan';
    if (lower.includes('rebus') || lower.includes('boil')) return 'Rebus Bahan';
    if (lower.includes('panggang') || lower.includes('bake') || lower.includes('grill')) return 'Panggang Bahan';
    if (lower.includes('tambahkan') || lower.includes('add')) return 'Tambahkan Bahan';
    if (lower.includes('aduk') || lower.includes('stir') || lower.includes('mix')) return 'Aduk Merata';
    if (lower.includes('sajikan') || lower.includes('serve')) return 'Sajikan';

    return `Langkah ${index + 1}`;
}

export function normalizeCookingSteps(recipe = null) {
    const normalizedRecipe = normalizeRecipe(recipe);
    const image = getRecipeImage(normalizedRecipe);

    const normalizedSteps = normalizedRecipe.steps.map((step, index) => {
        if (typeof step === 'object' && step !== null) {
            const description = cleanText(
                step.description || step.text || step.step || step.instruction
            );

            return {
                title: step.title || makeStepTitle(description, index),
                description,
                image: step.image || step.image_url || image,
            };
        }

        const description = cleanText(step);

        return {
            title: makeStepTitle(description, index),
            description,
            image,
        };
    }).filter((step) => step.description);

    return {
        ...normalizedRecipe,
        steps: normalizedSteps.length > 0
            ? normalizedSteps
            : FALLBACK_RECIPE.steps.map((step, index) => ({
                title: makeStepTitle(step, index),
                description: step,
                image,
            })),
    };
}
