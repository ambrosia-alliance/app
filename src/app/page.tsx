import { prisma } from '../lib/prisma';
import TherapyPageClient from '../components/TherapyPageClient'; // Client component

export default async function Page() {
  // Fetch all therapies
  const therapies = await prisma.therapy.findMany({
    orderBy: { name: 'asc' },
  });

  // Fetch all records with additional info
  // Using a cast to 'any' to avoid TypeScript errors
  const therapiesInfo = await (prisma as any).therapy_info.findMany();

  // Merge therapies with their additional info by therapyid
  const therapiesWithInfo = therapies.map((t) => {
    const info = therapiesInfo.find((i: any) => i.therapyid === t.id);
    return {
      ...t,
      therapy_info: info || null, // add the info field
    };
  });

  // Pass the combined array to the client component
  return <TherapyPageClient initialTherapies={therapiesWithInfo} />;
}
