async function sendMessage() {
    let userQuery = document.getElementById("user-input").value;
    let apiUrl = "https://qfk01zsu87.execute-api.us-east-1.amazonaws.com/prod/query?query=" + encodeURIComponent(userQuery);

    try {
        let response = await fetch(apiUrl, { 
            method: "GET", 
            headers: { "Content-Type": "application/json" } 
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();
        document.getElementById("response").innerText = data.response || "No response received";
    } catch (error) {
        console.error("Error fetching response:", error);
        document.getElementById("response").innerText = "Error fetching response.";
    }
}
