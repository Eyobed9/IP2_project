<?php
require "../config/headers.php";
require "../config/database.php";
include_once("../helpers/validator.php");

// if request method is get
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    # Get the data from the database
    $data = [
        "name" => "",
        "department" => "",
        "phone" => "",
        "email" => "",
        "bloodType" => "",
        "age" => "",
        "gender" => "",
        "profilePic" => "",
    ];
    if (isset($_SESSION['user'])) {
        $email = $_SESSION['user']['email'];
    }

    # check if a medical card is available and send it to the frontend
    $checkStmt = $conn->prepare("SELECT PatientName, Department, Phone, email, bloodtype, DateofBirth, Gender, profilepic FROM patient WHERE email= ? ");
    $checkStmt->bind_param(
        "s",
        $email
    );
    $checkStmt->execute();
    $checkStmt->store_result();


    if ($checkStmt->num_rows > 0) {
        $checkStmt->bind_result(
            $data['name'],
            $data['department'],
            $data['phone'],
            $data['email'],
            $data['bloodType'],
            $dateOfBirth,
            $data['gender'],
            $data['profilePic']
        );
      
        $checkStmt->fetch();
        $checkStmt->close();
        
        $from = new DateTime($dateOfBirth);
        $to = new DateTime('today');
        $data['age'] = $from->diff($to)->y;

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