<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

require_once '../../model/OrderingModel.php';
require_once '../../config/Role.php';

$odering = new OrderingModel();
// Get product data
$data = json_decode(file_get_contents("php://input"));

if(!is_logged()) {
    // echo json_encode(array('message' => "You are not logged in"));
    die("You are not logged in");
}
else if(is_block()) {
    http_response_code(404);
    echo json_encode(array('message' => 'Your account is blocked'));
}
else {
    // $rq_status = isset($_GET['status']) ? $_GET['status'] : die("Don't have the status field"); //request status
    $rq_oId = isset($_GET['oId']) ? $_GET['oId'] : die("Don't have the oId field"); //request oId
    if(!isset($data->statusId)) die("Don't have the status field");
        $result = $odering->updateStatus($rq_oId,$data->statusId);
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
    // else {
    //     http_response_code(404);
    //     echo json_encode(array('message'=>"Don't have the aId"));
    // }
}
?>