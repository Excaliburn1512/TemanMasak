const featureList = [
  {
    id: 1,
    icon: '🤖',
    title: 'IndoBERT AI',
    description: 'Understands natural and informal Indonesian cooking terms.',
  },
  {
    id: 2,
    icon: '📚',
    title: '1000+ Resep',
    description: 'Endless domestic and international recipe recommendations.',
  },
  {
    id: 3,
    icon: '🥗',
    title: 'Info Nutrisi Otomatis',
    description: 'Instant calorie and nutrition tracking for every meal you create.',
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-light py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Fitur Utama
          </h2>
          <p className="text-xl text-gray-600">
            Sangat rahasia untuk dapur yang lebih menyenangkan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureList.map((feature) => (
            <div key={feature.id} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-dark mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
