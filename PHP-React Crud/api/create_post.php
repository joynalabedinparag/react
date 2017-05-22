<?php
// if the form was submitted
if($_POST){
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

    // set product property values
    $posts->title = $_POST['title'];
    $posts->description = $_POST['description'];
    $posts->author = $_POST['author_id'];

    // create the product
    echo $posts->create() ? "true" : "false";
}
?>