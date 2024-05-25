<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    include ("../classe/Db.class.php");
    include ("../classe/Estoque.php");

    $db = new Db();
    $db->conectar();
    $db->setTabela("estoque");

    $response = array();

    $nomeEstoque = $_POST['nomeEstoque'];
    $quantidade = $_POST['quantidade'];
    $nomeFuncionario = $_POST['nomeFuncionario'];

    $novoEstoque = new Estoque($nomeEstoque, $quantidade, $nomeFuncionario);

    $novoEstoque->gravar($db);
    $response['success'] = true;
    $response['message'] = "Produto cadastrado!";

    echo json_encode($response);
}
?>