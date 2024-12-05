// Function to toggle the switch state
function toggleSwitch(button) {
    const currentState = button.textContent; // Get the current state of the button
    const newState = currentState === "Off" ? "On" : "Off"; // Toggle state
    button.textContent = newState; // Update button text

    // Send the new state to the PHP backend using fetch
    const switchName = button.previousElementSibling.textContent; // Get switch name
    fetch("http://localhost:80/smart_home/backend.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `switch=${switchName}&state=${newState}`,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message); // Log server response
    })
    .catch(err => {
        console.error("Error in fetching data:", err);
        alert("Error: Could not connect to backend. Please check server settings.");
    });
}
