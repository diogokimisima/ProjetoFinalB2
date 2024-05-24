<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type");

include ("../classe/Db.class.php");
include ("../classe/Estoque.php");

try {
    $db = new Db();
    $db->conectar();
    $db->setTabela('estoque');

    // Verifica se o ID foi enviado na solicitação PUT
    if(isset($_GET['id'])) {
        $id = $_GET['id'];
        $where = "id = $id"; // Condição para a atualização
        $data = json_decode(file_get_contents("php://input"), true); // Dados enviados no corpo da requisição
        $estoque = new Estoque('', '', '');
        $estoque->alterar($db, $where, $data); // Método para atualizar o registro
        echo json_encode(['success' => true, 'message' => 'Item atualizado com sucesso.']);
    } else {
        throw new Exception('ID do item não fornecido.');
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
