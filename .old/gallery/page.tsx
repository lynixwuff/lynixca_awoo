import Image from 'next/image';

export default function Gallery() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white p-4">
      <div className="max-w-5xl mx-auto mt-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Artwork Gallery</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative w-full h-64">
              <Image
                src={`/artwork-placeholder-${i}.png`} // Replace with actual artwork paths
                alt={`Artwork ${i}`}
                fill
                className="rounded-lg object-cover border-2 border-purple-500"
              />
            </div>
          ))}
        </div>
        <p className="text-center text-gray-400 mt-6">
          More artwork coming soon! Check back for updates.
        </p>
      </div>
    </div>
  );
}