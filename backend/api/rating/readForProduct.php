<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require_once '../../model/RatingModel.php';
require_once '../../config/Role.php';

$rating = new RatingModel();

$rq_pId = isset($_GET['pId']) ? $_GET['pId'] : die("Don't have the pId field");   //request pId - product Id

$result = $rating->readForProduct($rq_pId);

    if($result) {
        http_response_code(201);
        echo json_encode($result);
    }
    else {
        http_response_code(404);
        echo json_encode(array('message' => 'Error system'));
    }

?>