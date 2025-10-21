import { prisma } from '../lib/prisma';
import TherapyPageClient from '../components/TherapyPageClient'; // Client component
import { Therapy } from '@/types/index';

export default async function Page() {
  // Fetch all therapies
  const therapies = await prisma.therapy.findMany({
    orderBy: { name: 'asc' },
  });

  // Pass the combined array to the client component
  return <TherapyPageClient initialTherapies={therapies as unknown as Therapy[]} />;
}