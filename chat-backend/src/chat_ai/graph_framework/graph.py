from langgraph.graph import StateGraph, START, END

from chat_ai.llm_service_provider.llm_service import call_ollama
from chat_ai.model.state import State


# 3. LangGraph Node
async def chatbot_node(state: State):
    result = await call_ollama(state["messages"])
    ai_message = result.get("message", {"role": "assistant", "content": "Error processing response."})
    return {"messages": state["messages"] + [ai_message]}

workflow = StateGraph(State)
workflow.add_node("chatbot", chatbot_node)
workflow.add_edge(START, "chatbot")
workflow.add_edge("chatbot", END)
app_graph = workflow.compile()