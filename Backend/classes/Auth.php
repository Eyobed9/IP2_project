<?php
class Auth
{
    private $conn;

    public function __construct($dbConn)
    {
        $this->conn = $dbConn;
    }

    public function signin($email, $password)
    {
        $password_hash = "";
        $role = "";

        // First check the staff table
        $checkStmt = $this->conn->prepare("SELECT password, StaffPosition FROM staff WHERE email= ?");
        $checkStmt->bind_param("s", $email);
        $checkStmt->execute();
        $checkStmt->store_result();

        if ($checkStmt->num_rows > 0) {
            $checkStmt->bind_result($password_hash, $role);
            $checkStmt->fetch();
        } else {
            $checkStmt->close();
            $checkStmt = $this->conn->prepare("SELECT password FROM Patient WHERE email= ?");
            $checkStmt->bind_param("s", $email);
            $checkStmt->execute();
            $checkStmt->store_result();

            if ($checkStmt->num_rows > 0) {
                $checkStmt->bind_result($password_hash);
                $checkStmt->fetch();
                $role = 'Patient';
            }
        }

        if ($password_hash && password_verify($password, $password_hash)) {
            $_SESSION['user'] = [
                'email' => $email,
                'role' => $role,
            ];
            $checkStmt->close();
            return [
                'success' => true,
                'message' => 'Login successful',
                'role' => $role
            ];
        } else {
            $checkStmt->close();
            return [
                "success" => false,
                "message" => "Invalid credentials",
            ];
        }
    }
}
?>