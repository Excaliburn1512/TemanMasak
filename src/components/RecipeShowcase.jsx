const recipeExample = {
  name: 'Opor Ayam Modern',
  prepTime: '45m',
  servings: '4 orang',
  calories: '320kcal',
  protein: '28g',
  image: '🍲',
};

export default function RecipeShowcase() {
  return (
    <section className="bg-light py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Contoh Resep
          </h2>
          <p className="text-xl text-gray-600">
            Resep yang kami rekomendasikan untuk Anda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className="h-64 bg-gradient-to-br from-orange-100 to-yellow-50 flex items-center justify-center">
              <span className="text-9xl">{recipeExample.image}</span>
            </div>
            <div className="p-8">
              <h3 className="text-3xl font-bold text-dark mb-4">{recipeExample.name}</h3>
              <p className="text-gray-600 mb-6">
                Masakan tradisional Indonesia yang lezat dengan sentuhan modern. Cocok untuk keluarga.
              </p>
              <button className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition">
                Lihat Resep Lengkap
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h4 className="text-xl font-bold text-dark mb-6">Informasi Nutrisi</h4>
            <div className="space-y-4">
              <div className="pb-4 border-b border-gray-200">
                <p className="text-gray-600 text-sm">Waktu Persiapan</p>
                <p className="text-2xl font-bold text-dark">{recipeExample.prepTime}</p>
              </div>
              <div className="pb-4 border-b border-gray-200">
                <p className="text-gray-600 text-sm">Porsi</p>
                <p className="text-2xl font-bold text-dark">{recipeExample.servings}</p>
              </div>
              <div className="pb-4 border-b border-gray-200">
                <p className="text-gray-600 text-sm">Kalori</p>
                <p className="text-2xl font-bold text-primary">{recipeExample.calories}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Protein</p>
                <p className="text-2xl font-bold text-dark">{recipeExample.protein}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
