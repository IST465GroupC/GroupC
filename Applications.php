<?php

$servername = "localhost";
$username = "GroupC";
$password = "CSUist465";
$dbName = "groupc";

// Create connection
$conn = new mysql_connect($servername, $username, $password,$dbName);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$first = $_POST['first_name'];
$last = $_POST['last_name'];
$email = $_POST['email'];
$tele = $_POST['telephone'];
$comments = $_POST['comments'];

$sql = "INSERT into groupc.applications (FirstName, LastName, Email, Telephone, Comments) VALUES ('$first', '$last', '$email', '$tele', '$comments')";

mysql_close($conn);

?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title></title>
    </head>
    <body>
        <h1>Thank You!</h1>
        <h4>Thank you for your application submission! We look forward to contacting you about our Computer Science Program at Cleveland State University.</h4>
   <h4>Click <a href="CSU-CS-HOME2.html">here</a> to return to our Computer Science homepage.</h4>
    </body>
</html>
