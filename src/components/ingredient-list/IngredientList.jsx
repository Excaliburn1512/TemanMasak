import { useState } from 'react';
import IngredientItem from './IngredientItem';
import Button from '../ui/Button';
import IconStartCooking from '../icons/IconStartCooking';
import './IngredientList.css';

function IngredientList({ ingredients = [], servesText = '', onMulaiMasak }) {
    const [checkedItems, setCheckedItems] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const allChecked = ingredients.length > 0 && ingredients.every((_, index) => checkedItems[index]);
    const checkedCount = ingredients.filter((_, index) => checkedItems[index]).length;

    function handleToggleItem(index) {
        setCheckedItems((prevItems) => ({
            ...prevItems,
            [index]: !prevItems[index],
        }));
    }

    function handleSelectAll() {
        if (allChecked) {
            setCheckedItems({});
            return;
        }

        setCheckedItems(
            ingredients.reduce((selected, _, index) => ({
                ...selected,
                [index]: true,
            }), {})
        );
    }

    function handleStartCooking() {
        if (!allChecked || isLoading) return;

        setIsLoading(true);
        window.setTimeout(() => {
            setIsLoading(false);
            onMulaiMasak?.();
        }, 350);
    }

    return (
        <section className="ingredient-list-card">
            <div className="ingredient-list-header">
                <div>
                    <h2 className="ingredient-list-title">Bahan-bahan</h2>
                    <p className="ingredient-list-serves">{servesText}</p>
                    <p className="ingredient-list-progress">
                        {checkedCount}/{ingredients.length} bahan sudah siap
                    </p>
                </div>

                <Button
                    variant="accent"
                    className={allChecked ? 'selected' : ''}
                    onClick={handleSelectAll}
                >
                    {allChecked ? 'Batalkan Semua' : 'Pilih Semua'}
                </Button>
            </div>

            <hr className="ingredient-divider" />

            <div className="ingredient-list-items">
                {ingredients.map((item, index) => (
                    <IngredientItem
                        key={`${item}-${index}`}
                        label={item}
                        checked={!!checkedItems[index]}
                        onToggle={() => handleToggleItem(index)}
                    />
                ))}
            </div>

            <div className="ingredient-list-action">
                <button
                    type="button"
                    className={`start-cooking-btn ${isLoading ? 'loading' : ''}`}
                    onClick={handleStartCooking}
                    disabled={!allChecked || isLoading}
                    title={!allChecked ? 'Centang semua bahan dulu' : 'Mulai memasak'}
                >
                    <span className="start-cooking-icon">
                        {isLoading ? <span className="start-cooking-spinner" /> : <IconStartCooking size={18} />}
                    </span>
                    <span>{isLoading ? 'Menyiapkan...' : allChecked ? 'Mulai Masak' : 'Cek Semua Bahan Dulu'}</span>
                </button>
            </div>
        </section>
    );
}

export default IngredientList;
