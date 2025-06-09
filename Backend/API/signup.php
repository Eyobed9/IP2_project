<?php
include_once("../config/headers.php");
include_once("../config/database.php");
include_once ("../helpers/validator.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userData = json_decode($_POST['user_data'], true);
    $profilePic = $_FILES['profilePic'] ?? null;

    if (!empty($userData['name']) && !empty($userData['email']) && !empty($userData['password']) && !empty($userData['confirmPassword']) && !empty($userData['role']) && !empty($_FILES['profilePic'])) {
        $checkStmt = $conn->prepare("SELECT PatientID FROM Patient WHERE email = ?");
        $checkStmt->bind_param("s", $userData['email']);
        $checkStmt->execute();
        $checkStmt->store_result();

        if ($checkStmt->num_rows > 0) {
            echo json_encode(["error" => "Email already registered"]);
            $checkStmt->close();
            exit;
        }
        $checkStmt->close();

        // Compare the passwords
        if ($userData["password"] !== $userData["confirmPassword"]) {
            echo json_encode(["error" => "Passwords don't match."]);
            exit;
        }

        // Check the password length
        if (strLen($userData["password"]) < 8 || strLen($userData["confirmPassword"]) < 8) {
            echo json_encode(["error" => "Passwords Must be at least 8 characters"]);
            exit;
        }

        // Hash password
        $hashed_password = password_hash($userData['password'], PASSWORD_BCRYPT);

        // Handle profile picture upload
        $profilePicPath = null;
        if ($profilePic && $profilePic['error'] === UPLOAD_ERR_OK) {
            $uploadDir = "../uploads/";
            $profilePicPath = $uploadDir . basename($profilePic['name']);
            move_uploaded_file($profilePic['tmp_name'], $profilePicPath);
        }

        // Insert new user to the table based on the role

        # if the user is a patient
        $role = ucfirst($userData['role']);
        if ($role === 'Patient') {
            $stmt = $conn->prepare("INSERT INTO patient(PatientName, email, password, profilepic) VALUES(?, ?, ?, ?)");
            $stmt->bind_param("ssss", $userData['name'], $userData['email'], $hashed_password, $profilePicPath);
        }

        # If the user is a doctor
        else if ($role === 'Doctor') {
            $stmt = $conn->prepare("INSERT INTO staff(StaffName, email, password, profilepic, StaffPosition) VALUES(?, ?, ?, ?, ?)");
            $stmt->bind_param("sssss", $userData['name'], $userData['email'], $hashed_password, $profilePicPath, $userData['role']);
        }

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "role" => $role]);
            exit();
        } else {
            echo json_encode(["error" => "Error: " . $stmt->error]);
        }
        $stmt->close();
    } else {
        echo json_encode(["error" => "All fields are required"]);
    }
}

$conn->close();
?>