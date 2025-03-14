async function sendQuery() {
    const query = document.getElementById("queryInput").value;
    const API_URL = "https://gec90mxpz4.execute-api.us-east-1.amazonaws.com/prod/chatbot";

    try {
        const response = await fetch(`${API_URL}?query=${encodeURIComponent(query)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("API Response:", data);
        document.getElementById("responseOutput").innerText = data.response || "No response from chatbot.";
    } catch (error) {
        console.error("Error fetching API:", error);
        document.getElementById("responseOutput").innerText = "Error: Could not reach API.";
    }
}
