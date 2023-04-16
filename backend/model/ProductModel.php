<?php
require_once "../../config/Database.php";
require_once '../../config/Role.php';
class ProductModel extends Database{
    private $pId;
    private $name;
    private $price;
    private $description;
    private $image;
    private $categoryId;
    public function create($data) {
        $this->name = $data->name;
        $this->price = $data->price;
        $this->description = $data->description;
        $this->image = $data->image;
        $this->categoryId = $data->categoryId;
        $query = "INSERT INTO product(name, price, description, image, categoryId) VALUES (?,?,?,?,?);";
        // Tạo đối tượng repared
        $stmt = $this->conn->prepare($query);
        // Gán giá trị vào các tham số ẩn
        $stmt->bind_param("sssss", $this->name, $this->price, $this->description, $this->image, $this->categoryId);
        $result = $stmt->execute();
        return $result;
    }
}
?>