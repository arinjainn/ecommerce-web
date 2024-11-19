<?php
// Database connection details (same as in signup.php and login.php)
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

// Check if the user is logged in
if (isset($_SESSION["user_id"])) {
  $user_id = $_SESSION["user_id"];

  // Get the product ID from the AJAX request
  $product_id = $_POST["product_id"]; 

  // Check if the product is already in the cart
  $sql = "SELECT * FROM cart 
          WHERE user_id='$user_id' AND product_id='$product_id'";
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
    // Update the quantity
    $sql = "UPDATE cart 
            SET quantity = quantity + 1 
            WHERE user_id='$user_id' AND product_id='$product_id'"; 
    if ($conn->query($sql) === TRUE) {
      echo "Quantity updated!";
    } else {
      echo "Error updating quantity: " . $conn->error; 
    }
  } else {
    // Insert a new cart item
    $sql = "INSERT INTO cart (user_id, product_id, quantity) 
            VALUES ('$user_id', '$product_id', 1)"; 
    if ($conn->query($sql) === TRUE) {
      echo "Added to cart!";
    } else {
      echo "Error adding to cart: " . $conn->error; 
    }
  }

} else {
  echo "Please log in to add to cart."; 
}

$conn->close();
?>