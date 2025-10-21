import { prisma } from '@/lib/prisma';
import ResultsTable from '@/components/ResultsTable';
import { Article } from '@/types/index';
import { Effect } from '@/types/index';


interface TherapyPageProps {
  params: { id: string };
}

export default async function TherapyPage({ params }: TherapyPageProps) {

  const awaitedParams = await Promise.resolve(params);
  const id = parseInt(awaitedParams.id, 10);

  const therapy = await prisma.therapy.findUnique({
    where: { id } 
  });

  const articles: Article[] = await prisma.article.findMany({
    where: { therapy_id: id },
    orderBy: { published_date: 'desc' },
  }) as unknown as Article[]; 

  const effects: Effect[] = await prisma.effects.findMany({
    where: { therapy_id: id }
  }) as unknown as Effect[];

  const efficacyExtent = effects.find(e => e.efficacy_extent_summary !== null);
  const efficacyRate = effects.find(e => e.efficacy_rate_summary !== null);
  const sideEffectSeverity = effects.find(e => e.side_effect_severity_summary !== null);

  if (!therapy) return <p>Therapy not found</p>;

  const pros: string[] = [];
  const cons: string[] = [];

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

    {/* Effects */}
    <div className="flex flex-col md:flex-row justify-between gap-6 mt-4">
      {efficacyExtent && (
        <div className="flex-1 text-sm bg-green-50 p-4 rounded-lg shadow-sm">
          <h2 className="text-green-700 font-semibold mb-2 text-center">Pros ✅</h2>
          <ul className="list-disc list-inside text-gray-700">
            {efficacyExtent.efficacy_extent_summary}
          </ul>
        </div>
      )}

      {efficacyRate && (
        <div className="flex-1 text-sm bg-blue-50 p-4 rounded-lg shadow-sm">
          <h2 className="text-blue-700 font-semibold mb-2 text-center">Effectiveness 📈</h2>
          <ul className="list-disc list-inside text-gray-700">
            {efficacyRate.efficacy_rate_summary}
          </ul>
        </div>
      )}

      {sideEffectSeverity && (
        <div className="flex-1 text-sm bg-red-50 p-4 rounded-lg shadow-sm">
          <h2 className="text-red-700 font-semibold mb-2 text-center">Cons ❌</h2>
          <ul className="list-disc list-inside text-gray-700">
            {sideEffectSeverity.side_effect_severity_summary}
          </ul>
        </div>
      )}
    </div>

    {/* Table */}
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Learn more</h2>
      <ResultsTable articles={articles} />
    </div>
  </div>
)};
