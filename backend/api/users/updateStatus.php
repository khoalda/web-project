<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

require_once '../../model/UserModel.php';
require_once '../../config/Role.php';

$user = new UserModel();

if(!is_admin()) {
    echo json_encode(array('message' => "You are not admin"));
}
else {
    $rq_aId = isset($_GET['aId']) ? $_GET['aId'] : NULL; //request aId
    if($rq_aId) {
        $result = $user->updateStatus($rq_aId);
        if($result) {
            if($result['status']) {
                http_response_code(201);
                echo json_encode(array('message'=>"Successful"));
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
    else {
        http_response_code(404);
        echo json_encode(array('message'=>"Don't have the aId"));
    }
}
?>