<?php
// ===============================
// DESACTIVAR WARNINGS PARA QUE NO ROMPAN EL JSON
// ===============================
ini_set('display_errors', 0);
error_reporting(0);

// ===============================
// HEADERS (CORS)
// ===============================
header("Access-Control-Allow-Origin: http://localhost:5174");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json");

// ===============================
// Preflight OPTIONS
// ===============================
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ===============================
// INICIO DE SESIÓN Y DB
// ===============================
session_start();
include "db.php";

$response = ['success' => false, 'message' => '', 'user' => null];

// ===============================
// MÉTODO POST
// ===============================
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Intentar leer JSON del body
    $data = json_decode(file_get_contents('php://input'), true);

    // Si no vino JSON, intentar usar $_POST
    if (!$data) {
        $data = $_POST;
    }

    // Validar campos
    if (empty($data["correo"]) || empty($data["password"])) {
        $response['message'] = "Por favor, complete todos los campos.";
        echo json_encode($response);
        exit;
    }

    $correo = trim($data["correo"]);
    $password = $data["password"];

    // Buscar cliente
    $sql = "SELECT * FROM cliente WHERE correo = ?";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows === 1) {
        $cliente = $resultado->fetch_assoc();

        if (password_verify($password, $cliente['password'])) {

            $_SESSION["cliente_id"] = $cliente["cliente_id"];
            $_SESSION["nombre"] = $cliente["nombre"];

            $response['success'] = true;
            $response['message'] = "Login exitoso";
            $response['user'] = [
                'id' => $cliente["cliente_id"],
                'name' => $cliente["nombre"],
                'email' => $cliente["correo"],
            ];

        } else {
            $response['message'] = "Contraseña incorrecta.";
        }
    } else {
        $response['message'] = "El correo no está registrado.";
    }

    $stmt->close();

} else {
    $response['message'] = "Método no permitido.";
}

// Respuesta final JSON
echo json_encode($response);
