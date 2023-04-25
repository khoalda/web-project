<?php
require_once "../../config/Database.php";
// require_once '../../config/Role.php';

class UserModel extends Database {
    private $dbTable = 'account';
    public function login($data) {
        // $dbTable = 'account';
        $username = $data->username;
        $password = $data->password;
        $query = "SELECT * FROM $this->dbTable WHERE username = '$username';";
        // SELECT * FROM account WHERE username = 'laptrinhweb';

        $query_stmt = mysqli_query($this->conn, $query);

        if(mysqli_num_rows($query_stmt) != 1) return array('status'=>false, 'message'=>'Invalid username', 'data'=>NULL);
        else
        {
            $row = mysqli_fetch_assoc($query_stmt);
            $md5Password = md5($password);
            if ((!password_verify($password, $row['password'])) && ($md5Password != $row['password'])) return array('status'=>false, 'message'=>'Invalid password', 'data'=>NULL);
            else {
                set_logged($username, $row['level'], $row['aId'], $row['status']);
                if($md5Password == $row['password']) {
                    $query2 = "UPDATE $this->dbTable 
                    SET password = ?
                    WHERE username = ?";
                    // Tạo đối tượng repared
                    $stmt2 = $this->conn->prepare($query2);
                    $newPassWordHash = password_hash($password, PASSWORD_DEFAULT);
                    // Gán giá trị vào các tham số ẩn
                    $stmt2->bind_param("ss", $newPassWordHash, $username);
                    $stmt2->execute();
                }
                return array('status'=>true, 'message'=>'', 'data'=>array('aId'=>$row['aId'],'level'=>$row['level']));
            }
        }
    }
    public function logout() {
        set_logout();
        return true;
    }
    public function register($data) {
        $username = $data->username;
        $query0 = "SELECT username FROM $this->dbTable WHERE username = ?";
        // Tạo đối tượng repared
        $stmt0 = $this->conn->prepare($query0);
        // Gán giá trị vào các tham số ẩn
        $stmt0->bind_param("s",$username);
        $stmt0->execute();
        $result0 = $stmt0->get_result();
        $count = $result0->num_rows;
        if($count > 0) {
            return array("status"=>False,"message"=>"Account already exists");
        }

        //$password = md5($data->password);
        $password = password_hash($data->password, PASSWORD_DEFAULT);
        $level = 1;
        $name = $data->name;
        $dateOfBirth = isset($data->dateOfBirth) ? $data->dateOfBirth : NULL;
        $urlAvatar = isset($data->urlAvatar) ? $data->urlAvatar : NULL;
        $phoneNumber = $data->phoneNumber;
        $email = isset($data->email) ? $data->email : NULL;
        $address = isset($data->address) ? $data->address : NULL;
        $status = 1;
        $query = "INSERT INTO $this->dbTable(username, password, level, name, dateOfBirth, urlAvatar, phoneNumber, email, address, status) 
        VALUES(?,?,?,?,?,?,?,?,?,?);";
        // Tạo đối tượng repared
        $stmt = $this->conn->prepare($query);
        // Gán giá trị vào các tham số ẩn
        $stmt->bind_param("ssissssssi", $username, $password, $level, $name, $dateOfBirth, $urlAvatar, $phoneNumber, $email, $address, $status);
        $result = $stmt->execute();
        if($result) {
            return array("status"=>True,"message"=>"Register successfully");
        } else {
            return array("status"=>False,"message"=>"Error query");
        }
    }
    public function readAll() {
        $query = "SELECT * FROM $this->dbTable";
        $stmt = mysqli_query($this->conn, $query);
        $dataResult = array();
        if (mysqli_num_rows($stmt) == 0) return array("status"=>false,"message"=>"Empty database","data"=>NULL);
        while($row = mysqli_fetch_assoc($stmt)) {
            $dataResult[] = $row;
        }
        return array("status"=>True,"message"=>"Successful","data"=>$dataResult);
    }
    public function readOne($aId){
        $query = "SELECT * FROM $this->dbTable WHERE aId = ?";

        // Tạo đối tượng repared
        $stmt = $this->conn->prepare($query);
        // Gán giá trị vào các tham số ẩn
        $stmt->bind_param("i",$aId);
        $stmt->execute();
        $result = $stmt->get_result();
        $count = $result->num_rows;
        if($count != 1) return array("status"=>false,"message"=>"Error aId","data"=>NULL);
        else {
            $row = $result->fetch_assoc();
            return array("status"=>true,"message"=>"Successful","data"=>$row);
        }
    }
    public function updateInfo($aId, $data){
        $query0 = "SELECT * FROM $this->dbTable WHERE aId = ?";
        // Tạo đối tượng repared
        $stmt0 = $this->conn->prepare($query0);
        // Gán giá trị vào các tham số ẩn
        $stmt0->bind_param("i",$aId);
        $stmt0->execute();
        $result0 = $stmt0->get_result();
        $count0 = $result0->num_rows;
        if($count0 != 1) return array("status"=>false,"message"=>"Error aId");
        
        $name = $data->name;
        $dateOfBirth = isset($data->dateOfBirth) ? $data->dateOfBirth : NULL;
        $urlAvatar = isset($data->urlAvatar) ? $data->urlAvatar : NULL;
        $phoneNumber = $data->phoneNumber;
        $email = isset($data->email) ? $data->email : NULL;
        $address = isset($data->address) ? $data->address : NULL;

        $query = "UPDATE $this->dbTable
        SET name = ?, dateOfBirth = ?, urlAvatar = ?, phoneNumber = ?, email = ?, address = ?
        WHERE aId = ?";

        // Tạo đối tượng repared
        $stmt = $this->conn->prepare($query);
        // Gán giá trị vào các tham số ẩn
        $stmt->bind_param("ssssssi", $name, $dateOfBirth, $urlAvatar, $phoneNumber, $email, $address, $aId);

        if($stmt->execute()) return array('status'=>true,'message'=>'');
        else return array('status'=>false,'message'=>'Error query');
    }
    public function updatePassWord($currUsername, $oldPassWord, $newPassWord) {
        $query = "SELECT password FROM $this->dbTable WHERE username = ?";
        // Tạo đối tượng repared
        $stmt = $this->conn->prepare($query);
        // Gán giá trị vào các tham số ẩn
        $stmt->bind_param("s", $currUsername);
        $stmt->execute();
        $result = $stmt->get_result();
        $count = $result->num_rows;
        if($count != 1) return array("status"=>false,"message"=>"Error current username or database");

        $row = $result->fetch_assoc();
        if (!password_verify($oldPassWord, $row['password'])) {
            if (md5($oldPassWord) != $row['password']) return array("status"=>false,"message"=>"Incorrect password");
        }

        $query2 = "UPDATE $this->dbTable 
        SET password = ?
        WHERE username = ?";
        // Tạo đối tượng repared
        $stmt2 = $this->conn->prepare($query2);
        $newPassWordHash = password_hash($newPassWord, PASSWORD_DEFAULT);
        // Gán giá trị vào các tham số ẩn
        $stmt2->bind_param("ss", $newPassWordHash, $currUsername);
        if($stmt2->execute()) return array("status"=>true,"message"=>"");
        else return array("status"=>false,"message"=>"Error system");

    }
    public function updateStatus($aId) {
        $query0 = "SELECT level, status FROM $this->dbTable WHERE aId = ?";
        // Tạo đối tượng repared
        $stmt0 = $this->conn->prepare($query0);
        // Gán giá trị vào các tham số ẩn
        $stmt0->bind_param("i", $aId);
        $stmt0->execute();
        $result0 = $stmt0->get_result();
        $count0 = $result0->num_rows;
        if ($count0 != 1) return array("status"=>false,'message'=>"Error current username or database");

        $row0 = $result0->fetch_assoc();
        if($row0['level'] == 2) return array("status"=>false,'message'=>"You don't have the right to modify other admin's information");
        
        $status = 1;
        if($row0['status'] == 1) $status = 0;
        else $status = 1;

        $query = "UPDATE $this->dbTable
        SET status = ?
        WHERE aId = ?";
        // Tạo đối tượng repared
        $stmt = $this->conn->prepare($query);
        // Gán giá trị vào các tham số ẩn
        $stmt->bind_param("ii", $status, $aId);
        if($stmt->execute()) return array("status"=>true,"message"=>'');
        else return array("status"=>false,"message"=>'Error system');

    }
    public function deleteOne($aId) {
        $query0 = "SELECT * FROM $this->dbTable WHERE aId = ?";
        // Tạo đối tượng repared
        $stmt0 = $this->conn->prepare($query0);
        // Gán giá trị vào các tham số ẩn
        $stmt0->bind_param("i", $aId);
        $stmt0->execute();
        $result0 = $stmt0->get_result();
        $count0 = $result0->num_rows;
        if ($count0 != 1) return array("status"=>false,'message'=>"Incorrect aId or error database");
        
        $row0 = $result0->fetch_assoc();
        if($row0['level'] == 2) return array("status"=>false,'message'=>"Can't not delete admin account");

        $query = "DELETE FROM $this->dbTable WHERE aId = ?";
        // Tạo đối tượng repared
        $stmt = $this->conn->prepare($query);
        // Gán giá trị vào các tham số ẩn
        $stmt->bind_param("i", $aId);
        $result = $stmt->execute();
        return array("status"=>$result,'message'=>"Error system");
    }

    public function deleteAll() {
        $query = "DELETE FROM $this->dbTable WHERE level = 1";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute();
    }
}

?>