<?php
// include core configuration
include_once '../config/core.php';

// include database connection
include_once '../config/database.php';

// product object
include_once '../objects/posts.php';

// class instance
$database = new Database();
$db = $database->getConnection();
$posts = new Posts($db);

// read all products
$results=$posts->readAll();

// output in json format
echo $results;
?>