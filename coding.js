// JavaScript to toggle the lamp states and communicate with the backend
const backendUrl = 'https://automaticcontrol.infinityfreeapp.com'; // Replace with your hosted backend URL

// Function to toggle a switch
function toggleSwitch(button, lampId) {
    // Toggle the button's label and style
    if (button.innerHTML === "Off") {
        button.innerHTML = "On";
        button.style.backgroundColor = "green";
    } else {
        button.innerHTML = "Off";
        button.style.backgroundColor = "red";
    }

    // Send a POST request to update the lamp state on the backend
    updateLampState(lampId, button.innerHTML);
}

// Function to update the lamp state on the backend
async function updateLampState(lampId, state) {
    try {
        const response = await fetch(`${backendUrl}/update-lamp.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ lampId: lampId, state: state })
        });

        const result = await response.json();
        if (result.success) {
            console.log(`Lamp ${lampId} is now ${state}`);
        } else {
            console.log('Failed to update lamp state');
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

        // Update the frontend based on the fetched data
        data.lamps.forEach(lamp => {
            const button = document.querySelector(`#lamp-${lamp.lampId} button`);
            button.innerHTML = lamp.state;
            button.style.backgroundColor = lamp.state === 'On' ? 'green' : 'red';
        });
    } catch (error) {
        console.error('Error fetching lamp statuses:', error);
    }
}

// Call the fetchLampStatuses function to load the current lamp states when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchLampStatuses();
});
