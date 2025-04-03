// src/app/plants/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function PlantsPage() {
  const [plants, setPlants] = useState<any[]>([]);

  useEffect(() => {
    async function fetchPlants() {
      const { data, error } = await supabase.from('plants').select('*');
      if (error) console.error(error.message);
      else setPlants(data);
    }
    fetchPlants();
  }, []);

  const addToCart = (plant: string) => {
    alert(`${plant} added to cart!`);
  };

  return (
    <main className="p-6 max-w-4xl mx-auto bg-gradient-to-br from-green-50 to-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-green-800">Browse Plants</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plants.map((plant) => (
          <div key={plant.id} className="border border-green-200 p-4 rounded shadow bg-white hover:shadow-md transition">
            <img src={plant.image} alt={plant.name} className="w-full h-48 object-cover rounded mb-4" />
            <h2 className="text-lg font-bold mb-2 text-green-900">{plant.name}</h2>
            <ul className="text-sm mb-3 text-green-700">
              <li><strong>Watering:</strong> {plant.watering}</li>
              <li><strong>pH Level:</strong> {plant.ph}</li>
              <li><strong>Temperature:</strong> {plant.temperature}</li>
              <li><strong>Sunlight:</strong> {plant.sunlight}</li>
              <li><strong>Season:</strong> {plant.season}</li>
            </ul>
            <button
              onClick={() => addToCart(plant.name)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}