<?php
// include core configuration
include_once '../config/core.php';

// include database connection
include_once '../config/database.php';

// product object
include_once '../objects/author.php';

// class instance
$database = new Database();
$db = $database->getConnection();
$author = new Author($db);

// read all products
$results = $author->readAll();

// output in json format
echo $results;
?>