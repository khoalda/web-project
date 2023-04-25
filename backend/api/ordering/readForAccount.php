<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require_once '../../model/OrderingModel.php';
require_once '../../config/Role.php';

if(!is_logged()) die("You don't have the right to access");
// if(get_current_status() == '0' || get_current_status() == 0) {
if(is_block()) {
    http_response_code(404);
    echo json_encode(array('message' => 'Your account is blocked'));
}
else {
    $ordering = new OrderingModel();
    $aId = NULL;
    $rq_aId = isset($_GET['aId']) ? $_GET['aId'] : NULL;   //request aId - account Id
    $curr_aId = get_current_aId();
    
    if(!is_admin()) {
        if($rq_aId) {
            if($rq_aId != $curr_aId) die("You don't have the right to access other people's order");
            else $aId = $rq_aId;
        } 
        else $aId = $curr_aId;
    } 
    else {
        if($rq_aId) $aId = $rq_aId;
        else $aId = $curr_aId;
    }

    if($aId) {
        $result = $ordering->readForAccount($aId);

        if($result) {
            if($result['status']) {
                http_response_code(201);
                echo json_encode($result['data']);
            }
            else {
                http_response_code(404);
                echo json_encode(array('message' => 'Error system'));
            }
        }
        else {
            http_response_code(404);
            echo json_encode(array('message' => 'Error system'));
        }
    }
}

?>