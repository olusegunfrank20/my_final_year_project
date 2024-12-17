// Initialize lamp statuses
let lampStatuses = {
    1: false, // Lamp 1 is initially OFF
    2: false, // Lamp 2 is initially OFF
    3: false, // Lamp 3 is initially OFF
    4: false  // Lamp 4 is initially OFF
};

// Function to toggle lamp state
function toggleSwitch(button, lampId) {
    // Toggle the lamp status
    lampStatuses[lampId] = !lampStatuses[lampId];

    // Update button appearance and text
    if (lampStatuses[lampId]) {
        button.classList.add('active'); // Add the active class to turn button green
        button.textContent = 'On';     // Update button text
    } else {
        button.classList.remove('active'); // Remove the active class
        button.textContent = 'Off';        // Update button text
    }

    // Log the data being sent (for debugging)
    console.log("Sending data to server:", { lampId: lampId, status: lampStatuses[lampId] });

    // Send updated lamp status to backend
    fetch('lamp_control.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lampId: lampId, status: lampStatuses[lampId] }) // Send JSON data
    })
    .then(response => response.json())
    .then(data => {
        console.log("Server response:", data);
        if (data.success) {
            updateSystemStatus(); // Update system status if the response is successful
        } else {
            console.error('Error:', data.error);
        }
    })
    .catch(error => {
        console.error('Fetch Error:', error);
    });
}

// Function to update system status
function updateSystemStatus() {
    const statusElement = document.getElementById('system-status');
    let statusText = 'Current Lamp Status:\n';

    // Loop through lamp statuses and build the status text
    for (let lampId in lampStatuses) {
        const status = lampStatuses[lampId] ? 'On' : 'Off';
        statusText += `Lamp ${lampId}: ${status}\n`;
    }

    // Update the system status text
    statusElement.textContent = statusText.trim();
}

// Initial update to system status when the page loads
updateSystemStatus();
