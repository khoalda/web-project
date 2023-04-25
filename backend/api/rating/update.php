<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

require_once '../../model/RatingModel.php';
require_once '../../config/Role.php';
$rating = new RatingModel();

// Get product data
$data = json_decode(file_get_contents("php://input"));


if (!is_logged()) {
    http_response_code(404);
    echo json_encode(array('message' => "You are not logged in"));
}
else if(is_block()) {
    http_response_code(404);
    echo json_encode(array('message' => 'Your account is blocked'));
}
else if(!isset($data->rId) || $data->rId == "") {
    http_response_code(404);
    echo json_encode(array('message' => "Don't have rId field"));
}
else if(!isset($data->star) || $data->star == "") {
    http_response_code(404);
    echo json_encode(array('message' => "Don't have star field"));
}
else
{
    $result = $rating->update($data);
    if($result) {
        if($result['status']) 
        {
            http_response_code(201);
            echo json_encode(array('message' => 'Rating updated successfully'));
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