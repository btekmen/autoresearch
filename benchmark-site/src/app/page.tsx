'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Stats from '@/components/Stats';
import SearchFilter from '@/components/SearchFilter';
import ModelSelector from '@/components/ModelSelector';
import BenchmarkCharts from '@/components/BenchmarkCharts';
import BenchmarkTable from '@/components/BenchmarkTable';
import { modelBenchmarks, benchmarkSources } from '@/data/benchmarks';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrg, setSelectedOrg] = useState('all');
  const [selectedLicense, setSelectedLicense] = useState('all');
  const [selectedModelsForChart, setSelectedModelsForChart] = useState<string[]>([]);

  // Get unique organizations and licenses
  const organizations = useMemo(() => {
    return Array.from(new Set(modelBenchmarks.map(m => m.organization))).sort();
  }, []);

  const licenses = useMemo(() => {
    return Array.from(new Set(modelBenchmarks.map(m => m.license).filter(Boolean) as string[])).sort();
  }, []);

  // Filter models based on search and filters
  const filteredModels = useMemo(() => {
    return modelBenchmarks.filter(model => {
      const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           model.organization.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesOrg = selectedOrg === 'all' || model.organization === selectedOrg;
      const matchesLicense = selectedLicense === 'all' || model.license === selectedLicense;
      
      return matchesSearch && matchesOrg && matchesLicense;
    });
  }, [searchQuery, selectedOrg, selectedLicense]);

  const toggleModelForChart = (modelId: string) => {
    setSelectedModelsForChart(prev => {
      if (prev.includes(modelId)) {
        return prev.filter(id => id !== modelId);
      }
      return [...prev, modelId];
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header sources={benchmarkSources} />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Stats */}
          <Stats models={modelBenchmarks} />

          {/* Search and Filters */}
          <SearchFilter
            onSearch={setSearchQuery}
            onFilterOrg={setSelectedOrg}
            onFilterLicense={setSelectedLicense}
            organizations={organizations}
            licenses={licenses}
          />

          {/* Info Banner */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  About the Benchmarks
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>MMLU</strong>: Massive Multitask Language Understanding (general knowledge) •{' '}
                  <strong>HumanEval</strong>: Code generation accuracy •{' '}
                  <strong>GSM8K</strong>: Grade school math problems •{' '}
                  <strong>MATH</strong>: Advanced mathematics •{' '}
                  <strong>GPQA</strong>: Graduate-level science questions •{' '}
                  <strong>HellaSwag</strong>: Commonsense reasoning •{' '}
                  <strong>ARC</strong>: Question answering •{' '}
                  <strong>TruthfulQA</strong>: Truthfulness in responses
                </p>
              </div>
            </div>
          </div>

          {/* Model Selector for Charts */}
          <ModelSelector
            models={filteredModels}
            selectedModels={selectedModelsForChart}
            onToggleModel={toggleModelForChart}
          />

          {/* Charts */}
          {selectedModelsForChart.length > 0 && (
            <BenchmarkCharts
              models={modelBenchmarks}
              selectedModels={selectedModelsForChart}
            />
          )}

          {/* Table */}
          <div>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                All Models ({filteredModels.length})
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Click on column headers to sort. Hover over rows for more details.
              </p>
            </div>
            <BenchmarkTable models={filteredModels} />
          </div>
        </div>
      </main>

      <Footer sources={benchmarkSources} />
    </div>
  );
}
