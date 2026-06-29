'use client';

import { ModelBenchmark } from '@/lib/types';

interface ModelSelectorProps {
  models: ModelBenchmark[];
  selectedModels: string[];
  onToggleModel: (modelId: string) => void;
}

export default function ModelSelector({
  models,
  selectedModels,
  onToggleModel,
}: ModelSelectorProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Select Models to Compare ({selectedModels.length} selected)
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-h-64 overflow-y-auto">
        {models.map(model => (
          <button
            key={model.id}
            onClick={() => onToggleModel(model.id)}
            className={`p-3 rounded-lg border-2 transition-all text-left ${
              selectedModels.includes(model.id)
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {model.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {model.organization}
                </div>
                {model.averageScore && (
                  <div className="text-xs font-medium text-primary-600 dark:text-primary-400 mt-1">
                    Avg: {model.averageScore.toFixed(1)}
                  </div>
                )}
              </div>
              <div className={`ml-2 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                selectedModels.includes(model.id)
                  ? 'bg-primary-500 border-primary-500'
                  : 'border-gray-300 dark:border-gray-600'
              }`}>
                {selectedModels.includes(model.id) && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
