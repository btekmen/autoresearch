import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LLM Benchmark Hub - Comprehensive AI Model Benchmarks',
  description: 'Compare and analyze benchmark results for large language models from multiple trusted sources. Updated regularly with the latest performance data.',
  keywords: ['LLM', 'AI', 'benchmarks', 'machine learning', 'language models', 'GPT', 'Claude', 'Gemini', 'Llama'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {children}
      </body>
    </html>
  );
}
