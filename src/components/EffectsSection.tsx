'use client';

import { useState } from 'react';
import { Effect, Citation } from '@/types';
import { Dialog } from '@/components/ui/dialog';

interface Props {
  effects: Effect[];
  citations: Citation[];
}

export default function EffectsSection({ effects, citations }: Props) {
  const initialCount = 3; // количество видимых элементов при закрытом блоке

  const efficacyExtent = effects
    .filter(e => e.category === 'efficacy_extent')
    .sort((a, b) => (b.confidence_score ?? 0) - (a.confidence_score ?? 0));

  const efficacyRate = effects
    .filter(e => e.category === 'efficacy_rate')
    .sort((a, b) => (b.confidence_score ?? 0) - (a.confidence_score ?? 0));

  const sideEffectSeverity = effects
    .filter(e => e.category === 'side_effect_severity')
    .sort((a, b) => (b.confidence_score ?? 0) - (a.confidence_score ?? 0));

  const [allOpen, setAllOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCitations, setSelectedCitations] = useState<Citation[]>([]);

  const openCitations = (effect: Effect) => {
    const related = citations.filter(c => effect.citation_ids?.includes(c.id));
    setSelectedCitations(related);
    setDialogOpen(true);
  };

  const toggleAllBlocks = () => {
    setAllOpen(prev => !prev);
  };

  const renderEffectBlock = (
    title: string,
    list: Effect[],
    bgColor: string,
    textColor: string
  ) => {
    if (list.length === 0) return null;

    const visibleList = allOpen ? list : list.slice(0, initialCount);

    return (
      <div
        className="flex-1 text-sm p-4 rounded-lg shadow-sm cursor-pointer"
        style={{ backgroundColor: bgColor }}
        onClick={toggleAllBlocks}
      >
        <h2 className="font-semibold mb-2 text-center" style={{ color: textColor }}>
          {title}
        </h2>

        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {visibleList.map(e => (
            <li key={e.id}>
              {e.summary}
              {e.citation_ids && e.citation_ids.length > 0 && (
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    openCitations(e);
                  }}
                  className="ml-2 text-xs text-blue-600 hover:underline"
                >
                  [Show citations]
                </button>
              )}
            </li>
          ))}
          {!allOpen && list.length > initialCount && (
            <li className="text-gray-500 text-xs mt-1">…</li>
          )}
        </ul>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-6 mt-4">
        {renderEffectBlock('Pros ✅', efficacyExtent, '#ecfdf5', '#047857')}
        {renderEffectBlock('Effectiveness 📈', efficacyRate, '#eff6ff', '#1d4ed8')}
        {renderEffectBlock('Cons ❌', sideEffectSeverity, '#fef2f2', '#b91c1c')}
      </div>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <h2 className="text-lg font-semibold mb-3">Citations</h2>

        {selectedCitations.length > 0 ? (
          <ul className="list-disc list-inside space-y-2">
            {selectedCitations.map(c => (
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
    </>
  );
}
