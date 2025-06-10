<?php
require "../config/headers.php";
require "../config/database.php";
include_once("../helpers/validator.php");
require_once __DIR__ . '/../classes/Appointment.php';

// if request method is post
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode($_POST['user_data'], true);

    if (
        !empty($data['date']) || !empty($data['physician'])
        || !empty($data['time'])
    ) {
        $date = htmlspecialchars($data['date']);
        $physician = htmlspecialchars($data['physician']);
        $time = htmlspecialchars($data['time']);
        $email = "";
        if (isset($_SESSION['user'])) {
            $email = $_SESSION['user']['email'];
        }

        $appointment = new Appointment($conn);
        $result = $appointment->schedule($date, $physician, $time, $email);
        echo json_encode($result);
        exit;
    } else {
        echo json_encode([
            "error" => "All fields are required"
        ]);
        exit;
    }
}
?>