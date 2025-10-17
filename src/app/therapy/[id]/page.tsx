import { prisma } from '@/lib/prisma';
import ResultsTable from '@/components/ResultsTable';

interface TherapyPageProps {
  params: { id: string };
}

export default async function TherapyPage({ params }: TherapyPageProps) {
  const id = parseInt(params.id, 10);

  const therapy = await prisma.therapy.findUnique({
    where: { id },
    include: { articles: true },
  });

  if (!therapy) return <p>Therapy not found</p>;

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <img
        src={therapy.imageUrl}
        alt={therapy.name}
        className="h-80 w-auto object-contain rounded-lg"
      />

      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-4">{therapy.name}</h1>
        <p className="text-gray-700 mb-4">{therapy.description}</p>

        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2 text-green-700">Pros ✅</h2>
          <ul className="list-disc list-inside text-gray-600">
            {therapy.pros.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2 text-red-700">Cons ❌</h2>
          <ul className="list-disc list-inside text-gray-600">
            {therapy.cons.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">📚 Related Articles</h2>
          <ResultsTable articles={therapy.articles} />
        </div>
      </div>
    </div>
  );
}
