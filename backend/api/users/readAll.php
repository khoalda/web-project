<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require_once '../../model/UserModel.php';
require_once '../../config/Role.php';

$user = new UserModel();

$result = $user->readAll();
if(!is_admin()) {
    echo json_encode(array('message' => "You aren't admin"));
} else {
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
}

?>