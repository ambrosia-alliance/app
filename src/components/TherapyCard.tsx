'use client';

import Link from 'next/link';
import { therapy } from '@prisma/client';

interface TherapyWithInfo extends therapy {
  therapy_info?: {
    pros?: string;
    cons?: string;
    summary?: string;
    image_url?: string;
  } | null;
}

interface TherapyCardProps {
  therapy: TherapyWithInfo;
}

export default function TherapyCard({ therapy }: TherapyCardProps) {
  const imageSrc = therapy.therapy_info?.image_url || '/images/no_image.jpg';
  const summary = therapy.therapy_info?.summary || 'No description available.';

  return (
    <Link href={`/therapy/${therapy.id}`}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 flex flex-col cursor-pointer">
        <img
          src={imageSrc}
          alt={therapy.name}
          className="h-80 w-auto object-contain rounded-lg mb-4"
        />
        <h2 className="text-xl font-semibold mb-2">{therapy.name}</h2>
        <p className="text-gray-600 text-sm line-clamp-3">{summary}</p>
      </div>
    </Link>
  );
}
