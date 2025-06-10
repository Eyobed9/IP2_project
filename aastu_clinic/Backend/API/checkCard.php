<?php
require "../config/headers.php";
require "../config/database.php";
include_once ("../helpers/validator.php");

// if request method is get
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    # Get the data from the database
    $email = "";
    $gender = "";
    if (isset($_SESSION['user'])) {
        $email = $_SESSION['user']['email'];
    }

    # check if a medical card is available and send it to the frontend
    $checkStmt = $conn->prepare("SELECT Gender From Patient WHERE email= ? ");
    $checkStmt->bind_param("s", $email);
    $checkStmt->execute();
    $checkStmt->store_result();


    if ($checkStmt->num_rows > 0) {
        $checkStmt->bind_result($gender);
        $checkStmt->fetch();
        $checkStmt->close();

        if ($gender != NULL) {
            echo json_encode([
                "success" => true,
            ]);
            $conn->close();
            exit;
        }
    }
    echo json_encode([
        "success" => false,
    ]);
    $conn->close();
    exit;
}
?>