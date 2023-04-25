<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

require_once '../../model/OrderingModel.php';
require_once '../../config/Role.php';
$ordering = new OrderingModel();
// Get product data
$data = json_decode(file_get_contents("php://input"));

if (!is_logged()) {
    die("You are not logged in");
    // http_response_code(404);
    // echo json_encode(array('message' => "You are not logged in"));
}
else if(is_block()) {
    http_response_code(404);
    echo json_encode(array('message' => 'Your account is blocked'));
}
else if(!isset($data->name) || $data->name == "" || !isset($data->address) || $data->address == ""
|| !isset($data->phoneNumber) || $data->phoneNumber == ""|| !isset($data->products) || $data->products == ""
|| !isset($data->deliveryCost) || $data->deliveryCost == "") {
    die("Missing data");
    // http_response_code(404);
    // echo json_encode(array('message' => "Missing data"));
}
else
{
    $products = json_decode(json_encode($data->products),true);
    // $products = $data->products;
    $array = array();
    foreach ($products as $ele) {
        $array[] = $ele;
    }
    // echo $array[1]['pId'];
    foreach ($array as $ele) {
        if(!isset($ele['pId']) or !isset($ele['quantity'])) {
            die("Missing data");
        }
    } 
    $result = $ordering->create($data, $array);
    if($result) {
        if($result['status']) {
            http_response_code(201);
            echo json_encode(array('message' => 'Odering created successfully'));
        }
        else {
            http_response_code(404);
            echo json_encode(array('message' => $result['message']));
        }
    }
    else {
        http_response_code(404);
        echo json_encode(
            array('message' => 'Error system 4')
        );
    }
}

?>