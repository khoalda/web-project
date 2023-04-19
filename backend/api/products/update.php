<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

require_once '../../model/ProductModel.php';
require_once '../../config/Role.php';
$product = new ProductModel();

// Get product data
$data = json_decode(file_get_contents("php://input"));


if (!is_admin()) {
    echo json_encode(array('message' => "You aren't admin"));
}
else
{
    $result = $product->update($data);
    if($result['status']) {
        http_response_code(201);
        echo json_encode(
            array('message' => $result['message'])
        );
    }
    else {
        http_response_code(404);
        echo json_encode(
            array('message' => $result['message'])
        );
    }
}

?>