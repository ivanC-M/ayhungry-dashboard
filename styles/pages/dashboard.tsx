import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

const restaurantsSample = [
  { id: '1', name: 'La Trattoria', city: 'Santiago', capacity: 80, occupancy: 0.75 },
  { id: '2', name: 'El Patio', city: 'Valparaíso', capacity: 50, occupancy: 0.65 },
  { id: '3', name: 'Café Central', city: 'Concepción', capacity: 60, occupancy: 0.82 },
  { id: '4', name: 'Bistró del Mar', city: 'Viña del Mar', capacity: 45, occupancy: 0.58 },
];

export default function Dashboard() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>('');

  const filtered = selectedRestaurant
    ? restaurantsSample.filter(r => r.id === selectedRestaurant)
    : restaurantsSample;

  const chartData = filtered.map(r => ({
    name: r.name,
    Ocupación: Math.round(r.occupancy * 100),
  }));

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-3xl font-bold">Dashboard AyHungry</h1>

      <div>
        <label htmlFor="restaurant" className="block font-medium">
          Filtrar Restaurante:
        </label>
        <select
          id="restaurant"
          className="mt-1 p-2 border rounded"
          onChange={e => setSelectedRestaurant(e.target.value)}
          value={selectedRestaurant}
        >
          <option value="">-- Todos --</option>
          {restaurantsSample.map(r => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis domain={[0, 100]} tickFormatter={val => `${val}%`} />
            <Tooltip formatter={(value: number) => `${value}%`} />
            <Legend />
            <Bar dataKey="Ocupación" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
