<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    include ("classe/Db.class.php");
    include ("classe/Usuario.php");

    $db = new Db();
    $db->conectar();
    $db->setTabela("usuarios");

    $cpf = $_POST['cpf'];
    $nome = $_POST['nome'];
    $celular = $_POST['celular'];
    $email = $_POST['email'];
    $login = $_POST['login'];
    $senha = $_POST['senha'];

    $senhaCriptografada = md5($senha);

    $novoUsuario = new Usuario($cpf, $nome, $celular, $email, $login, $senhaCriptografada);

    $novoUsuario->gravar($db);

    echo "Usuário cadastrado com sucesso!";
}
?>
