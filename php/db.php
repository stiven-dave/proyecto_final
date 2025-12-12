<?php
$conexion = new mysqli("localhost", "root", "", "proyecto_final");

if ($conexion->connect_error) {
    die("Error de conexion: " . $conexion->connect_error);
}
 error_log("Conexion exitosa a la base de datos.");
?>