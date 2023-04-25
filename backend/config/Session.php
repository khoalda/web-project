<?php
$lifetime = 604800;

session_start();

session_set_cookie_params([
    'expires' => time() + $lifetime,
    'path' => '/',
    'domain' => $_SERVER['HTTP_HOST'],
    'secure' => true,
    'httponly' => true,
    'samesite' => 'strict',
]);

// Gán session (SET)
function session_set($key, $val){
    $_SESSION[$key] = $val;
}
 
// Lấy session (GET)
function session_get($key){
    return (isset($_SESSION[$key])) ? $_SESSION[$key] : false;
}
 
// Xóa session (DELETE)
function session_delete($key){
    if (isset($_SESSION[$key])){
        unset($_SESSION[$key]);
    }
}
?>