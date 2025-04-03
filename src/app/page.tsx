'use client';

import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';

type Row = {
  id: number;
  created_at: string;
  value: number;
};

export default function Home() {
  const [data, setData] = useState<Row[]>([]);
  const [newValue, setNewValue] = useState<number>(0);
  const [updateId, setUpdateId] = useState<number | null>(null);
  const [updateValue, setUpdateValue] = useState<number>(0);

  // Fetch all rows
  const fetchData = async () => {
    const { data, error } = await supabase.from('test').select('*');
    if (error) console.error('Fetch error:', error.message);
    else setData(data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add new row
  const addRow = async () => {
    const { error } = await supabase.from('test').insert([{ value: newValue }]);
    if (error) console.error('Insert error:', error.message);
    else fetchData(); // refresh
  };

  // Update row
  const updateRow = async () => {
    if (!updateId) return;
    const { error } = await supabase
      .from('test')
      .update({ value: updateValue })
      .eq('id', updateId);
    if (error) console.error('Update error:', error.message);
    else {
      setUpdateId(null);
      setUpdateValue(0);
      fetchData();
    }
  };

  // Delete row
  const deleteRow = async (id: number) => {
    const { error } = await supabase.from('test').delete().eq('id', id);
    if (error) console.error('Delete error:', error.message);
    else fetchData();
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Supabase CRUD Test</h1>

      <div className="mb-4">
        <input
          type="number"
          placeholder="New value"
          value={newValue}
          onChange={(e) => setNewValue(Number(e.target.value))}
          className="border p-2 mr-2"
        />
        <button onClick={addRow} className="bg-green-600 text-white px-4 py-2 rounded">
          Add Value
        </button>
      </div>

      <h2 className="text-lg font-semibold mb-2">Data:</h2>
      {data.map((row) => (
        <div key={row.id} className="border p-3 mb-2 rounded bg-gray-100">
          <p>
            <strong>ID:</strong> {row.id}
          </p>
          <p>
            <strong>Created:</strong> {row.created_at}
          </p>
          <p>
            <strong>Value:</strong> {row.value}
          </p>

          <button
            onClick={() => {
              setUpdateId(row.id);
              setUpdateValue(row.value);
            }}
            className="text-blue-600 mr-3"
          >
            Edit
          </button>
          <button onClick={() => deleteRow(row.id)} className="text-red-600">
            Delete
          </button>
        </div>
      ))}

      {updateId !== null && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Update Value at ID {updateId}</h2>
          <input
            type="number"
            value={updateValue}
            onChange={(e) => setUpdateValue(Number(e.target.value))}
            className="border p-2 mr-2"
          />
          <button onClick={updateRow} className="bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      )}
    </main>
  );
}
