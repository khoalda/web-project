<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

require_once '../../model/UserModel.php';
require_once '../../config/Role.php';

$user = new UserModel();
    if(!is_logged()) {
        echo json_encode(array('message' => 'You are not logged in'));
    }
    else {
        if($user->logout()) {
            echo json_encode(array('message' => 'Logout successfully'));
        }
        else {
            echo json_encode(array('message' => 'Logout failed'));
        }
    }
?>