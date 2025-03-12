import streamlit as st
import requests

API_URL = "https://pvzs8yrac6.execute-api.us-east-1.amazonaws.com/prod"

st.set_page_config(page_title="NGO Donation Chatbot", layout="centered")
st.title("🤖 NGO Donation Chatbot")

if "messages" not in st.session_state:
    st.session_state["messages"] = []

for message in st.session_state["messages"]:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

user_input = st.chat_input("Ask about donations...")

if user_input:
    st.session_state["messages"].append({"role": "user", "content": user_input})
    with st.chat_message("user"):
        st.markdown(user_input)

    try:
        response = requests.get(f"{API_URL}?query={user_input}")
        response_json = response.json()

        # Extract chatbot response
        bot_reply = response_json.get("response", "❌ No valid response.")

    except Exception as e:
        bot_reply = f"🚫 Error: {str(e)}"

    st.session_state["messages"].append({"role": "assistant", "content": bot_reply})
    with st.chat_message("assistant"):
        st.markdown(bot_reply)
