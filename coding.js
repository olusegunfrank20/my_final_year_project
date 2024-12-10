// Set your backend URL (make sure it's HTTPS)
const backendUrl = 'https://automaticcontrol.infinityfreeapp.com';

// Function to toggle a lamp's state (on/off)
function toggleSwitch(button, lampId) {
    // Toggle the button's label and background color
    if (button.innerHTML === "Off") {
        button.innerHTML = "On";
        button.style.backgroundColor = "green";
    } else {
        button.innerHTML = "Off";
        button.style.backgroundColor = "red";
    }

    // Send the updated state to the backend
    updateLampState(lampId, button.innerHTML);
}

// Function to update the lamp's state on the backend
async function updateLampState(lampId, state) {
    try {
        const response = await fetch(`${backendUrl}/update-lamp.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  // Set content type for JSON
            },
            body: JSON.stringify({ lampId: lampId, state: state }),  // Send lamp ID and state as JSON
        });

        const result = await response.json();  // Parse JSON response from the backend
        if (result.success) {
            console.log(`Lamp ${lampId} is now ${state}`);
            // Fetch and update system status after toggling
            fetchLampStatuses();
        } else {
            console.log('Failed to update lamp state:', result.message);
        }
    } catch (error) {
        console.error('Error updating lamp state:', error);
    }
}

// Function to fetch the lamp statuses from the backend
async function fetchLampStatuses() {
    try {
        const response = await fetch(`${backendUrl}/get-lamp-status.php`);
        const data = await response.json();

        // Initialize a flag to track if all lamps are on or off
        let allOn = true;
        let allOff = true;

        // Loop through each lamp and update the frontend accordingly
        data.lamps.forEach(lamp => {
            const button = document.querySelector(`#lamp-${lamp.lampId} button`);
            button.innerHTML = lamp.state;  // Set button text to lamp state (On/Off)
            button.style.backgroundColor = lamp.state === 'On' ? 'green' : 'red';  // Change button color

            // Update the flags based on lamp states
            if (lamp.state === 'On') {
                allOff = false;
            } else {
                allOn = false;
            }
        });

        // Update the system status text
        const systemStatus = document.querySelector('#system-status');
        if (allOn) {
            systemStatus.innerHTML = "All lamps are currently on.";
        } else if (allOff) {
            systemStatus.innerHTML = "All lamps are currently off.";
        } else {
            systemStatus.innerHTML = "Some lamps are on, and some are off.";
        }
    } catch (error) {
        console.error('Error fetching lamp statuses:', error);
    }
}

// Call the fetchLampStatuses function when the page loads to get current lamp states
document.addEventListener('DOMContentLoaded', () => {
    fetchLampStatuses();
});
