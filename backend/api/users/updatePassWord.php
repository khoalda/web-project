<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

require_once '../../model/UserModel.php';
require_once '../../config/Role.php';

$user = new UserModel();

// Get product data
$data = json_decode(file_get_contents("php://input"));


if(!is_logged()) {
    echo json_encode(array('message' => "You are not logged in"));
}
else {
    // $curr_aId = get_current_aId(); // current aId
    $curr_username = get_current_username(); //current username
    if(!isset($data->oldPassWord) || $data->oldPassWord == "") {
        http_response_code(404);
        echo json_encode(array('message'=>"Don't have the old password"));
    }
    else if(!isset($data->newPassWord) || $data->newPassWord == "") {
        http_response_code(404);
        echo json_encode(array('message'=>"Don't have the new password"));
    }
    else {
        if($data->newPassWord == $data->oldPassWord) {
            http_response_code(404);
            echo json_encode(array('message'=>"The new password must be different from the old password"));
        }
        else {
            $result = $user->updatePassWord($curr_username, $data->oldPassWord, $data->newPassWord);
            if($result) {
                if($result['status']) {
                    http_response_code(201);
                    echo json_encode(array('message'=>"Password changed"));
                }
                else {
                    http_response_code(404);
                    echo json_encode(array('message'=>$result['message']));
                }
            }
            else {
                http_response_code(404);
                echo json_encode(array('message'=>"Error system"));
            }
        }
    }
}
?>