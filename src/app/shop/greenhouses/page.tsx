'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Image from 'next/image';

type Greenhouse = {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
};

export default function GreenhouseShopPage() {
  const [greenhouses, setGreenhouses] = useState<Greenhouse[]>([]);

  useEffect(() => {
    async function fetchGreenhouses() {
      const { data, error } = await supabase
        .from('greenhouses')
        .select('*');

      if (error) console.error(error.message);
      else setGreenhouses(data as Greenhouse[]);
    }
    fetchGreenhouses();
  }, []);

  return (
    <main className="p-6 max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">Shop Greenhouses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {greenhouses.map((house) => (
          <div
            key={house.id}
            className="border border-blue-200 p-4 rounded shadow bg-white hover:shadow-md transition"
          >
            <Image
              src={house.image}
              alt={house.name}
              width={400}
              height={250}
              className="rounded mb-4 object-cover"
            />
            <h2 className="text-lg font-bold mb-2 text-blue-900">{house.name}</h2>
            <p className="mb-2 text-blue-700">{house.description}</p>
            <p className="font-semibold mb-3 text-blue-800">Price: {house.price}</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}