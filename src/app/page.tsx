import { prisma } from '../lib/prisma';
import TherapyPageClient from '../components/TherapyPageClient'; // Client-компонент

export default async function Page() {
  // Получаем терапии на сервере
  const therapies = await prisma.therapy.findMany({
    orderBy: { name: 'asc' },
  });

  // Передаём данные в Client-компонент для отображения и фильтрации
  return <TherapyPageClient initialTherapies={therapies} />;
}
