import { BenchmarkSource } from '@/lib/types';

interface FooterProps {
  sources: BenchmarkSource[];
}

export default function Footer({ sources }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">About LLM Benchmark Hub</h3>
            <p className="text-sm text-gray-400">
              We aggregate benchmark results from multiple trusted sources to provide a comprehensive
              view of LLM performance across various tasks. Our data is updated regularly to reflect
              the latest model releases and benchmark results.
            </p>
          </div>

          {/* Data Sources */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Data Sources</h3>
            <ul className="space-y-2">
              {sources.map(source => (
                <li key={source.name} className="text-sm">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-400 hover:text-primary-300 transition-colors flex items-center space-x-1"
                  >
                    <span>{source.name}</span>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <span className="text-xs text-gray-500">
                    Updated: {source.lastUpdated}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500">
              © 2026 LLM Benchmark Hub. Data aggregated from public sources.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                About
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Methodology
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                API
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
