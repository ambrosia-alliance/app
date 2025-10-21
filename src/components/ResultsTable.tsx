'use client';

import { useState, useMemo } from 'react';
import { Article } from '../types/index';

interface Props {
  articles: Article[];
}

export default function ResultsTable({ articles }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'citations'>('date');
  const pageSize = 10;

  if (!articles || articles.length === 0) {
    return <p className="text-gray-500 italic mt-4">No articles found.</p>;
  }

  // 🔍 фильтрация по названию или авторам
  const filteredArticles = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(term) ||
        (a.authors && a.authors.toLowerCase().includes(term))
    );
  }, [articles, searchTerm]);

  // 🔽 сортировка (по дате или по количеству цитат)
  const sortedArticles = useMemo(() => {
    const arr = [...filteredArticles];
    if (sortBy === 'date') {
      return arr.sort((a, b) => {
        const dateA = a.published_date ? new Date(a.published_date).getTime() : 0;
        const dateB = b.published_date ? new Date(b.published_date).getTime() : 0;
        return dateB - dateA;
      });
    } else {
      // сортировка по количеству цитат (цитаты уже есть в a.citations)
      return arr.sort((a, b) => {
        const countA = a.citations?.length ?? 0;
        const countB = b.citations?.length ?? 0;
        return countB - countA;
      });
    }
  }, [filteredArticles, sortBy]);

  // 📄 пагинация
  const totalPages = Math.ceil(sortedArticles.length / pageSize);
  const currentArticles = sortedArticles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  return (
    <div className="space-y-4">
      {/* Фильтр и сортировка */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded px-3 py-2 w-full sm:w-1/2"
        />

        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-gray-600 text-sm">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'citations')}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="date">Publication date (newest)</option>
            <option value="citations">Number of citations (most)</option>
          </select>
        </div>
      </div>

      {/* Таблица */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="p-3 border-b">Title</th>
              <th className="p-3 border-b">Authors</th>
              <th className="p-3 border-b">Date</th>
              <th className="p-3 border-b text-center">Citations</th>
            </tr>
          </thead>
          <tbody>
            {currentArticles.map((a) => (
              <tr
                key={a.id}
                className="hover:bg-gray-50 transition border-b last:border-0"
              >
                <td className="p-3 border-b">
                  <a
                    href={a.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {a.title}
                  </a>
                </td>
                <td className="p-3 border-b">{a.authors || '—'}</td>
                <td className="p-3 border-b">{formatDate(a.published_date)}</td>
                <td className="p-3 border-b text-center">
                  {a.citations?.length ?? 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Пагинация */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          <button
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          <span className="px-3 py-1">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
