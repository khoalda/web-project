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
        // Tạo đối tượng repared
        // $stmt = $this->conn->prepare($query);

        // // Gán giá trị vào các tham số ẩn
        // $data = array($dbTable, $username);
        // // $stmt->bindParam(1, $dbTable);
        // // $stmt->bindParam(2, $username);
        // $stmt->execute($data);

        if(mysqli_num_rows($query_stmt) != 1) return array('status'=>false, 'message'=>'Invalid username');
        else
        {
            $row = mysqli_fetch_assoc($query_stmt);
            $md5Password = md5($password);
            if($md5Password != $row['password']) return array('status'=>false, 'message'=>'Invalid password');
            else {
                set_logged($username, $row['level']);
                return array('status'=>true, 'message'=>'');
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

        $password = md5($data->password);
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
}
?>