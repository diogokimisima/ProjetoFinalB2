<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

include ("../classe/Db.class.php");
include ("../classe/Estoque.php");

try {
    $db = new Db();
    $db->conectar();
    $db->setTabela('estoque');

    $estoque = new Estoque('', '', '');
    $dados = $estoque->consultar($db, '*', null);

    echo json_encode(['success' => true, 'data' => $dados]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>