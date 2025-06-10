<?php
class Appointment
{
    private $conn;

    public function __construct($dbConn)
    {
        $this->conn = $dbConn;
    }

    public function schedule($date, $physician, $time, $email)
    {
        // Get staff ID
        $staffID = null;
        $stmt = $this->conn->prepare("SELECT StaffID FROM staff WHERE StaffName = ?");
        $stmt->bind_param("s", $physician);
        $stmt->execute();
        $stmt->store_result();
        if ($stmt->num_rows > 0) {
            $stmt->bind_result($staffID);
            $stmt->fetch();
        }
        $stmt->close();

        // Get patient ID
        $patientID = null;
        $stmt = $this->conn->prepare("SELECT patientID FROM patient WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();
        if ($stmt->num_rows > 0) {
            $stmt->bind_result($patientID);
            $stmt->fetch();
        }
        $stmt->close();

        if (!$staffID || !$patientID) {
            return [
                "success" => false,
                "error" => "Invalid staff or patient."
            ];
        }

        // Check if appointment exists
        $stmt = $this->conn->prepare("SELECT patientID FROM appointment WHERE patientID = ?");
        $stmt->bind_param("s", $patientID);
        $stmt->execute();
        $stmt->store_result();

        $executed = true;
        if ($stmt->num_rows > 0) {
            $stmt->close();
            $stmt = $this->conn->prepare("UPDATE appointment SET AppointmentDate = ?, StaffID = ?, AppointmentTime = ? WHERE patientID = ?");
            $stmt->bind_param("sisi", $date, $staffID, $time, $patientID);
            $executed = $stmt->execute();
        } else {
            $stmt->close();
            $stmt = $this->conn->prepare("INSERT INTO appointment (AppointmentDate, StaffID, patientID, AppointmentTime) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("siis", $date, $staffID, $patientID, $time);
            $executed = $stmt->execute();
        }
        $stmt->close();

        if ($executed) {
            return [
                "message" => "appointment scheduled successfully",
                "date" => $date,
                "time" => $time,
                "physician" => $physician,
                "success" => true
            ];
        } else {
            return [
                "error" => "Can't schedule the appointment",
                "success" => false
            ];
        }
    }
}
?>