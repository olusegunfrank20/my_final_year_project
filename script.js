// Function to toggle the lamp status
function toggleSwitch(button, lampId) {
    // Toggle the status of the lamp
    lampStatus[lampId - 1] = !lampStatus[lampId - 1];
    const isOn = lampStatus[lampId - 1];

    // Send update to backend
    fetch('https://your-backend-url.com/update-lamp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lampId, status: isOn }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Lamp status updated successfully:', data);

        // Update button text and style
        button.textContent = isOn ? "On" : "Off";
        button.classList.toggle("active", isOn);

        // Update the system status
        updateSystemStatus();
    })
    .catch(error => {
        console.error('Error updating lamp status:', error);
        alert('Failed to update the lamp status.');
    });
}

// Function to fetch initial statuses on page load
document.addEventListener("DOMContentLoaded", () => {
    fetch('https://your-backend-url.com/lamp-status')
        .then(response => response.json())
        .then(data => {
            lampStatus = data.statuses; // Assuming backend returns an array of statuses
            document.querySelectorAll('.lamp button').forEach((button, index) => {
                const isOn = lampStatus[index];
                button.textContent = isOn ? "On" : "Off";
                button.classList.toggle("active", isOn);
            });
            updateSystemStatus();
        })
        .catch(error => {
            console.error('Error fetching lamp statuses:', error);
            alert('Failed to fetch lamp statuses.');
        });
});
