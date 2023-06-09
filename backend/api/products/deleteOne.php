<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

require_once '../../model/ProductModel.php';
require_once '../../config/Role.php';

$product = new ProductModel();
$pId = isset($_GET['pId']) ? $_GET['pId'] : die();
if (!is_admin()) {
    echo json_encode(array('message' => "You aren't admin"));
}
else {
    if($product->deleteOne($pId)) {
        http_response_code(201);
        echo json_encode(array('message' => 'Delete successful'));
    }
    else {
        http_response_code(404);
        echo json_encode(
            array('message' => 'Delete failed')
        );
    }
}


?>