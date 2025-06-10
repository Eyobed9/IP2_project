<?php
require "../config/headers.php";
require "../config/database.php";
include_once ("../helpers/validator.php");

// if request method is post
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    # get the data from the form
    $data = json_decode($_POST['user_data'], true);

    # check the user data for errors
    if (
        !empty($data['department']) || !empty($data['bloodType'])
        || !empty($data['gender']) || !empty($data['birthdate']) || !empty($data['phone'])
    ) {
        $department = htmlspecialchars($data['department']);
        $phone = htmlspecialchars($data['phone']);
        $birthdate = htmlspecialchars($data['birthdate']);
        $gender = htmlspecialchars($data['gender']);
        $bloodType = htmlspecialchars($data['bloodType']);

        # add the data to the database
        $email = "";
        if (isset($_SESSION['user'])) {
            $email = $_SESSION['user']['email'];
        }
        
        $addStmt = $conn->prepare("UPDATE patient SET department=?, phone=?, DateofBirth=?, gender=?, bloodType=? WHERE email=?");
        $addStmt->bind_param("ssssss", $department, $phone, $birthdate, $gender, $bloodType, $email);

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