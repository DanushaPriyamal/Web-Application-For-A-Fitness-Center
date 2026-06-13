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

$myRegistration = "CREATE TABLE IF NOT EXISTS groupClassesRegistration(
ID INT AUTO_INCREMENT PRIMARY KEY,
Full_name VARCHAR(255) NOT NULL,
Email VARCHAR(255) NOT NULL,
Class_catogery VARCHAR(30) NOT NULL,
Payment_month VARCHAR(15) NOT NULL,
Payment_year VARCHAR(10) NOT NULL,
Upload_bank_slip VARCHAR(255) NOT NULL
)";
if ($conn->query($myRegistration) !== TRUE) {
    die("membershipSignUp creativity issue" . $conn->error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullName = trim($_POST["name"]);
    $email = $_POST["email"];
    $classCategory = $_POST["class-catogery"];
    $paymentMonth = $_POST["payment-month"];
    $paymentYear = $_POST["payment-year"];

    $targetDir = "../Group classes registration/gcr_Images/";
    $filename = basename($_FILES["upload-bank-slip"]["name"]);
    $targetFile = $targetDir . $filename;

    if (!move_uploaded_file($_FILES["upload-bank-slip"]["tmp_name"], $targetFile)) {
        die("Failed to upload bank slip.");
    }


    $stmt = $conn->prepare("SELECT Full_name FROM createUserAccount WHERE Email=?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows == 1) {
        $stmt->bind_result($name);
        $stmt->fetch();
        if ($fullName == $name) {
            $stmtInsert = $conn->prepare("INSERT INTO groupClassesRegistration (Full_Name,Email,Class_catogery,Payment_month,Payment_year,Upload_bank_slip) VALUES (?,?,?,?,?,?)");
            $stmtInsert->bind_param("ssssss", $fullName, $email, $classCategory, $paymentMonth, $paymentYear, $filename);
            if ($stmtInsert->execute()) {
                echo "Group class registration is successful";
            } else {
                echo "Error : " . $stmtInsert->error;
            }
            $stmtInsert->close();
        } else {
            echo "Enter the full name which has used with this email when creating the user account";
        }
    } else {
        echo "Enter an email which was used to create a user account";
    }

    $stmt->close();
}

$conn->close();
?>