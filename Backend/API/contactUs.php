<?php
require_once "../config/headers.php";
require_once "../helpers/PHPMailerHelper.php";

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    $name = trim($data['name'] ?? '');
    $email = trim($data['email'] ?? '');
    $message = trim($data['message'] ?? '');

    if (!$name || !$email || !$message) {
        echo json_encode([
            "success" => false,
            "error" => "All fields are required."
        ]);
        exit;
    }

    $to = "eyobedteshome@gmail.com";
    $subject = "Contact Us Message from $name";
    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";

    $result = PHPMailerHelper::sendMail($to, $subject, $body, $email, $name);

    echo json_encode($result);
    exit;
} else {
    echo json_encode([
        "success" => false,
        "error" => "Invalid request method."
    ]);
    exit;
}
?>