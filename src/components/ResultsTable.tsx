import { Article } from '@prisma/client';

interface Props {
  articles: Article[];
}

export default function ResultsTable({ articles }: Props) {
  if (!articles || articles.length === 0) {
    return <p className="text-gray-500 italic mt-4">No articles found.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-left">
            <th className="p-3 border-b">Title</th>
            <th className="p-3 border-b">Authors</th>
            <th className="p-3 border-b">Journal</th>
            <th className="p-3 border-b">Date</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((a) => (
            <tr
              key={a.id}
              className="hover:bg-gray-50 transition border-b last:border-0"
            >
              <td className="p-3 border-b">
                <a
                  href={a.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-medium"
                >
                  {a.title}
                </a>
              </td>
              <td className="p-3 border-b">{a.authors || '—'}</td>
              <td className="p-3 border-b">{a.journal || '—'}</td>
              <td className="p-3 border-b">
                {a.publishedDate
                  ? new Date(a.publishedDate).toLocaleDateString()
                  : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
