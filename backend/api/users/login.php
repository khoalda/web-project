<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

require_once '../../model/UserModel.php';
require_once '../../config/Role.php';

$user = new UserModel();
// Get data
$data = json_decode(file_get_contents("php://input"));
if(is_logged()){
    http_response_code(404);
    echo json_encode(array('message'=>"You are logged in"));
}
else if(!isset($data->username) || $data->username == "") {
    http_response_code(404);
    echo json_encode(array('message'=>"Don't have the username"));
}
else if(!isset($data->password) || $data->password == "") {
    http_response_code(404);
    echo json_encode(array('message'=>"Don't have the password"));
}
else {
    $result = $user->login($data);
    if($result['status']) {
        http_response_code(200);
        echo json_encode(array('message' => 'Login successful'));
    }
    else {
        http_response_code(404);
        echo json_encode(array('message' => $result['message']));
    }   
}
?>