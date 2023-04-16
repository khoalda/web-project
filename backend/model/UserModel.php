<?php
require_once "../../config/Database.php";
// require_once '../../config/Role.php';

class UserModel extends Database {
    public function login($data) {
        $dbTable = 'account';
        $username = $data->username;
        $password = $data->password;
        $query = "SELECT * FROM $dbTable WHERE username = '$username';";
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
}
?>