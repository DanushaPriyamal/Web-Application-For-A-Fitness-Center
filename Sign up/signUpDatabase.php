<?php

$serverName = "localhost";
$username = "root";
$password = "";
$dbName = "Fitzone_Fitness_center_DB";

$conn = new mysqli($serverName, $username, $password);

if ($conn->connect_error) {
    die("Sorry, there is a database connectivity issue. Please try again later" . $conn->connect_error);
}

$mysql = "CREATE DATABASE IF NOT EXISTS $dbName";
if ($conn->query($mysql) !== TRUE) {
    die("Database creativity issue" . $conn->error);
}

$conn->select_db($dbName);

$mysql = "CREATE TABLE IF NOT EXISTS createUserAccount(
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Full_name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Mobile_Number VARCHAR(9) NOT NULL,
    Date_of_birth DATE NOT NULL,
    Place_of_residence VARCHAR(22) NOT NULL,
    Address TEXT NOT NULL,
    Gender VARCHAR(6) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Confirm_password VARCHAR(255) NOT NULL
)";
if ($conn->query($mysql) !== TRUE) {
    die("createUserAccount creativity issue" . $conn->error);
}

$errors = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullName = trim($_POST["name"]);
    $email = $_POST["email"];
    $mobileNumber = $_POST["mobileNumber"];
    $dateOfBirth = $_POST["dateOfBirth"] ?? "";
    $placeOfResidence = $_POST["placeOfResidence"];
    $address = $_POST["address"];
    $gender = $_POST["gender"];
    $password = $_POST["password"];
    $confirm_password = $_POST["confirm-password"];

    $stmt = $conn->prepare("SELECT ID FROM createUserAccount WHERE EMAIL=?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $errors[] = "This email already exists. Please enter another email.";
    }

    $stmt->close();

    if (empty($errors)) {
        $stmt = $conn->prepare("INSERT INTO createUserAccount (Full_Name,Email,Mobile_Number,Date_of_birth,Place_of_residence,Address,Gender,Password,Confirm_password) VALUES (?,?,?,?,?,?,?,?,?)");
        $stmt->bind_param("sssssssss", $fullName, $email, $mobileNumber, $dateOfBirth, $placeOfResidence, $address, $gender, $password, $confirm_password);

        if ($stmt->execute()) {
            echo "User Account created successfully!";
        } else {
            echo "Error : " . $stmt->error;
        }

        $stmt->close();
    } else {
        foreach ($errors as $error) {
            echo $error;
        }
    }


}

$conn->close();
?>