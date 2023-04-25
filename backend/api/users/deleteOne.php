<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

require_once '../../model/UserModel.php';
require_once '../../config/Role.php';

$user = new UserModel();
$rq_aId = isset($_GET['aId']) ? $_GET['aId'] : die("Don't have the aId"); //request aId
if (!is_admin()) {
    echo json_encode(array('message' => "You aren't admin"));
} else {
    $result = $user->deleteOne($rq_aId);
    if ($result) {
        if ($result['status']) {
            http_response_code(201);
            echo json_encode(array('message' => 'Delete successful'));
        } else {
            http_response_code(404);
            echo json_encode(array('message' => $result['message']));
        }
    } else {
        http_response_code(404);
        echo json_encode(
            array('message' => "Error system")
        );
    }
}


?>