import logging
import httpx
from fastapi import HTTPException
from typing import List, Dict
from chat_ai.constants.app_constants import MODEL_NAME, OLLAMA_CHAT_URI

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("chat_ai.ollama_client")


async def call_ollama(messages: List[Dict[str, str]]):
    payload = {
        "model": MODEL_NAME,
        "messages": messages,
        "stream": False,
        "think": False,
        "keep_alive": "10m"
    }

    logger.info(f"Sending request to Ollama: Model={MODEL_NAME}, MessageCount={len(messages)}")

    async with httpx.AsyncClient(timeout=None) as client:
        try:
            response = await client.post(OLLAMA_CHAT_URI, json=payload)

            # Log successful status and latency (httpx response objects have elapsed time)
            logger.info(
                f"Ollama responded with status: {response.status_code} in {response.elapsed.total_seconds():.2f}s")

            response.raise_for_status()
            return response.json()

        except httpx.HTTPStatusError as e:
            # Captures 4xx or 5xx errors specifically
            error_detail = f"Ollama API Error: {e.response.text}"
            logger.error(error_detail)
            raise HTTPException(status_code=e.response.status_code, detail=error_detail)

        except httpx.ConnectError:
            error_detail = "Could not connect to Ollama server. Is it running?"
            logger.error(error_detail)
            raise HTTPException(status_code=503, detail=error_detail)

        except Exception as e:
            # Captures timeouts and other unexpected issues
            error_detail = f"Unexpected error during Ollama call: {str(e)}"
            logger.exception(error_detail)  # .exception includes the stack trace
            raise HTTPException(status_code=500, detail=error_detail)