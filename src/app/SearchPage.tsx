'use client';
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import ResultsTable from '../components/ResultsTable';
import NavBar from '../components/NavBar';
import { Article } from '../types';

interface Props {
  initialArticles: Article[];
}

export default function SearchPage({ initialArticles }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Article[]>(initialArticles);

  const handleSearch = (q: string) => {
    setQuery(q);
    if (!q) {
      setResults(initialArticles);
    } else {
      const filtered = initialArticles.filter(a =>
        a.title.toLowerCase().includes(q.toLowerCase()) ||
        a.abstract?.toLowerCase().includes(q.toLowerCase()) ||
        a.authors?.toLowerCase().includes(q.toLowerCase())
      );
      setResults(filtered);
    }
  };

  return (
    <main className="p-8 w-full md:w-3/4 mx-auto">
      <NavBar />
      <h1 className="text-2xl font-semibold mb-4 mt-6">🔍 Search Articles</h1>

      <SearchBar onSearch={handleSearch} />

      <div className="mt-6">
        <ResultsTable articles={results} />
      </div>
    </main>
  );
}
