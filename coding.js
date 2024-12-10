// Set your backend URL
const backendUrl = 'https://automaticcontrol.infinityfreeapp.com';

// Function to toggle a lamp's state (on/off)
function toggleSwitch(button, lampId) {
    // Toggle the button's label and background color
    const newState = button.innerHTML === "Off" ? "On" : "Off";
    button.innerHTML = newState;
    button.style.backgroundColor = newState === "On" ? "green" : "red";

    // Send the updated state to the backend
    updateLampState(lampId, newState);
}

// Function to update the lamp's state on the backend
async function updateLampState(lampId, state) {
    try {
        const response = await fetch(`${backendUrl}/update-lamp.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Send JSON content
            },
            body: JSON.stringify({ lampId, state }), // Send lampId and state as JSON
        });

        const result = await response.json(); // Parse JSON response
        if (result.success) {
            console.log(`Lamp ${lampId} is now ${state}`);
        } else {
            console.error('Failed to update lamp state:', result.message);
        }
    } catch (error) {
        console.error('Error updating lamp state:', error);
    }
}

// Function to fetch lamp statuses from the backend
async function fetchLampStatuses() {
    try {
        const response = await fetch(`${backendUrl}/get-lamp-status.php`, {
            method: 'GET',
        });

        // Ensure response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Parse JSON data

        if (data.lamps && Array.isArray(data.lamps)) {
            data.lamps.forEach(lamp => {
                const button = document.querySelector(`#lamp-${lamp.lampId} button`);
                if (button) {
                    button.innerHTML = lamp.state; // Set button text to lamp state (On/Off)
                    button.style.backgroundColor = lamp.state === "On" ? "green" : "red"; // Update button color
                } else {
                    console.warn(`No button found for lamp ID: ${lamp.lampId}`);
                }
            });
        } else {
            console.error('Invalid lamp data format:', data);
        }
    } catch (error) {
        console.error('Error fetching lamp statuses:', error);
    }
}

// Call the fetchLampStatuses function on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchLampStatuses();
});
