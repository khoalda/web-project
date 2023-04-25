<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

require_once '../../model/UserModel.php';
require_once '../../config/Role.php';

$user = new UserModel();

// Get product data
$data = json_decode(file_get_contents("php://input"));


if(!is_logged()) {
    echo json_encode(array('message' => "You are not logged in"));
}
else if(is_block()) {
    http_response_code(404);
    echo json_encode(array('message' => 'Your account is blocked'));
}
else {
    $aId = NULL;
    $rq_aId = isset($_GET['aId']) ? $_GET['aId'] : NULL; //request aId
    $curr_aId = get_current_aId(); // current aId
    if(!is_admin()) {
        if($rq_aId) {
            if($rq_aId != $curr_aId) {
                http_response_code(404);
                echo json_encode(array('message' => "You don't have the right to modify other people's information"));
            } else {
                $aId = $rq_aId;
            }
        } else {
            $aId = $curr_aId;
        }
    } else {
        if($rq_aId) {
            $aId = $rq_aId;
        }
        else {
            $aId = $curr_aId;
        }
    }
    if($aId) {
        if(!isset($data->name) || $data->name == "") {
            http_response_code(404);
            echo json_encode(array('message'=>"Don't have the name"));
        }
        else if(!isset($data->phoneNumber) || $data->phoneNumber == "") {
            http_response_code(404);
            echo json_encode(array('message'=>"Don't have the phone number"));
        }
        else {
            $result = $user->updateInfo($aId, $data);
            if($result) {
                if($result["status"]) {
                    http_response_code(201);
                    echo json_encode(array('message' => 'Update successful'));
                }
                else {
                    http_response_code(404);
                    echo json_encode(array('message' => $result["message"]));
                }
            }
            else {
                http_response_code(404);
                echo json_encode(
                    array('message' => 'Error')
                );
            }
        }
    }
}
?>