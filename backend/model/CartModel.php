<?php
require_once "../../config/Database.php";
// require_once '../../config/Role.php';
class CartModel extends Database{
    private $table = 'cart';
    public function update($data) {
        $username = get_current_username();
        $productId = isset($data->productId) ? $data->productId : die("Error data");
        $count = isset($data->count) ? $data->count : null;

        $query = "SELECT aId FROM account WHERE username = ?;";
            
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("s", $username);
        // $pId = $data->pId;
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        if(!$row) die("Error database");
        else {
            echo $row['aId'];
        }
    }
}
?>