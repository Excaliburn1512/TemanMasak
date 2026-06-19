import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../layouts/Sidebar';
import Button from '../components/Button';
import Text from '../components/Text';
import CustomDialog from '../components/CustomDialog';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { normalizeRecipe } from '../utils/recipe';
import { getNutritionCards, normalizeNutrition } from '../utils/nutrition';
import { getSavedRecipes } from '../features/chat_page/services/chatService';
import '../styles/saved_recipes_page.css';

function formatDate(dateString) {
    if (!dateString) return '-';

    try {
        return new Intl.DateTimeFormat('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(dateString));
    } catch (error) {
        return dateString;
    }
}

function buildSavedRecipeViewModel(savedRecipe) {
    const rawData = savedRecipe?.recipe_data || {};
    const normalizedRecipe = normalizeRecipe({
        ...rawData,
        title: rawData.title || rawData.name || savedRecipe?.recipe_title || 'Resep Disimpan',
    });

    return {
        ...normalizedRecipe,
        savedId: savedRecipe?.id,
        savedAt: savedRecipe?.saved_at,
        description:
            rawData.description ||
            normalizedRecipe.description ||
            (normalizedRecipe.steps.length > 0
                ? normalizedRecipe.steps.slice(0, 2).join(' ')
                : 'Resep yang sudah kamu simpan untuk dimasak nanti.'),
        rawData,
        original: savedRecipe,
    };
}

function SavedRecipesPage() {
    const navigate = useNavigate();

    const [savedRecipes, setSavedRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [sessionsRefreshKey, setSessionsRefreshKey] = useState(0);
    const [dialog, setDialog] = useState({
        show: false,
        title: '',
        message: '',
        type: 'success',
    });

    const recipes = useMemo(
        () => savedRecipes.map(buildSavedRecipeViewModel),
        [savedRecipes]
    );

    function refreshSessions() {
        setSessionsRefreshKey((prevKey) => prevKey + 1);
    }

    function handleAuthError(message) {
        const isAuthError = message.includes('Token') || message.includes('expired') || message.includes('401');
        if (!isAuthError) return false;

        localStorage.removeItem(STORAGE_KEYS.token);
        navigate('/login');
        return true;
    }

    async function loadSavedRecipes() {
        if (!localStorage.getItem(STORAGE_KEYS.token)) {
            navigate('/login');
            return;
        }

        try {
            setIsLoading(true);
            setErrorMessage('');

            const data = await getSavedRecipes();
            setSavedRecipes(Array.isArray(data) ? data : []);
        } catch (error) {
            const message = error.message || 'Gagal memuat resep disimpan.';

            if (handleAuthError(message)) return;

            if (message.toLowerCase().includes('belum ada resep')) {
                setSavedRecipes([]);
                setErrorMessage('');
                return;
            }

            setErrorMessage(message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadSavedRecipes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleStartCooking(recipe) {
        if (!recipe) return;

        const normalizedRecipe = normalizeRecipe({
            ...recipe.rawData,
            ...recipe,
            duration: recipe.rawData?.duration || recipe.duration,
            difficulty: recipe.rawData?.difficulty || recipe.difficulty,
            servesText: recipe.rawData?.servesText || recipe.servesText,
        });

        localStorage.setItem(STORAGE_KEYS.selectedRecipe, JSON.stringify(normalizedRecipe));
        localStorage.removeItem(STORAGE_KEYS.activeCookingSessionId);

        navigate('/ingredients', {
            state: {
                recipe: normalizedRecipe,
                returnSessionId: null,
                fromSavedRecipes: true,
            },
        });
    }

    function handleOpenChatSession(sessionId) {
        navigate('/chat', {
            state: {
                returnSessionId: sessionId,
            },
        });
    }

    function closeDialog() {
        setDialog({ show: false, title: '', message: '', type: 'success' });
    }

    return (
        <div className="saved-recipes-layout">
            <Sidebar
                activeSessionId={null}
                onSelectSession={handleOpenChatSession}
                onSessionCreated={(newSessionId) => {
                    refreshSessions();
                    handleOpenChatSession(newSessionId);
                }}
                onSessionDeleted={refreshSessions}
                refreshKey={sessionsRefreshKey}
                autoSelectFirstSession={false}
            />

            <main className="saved-recipes-main">
                <section className="saved-recipes-hero">
                    <div>
                        <Text type="caption">TEMAN MASAK</Text>
                        <h1>Resep Disimpan</h1>
                        <p>
                            Kumpulan resep yang kamu simpan dari rekomendasi AI.
                            Pilih resep yang mau dimasak, lalu lanjut ke bahan dan langkah memasak.
                        </p>
                    </div>

                    <div className="saved-recipes-actions">
                        <Button text="Kembali ke Chat" variant="secondary" onClick={() => navigate('/chat')} />
                        <Button text="Refresh" variant="primary" onClick={loadSavedRecipes} disabled={isLoading} />
                    </div>
                </section>

                {isLoading && (
                    <div className="saved-recipes-state-card">
                        <div className="saved-recipes-loader" />
                        <h2>Memuat resep...</h2>
                        <p>Tunggu sebentar, daftar resep simpanan sedang diambil.</p>
                    </div>
                )}

                {!isLoading && errorMessage && (
                    <div className="saved-recipes-state-card error">
                        <h2>Gagal memuat resep</h2>
                        <p>{errorMessage}</p>
                        <Button text="Coba Lagi" variant="primary" onClick={loadSavedRecipes} />
                    </div>
                )}

                {!isLoading && !errorMessage && recipes.length === 0 && (
                    <div className="saved-recipes-state-card empty">
                        <div className="saved-recipes-empty-icon">📒</div>
                        <h2>Belum ada resep yang disimpan</h2>
                        <p>
                            Simpan resep dari recipe card di chat, nanti resepnya akan muncul di halaman ini.
                        </p>
                        <Button text="Cari Resep di Chat" variant="primary" onClick={() => navigate('/chat')} />
                    </div>
                )}

                {!isLoading && !errorMessage && recipes.length > 0 && (
                    <div className="saved-recipes-grid">
                        {recipes.map((recipe) => {
                            const nutrition = normalizeNutrition(recipe);
                            const nutritionCards = getNutritionCards(nutrition);

                            return (
                                <article key={recipe.savedId || recipe.title} className="saved-recipe-card">
                                    <div className="saved-recipe-image-wrap">
                                        {recipe.thumbnail ? (
                                            <img
                                                src={recipe.thumbnail}
                                                alt={recipe.title}
                                                className="saved-recipe-image"
                                            />
                                        ) : (
                                            <div className="saved-recipe-image-empty">🍳</div>
                                        )}
                                    </div>

                                    <div className="saved-recipe-content">
                                        <div className="saved-recipe-meta-row">
                                            <span className="saved-recipe-tag">{recipe.category}</span>
                                            <span className="saved-recipe-date">{formatDate(recipe.savedAt)}</span>
                                        </div>

                                        <h2>{recipe.title}</h2>
                                        <p>{recipe.description}</p>

                                        <div className="saved-recipe-mini-info">
                                            <span>{recipe.duration}</span>
                                            <span>{recipe.difficulty}</span>
                                        </div>

                                        {recipe.ingredients.length > 0 && (
                                            <div className="saved-recipe-ingredients-preview">
                                                {recipe.ingredients.slice(0, 4).map((ingredient, index) => (
                                                    <span key={`${ingredient}-${index}`}>{ingredient}</span>
                                                ))}
                                                {recipe.ingredients.length > 4 && (
                                                    <span>+{recipe.ingredients.length - 4} lagi</span>
                                                )}
                                            </div>
                                        )}

                                        {nutritionCards.length > 0 && (
                                            <div className="saved-recipe-nutrition-grid">
                                                {nutritionCards.slice(0, 4).map((item) => (
                                                    <div key={item.key} className="saved-recipe-nutrition-item">
                                                        <strong>{item.value}</strong>
                                                        <span>{item.label}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="saved-recipe-footer">
                                        <Button
                                            text="Mulai Masak"
                                            variant="primary"
                                            fullWidth
                                            onClick={() => handleStartCooking(recipe)}
                                        />
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </main>

            <CustomDialog
                show={dialog.show}
                type={dialog.type}
                title={dialog.title}
                message={dialog.message}
                confirmText="Oke"
                onClose={closeDialog}
            />
        </div>
    );
}

export default SavedRecipesPage;
