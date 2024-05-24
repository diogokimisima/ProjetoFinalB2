<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include ("../classe/Db.class.php");
include ("../classe/Estoque.php");

try {
    $db = new Db();
    $db->conectar();
    $db->setTabela('estoque');

    // Verifica se o ID foi enviado na solicitação DELETE
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $where = "id = $id"; // Condição para a exclusão
        $estoque = new Estoque('', '', '');
        $estoque->excluir($db, $where); // Método para excluir o registro
        echo json_encode(['success' => true, 'message' => 'Item excluído com sucesso.']);
    } else {
        throw new Exception('ID do item não fornecido.');
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>