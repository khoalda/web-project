<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

require_once '../../model/RatingModel.php';
require_once '../../config/Role.php';

$rating = new RatingModel();
if (!is_admin()) {
    http_response_code(404);
    echo json_encode(array('message' => "You aren't admin"));
}
else {
    $result = $rating->deleteAll();
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