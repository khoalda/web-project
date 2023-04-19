<?php
require_once "../../config/Database.php";
// require_once '../../config/Role.php';
class ProductModel extends Database{
    private $table = 'product';
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
    public function readOne($pId) {
        $productTB = 'product';
        $categoryTB = 'category';
        $query = "SELECT pId, P.name, price, description, image, C.name AS Cname 
        FROM $productTB P, $categoryTB C
        WHERE P.categoryId = C.cId AND P.pId ='$pId';";
        $stmt = mysqli_query($this->conn, $query);
        if (mysqli_num_rows($stmt) == 1) return array("status"=>true, "message"=>"Successful", "data"=>mysqli_fetch_assoc($stmt));
        else
        {
            return array("status"=>false, "message"=>"Invalid pId", "data"=>"");
        }
    }
    public function readAll() {
        $productTB = 'product';
        $categoryTB = 'category';
        $query = "SELECT pId, P.name, price, description, image, C.name AS Cname 
        FROM $productTB P, $categoryTB C
        WHERE P.categoryId = C.cId;";
        $stmt = mysqli_query($this->conn, $query);
        $dataResult = array();
        if (mysqli_num_rows($stmt) == 0) return array("status"=>false, "message"=>"Empty database", "data"=>"");
        while($row = mysqli_fetch_assoc($stmt)) {
            $dataResult[] = $row;
        }
        return array("status"=>true, "message"=>"Successful", "data"=>$dataResult);

    }
    public function deleteOne($pId) {
        $productTB = 'product';
        // $query0 = "SELECT pId FROM $productTB;"
        // $stmt0 = mysqli_query($this->conn, $query);
        $query = "DELETE FROM $productTB WHERE pId = ?;";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("s", $pId);
        $result = $stmt->execute();
        if($result) return true;
        else return false;
    }
    public function update($data) {
        $productTB = 'product';
        $query = "SELECT * FROM $productTB WHERE pId = ?";
        $conn = $this->conn;

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $data->pId);
        // $pId = $data->pId;
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();

        if (!$row) {
            return array("status"=>false,'message'=>'Invalid pId');
        }
        else {
            $query ="UPDATE $this->table
            SET name = ?, price = ?, description = ?, image = ?, categoryId = ?
            WHERE pId = ?;";
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("sissii", $data->name,$data->price,$data->description,$data->image,$data->categoryId,$data->pId);
            if ($stmt->execute()) {
                return array("status"=>true,'message'=>'Successful');
            }
            else {
                return array("status"=>false,'message'=>'Query error');
            }
        }
    }
}
?>