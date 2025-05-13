<?php
require "../config/headers.php";
require "../config/database.php";
include_once("../helpers/validator.php");

// if request method is post
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    # get the data from the form
    $data = json_decode($_POST['user_data'], true);

    # check the user data for errors
    if (
        !empty($data['date']) || !empty($data['physician'])
        || !empty($data['time'])
    ) {
        $date = htmlspecialchars($data['date']);
        $physician = htmlspecialchars($data['physician']);
        $time = htmlspecialchars($data['time']);

        # add the data to the database
        $email = "";
        $staffID = "";
        $patientID = "";

        if (isset($_SESSION['user'])) {
            $email = $_SESSION['user']['email'];
        }

        # Get the staff id from the staff table
        $checkStmt = $conn->prepare("SELECT StaffID From staff WHERE StaffName= ? ");
        $checkStmt->bind_param("s", $data['physician']);
        $checkStmt->execute();
        $checkStmt->store_result();

        if ($checkStmt->num_rows > 0) {
            $checkStmt->bind_result($staffID);
            $checkStmt->fetch();
        }

        # Get the patient id from the patient table
        $getStmt = $conn->prepare("SELECT patientID FROM patient WHERE email = ?");
        $getStmt->bind_param("s", $email);
        $getStmt->execute();
        $getStmt->store_result();

        if($getStmt->num_rows > 0) {
            $getStmt->bind_result($patientID);
            $getStmt->fetch();
        }

        $insertStmt = $conn->prepare("INSERT INTO appointment (AppointmentDate, StaffID, patientID, AppointmentTime) VALUES (?, ?, ?, ?)");
        $insertStmt->bind_param("siis", )

        if ($addStmt->execute()) {
            # send to the frontend
            echo json_encode([
                "message" => "medical card created successfully",
                "success" => true
            ]);
            exit;
        } else {
            echo json_encode([
                "error" => "Can't add the data to the database",
                "success" => false
            ]);
            exit;
        }

    } else {
        echo json_encode([
            "error" => "All fields are required"
        ]);
        exit;
    }
}
?>