<?php
session_start();

// Check if the user is logged in
if(!isset($_SESSION["user_id"])) {
  header("Location: index.html"); // Redirect to home page if not logged in
  exit;
}

// Display user information and a logout button
echo "<h1>Welcome, " . $_SESSION["username"] . "!</h1>";
echo "<a href='logout.php'>Logout</a>"; 

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


$user_id = $_SESSION["user_id"];

// SQL query to fetch cart items for the logged-in user
$sql = "SELECT c.quantity, p.* 
        FROM cart c
        JOIN products p ON c.product_id = p.id
        WHERE c.user_id = '$user_id'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  echo "<h2>Your Cart</h2>";
  echo "<ul>";
  while($row = $result->fetch_assoc()) {
    echo "<li>";
    echo $row["title"] . " x " . $row["quantity"]; 
    // ... add more product details, price, etc. ...
    echo "</li>";
  }
  echo "</ul>";
} else {
  echo "<p>Your cart is empty.</p>";
}

// Close the database connection
$conn->close(); 
?>