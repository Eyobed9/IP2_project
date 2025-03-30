<?php
require "connection.php";
session_start();

$_SESSION['errors'] = []; // Clear previous errors
$_SESSION['username'] = "";
$_SESSION['role'] = "";

# Get the user data from the form

// Check the required values
if (isset($_POST['username']) && !empty(trim($_POST['username'])))
    $username = htmlspecialchars(trim($_POST['username']));
else
    $_SESSION['errors']['username'] = "Username is required";

if (isset($_POST['email']) && !empty(trim($_POST['email'])))
    $email = htmlspecialchars(trim($_POST['email']));
else
    $_SESSION['errors']['email'] = "Email is required";

if (isset($_POST['password'], $_POST['confPassword']) && !empty(trim($_POST['password'])) && !empty(trim($_POST['confPassword']))) {
    $password = htmlspecialchars(trim($_POST['password']));
    $confPassword = htmlspecialchars(trim($_POST['confPassword']));
} else
    $_SESSION['errors']['password'] = "Password is required";

if (isset($_POST['role']) && !empty(trim($_POST['role'])))
    $role = htmlspecialchars(trim($_POST['role']));
else
    $_SESSION['errors']['role'] = "Role is required";

// Check the password and the confirmation
if (isset($password, $confPassword) && $password !== $confPassword)
    $_SESSION['errors']['password'] = "Password doesn't match";

// hash the password
$hashedPassword = password_hash($password, PASSWORD_BCRYPT, ['cost' => 10]);

// Check the email
if (!filter_var($email, FILTER_VALIDATE_EMAIL))
    $_SESSION['errors']['email'] = "Invalid email";

// check also that if the email exists in the database
$sql = "SELECT email FROM User WHERE email = ?";
$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->bind_param("s", $email);

    // Execute
    if ($stmt->execute()) {
        $stmt->store_result();
        if ($stmt->num_rows > 0) {
            $_SESSION['errors']['email'] = "Email already exists";
            header("Location: ../frontend/pages/register.php"); // Redirect back to the form
            exit(); // Stop further execution
        }
    } else
        echo "Error";

    $stmt->close();
}

// check also that if the email exists in the database
$sql = "SELECT username FROM User WHERE username = ?";
$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->bind_param("s", $username);

    // Execute
    if ($stmt->execute()) {
        $stmt->store_result();
        if ($stmt->num_rows > 0) {
            $_SESSION['errors']['username'] = "Username already exists";
            header("Location: ../frontend/pages/register.php"); // Redirect back to the form
            exit(); // Stop further execution
        }
    } else
        echo "Error";

    $stmt->close();
}

// Upload the image in the uploads directory
if (isset($_FILES['image']) && $_FILES['image']['tmp_name']) {
    $profilePic = $_FILES['image']['tmp_name'];
    $targetFile = 'uploads/' . $_FILES['image']['name'];

    if (!move_uploaded_file($profilePic, $targetFile))
        $_SESSION['errors']['picture'] = "Failed to upload image";
} else {
    $_SESSION['errors']['picture'] = "Profile picture is required";
}

// If there are errors, redirect back to the form
if (!empty($_SESSION['errors'])) {
    header("Location: ../frontend/pages/register.php");
    exit();
}

// Insert the data to the database
$sql = "INSERT INTO User (username, password, email, role, profilepic) VALUES (?,?,?,?,?)";
$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->bind_param("sssss", $username, $hashedPassword, $email, $role, $targetFile);

    // Execute
    if ($stmt->execute()){
        $_SESSION['username'] = $username;
        $_SESSION['role'] = $role;

        // redirect
        header("Location: ../frontend/pages/dashboard.php");
        exit();}
    else
        echo "Error";
    $stmt->close();
}

$conn->close(); // Close the connection
?>