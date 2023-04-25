<?php
require_once "../../config/Database.php";
// require_once '../../config/Role.php';

function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[random_int(0, $charactersLength - 1)];
    }
    return $randomString;
}

class CartModel extends Database{
    private $table = 'rating';
    public function getRating($productId) {      
        $query = "SELECT `rId`, `comment`, `star`, `aId` FROM `rating` WHERE `pId` = ?;";
            
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("s", $productId);
        // $pId = $data->pId;
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        if(!$row) die("Error database");
        else {
            echo $row;
        }
    }

    public function addRating($comment, $star, $productId) {
        $newRatingID = "";
        $isUnique = false;
        do {
            $newRatingID = generateRandomString(16);
        } while ($isUnique);
    }
}
?>