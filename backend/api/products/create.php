<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

require_once '../../model/ProductModel.php';
require_once '../../config/Role.php';
$product = new ProductModel();
// Get product data
$data = json_decode(file_get_contents("php://input"));
// $product->name = $data->name;
// $product->price = $data->price;
// $product->description = $data->description;
// $product->image = $data->image;
// $product->categoryId = $data->categoryId;

set_logged('tan123', '2');
if (!is_admin()) {
    echo json_encode(array('message' => "You aren't admin"));
}
else
{
    if($product->create($data)) {
        http_response_code(201);
        echo json_encode(
            array('message' => 'Product create successfully')
        );
    }
    else {
        http_response_code(404);
        echo json_encode(
            array('message' => 'Product cannot created')
        );
    }
}

?>