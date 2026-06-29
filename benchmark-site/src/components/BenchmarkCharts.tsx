'use client';

import { ModelBenchmark } from '@/lib/types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

interface BenchmarkChartsProps {
  models: ModelBenchmark[];
  selectedModels: string[];
}

export default function BenchmarkCharts({ models, selectedModels }: BenchmarkChartsProps) {
  const filteredModels = models.filter(m => selectedModels.includes(m.id));

  if (filteredModels.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          Select models from the table below to compare them visually
        </p>
      </div>
    );
  }

  // Prepare data for bar chart
  const benchmarkCategories = ['mmlu', 'humaneval', 'gsm8k', 'math', 'gpqa'];
  const barChartData = benchmarkCategories.map(category => {
    const dataPoint: any = { name: category.toUpperCase() };
    filteredModels.forEach(model => {
      dataPoint[model.name] = model.benchmarks[category as keyof typeof model.benchmarks] || 0;
    });
    return dataPoint;
  });

  // Prepare data for radar chart
  const radarData = benchmarkCategories.map(category => {
    const dataPoint: any = { 
      subject: category.toUpperCase(),
      fullMark: 100,
    };
    filteredModels.forEach(model => {
      dataPoint[model.name] = model.benchmarks[category as keyof typeof model.benchmarks] || 0;
    });
    return dataPoint;
  });

  const colors = [
    '#0ea5e9',
    '#8b5cf6',
    '#f59e0b',
    '#10b981',
    '#ef4444',
    '#ec4899',
  ];

  return (
    <div className="space-y-6">
      {/* Bar Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Benchmark Comparison - Bar Chart
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#f3f4f6',
              }}
            />
            <Legend />
            {filteredModels.map((model, idx) => (
              <Bar
                key={model.id}
                dataKey={model.name}
                fill={colors[idx % colors.length]}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Radar Chart */}
      {filteredModels.length <= 3 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Benchmark Comparison - Radar Chart
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="subject" stroke="#9ca3af" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: '#f3f4f6',
                }}
              />
              <Legend />
              {filteredModels.map((model, idx) => (
                <Radar
                  key={model.id}
                  name={model.name}
                  dataKey={model.name}
                  stroke={colors[idx % colors.length]}
                  fill={colors[idx % colors.length]}
                  fillOpacity={0.3}
                />
              ))}
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}

      {filteredModels.length > 3 && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            📊 Radar chart is hidden when comparing more than 3 models for clarity.
            Select up to 3 models to see the radar visualization.
          </p>
        </div>
      )}
    </div>
  );
}
