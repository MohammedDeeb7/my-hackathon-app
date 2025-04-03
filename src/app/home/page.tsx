'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-6 max-w-4xl mx-auto bg-gradient-to-br from-green-50 via-white to-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-green-800">Welcome to GreenGrow 🌱</h1>
      <p className="mb-6 text-gray-700">Explore plants, tools, and automated greenhouses to grow smarter.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/plants" className="block bg-green-100 hover:bg-green-200 transition p-6 rounded shadow border border-green-200">
          <h2 className="text-xl font-bold text-green-900">🌿 Browse Plants</h2>
          <p className="text-green-800">View plant information and add them to your cart.</p>
        </Link>

        <Link href="/shop/greenhouses" className="block bg-blue-100 hover:bg-blue-200 transition p-6 rounded shadow border border-blue-200">
          <h2 className="text-xl font-bold text-blue-900">🏠 Shop Greenhouses</h2>
          <p className="text-blue-800">Browse and buy automated greenhouse systems.</p>
        </Link>
      </div>
    </main>
  );
}