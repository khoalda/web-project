<?php
require_once "../../config/Database.php";

class UserModel extends Database {
    public function login($data) {
        $username = $data->username;
        $password = $data->password;
        $query = "SELECT USER"
    }
}
?>