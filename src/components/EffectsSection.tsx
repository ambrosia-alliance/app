'use client';

import { useState } from 'react';
import { Effect } from '@/types';

interface Props {
  effects: Effect[];
}

export default function EffectsSection({ effects }: Props) {
  const initialCount = 3;

  // Сортировка и фильтры по категориям
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
      <div className="flex-1 text-sm p-4 rounded-lg shadow-sm" style={{ backgroundColor: bgColor }}>
        <h2 className={`font-semibold mb-2 text-center`} style={{ color: textColor }}>
          {title}
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {(showAll ? list : list.slice(0, initialCount)).map(e => (
            <li key={e.id}>{e.summary}</li>
          ))}
        </ul>
        {list.length > initialCount && (
          <button
            onClick={() => setShowAll(!showAll)}
            className={`mt-2 text-sm font-medium hover:underline w-full text-center`}
            style={{ color: textColor }}
          >
            {showAll ? 'Show less ▲' : 'Show more ▼'}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-6 mt-4">
      {renderEffectBlock('Pros ✅', efficacyExtent, showExtentAll, setShowExtentAll, '#ecfdf5', '#047857')}
      {renderEffectBlock('Effectiveness 📈', efficacyRate, showRateAll, setShowRateAll, '#eff6ff', '#1d4ed8')}
      {renderEffectBlock('Cons ❌', sideEffectSeverity, showSideAll, setShowSideAll, '#fef2f2', '#b91c1c')}
    </div>
  );
}
