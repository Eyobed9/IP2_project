<?php
include_once("../config/headers.php");
include_once("../config/database.php");
include_once("../helpers/validator.php");

if ($_SERVER["REQUEST_METHOD"] === 'POST') {
    $data = json_decode($_POST['user_data'], true);
    if (!empty($data['email']) && !empty($data['password'])) {
        $password_hash = "";
        $role = "";

        // First check the staff table
        $checkStmt = $conn->prepare("SELECT password, StaffPosition From staff WHERE email= ? ");
        $checkStmt->bind_param("s", $data['email']);
        $checkStmt->execute();
        $checkStmt->store_result();



        if ($checkStmt->num_rows > 0) {
            $checkStmt->bind_result($password_hash, $role);
            $checkStmt->fetch();
        }
        // Then check the patient
        else {
            $checkStmt = $conn->prepare("SELECT password From Patient WHERE email= ? ");
            $checkStmt->bind_param("s", $data['email']);
            $checkStmt->execute();
            $checkStmt->store_result();


            if ($checkStmt->num_rows > 0) {
                $checkStmt->bind_result($password_hash);
                $checkStmt->fetch();
                $role = 'Patient';
            }
        }

        if (password_verify($data['password'], $password_hash)) {
            $_SESSION['user'] = [
                'email' => $data['email'],
                'role' => $role,
            ];
            echo json_encode([
                'success' => true,
                'message' => 'Login successful',
                'role' => $role
            ]);
        } else {
            $checkStmt->close();
            echo json_encode([
                "success" => false,
                "message" => "Invalid credentials",
            ]);
            $conn->close();
            exit;
        }
        $checkStmt->close();
    } else {
        echo json_encode(["error" => "All fields are required"]);
    }
}
$conn->close();
?>