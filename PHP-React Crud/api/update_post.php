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
    $post = new Posts($db);

    // new values
    $post->title=$_POST['title'];
    $post->description = $_POST['description'];
    $post->author_id = $_POST['author_id'];
    $post->id = $_POST['id'];

    // update the product
    echo $post->update() ? "true" : "false";
}
?>