 
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title></title>
    </head>
    <body>
       <?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

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

?>
 <script type="text/javascript">
   function closepopup()
   {
         window.close ();
   }
</script>
   <h1>Thank You!</h1>
   <h4>Thank you for your application submission! We look forward to contacting you about our Computer Science Program at Cleveland State University.</h4>
   <h4>Click <a href="javascript: closepopup()">here</a> to return to our Computer Science homepage.</h4>
    </body>
</html>
