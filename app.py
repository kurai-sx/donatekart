import streamlit as st
import requests
import json

# API Gateway URL (Replace with your actual endpoint)
API_URL = "https://pvzs8yrac6.execute-api.us-east-1.amazonaws.com/prod"

st.set_page_config(page_title="NGO Donation Chatbot", layout="centered")
st.title("🤖 NGO Donation Chatbot")

# Chat history
if "messages" not in st.session_state:
    st.session_state["messages"] = []

# Display previous messages
for message in st.session_state["messages"]:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# User input
user_input = st.chat_input("Ask about donations...")

if user_input:
    # Display user message
    st.session_state["messages"].append({"role": "user", "content": user_input})
    with st.chat_message("user"):
        st.markdown(user_input)

    # Send request to API Gateway
    try:
        response = requests.get(f"{API_URL}?query={user_input}")
        response_json = response.json()
        
        # Extract chatbot response
        bot_reply = response_json.get("response", "❌ No valid response from chatbot.")
        
    except Exception as e:
        bot_reply = f"🚫 Error: {str(e)}"

    # Display bot response
    st.session_state["messages"].append({"role": "assistant", "content": bot_reply})
    with st.chat_message("assistant"):
        st.markdown(bot_reply)
