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
$post = new Posts($db);

// read all products
$post->id = $_POST['prod_id'];
$results = $post->readOne();

// output in json format
echo $results;
?>