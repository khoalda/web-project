<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

require_once '../../model/RatingModel.php';
require_once '../../config/Role.php';

$rating = new RatingModel();
if (!is_logged()) {
    http_response_code(404);
    echo json_encode(array('message' => "You are not logged in"));
}
else if(is_block()) {
    http_response_code(404);
    echo json_encode(array('message' => 'Your account is blocked'));
}
else {
    $rq_rId = isset($_GET['rId']) ? $_GET['rId'] : die("Don't have the rId field"); //request rId
    $result = $rating->deleteOne($rq_rId);
    if($result) {
        if($result['status']) {
            http_response_code(201);
            echo json_encode(array('message' => 'Delete successful'));
        }
        else {
            http_response_code(404);
            echo json_encode(array('message' => $result['message']));
        }
    }
    else {
        http_response_code(404);
        echo json_encode(
            array('message' => 'Error system')
        );
    }
}


?>