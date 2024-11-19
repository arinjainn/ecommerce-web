<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

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

// Get user input from the signup form
$username = $_POST["username"];
$email = $_POST["email"];
$password = $_POST["password"];

// Basic validation (add more as needed)
if (empty($username) || empty($email) || empty($password)) {
  echo "All fields are required.";
  exit;
}

// Hash the password
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Prepare and execute SQL query to insert user data
$sql = "INSERT INTO users (username, email, password) 
        VALUES ('$username', '$email', '$hashed_password')";

if ($conn->query($sql) === TRUE) {
  // Set session variables after successful signup
  $_SESSION["user_id"] = $conn->insert_id; // Get the ID of the newly inserted user
  $_SESSION["username"] = $username;

  // Redirect to account page
  echo "success";
  exit;
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>