<?php
class Posts{

    // database connection and table name
    private $conn;
    private $table_name = "posts";

    // object properties
    public $id;
    public $title;
    public $description;
    public $author;
    public $date_created;

    public function __construct($db){
        $this->conn = $db;
    }

    public function create() {
        try{

            // insert query
            $query = "INSERT INTO " . $this->table_name . "
                SET title=:title, description=:description, author=:author";

            // prepare query for execution
            $stmt = $this->conn->prepare($query);

            // sanitize
            $title=htmlspecialchars(strip_tags($this->title));
            $description=htmlspecialchars(strip_tags($this->description));
            $author=htmlspecialchars(strip_tags($this->author));

            // bind the parameters
            $stmt->bindParam(':title', $title);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':author', $author);

            if($stmt->execute()) {
                return true;
            }else{
                return false;
            }

        }
        // show error if any
        catch(PDOException $exception){
            die('ERROR: ' . $exception->getMessage());
        }
    }

    public function readAll(){

        //select all data
        $query = "SELECT p.id, p.title, p.description, p.date_created, a.name as author_name
                    FROM " . $this->table_name . " p
                    LEFT JOIN authors a ON p.author=a.id
                    ORDER BY id DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $results=$stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($results);
    }

    public function readOne(){

        // select one record
        $query = "SELECT p.id, p.title, p.description, p.date_created, a.name as author_name, a.id as author_id
                  FROM " . $this->table_name . " p
                  LEFT JOIN authors a ON p.author = a.id
                  WHERE p.id=:id";

        //prepare query for excecution
        $stmt = $this->conn->prepare($query);

        $id=htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        $results=$stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($results);
    }

    public function update(){

        $query = "UPDATE " . $this->table_name . "
                SET title=:title, description=:description, author=:author
                WHERE id=:id";

        //prepare query for excecution
        $stmt = $this->conn->prepare($query);

        // sanitize
        $title=htmlspecialchars(strip_tags($this->title));
        $description=htmlspecialchars(strip_tags($this->description));
        $author=htmlspecialchars(strip_tags($this->author_id));
        $id=htmlspecialchars(strip_tags($this->id));

        // bind the parameters
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':author', $author);
        $stmt->bindParam(':id', $id);

        // execute the query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    }

    // delete selected products
    public function delete($ins){

        // query to delete multiple records
        $query = "DELETE FROM ".$this->table_name." WHERE id IN (:ins)";

        $stmt = $this->conn->prepare($query);

        // sanitize
        $ins=htmlspecialchars(strip_tags($ins));

        // bind the parameter
        $stmt->bindParam(':ins', $ins);

        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    }
}