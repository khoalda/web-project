<?php
require_once "../../config/Database.php";

class RatingModel extends Database {
    private $dbTable = 'rating';

    public function create($data) {
        $comment = isset($data->comment) ? $data->comment : NULL ;
        $star = $data->star;
        $aId = get_current_aId();
        $pId = $data->pId;

        $query0 = "SELECT * FROM $this->dbTable WHERE aId = ? AND pId = ?";
        $stmt0 = $this->conn->prepare($query0);
        $stmt0->bind_param("ii", $aId, $pId);
        $stmt0->execute();
        $result0 = $stmt0->get_result();
        $count0 = $result0->num_rows;
        if($count0 >= 1) return array('status'=>false, 'message'=>'You have already rated this product'); 

        $query = "INSERT INTO $this->dbTable (comment, star, aId, pId) VALUES (?, ?, ?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("siii", $comment, $star, $aId, $pId);
        // return $stmt->execute();
        return array('status'=>$stmt->execute(), 'message'=>'Error system'); 

    }
    public function update($data) {
        $rId = $data->rId;
        $comment = isset($data->comment) ? $data->comment : NULL ;
        $star = $data->star;
        $aId = get_current_aId();

        $query0 = "SELECT * FROM $this->dbTable WHERE rId = ?";
        $stmt0 = $this->conn->prepare($query0);
        $stmt0->bind_param("i", $rId);
        $stmt0->execute();
        $result0 = $stmt0->get_result();
        $count0 = $result0->num_rows;
        if($count0 != 1) return array('status'=>false, 'message'=>'Invalid rId field');

        $row0 = $result0->fetch_assoc();
        if($row0['aId'] != $aId) return array('status'=>false, 'message'=>"You don't have the right to modify other people's rating"); 

        $query = "UPDATE $this->dbTable 
        SET comment = ?, star = ?
        WHERE rId = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("sii", $comment, $star, $rId);
        // return $stmt->execute();
        return array('status'=>$stmt->execute(), 'message'=>"Error system"); 
    }
    public function readAll() {
        $query = "SELECT * FROM $this->dbTable";
        $stmt = mysqli_query($this->conn, $query);
        $dataResult = array();
        // if (mysqli_num_rows($stmt) == 0) return array("status"=>false,"message"=>"Empty database","data"=>NULL);
        while($row = mysqli_fetch_assoc($stmt)) {
            $dataResult[] = $row;
        }
        return array("status"=>True,"message"=>"Successful","data"=>$dataResult);
    }
    public function readForProduct($pId) {
        $query = "SELECT * FROM $this->dbTable WHERE pId = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $pId);
        $stmt->execute();
        $result = $stmt->get_result();
        $count = $result->num_rows;
        $dataResult = array();
        $sumStar = 0;
        while($row = $result->fetch_assoc()) {
            $dataResult[] = $row;
            $sumStar += $row['star'];
        }
        $averageStar = $sumStar / $count;
        return array('ratings'=>$dataResult, 'averageStar'=>$averageStar);
    }
    public function deleteOne($rId) {
        $query0 = "SELECT aId FROM $this->dbTable WHERE rId = ?";
        $stmt0 = $this->conn->prepare($query0);
        $stmt0->bind_param("i", $rId);
        $stmt0->execute();
        $result0 = $stmt0->get_result();
        $count0 = $result0->num_rows; 
        if($count0 != 1) return array('status'=>false, 'message'=>'Invalid rId field');
        $row0 = $result0->fetch_assoc();
        if(get_current_aId() != $row0['aId'] && (!is_admin())) return array('status'=>false, 'message'=>"You don't have the right to delete other people's rating");
        
        $query = "DELETE FROM $this->dbTable WHERE rId = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $rId);
        return array('status'=>$stmt->execute(), 'message'=>'Error system');
        
    }
}
?>