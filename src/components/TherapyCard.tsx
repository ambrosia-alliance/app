'use client';

import Link from 'next/link';
import { Therapy } from '../types/index';

interface TherapyCardProps {
  therapy: Therapy;
}

export default function TherapyCard({ therapy }: TherapyCardProps) {
  const imageSrc = therapy.image_url || '/images/no_image.jpg';
  const description = therapy.description || 'No description available.';

  return (
    <Link href={`/therapy/${therapy.id}`}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 flex flex-col cursor-pointer">
        <img
          src={imageSrc}
          alt={therapy.name}
          className="h-80 w-auto object-contain rounded-lg mb-4"
        />
        <h2 className="text-xl font-semibold mb-2">{therapy.name}</h2>
        <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
      </div>
    </Link>
  );
}
