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

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST["queryID"];
    $reply = $_POST["reply"];

    $stmt = $conn->prepare("UPDATE queriestable SET reply = ? WHERE id = ?");
    $stmt->bind_param("si", $reply, $id);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo "Reply updated successfully!";
    } else {
        echo "No matching record found or reply already set";
    }

    $stmt->close();


}

$conn->close();

?>