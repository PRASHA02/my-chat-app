# My Chat App

A full-stack chat application powered by AI, featuring a modern React frontend and a FastAPI backend with LangGraph integration and Ollama for local LLM support.

## 🎯 Project Overview

This is a real-time chat application that leverages:
- **Frontend**: React 19 with TypeScript, Vite, and modern UI components
- **Backend**: FastAPI with LangGraph for orchestrating AI workflows
- **LLM Integration**: Ollama for running local large language models
- **Containerization**: Docker & Docker Compose for easy deployment

## 📁 Project Structure

```
my-chat-app/
├── chat-backend/           # FastAPI backend
│   ├── src/
│   │   └── chat_ai/
│   │       ├── app.py      # Main FastAPI application
│   │       ├── graph_framework/  # LangGraph orchestration
│   │       ├── llm_service_provider/  # LLM service integration
│   │       ├── ollama_model_file/     # Custom Ollama model configuration
│   │       ├── model/      # Data models (ChatRequest, ChatResponse, State)
│   │       └── constants/  # App constants
│   ├── Dockerfile          # Backend container configuration
│   ├── Dockerfile.ollama   # Ollama service container configuration
│   ├── pyproject.toml      # Python dependencies
│   └── requirements.txt
│
├── chat-ui/                # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── types/          # TypeScript type definitions
│   │   ├── App.tsx         # Main app component
│   │   └── main.tsx        # Entry point
│   ├── Dockerfile          # Frontend container configuration
│   ├── package.json        # Node dependencies
│   ├── vite.config.ts      # Vite build configuration
│   └── tsconfig.json       # TypeScript configuration
│
├── docker-compose.yml      # Multi-container orchestration
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose
- Node.js 18+ (for local development)
- Python 3.11+ (for local backend development)
- NVIDIA GPU (for GPU-accelerated Ollama support, optional)

### Option 1: Using Docker Compose (Recommended)

```bash
# Clone the repository
git clone https://github.com/PRASHA02/my-chat-app.git
cd my-chat-app

# Start all services
docker-compose up --build

# Services will be available at:
# Frontend: http://localhost:5173
# Backend: http://localhost:8007
# Ollama: http://localhost:11434
```

### Option 2: Local Development

#### Backend Setup

```bash
cd chat-backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set environment variables
export OLLAMA_BASE_URL=http://localhost:11434

# Run the backend
uv run uvicorn chat_ai.app:app --host 0.0.0.0 --port 8007
```

#### Frontend Setup

```bash
cd chat-ui

# Install dependencies
npm install

# Run development server
npm run dev

# The frontend will be available at http://localhost:5173
```

#### Ollama Setup

```bash
# Install Ollama from https://ollama.ai
# Pull a model (e.g., Llama 2)
ollama pull llama2

# Start Ollama
ollama serve
```

## 📦 Tech Stack

### Backend
- **FastAPI**: Modern web framework for building APIs
- **Uvicorn**: ASGI web server
- **LangGraph**: Framework for orchestrating LLM workflows
- **Ollama**: Local LLM runtime
- **Pydantic**: Data validation and serialization
- **HTTPX**: Async HTTP client

### Frontend
- **React 19**: UI library
- **TypeScript**: Type safety for JavaScript
- **Vite**: Fast build tool and dev server
- **Lucide React**: Icon library
- **ESLint**: Code linting

## 🔌 API Endpoints

### POST `/api/chat`

Send a chat message and get AI-powered responses.

**Request:**
```json
{
  "message": "What is the capital of France?",
  "history": [
    {"role": "user", "content": "Previous question"},
    {"role": "assistant", "content": "Previous answer"}
  ]
}
```

**Response:**
```json
{
  "response": "The capital of France is Paris."
}
```

## 🐳 Docker Services

The `docker-compose.yml` defines three services:

1. **custom-ollama**: Ollama service for LLM inference
   - Port: 11434
   - GPU support: Configured for NVIDIA GPUs (optional)
   - Volume: `ollama_storage` for persistent model storage

2. **backend**: FastAPI backend service
   - Port: 8007
   - Depends on: `custom-ollama`
   - Communicates with Ollama via `http://custom-ollama:11434`

3. **frontend**: React frontend service
   - Port: 5173
   - Depends on: `backend`
   - Communicates with backend via the exposed port

## 📝 Development Scripts

### Backend

```bash
cd chat-backend

# Run with hot reload
uv run uvicorn chat_ai.app:app --host 0.0.0.0 --port 8007 --reload
```

### Frontend

```bash
cd chat-ui

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🔒 CORS Configuration

The backend includes CORS middleware configured to accept requests from all origins. For production, update this in `chat-backend/src/chat_ai/app.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["your-frontend-domain.com"],  # Specify your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 🌍 Environment Variables

### Backend (`.env` in `chat-backend/`)

```
OLLAMA_BASE_URL=http://localhost:11434
PYTHONPATH=/app/src
```

## 🤝 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     React Frontend                          │
│              (http://localhost:5173)                        │
└──────────────────────────┬──────────────────────────────────┘
                           │
                    POST /api/chat
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                   FastAPI Backend                            │
│              (http://localhost:8007)                         │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         LangGraph (AI Workflow Orchestration)          │ │
│  └─────────────────────┬─────────────────────────────────┘ │
└───────────────────────┼──────────────────────────────────────┘
                        │
                        ▼
         ┌──────────────────────────────┐
         │   Ollama LLM Service         │
         │  (http://localhost:11434)    │
         │  (Local Large Language Model) │
         └──────────────────────────────┘
```

## 📚 Key Components

### Backend Components

- **app.py**: Main FastAPI application with chat endpoint
- **graph.py**: LangGraph workflow for processing messages
- **llm_service.py**: LLM service integration with Ollama
- **custom_model.py**: Custom Ollama model configuration
- **Models**: ChatRequest, ChatResponse, State (data models)

### Frontend Components

- **App.tsx**: Main application component
- **components/**: Reusable React components
- **types/**: TypeScript type definitions
- **index.css**: Global styles
- **App.css**: App-specific styles

## 🐛 Troubleshooting

### Backend Connection Issues
```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# Check backend health
curl http://localhost:8007/docs
```

### Frontend Build Issues
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Docker Compose Issues
```bash
# View logs
docker-compose logs -f

# Rebuild containers
docker-compose down
docker-compose up --build
```

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For questions or issues, please open an issue on GitHub.

---

**Repository**: [PRASHA02/my-chat-app](https://github.com/PRASHA02/my-chat-app)
