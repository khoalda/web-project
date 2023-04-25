<?php
require_once 'Session.php';

// Hàm thiết lập là đã đăng nhập
function set_logged($username, $level, $aId, $status){
    session_set('ss_user_token', array(
        'username' => $username,
        'level' => $level,
        'aId' => $aId,
        'status'=> $status
    ));
}
 
// Hàm thiết lập đăng xuất
function set_logout(){
    session_delete('ss_user_token');
}
 
// Hàm kiểm tra trạng thái người dùng đã đăng nhập chưa
function is_logged(){
    $user = session_get('ss_user_token');
    return $user;
}
 
// Hàm kiểm tra có phải là admin hay không
function is_admin(){
    $user  = is_logged();
    if (!empty($user['level']) && $user['level'] == '2'){
        return true;
    }
    return false;
}

// Hàm kiểm tra người dùng có bị block không?
function is_block(){
    $user  = is_logged();
    // echo $user['status'];
    // echo ($user['status'] == 0);
    if (isset($user['status']) && (($user['status'] == 0) || ($user['status'] == '0'))){
        return true;
    }
    // echo "vao dc";
    return false;
}

// Lấy username người dùng hiện tại
function get_current_username(){
    $user  = is_logged();
    return isset($user['username']) ? $user['username'] : '';
}
 
// Lấy level người dùng hiện tại
function get_current_level(){
    $user  = is_logged();
    return isset($user['level']) ? $user['level'] : '';
}

// Lấy aId người dùng hiện tại
function get_current_aId(){
    $user  = is_logged();
    return isset($user['aId']) ? $user['aId'] : '';
}

// Lấy status người dùng hiện tại
function get_current_status(){
    $user  = is_logged();
    return isset($user['status']) ? $user['status'] : '';
}
?>