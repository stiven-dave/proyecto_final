<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Manejar preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

session_start();

$response = ['success' => false, 'message' => ''];

// Destruir todas las variables de sesión
$_SESSION = array();

// Si se desea destruir la sesión completamente, también borrar la cookie de sesión
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Finalmente, destruir la sesión
if (session_destroy()) {
    $response['success'] = true;
    $response['message'] = 'Sesión cerrada correctamente';
} else {
    $response['message'] = 'Error al cerrar sesión';
}

echo json_encode($response);
exit;
?>

