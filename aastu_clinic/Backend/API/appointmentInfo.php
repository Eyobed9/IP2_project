<?php
require "../config/headers.php";
require "../config/database.php";
include_once("../helpers/validator.php");

// if request method is get
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    # Get the data from the database
    $data = [
        "date" => "",
        "time" => "",
        "physician" => ""
    ];
    if (isset($_SESSION['user'])) {
        $email = $_SESSION['user']['email'];
    }

    # check if a medical card is available and send it to the frontend
    $checkStmt = $conn->prepare("SELECT PatientID FROM patient WHERE email= ? ");
    $checkStmt->bind_param(
        "s",
        $email
    );
    $checkStmt->execute();
    $checkStmt->store_result();

    $patientID = -1;
    if ($checkStmt->num_rows > 0) {
        $checkStmt->bind_result(
            $patientID
        );

        $checkStmt->fetch();
        $checkStmt->close();

        # check if a medical card is available and send it to the frontend
        $getStmt = $conn->prepare("SELECT AppointmentDate, StaffID, AppointmentTime FROM appointment WHERE patientID= ? ");
        $getStmt->bind_param(
            "i",
            $patientID
        );
        $getStmt->execute();
        $getStmt->store_result();

        $staffID = -1;
        if ($getStmt->num_rows > 0) {
            $getStmt->bind_result(
                $data["date"],
                $staffID,
                $data["time"]
            );

            $getStmt->fetch();
            $getStmt->close();

        }

        # Get the staff name from the database
        $getStmt = $conn->prepare("SELECT StaffName FROM staff WHERE staffID= ? ");
        $getStmt->bind_param(
            "i",
            $staffID
        );
        $getStmt->execute();
        $getStmt->store_result();

        if ($getStmt->num_rows > 0) {
            $getStmt->bind_result(
                $data["physician"]
            );

            $getStmt->fetch();
            $getStmt->close();
        }

        # send the data to the front end
        echo json_encode([
            "success" => true,
            "content" => $data
        ]);
        $conn->close();
        exit;

    } else {
        echo json_encode([
            "success" => false,
            "error" => "Can't complete the request"
        ]);
        $conn->close();
        exit;
    }
}

?>