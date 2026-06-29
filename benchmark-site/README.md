# LLM Benchmark Hub

A comprehensive web application for aggregating and visualizing benchmark results for large language models from multiple trusted sources.

## Features

- 📊 **Comprehensive Benchmarks**: View results from MMLU, HumanEval, GSM8K, MATH, GPQA, and more
- 🔍 **Advanced Filtering**: Search and filter models by organization, license type, and name
- 📈 **Visual Comparisons**: Interactive bar charts and radar charts for side-by-side model comparisons
- 🎯 **Real-time Sorting**: Sort by any benchmark or model attribute
- 🌓 **Dark Mode**: Automatic dark mode support
- 📱 **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- 🔄 **Regular Updates**: Data aggregated from Hugging Face, OpenAI, Anthropic, Google, Meta, and more

## Data Sources

- Hugging Face Open LLM Leaderboard
- OpenAI Technical Reports
- Anthropic Model Cards
- Google DeepMind Research
- Meta AI Research
- LMSys Chatbot Arena
- Community benchmarks

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Deployment**: Vercel (recommended)

## Project Structure

```
benchmark-site/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   └── globals.css      # Global styles
│   ├── components/
│   │   ├── BenchmarkTable.tsx    # Main data table
│   │   ├── BenchmarkCharts.tsx   # Visualization charts
│   │   ├── SearchFilter.tsx      # Search and filters
│   │   ├── ModelSelector.tsx     # Model comparison selector
│   │   ├── Header.tsx            # Page header
│   │   ├── Footer.tsx            # Page footer
│   │   └── Stats.tsx             # Statistics cards
│   ├── data/
│   │   └── benchmarks.ts    # Benchmark data
│   └── lib/
│       └── types.ts         # TypeScript types
├── public/                  # Static assets
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Benchmarks Explained

- **MMLU** (Massive Multitask Language Understanding): Tests knowledge across 57 subjects
- **HumanEval**: Measures code generation accuracy with Python programming tasks
- **GSM8K**: Evaluates mathematical reasoning with grade school math problems
- **MATH**: Tests advanced mathematical problem-solving
- **GPQA**: Graduate-level science questions
- **HellaSwag**: Common sense reasoning
- **ARC**: Question answering and reasoning
- **TruthfulQA**: Measures truthfulness in model responses

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests with:

- New benchmark data
- Additional data sources
- UI/UX improvements
- Bug fixes

## License

MIT

## Acknowledgments

Data aggregated from public sources and research papers. All model names and trademarks belong to their respective owners.
