export interface ModelBenchmark {
  id: string;
  name: string;
  organization: string;
  releaseDate: string;
  parameters?: string;
  license?: string;
  benchmarks: {
    mmlu?: number;
    humaneval?: number;
    gsm8k?: number;
    hellaswag?: number;
    arc?: number;
    truthfulqa?: number;
    winogrande?: number;
    bbh?: number;
    gpqa?: number;
    math?: number;
  };
  description?: string;
  source?: string;
  averageScore?: number;
}

export interface BenchmarkSource {
  name: string;
  url: string;
  lastUpdated: string;
}

export type SortKey = keyof ModelBenchmark['benchmarks'] | 'name' | 'parameters' | 'averageScore';
export type SortOrder = 'asc' | 'desc';
