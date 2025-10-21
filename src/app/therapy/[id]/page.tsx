import { prisma } from '@/lib/prisma';
import ResultsTable from '@/components/ResultsTable';
import EffectsSection from '@/components/EffectsSection';
import { Article, Effect } from '@/types';

interface TherapyPageProps {
  params: { id: string };
}

export default async function TherapyPage({ params }: TherapyPageProps) {
  const id = parseInt(params.id, 10);

  const therapy = await prisma.therapy.findUnique({
    where: { id },
  });

  if (!therapy) return <p>Therapy not found</p>;

  const articles: Article[] = await prisma.article.findMany({
    where: { therapy_id: id },
    orderBy: { published_date: 'desc' },
    include: {
    citations: true, // 👈 добавляем связанные цитаты
  },
  }) as unknown as Article[];

  const effects: Effect[] = await prisma.effects.findMany({
    where: { therapy_id: id },
  }) as unknown as Effect[];

  // сериализация для клиента (Decimal → number, Json → array)
  const sanitizedEffects = effects.map(e => ({
    ...e,
    citation_ids: e.citation_ids ?? [],
    confidence_score: e.confidence_score ?? 0,
  }));

  return (
    <div className="flex flex-col max-w-6xl mx-auto p-6 gap-8">
      {/* Image and Description */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0 w-full md:w-1/3">
          <img
            src={therapy.image_url}
            alt={therapy.name}
            className="h-80 w-full object-contain rounded-lg"
          />
        </div>

        <div className="flex-1 md:w-2/3 flex flex-col justify-start">
          <h1 className="text-3xl font-bold mb-4">{therapy.name}</h1>
          <p className="text-lg text-gray-700">{therapy.description}</p>

        </div>

      </div>
      <div className="flex flex-col gap-2 mt-6">
        <h1 className="text-3xl font-bold mb-2">Cost summary</h1>
        <p className="text-lg text-gray-700">{therapy.cost_summary}</p>
      </div>
      {/* Effects — client-side интерактивный блок */}
      <EffectsSection effects={sanitizedEffects} />

      {/* Table */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Learn more</h2>
        <ResultsTable articles={articles} />
      </div>
    </div>
  );
}
