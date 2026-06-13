<?php
$serverName = "localhost";
$username = "root";
$password = "";
$dbName = "Fitzone_Fitness_center_DB";

$conn = new mysqli($serverName, $username, $password);

if ($conn->connect_error) {
    die("Sorry, there is a database connectivity issue. Please try again later" . $conn->connect_error);
}

$conn->select_db($dbName);

$sql = "SELECT ID,Full_Name,Email,Membership_option,Payment_month,Payment_year,Upload_bank_slip FROM membershipsignup";
$result = $conn->query($sql);

$rows = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;

    }
}

header('Content-Type: application/json');
echo json_encode($rows);
$conn->close();
?>