<?php
// Database connection details
$servername = "localhost";
$username = "root"; // Replace with your actual MySQL username
$password = ""; // Replace with your actual MySQL password
$dbname = "ecommerce_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Start the session
session_start();

// Check if the user is already logged in
if(isset($_SESSION["user_id"])) {
  header("Location: account.php"); // Redirect to account page if logged in
  exit;
}

// Get user input from the login form
$username = $_POST["username"];
$password = $_POST["password"];

// Prepare and execute SQL query to fetch user data
$sql = "SELECT * FROM users WHERE username='$username'"; 
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  $row = $result->fetch_assoc();
  // Verify password
  if (password_verify($password, $row["password"])) {
    // Set session variables
    $_SESSION["user_id"] = $row["user_id"];
    $_SESSION["username"] = $row["username"];

    // Redirect to account page after successful login
    echo "success"; 
    exit;
  } else {
    echo "Invalid password.";
  }
} else {
  echo "Invalid username.";
}

$conn->close();
?>