'use client';

import { useState } from 'react';
import { ModelBenchmark, SortKey, SortOrder } from '@/lib/types';

interface BenchmarkTableProps {
  models: ModelBenchmark[];
}

export default function BenchmarkTable({ models }: BenchmarkTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('averageScore');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedBenchmarks, setSelectedBenchmarks] = useState<string[]>([
    'mmlu', 'humaneval', 'gsm8k', 'math', 'gpqa'
  ]);

  const allBenchmarks = [
    { key: 'mmlu', label: 'MMLU' },
    { key: 'humaneval', label: 'HumanEval' },
    { key: 'gsm8k', label: 'GSM8K' },
    { key: 'hellaswag', label: 'HellaSwag' },
    { key: 'arc', label: 'ARC' },
    { key: 'truthfulqa', label: 'TruthfulQA' },
    { key: 'winogrande', label: 'Winogrande' },
    { key: 'bbh', label: 'BBH' },
    { key: 'gpqa', label: 'GPQA' },
    { key: 'math', label: 'MATH' },
  ];

  const sortedModels = [...models].sort((a, b) => {
    let aVal: any = sortKey === 'averageScore' ? a.averageScore : 
                     sortKey === 'name' ? a.name :
                     sortKey === 'parameters' ? a.parameters :
                     a.benchmarks[sortKey as keyof typeof a.benchmarks];
    let bVal: any = sortKey === 'averageScore' ? b.averageScore :
                     sortKey === 'name' ? b.name :
                     sortKey === 'parameters' ? b.parameters :
                     b.benchmarks[sortKey as keyof typeof b.benchmarks];

    if (aVal === undefined) aVal = -1;
    if (bVal === undefined) bVal = -1;

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortOrder === 'asc' 
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
  });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const toggleBenchmark = (benchmark: string) => {
    if (selectedBenchmarks.includes(benchmark)) {
      setSelectedBenchmarks(selectedBenchmarks.filter(b => b !== benchmark));
    } else {
      setSelectedBenchmarks([...selectedBenchmarks, benchmark]);
    }
  };

  const SortIcon = ({ active, order }: { active: boolean; order: SortOrder }) => (
    <span className="ml-1 inline-block">
      {active ? (order === 'asc' ? '↑' : '↓') : '↕'}
    </span>
  );

  return (
    <div className="space-y-4">
      {/* Benchmark selector */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-200">
          Select Benchmarks to Display
        </h3>
        <div className="flex flex-wrap gap-2">
          {allBenchmarks.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => toggleBenchmark(key)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedBenchmarks.includes(key)
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider sticky left-0 bg-gray-50 dark:bg-gray-900 z-10">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center hover:text-primary-600 transition-colors"
                  >
                    Model
                    <SortIcon active={sortKey === 'name'} order={sortOrder} />
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                  Organization
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('parameters')}
                    className="flex items-center hover:text-primary-600 transition-colors"
                  >
                    Params
                    <SortIcon active={sortKey === 'parameters'} order={sortOrder} />
                  </button>
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('averageScore')}
                    className="flex items-center justify-center w-full hover:text-primary-600 transition-colors"
                  >
                    Avg
                    <SortIcon active={sortKey === 'averageScore'} order={sortOrder} />
                  </button>
                </th>
                {selectedBenchmarks.map(benchmark => {
                  const benchmarkLabel = allBenchmarks.find(b => b.key === benchmark)?.label;
                  return (
                    <th
                      key={benchmark}
                      className="px-6 py-4 text-center text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider"
                    >
                      <button
                        onClick={() => handleSort(benchmark as SortKey)}
                        className="flex items-center justify-center w-full hover:text-primary-600 transition-colors"
                      >
                        {benchmarkLabel}
                        <SortIcon active={sortKey === benchmark} order={sortOrder} />
                      </button>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {sortedModels.map((model, idx) => (
                <tr
                  key={model.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap sticky left-0 bg-white dark:bg-gray-800 z-10">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {idx + 1}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {model.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {model.license}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-gray-100">
                      {model.organization}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {model.releaseDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {model.parameters || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-semibold bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200">
                      {model.averageScore?.toFixed(1) || 'N/A'}
                    </span>
                  </td>
                  {selectedBenchmarks.map(benchmark => {
                    const score = model.benchmarks[benchmark as keyof typeof model.benchmarks];
                    return (
                      <td
                        key={benchmark}
                        className="px-6 py-4 whitespace-nowrap text-center text-sm"
                      >
                        {score !== undefined ? (
                          <div className="flex flex-col items-center">
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {score.toFixed(1)}
                            </span>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                              <div
                                className="bg-primary-600 h-1.5 rounded-full"
                                style={{ width: `${score}%` }}
                              />
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400 dark:text-gray-600">-</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
