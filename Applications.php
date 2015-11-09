 
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title></title>
    </head>
    <body>
        <p>
       <?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
//$servername = "us-cdbr-azure-east-a.cloudapp.net";
//$username = "bfeb7e31e89ee0";
//$password = "85679ca6";
//$dbName = "as_93ca2a486ed92ff";

$first = $_POST['first_name'];
$last = $_POST['last_name'];
$email = $_POST['email'];
$tele = $_POST['telephone'];
$comments = $_POST['comments'];

if (!isset($_POST['first'])) {
    
}

// Create connection
$sql = new PDO('mysql:host=us-cdbr-azure-east-a.cloudapp.net;dbname=as_93ca2a486ed92ff;charset=utf8', 'bfeb7e31e89ee0', '85679ca6');
$sql->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$sql->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$sql->setAttribute(PDO::ATTR_PERSISTENT, false);


echo "<br/>";

$query = $sql->prepare('INSERT into applications (First, Last, Email, Telephone, Comments) VALUES (?, ?, ?, ?, ?)');
$query->execute(array($first, $last, $email, $tele, $comments));


$query = $sql->prepare('SELECT * FROM applications');
$query->execute();

$result = $query->fetchAll();

print_r($result);

//$conn = new mysqli_connect('us-cdbr-azure-east-a.cloudapp.net', 'bfeb7e31e89ee0', '85679ca6');
//echo($conn);
// Check connection
//if (!$conn) {
// echo('Connection failed: ' . mysql_error());
//}
// echo('Connected successfully'); 

//$first = $_POST['first_name'];
//$last = $_POST['last_name'];
//$email = $_POST['email'];
//$tele = $_POST['telephone'];
//$comments = $_POST['comments'];

//$sql = "INSERT into as_93ca2a486ed92ff.applications (First, Last, Email, Telephone, Comments) VALUES ('$first', '$last', '$email', '$tele', '$comments');";
/*if (mysql_query($sql, $conn)) {
    echo("New record created successfully") ;
} else {
    echo("Error: " . $sql . "<br>" . mysql_error($conn)) ;
}
*/
//mysql_close($conn);
?>
            </p>
    </body>
</html>
