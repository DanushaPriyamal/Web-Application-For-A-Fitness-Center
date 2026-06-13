<?php
header("Content-Type: text/plain");

$serverName = "localhost";
$username = "root";
$password = "";
$dbname = "Fitzone_Fitness_center_DB";

$conn = new mysqli($serverName, $username, $password);

if ($conn->connect_error) {
    die("Sorry, there is a database connectivity issue. Please try again later" . $conn->connect_error);
}

$conn->select_db("$dbname");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];

    if ($email == "ffc@gmail.com" && $password == "123") {
        echo "Sign in successfully as an admin or a gym management staff member";
    } else {
        $stmt = $conn->prepare("SELECT Password FROM createUserAccount WHERE Email=?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();
        if ($stmt->num_rows == 1) {
            $stmt->bind_result($dbPassword);
            $stmt->fetch();
            if ($password == $dbPassword) {
                echo "Sign in successfully!";
            } else {
                echo "Password is incorrect";
            }
        } else {
            echo "Email doesn't exist";
        }
        $stmt->close();
    }
}

$conn->close();
?>