'use client';

import { useState } from 'react';
import TherapyCard from '../components/TherapyCard';
import SearchBar from '../components/SearchBar';
import { therapy } from '@prisma/client';

interface TherapyWithInfo extends therapy {
  therapy_info?: {
    pros?: string;
    cons?: string;
    summary?: string;
    image_url?: string;
  } | null;
}

interface Props {
  initialTherapies: TherapyWithInfo[];
}

export default function TherapyPageClient({ initialTherapies }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(initialTherapies);

  const handleSearch = (q: string) => {
    setQuery(q);
    if (!q) {
      setResults(initialTherapies);
    } else {
      const filtered = initialTherapies.filter((t) =>
        t.name.toLowerCase().includes(q.toLowerCase()) ||
        (t.therapy_info?.summary?.toLowerCase().includes(q.toLowerCase()) ?? false)
      );
      setResults(filtered);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-semibold mb-6 mt-6 text-center">🧠 Explore Therapies</h1>

      <div className="w-full max-w-3xl mb-6">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {results.map((therapy) => (
          <TherapyCard key={therapy.id} therapy={therapy} />
        ))}
      </div>
    </div>
  );
}
