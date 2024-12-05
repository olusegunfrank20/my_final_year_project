<?php
// backend.php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Capture the posted data
    $switch = $_POST['switch'] ?? null;
    $state = $_POST['state'] ?? null;

    // You can save this data to a file or a database for real-world use
    // For now, just log it to see if it's working

    if ($switch && $state) {
        // Simulate updating the switch state in the backend (e.g., save to a file)
        // For testing, we're just sending a response message back
        echo json_encode(["message" => "$switch updated to $state"]);
    } else {
        echo json_encode(["message" => "Invalid data"]);
    }
}
