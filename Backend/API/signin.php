<?php
include_once("../config/headers.php");
include_once("../config/database.php");
include_once("../helpers/validator.php");
require_once __DIR__ . '/../classes/Auth.php';

if ($_SERVER["REQUEST_METHOD"] === 'POST') {
    $data = json_decode($_POST['user_data'], true);
    if (!empty($data['email']) && !empty($data['password'])) {
        $auth = new Auth($conn);
        $result = $auth->signin($data['email'], $data['password']);
        echo json_encode($result);
        exit;
    } else {
        echo json_encode(["error" => "All fields are required"]);
        exit;
    }
}
$conn->close();
?>