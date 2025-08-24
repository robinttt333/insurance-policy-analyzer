# Insurance Policy Analyzer

🔍 AI-powered insurance policy analysis tool that identifies red flags, exclusions, and problematic clauses in insurance policies.

## ✨ Features

- 🚩 **AI-Powered Analysis**: Automatically detects common red flags in insurance policies
- 📄 **PDF Support**: Upload and analyze PDF insurance documents up to 50MB
- 🎨 **Modern UI**: Beautiful, responsive interface with educational content
- 📊 **Detailed Results**: Clear explanations of potential issues with policy text excerpts
- 🔒 **Secure & Private**: Files processed server-side and immediately deleted
- ⚡ **Fast Analysis**: Results in seconds, no account required

## 🚀 Quick Deployment (Free)

### Option 1: Vercel (Recommended - Easiest)

1. **Fork this repository**
2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Import your forked repository
   - Deploy automatically!

3. **Set environment variables in Vercel**:
   - `NODE_ENV=production`
   - Update CORS origin in `backend/src/server.ts` with your Vercel URL

### Option 2: Railway (Backend) + Netlify (Frontend)

**Deploy Backend to Railway:**
1. Go to [railway.app](https://railway.app) and connect GitHub
2. Deploy from `/backend` folder
3. Set `NODE_ENV=production`
4. Copy the generated URL

**Deploy Frontend to Netlify:**
1. Go to [netlify.com](https://netlify.com) and connect GitHub
2. Build settings:
   - Build command: `cd frontend && npm run build`
   - Publish directory: `frontend/build`
3. Environment variable: `REACT_APP_API_URL=<your-railway-url>`

## 🛠️ Local Development

### Prerequisites
- Node.js 16+
- npm or yarn

### Setup
1. **Clone and install**:
   ```bash
   git clone <your-repo-url>
   cd insurance-policy-analyzer
   
   # Backend
   cd backend && npm install
   
   # Frontend  
   cd ../frontend && npm install
   ```

2. **Start development servers**:
   ```bash
   # Terminal 1: Backend
   cd backend && npm run dev
   
   # Terminal 2: Frontend
   cd frontend && npm start
   ```

3. **Access**: http://localhost:3001

## 🏗️ Technology Stack

**Backend:**
- Node.js + Express + TypeScript
- PDF parsing (`pdf-parse`)
- Natural language processing (`natural`)
- File uploads (`multer`)

**Frontend:**
- React + TypeScript
- Tailwind CSS
- React Dropzone
- Modern responsive design

## 🚩 Red Flags Detected

1. **High Deductibles** - $1,000+ out-of-pocket costs
2. **Exclusions** - Services/conditions not covered
3. **Pre-existing Conditions** - Prior medical issue restrictions
4. **Waiting Periods** - Coverage delays
5. **Coverage Limits** - Benefit caps
6. **Premium Increases** - Variable pricing
7. **Cancellation Terms** - Insurer cancellation rights
8. **Documentation Requirements** - Excessive paperwork

## 🔐 Security & Privacy

- ✅ Files processed and immediately deleted
- ✅ No data storage or tracking
- ✅ Secure file validation
- ✅ CORS protection

## 📝 License

MIT License - Free for personal and commercial use

## 🆘 Support

**Common Issues:**
- ✅ File under 50MB
- ✅ Valid PDF format
- ✅ Not password protected

For help, create a GitHub issue.