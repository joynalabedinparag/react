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

    $ins="";
    foreach($_POST['del_ids'] as $id){
        $ins.="{$id},";
    }

    $ins=trim($ins, ",");

    // delete the product
    echo $post->delete($ins) ? "true" : "false";
}
?>