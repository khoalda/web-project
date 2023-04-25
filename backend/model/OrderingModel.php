<?php
require_once "../../config/Database.php";

class OrderingModel extends Database {
    private $dbTable = 'ordering';
    private $oderAccTable = 'orderaccount';
    private $oderProTable = 'orderproduct';
    public function create($data, $products) {
        $name = $data->name;
        $address = $data->address;
        $phoneNumber = $data->phoneNumber;
        $statusId = 1; // waiting
        // $products = $data->products;
                                                    //oId, time, name, address, phoneNumber, statusId
        $query = "INSERT INTO $this->dbTable VALUES(NULL,NOW(), ?, ?, ?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("sssi", $name, $address, $phoneNumber, $statusId);
        $stmt->execute();
        if(!$stmt->execute()) return array('status'=>false,'message'=>'Error system 1');

        $query2 = "SELECT max(oId) FROM $this->dbTable as ooId";
        $stmt2 = mysqli_query($this->conn, $query2);
        if(!$stmt2) return array('status'=>false,'message'=>'Error system 2');
        $row2 = mysqli_fetch_assoc($stmt2);
        $oId = $row2['max(oId)'];

        $curr_aId = get_current_aId();
        $query3 = "INSERT INTO $this->oderAccTable VALUES('$oId', $curr_aId)";
        $stmt3 = mysqli_query($this->conn, $query3);
        if(!$stmt3) return array('status'=>false,'message'=>'Error system');

        $query4 = "INSERT INTO $this->oderProTable (oId,pId,count) VALUES(?, ?, ?)";
        $stmt4 = $this->conn->prepare($query4);
        foreach ($products as $ele) {
            // echo $oId."\n";
            // echo $ele['pId']."\n";
            // echo $ele['quantity']."\n";
            $stmt4->bind_param("sii", $oId, $ele['pId'], $ele['quantity']);
            // $stmt4->execute();
            if(!$stmt4->execute())  return array('status'=>false,'message'=>'Error system 3');
        }
        return array('status'=>true,'message'=>'');
    }
    
    public function updateStatus($oId,$statusId) {
        $query = "SELECT aId FROM $this->oderAccTable WHERE oId = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("s", $oId);
        $stmt->execute();
        $result = $stmt->get_result();
        $count = $result->num_rows;
        if($count != 1) return array("status"=>false, "message"=>"Error system 1");
        $row = $result->fetch_assoc();
        if($row['aId'] != get_current_aId() and !is_admin()) {
            die("You don't have the right to modify other people's ordering");
        }
        
        $query2 = "SELECT statusId FROM $this->dbTable WHERE oId = ?";
        $stmt2 = $this->conn->prepare($query2);
        $stmt2->bind_param("s", $oId);
        $stmt2->execute();
        $result2 = $stmt2->get_result();
        $count2 = $result2->num_rows;
        if($count2 != 1) return array("status"=>false, "message"=>"Error system 2");
        $row2 = $result2->fetch_assoc();
        if($row2['statusId'] == $statusId) return array("status"=>false, "message"=>"Error system 3");

        $query3 = "UPDATE $this->dbTable
        SET statusId = ?
        WHERE oId = ?";
        $stmt3 = $this->conn->prepare($query3);
        $stmt3->bind_param("is", $statusId, $oId);
        if($stmt3->execute()) return array("status"=>true, "message"=>"");
        else return array("status"=>false, "message"=>"Error system 4");
        
    }
}
?>