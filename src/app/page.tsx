export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-2">
          CLOTHING<span className="text-amber-400">CTRL</span>
        </h1>
        <p className="text-white/60 text-base sm:text-lg mb-4">
          Your One-Stop Fashion Destination
        </p>
        <p className="text-white/40 text-sm">
          Nairobi, Kenya • Worldwide Shipping
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {['Gucci', 'Prada', 'Balenciaga', 'Bape', 'Diesel'].map((brand) => (
            <span 
              key={brand}
              className="px-3 py-1 border border-white/20 rounded-full text-white/50 text-xs"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
