<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require_once '../../model/UserModel.php';
require_once '../../config/Role.php';

$user = new UserModel();
if(!is_logged()) {
    echo json_encode(array('message' => "You are not logged in"));
}
else {
    $aId = NULL;
    $rq_aId = isset($_GET['aId']) ? $_GET['aId'] : NULL; //request aId
    $curr_aId = get_current_aId(); // current aId
    if(!is_admin()) {
        if($rq_aId) {
            if($rq_aId != $curr_aId) {
                http_response_code(404);
                echo json_encode(array('message' => "You don't have the right to access other people's information"));
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
        $result = $user->readOne($aId);
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
}


?>