<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Chatbot</title>
</head>
<body>
    <h2>Ask the Chatbot</h2>
    <input type="text" id="query" placeholder="Type your question">
    <button onclick="sendQuery()">Ask</button>
    <p id="response"></p>

    <script>
        async function sendQuery() {
            let queryText = document.getElementById("query").value;
            let apiUrl = "https://0admnncyul.execute-api.us-east-1.amazonaws.com/default?query=" + encodeURIComponent(queryText);

            try {
                let response = await fetch(apiUrl, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                let data = await response.json();
                document.getElementById("response").innerText = data.body;
            } catch (error) {
                document.getElementById("response").innerText = "Error fetching API: " + error;
            }
        }
    </script>
</body>
</html>
