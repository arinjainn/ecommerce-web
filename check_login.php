<?php
session_start();

// Check if the user is logged in
if (isset($_SESSION["user_id"])) {
  // User is logged in
  $response = array("isLoggedIn" => true, "username" => $_SESSION["username"]);
} else {
  // User is not logged in
  $response = array("isLoggedIn" => false);
}

// Send the response as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>