'use client';

import { useState } from 'react';
import { Citation } from '@/types';
import { Dialog } from '@/components/ui/dialog';

interface Props {
  costSummary: string;
  costCitationIds?: number[]; // список ID цитат
  allCitations: Citation[];   // все цитаты для терапии
}

export default function CostSummary({ costSummary, costCitationIds, allCitations }: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);

  // фильтруем цитаты, относящиеся к cost
  const costCitations = costCitationIds
    ? allCitations.filter(c => costCitationIds.includes(c.id))
    : [];

  return (
    <div className="flex flex-col gap-2 mt-6">
      <h1 className="text-3xl font-bold mb-2">Cost summary</h1>
      <p className="text-lg text-gray-700">
        {costSummary}
        {costCitations.length > 0 && (
          <button
            onClick={() => setDialogOpen(true)}
            className="ml-2 text-sm text-blue-600 hover:underline"
          >
            [Show citations]
          </button>
        )}
      </p>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <h2 className="text-lg font-semibold mb-3">Citations</h2>
        {costCitations.length > 0 ? (
          <ul className="list-disc list-inside space-y-2">
            {costCitations.map(c => (
              <li key={c.id} className="text-gray-800 leading-relaxed">
                “{c.quote_text}”{' '}
                {c.article ? (
                  <a
                    href={c.article.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline italic"
                  >
                    ({c.article.title})
                  </a>
                ) : (
                  <span className="text-gray-500">(no article info)</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 mt-2">No citations found.</p>
        )}
      </Dialog>
    </div>
  );
}
