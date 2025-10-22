import { prisma } from '@/lib/prisma';
import ResultsTable from '@/components/ResultsTable';
import EffectsSection from '@/components/EffectsSection';
import CostSummary from '@/components/CostSummary';
import { Article, Effect, Citation } from '@/types';

interface TherapyPageProps {
  params: { id: string };
}

export default async function TherapyPage({ params }: TherapyPageProps) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);

  const therapy = await prisma.therapy.findUnique({
    where: { id },
  });

  const rawCitations = await prisma.citations.findMany({
    where: { article: { therapy_id: id } },
    include: { article: true },
  });

  const citations = rawCitations.map(c => ({
    id: c.id,
    quote_text: c.quote_text ?? undefined,
    article_id: c.article_id,
    locator: c.locator ?? undefined,
    article: c.article
      ? {
          id: c.article.id,
          title: c.article.title,
          abstract: c.article.abstract ?? undefined,
          authors: c.article.authors ?? undefined,
          created_at: c.article.created_at,
          source: c.article.source ?? undefined,
          source_url: c.article.source_url,
          content_url: c.article.content_url ?? undefined,
          published_date: c.article.published_date ?? undefined,
          therapy_id: c.article.therapy_id,
          processed: c.article.processed,
        }
      : undefined,
  })) as unknown as Citation[];

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
      {therapy.cost_summary && (
        <CostSummary
          costSummary={therapy.cost_summary}
          costCitationIds={Array.isArray(therapy.cost_citation_ids) ? therapy.cost_citation_ids as number[] : []}
          allCitations={citations}
        />
      )}
      {/* Effects — client-side интерактивный блок */}
      <EffectsSection effects={sanitizedEffects} citations={citations}/>

      {/* Table */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Learn more</h2>
        <ResultsTable articles={articles} />
      </div>
    </div>
  );
}
