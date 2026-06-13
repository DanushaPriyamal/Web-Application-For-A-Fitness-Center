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

$gcrsql = "SELECT ID,Full_Name,Email,Class_catogery,Payment_month,Payment_year,Upload_bank_slip FROM groupclassesregistration";
$groupClassRegistrationsResult = $conn->query($gcrsql);

$dataArray = [];

if ($groupClassRegistrationsResult->num_rows > 0) {
    while ($data = $groupClassRegistrationsResult->fetch_assoc()) {
        $dataArray[] = $data;

    }
}

header('Content-Type: application/json');
echo json_encode($dataArray);
$conn->close();
?>