# 🚀 Quick Start Guide

## Local Development (2 minutes)

```bash
# 1. Navigate to the project
cd benchmark-site

# 2. Install dependencies (first time only)
npm install

# 3. Start the development server
npm run dev

# 4. Open your browser
# Visit: http://localhost:3000
```

That's it! The site should now be running locally.

## What You Can Do

### 🔍 Search & Filter
- **Search bar**: Type any model name (e.g., "GPT", "Claude", "Llama")
- **Organization dropdown**: Filter by company (OpenAI, Anthropic, Google, Meta, etc.)
- **License dropdown**: See only open-source or proprietary models

### 📊 Compare Models
1. Click on model cards in the "Select Models to Compare" section
2. Choose 2-6 models you want to compare
3. Charts will automatically appear showing side-by-side comparison
4. Bar chart shows all selected models across benchmarks
5. Radar chart appears when comparing 3 or fewer models

### 📈 Sort & Analyze
- Click any column header in the table to sort
- Click again to reverse the sort order
- Sort by: Model name, Parameters, Average score, or any specific benchmark
- Visual progress bars show relative performance at a glance

### 🎨 Toggle Benchmarks
- Use the benchmark selector buttons above the table
- Show/hide specific benchmarks (MMLU, HumanEval, GSM8K, etc.)
- Customize your view to focus on what matters to you

## Understanding the Benchmarks

| Benchmark | What It Measures | Score Range |
|-----------|------------------|-------------|
| **MMLU** | General knowledge across 57 subjects | 0-100% |
| **HumanEval** | Python code generation accuracy | 0-100% |
| **GSM8K** | Grade school math problems | 0-100% |
| **MATH** | Advanced mathematics | 0-100% |
| **GPQA** | Graduate-level science questions | 0-100% |
| **HellaSwag** | Commonsense reasoning | 0-100% |
| **ARC** | Question answering | 0-100% |
| **TruthfulQA** | Truthfulness in responses | 0-100% |

Higher scores are better for all benchmarks.

## Key Features

✅ **13+ Leading Models** including GPT-5, Claude Opus 4, Gemini 2.0 Ultra  
✅ **10+ Industry Benchmarks** from trusted sources  
✅ **Real-time Filtering** with instant results  
✅ **Interactive Charts** with bar and radar visualizations  
✅ **Dark Mode Support** automatic theme switching  
✅ **Mobile Responsive** works on all devices  
✅ **Production Ready** optimized and tested  

## Deployment Options

### 🎯 Fastest: Vercel (30 seconds)
1. Push to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Click "Deploy"

### 🐳 Docker
```bash
docker build -t llm-benchmark-hub .
docker run -p 3000:3000 llm-benchmark-hub
```

### 🌐 Other Options
- **Netlify**: Drag & drop the build folder
- **Railway**: One-click deploy from GitHub
- **VPS**: Use PM2 for process management

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## Project Stats

- **Lines of Code**: ~4,400
- **Components**: 8 React components
- **Models**: 13 leading LLMs
- **Benchmarks**: 10+ standard tests
- **Data Sources**: 4+ trusted organizations
- **Build Time**: ~13 seconds
- **Bundle Size**: 216 KB First Load

## Need Help?

- 📖 **Full docs**: See [README.md](./README.md)
- 🚀 **Deploy guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- 🐛 **Issues**: Create a GitHub issue
- 💬 **Questions**: Check Next.js docs

## Next Steps

1. ✅ Site is running locally
2. 🎨 Explore the UI and features
3. 📊 Try comparing different models
4. 🚀 Deploy to production (see DEPLOYMENT.md)
5. 🔄 Add more models and benchmarks as they release

---

**Enjoy exploring LLM benchmarks! 🎉**
