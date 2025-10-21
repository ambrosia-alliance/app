'use client';

import { useState } from 'react';

interface ArticleProps {
  id: string;
  title: string;
  authors?: string | null;
  published_date?: string | null;
  source_url: string;
}

interface Props {
  articles: ArticleProps[];
}

export default function ResultsTable({ articles }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  if (!articles || articles.length === 0) {
    return <p className="text-gray-500 italic mt-4">No articles found.</p>;
  }

  // sorting by date of publication
  const sortedArticles = [...articles].sort((a, b) => {
    const dateA = a.published_date ? new Date(a.published_date).getTime() : 0;
    const dateB = b.published_date ? new Date(b.published_date).getTime() : 0;
    return dateB - dateA;
  });

  // pagination
  const totalPages = Math.ceil(sortedArticles.length / pageSize);
  const currentArticles = sortedArticles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="p-3 border-b">Title</th>
              <th className="p-3 border-b">Authors</th>
              <th className="p-3 border-b">Date</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}
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
