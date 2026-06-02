const stepList = [
  {
    number: 1,
    title: 'Ceritakan Bahan',
    description: '"Akunya ayam dan santan, masak apa ya?"',
  },
  {
    number: 2,
    title: 'AI Memproses',
    description: 'IndoBERT + Gemini menganalisis bahan Anda dengan cepat',
  },
  {
    number: 3,
    title: 'Dapat Resap',
    description: 'Dapatkan resep dengan nutrisi lengkap dan foto menarik',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
          Cara Kerja
        </h2>
        <p className="text-xl text-gray-600">
          3 Langkah Mudah
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stepList.map((step) => (
          <div key={step.number} className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-bold">
                {step.number}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-dark mb-3">{step.title}</h3>
            <p className="text-gray-600 text-lg italic">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-gradient-to-r from-primary to-green-500 rounded-3xl p-12 text-center text-white">
        <div className="text-5xl mb-4">✨</div>
        <h3 className="text-3xl font-bold mb-4">Siap untuk Mencoba?</h3>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Mulai percakapan Anda sekarang dan temukan resep lezat yang dapat dibuat dengan bahan-bahan yang Anda miliki.
        </p>
        <button className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition text-lg">
          Mulai Sekarang
        </button>
      </div>
    </section>
  );
}
