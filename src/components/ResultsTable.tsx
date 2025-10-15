import { Article } from '@/types';

interface Props {
  articles: Article[];
}

export default function ResultsTable({ articles }: Props) {
  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2 text-left">Name</th>
          <th className="border p-2 text-left">Author</th>
          <th className="border p-2 text-left">Date</th>
        </tr>
      </thead>
      <tbody>
        {articles.map((a) => (
          <tr key={a.id}>
            <td className="border p-2">{a.title}</td>
            <td className="border p-2">{a.authors}</td>
            <td className="border p-2">
              {a.published_date
                ? new Date(a.published_date).toLocaleDateString()
                : ''}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
