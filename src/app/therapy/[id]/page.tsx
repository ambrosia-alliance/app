import { prisma } from '@/lib/prisma';
import ResultsTable from '@/components/ResultsTable';

interface TherapyPageProps {
  params: { id: string };
}

export default async function TherapyPage({ params }: TherapyPageProps) {
  // Теперь нужно явно ждать params
  const awaitedParams = await Promise.resolve(params);
  const id = parseInt(awaitedParams.id, 10);

  const therapy = await prisma.therapy.findUnique({
    where: { id },
    include: { article: true },
  });

  if (!therapy) return <p>Therapy not found</p>;

  const therapyInfo = await (prisma as any).therapy_info.findUnique({
    where: { therapy_id: id },
  });

  const therapyInfoSafe = therapyInfo || {
    image_url: '/images/no_image.jpg',
    summary: 'No description available.',
    pros: '',
    cons: '',
  };

  const pros = therapyInfoSafe.pros ? therapyInfoSafe.pros.split(';') : [];
  const cons = therapyInfoSafe.cons ? therapyInfoSafe.cons.split(';') : [];

  return (
    <div className="flex flex-col max-w-6xl mx-auto p-6 gap-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0 w-full md:w-1/3">
          <img
            src={therapyInfoSafe.image_url}
            alt={therapy.name}
            className="h-80 w-full object-contain rounded-lg"
          />
          <div className="mt-4 text-sm">
            {pros.length > 0 && (
              <div className="mb-2">
                <h2 className="text-green-700 font-semibold">Pros ✅</h2>
                <ul className="list-disc list-inside text-gray-600">
                  {pros.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            )}
            {cons.length > 0 && (
              <div>
                <h2 className="text-red-700 font-semibold">Cons ❌</h2>
                <ul className="list-disc list-inside text-gray-600">
                  {cons.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 md:w-2/3 flex flex-col justify-start">
          <h1 className="text-3xl font-bold mb-4">{therapy.name}</h1>
          <p className="text-lg text-gray-700">{therapyInfoSafe.summary}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Learn more</h2>
        {/*@ts-ignore*/}
        <ResultsTable articles={therapy.article} />
      </div>
    </div>
  );
}
