<?php
// header('Content-Type: application/json');
// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: POST, OPTIONS');
// header('Access-Control-Allow-Headers: Content-Type');

// // Manejar preflight request
// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//     http_response_code(200);
//     exit;
// }

// session_start();
// include "db.php";

// $response = ['success' => false, 'message' => '', 'user' => null];

// if($_SERVER["REQUEST_METHOD"] == "POST")
// {
//     // Obtener datos del body (JSON)
//     $data = json_decode(file_get_contents('php://input'), true);
    
//     // Si no viene JSON, intentar con POST tradicional
//     if (!$data) {
//         $data = $_POST;
//     }

//     // Validar que los campos no estén vacíos
//     if(empty($data["nombre"]) || empty($data["correo"]) || empty($data["password"])){
//         $response['message'] = "Por favor, complete todos los campos.";
//         echo json_encode($response);
//         exit;
//     }

//     $nombre = trim($data["nombre"]);
//     $correo = trim($data["correo"]);
    
//     // Validar formato de correo
//     if(!filter_var($correo, FILTER_VALIDATE_EMAIL)){
//         $response['message'] = "El correo electrónico no es válido.";
//         echo json_encode($response);
//         exit;
//     }

//     // Verificar si el correo ya existe
//     $sql_check = "SELECT cliente_id FROM cliente WHERE correo = ?";
//     $stmt_check = $conexion->prepare($sql_check);
//     $stmt_check->bind_param("s", $correo);
//     $stmt_check->execute();
//     $resultado_check = $stmt_check->get_result();
    
//     if($resultado_check->num_rows > 0){
//         $response['message'] = "Este correo electrónico ya está registrado.";
//         echo json_encode($response);
//         exit;
//     }

//     // Hash de la contraseña
//     $pass = password_hash($data["password"], PASSWORD_DEFAULT);

//     $sql = "INSERT INTO cliente (nombre, correo, contraseña) VALUES (?, ?, ?)";
//     $stmt = $conexion->prepare($sql);
//     $stmt->bind_param("sss", $nombre, $correo, $pass);

//     if($stmt->execute()){
//         // Obtener el ID del usuario recién creado
//         $nuevo_id = $conexion->insert_id;
        
//         $response['success'] = true;
//         $response['message'] = "Registro exitoso. Puede iniciar sesión ahora.";
//         $response['user'] = [
//             'id' => $nuevo_id,
//             'name' => $nombre,
//             'email' => $correo
//         ];
//     } else {
//         $response['message'] = "Error al registrar: " . $stmt->error;
//     }
    
//     $stmt->close();
//     $stmt_check->close();
// } else {
//     $response['message'] = "Método no permitido.";
// }

// echo json_encode($response);

// ============================
// HEADERS Y CORS
// ============================
header("Access-Control-Allow-Origin: http://localhost:5174");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json");

// Manejar preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ============================
// INICIO DE SESIÓN Y CONEXIÓN DB
// ============================
session_start();
include "db.php";

$response = ['success' => false, 'message' => '', 'user' => null];

// ============================
// VERIFICAR MÉTODO POST
// ============================
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Obtener datos JSON
    $data = json_decode(file_get_contents('php://input'), true);

    // Si no viene JSON, intentar con POST tradicional
    if (!$data) {
        $data = $_POST;
    }

    // Validar campos vacíos
    if (empty($data["nombre"]) || empty($data["correo"]) || empty($data["password"])) {
        $response['message'] = "Por favor, complete todos los campos.";
        echo json_encode($response);
        exit();
    }

    $nombre = trim($data["nombre"]);
    $correo = trim($data["correo"]);

    // Validar formato de correo
    if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = "El correo electrónico no es válido.";
        echo json_encode($response);
        exit();
    }

    // Verificar si el correo ya existe
    $sql_check = "SELECT cliente_id FROM cliente WHERE correo = ?";
    $stmt_check = $conexion->prepare($sql_check);
    $stmt_check->bind_param("s", $correo);
    $stmt_check->execute();
    $resultado_check = $stmt_check->get_result();

    if ($resultado_check->num_rows > 0) {
        $response['message'] = "Este correo electrónico ya está registrado.";
        echo json_encode($response);
        exit();
    }

    // Hash de la contraseña
    $pass = password_hash($data["password"], PASSWORD_DEFAULT);

    // Insertar usuario
    $sql = "INSERT INTO cliente (nombre, correo, contraseña) VALUES (?, ?, ?)";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("sss", $nombre, $correo, $pass);

    if ($stmt->execute()) {
        $nuevo_id = $conexion->insert_id;

        $response['success'] = true;
        $response['message'] = "Registro exitoso. Puede iniciar sesión ahora.";
        $response['user'] = [
            'id' => $nuevo_id,
            'name' => $nombre,
            'email' => $correo
        ];
    } else {
        $response['message'] = "Error al registrar: " . $stmt->error;
    }

    $stmt->close();
    $stmt_check->close();

} else {
    $response['message'] = "Método no permitido.";
}

echo json_encode($response);

?>