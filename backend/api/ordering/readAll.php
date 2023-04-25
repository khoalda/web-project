<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require_once '../../model/OrderingModel.php';
require_once '../../config/Role.php';

if(!is_admin()) die("You don't have the right to access other people's orders");

$ordering = new OrderingModel();

$result = $ordering->readAll();

    if($result) {
        if($result["status"]) {
            http_response_code(201);
            echo json_encode($result["data"]);
        }
        else {
            http_response_code(404);
            echo json_encode(array('message' => $result["message"]));
        }
    }
    else {
        http_response_code(404);
        echo json_encode(array('message' => 'Error system'));
    }

?>