from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from chat_ai.graph_framework.graph import app_graph
from chat_ai.model.chat_request import ChatRequest
from chat_ai.model.chat_response import ChatResponse
import uvicorn
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    initial_messages = request.history + [{"role": "user", "content": request.message}]

    final_state = await app_graph.ainvoke({"messages": initial_messages})

    last_msg = final_state["messages"][-1]
    return ChatResponse(response=last_msg["content"])

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8007, reload=True, timeout_keep_alive=600)

