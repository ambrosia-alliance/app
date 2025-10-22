'use client';

import { useState } from 'react';
import { Effect, Citation } from '@/types';
import { Dialog } from '@/components/ui/dialog';

interface Props {
  effects: Effect[];
  citations: Citation[];
}

export default function EffectsSection({ effects, citations }: Props) {
  const initialCount = 3;

  const efficacyExtent = effects
    .filter(e => e.category === 'efficacy_extent')
    .sort((a, b) => (b.confidence_score ?? 0) - (a.confidence_score ?? 0));

  const efficacyRate = effects
    .filter(e => e.category === 'efficacy_rate')
    .sort((a, b) => (b.confidence_score ?? 0) - (a.confidence_score ?? 0));

  const sideEffectSeverity = effects
    .filter(e => e.category === 'side_effect_severity')
    .sort((a, b) => (b.confidence_score ?? 0) - (a.confidence_score ?? 0));

  const [showExtentAll, setShowExtentAll] = useState(false);
  const [showRateAll, setShowRateAll] = useState(false);
  const [showSideAll, setShowSideAll] = useState(false);

  const [open, setOpen] = useState(false);
  const [selectedCitations, setSelectedCitations] = useState<Citation[]>([]);

  const openCitations = (effect: Effect) => {
    const related = citations.filter(c => effect.citation_ids?.includes(c.id));
    setSelectedCitations(related);
    setOpen(true);
  };

  const renderEffectBlock = (
    title: string,
    list: Effect[],
    showAll: boolean,
    setShowAll: (v: boolean) => void,
    bgColor: string,
    textColor: string
  ) => {
    if (list.length === 0) return null;

    return (
      <div
        className="flex-1 text-sm p-4 rounded-lg shadow-sm"
        style={{ backgroundColor: bgColor }}
      >
        <h2 className="font-semibold mb-2 text-center" style={{ color: textColor }}>
          {title}
        </h2>

        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {(showAll ? list : list.slice(0, initialCount)).map(e => (
            <li key={e.id}>
              {e.summary}
              {e.citation_ids && e.citation_ids.length > 0 && (
                <button
                  onClick={() => openCitations(e)}
                  className="ml-2 text-xs text-blue-600 hover:underline"
                >
                  [Show citations]
                </button>
              )}
            </li>
          ))}
        </ul>

        {list.length > initialCount && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-2 text-sm font-medium hover:underline w-full text-center"
            style={{ color: textColor }}
          >
            {showAll ? 'Show less ▲' : 'Show more ▼'}
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-6 mt-4">
        {renderEffectBlock('Pros ✅', efficacyExtent, showExtentAll, setShowExtentAll, '#ecfdf5', '#047857')}
        {renderEffectBlock('Effectiveness 📈', efficacyRate, showRateAll, setShowRateAll, '#eff6ff', '#1d4ed8')}
        {renderEffectBlock('Cons ❌', sideEffectSeverity, showSideAll, setShowSideAll, '#fef2f2', '#b91c1c')}
      </div>

      <Dialog open={open} onClose={() => setOpen(false)}>
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
