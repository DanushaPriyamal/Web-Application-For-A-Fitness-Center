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

$mysql = "CREATE TABLE IF NOT EXISTS queriesTable(
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Full_name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Queries TEXT NOT NULL,
    Reply TEXT NOT NULL
)";
if ($conn->query($mysql) !== TRUE) {
    die("queriesTable creativity issue" . $conn->error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullName = trim($_POST["name"]);
    $email = $_POST["email"];
    $queries = $_POST["queries"];

    $stmt = $conn->prepare("SELECT Full_name FROM createUserAccount WHERE Email=?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows == 1) {
        $stmt->bind_result($name);
        $stmt->fetch();
        if ($fullName == $name) {
            $stmtInsert = $conn->prepare("INSERT INTO queriesTable (Full_Name,Email,Queries) VALUES (?,?,?)");
            $stmtInsert->bind_param("sss", $fullName, $email, $queries);
            if ($stmtInsert->execute()) {
                echo "Submitted successfully";
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