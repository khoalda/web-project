<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require_once '../../model/ProductModel.php';
require_once '../../config/Role.php';

$product = new ProductModel();
$pId = isset($_GET['pId']) ? $_GET['pId'] : die();

$result = $product->readOne($pId);

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
    echo json_encode(
        array('message' => 'Error ')
    );
}


?>