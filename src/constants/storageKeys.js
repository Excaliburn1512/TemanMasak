export const STORAGE_KEYS = {
    selectedRecipe: 'teman_masak_selected_recipe',
    activeCookingSessionId: 'teman_masak_active_cooking_session_id',
    token: 'token',
    userId: 'user_id',
    username: 'username',
};

export function getRecipeCardsCacheKey(sessionId) {
    return `teman_masak_recipe_cards_${sessionId}`;
}
