# Use a lightweight Python image
FROM python:3.11-slim

# 1. Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# 2. Set working directory
WORKDIR /app

# 3. Copy dependency files first (for caching)
# This uses your pyproject.toml and uv.lock instead of requirements.txt
COPY pyproject.toml uv.lock* ./

# 4. Install dependencies
# --frozen ensures the lockfile isn't changed; --no-install-project skips app code for now
RUN uv sync --no-install-project

# 5. Copy the rest of your code
COPY . .

# 6. Expose the FastAPI port
EXPOSE 8007

# 7. Run the application
# We use 'uv run' to ensure the virtual environment is used
CMD ["uv", "run", "uvicorn", "src.chat_ai.app:app", "--host", "0.0.0.0", "--port", "8007"]