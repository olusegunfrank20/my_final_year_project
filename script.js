// Array to store the status of lamps
let lampStatus = [false, false, false, false];

// Function to toggle the lamp status
function toggleSwitch(button, lampId) {
    // Toggle the status of the lamp
    lampStatus[lampId - 1] = !lampStatus[lampId - 1];
    const isOn = lampStatus[lampId - 1];

    // Update button text and style
    button.textContent = isOn ? "On" : "Off";
    button.classList.toggle("active", isOn);

    // Update the system status
    updateSystemStatus();
}

// Function to update the system status message
function updateSystemStatus() {
    const statusElement = document.getElementById("system-status");

    if (lampStatus.every((status) => status === true)) {
        statusElement.textContent = "All lamps are currently ON.";
        statusElement.style.color = "#2ecc71"; // Green text
    } else if (lampStatus.every((status) => status === false)) {
        statusElement.textContent = "All lamps are currently OFF.";
        statusElement.style.color = "#e74c3c"; // Red text
    } else {
        const onCount = lampStatus.filter((status) => status).length;
        statusElement.textContent = `${onCount} lamp(s) are ON, and ${lampStatus.length - onCount} lamp(s) are OFF.`;
        statusElement.style.color = "#f39c12"; // Orange text
    }
}

// Initialize system status on page load
document.addEventListener("DOMContentLoaded", () => {
    updateSystemStatus();
});
