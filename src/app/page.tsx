import { prisma } from '../lib/prisma';
import TherapyPageClient from '../components/TherapyPageClient'; // Client component
import { Therapy } from '@/types/index';

export default async function Page() {
  // Fetch all therapies
  const therapies = await prisma.therapy.findMany({
    orderBy: { name: 'asc' },
  });

  const sanitizedTherapies = therapies.map(t => ({
    ...t,
    cost_summary: t.cost_summary ?? undefined,
    cost_amount: t.cost_amount ? Number(t.cost_amount) : undefined, // ✅ toNumber()
    cost_citation_ids: Array.isArray(t.cost_citation_ids)
      ? t.cost_citation_ids
      : [],
  }));

  // Pass the combined array to the client component
  return <TherapyPageClient initialTherapies={sanitizedTherapies as unknown as Therapy[]} />;
}