<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    include ("../classe/Db.class.php");
    include ("../classe/Usuario.php");

    $db = new Db();
    $db->conectar();
    $db->setTabela("usuarios");

    $cpf = $_POST['cpf'];
    $email = $_POST['email'];
    $login = $_POST['login'];
    $celular = $_POST['celular'];

    $response = array();

    $cpfExistente = $db->consultar("cpf", "cpf = '$cpf'");
    if (!empty($cpfExistente)) {
        $response['success'] = false;
        $response['message'] = "CPF já cadastrado!";
        echo json_encode($response);
        exit;
    }

    $celularExistente = $db->consultar("celular", "celular = '$celular'");
    if (!empty($celularExistente)) {
        $response['success'] = false;
        $response['message'] = "Celular já cadastrado!";
        echo json_encode($response);
        exit;
    }

    $emailExistente = $db->consultar("email", "email = '$email'");
    if (!empty($emailExistente)) {
        $response['success'] = false;
        $response['message'] = "Email já cadastrado!";
        echo json_encode($response);
        exit;
    }

    $loginExistente = $db->consultar("login", "login = '$login'");
    if (!empty($loginExistente)) {
        $response['success'] = false;
        $response['message'] = "Login já cadastrado!";
        echo json_encode($response);
        exit;
    }

    // Se chegou até aqui, significa que não há nenhum erro, então podemos cadastrar o usuário
    $nome = $_POST['nome'];
    $senha = $_POST['senha'];

    $senhaCriptografada = md5($senha);

    $novoUsuario = new Usuario($cpf, $nome, $celular, $email, $login, $senhaCriptografada);

    $novoUsuario->gravar($db);
    $response['success'] = true;
    $response['message'] = "Usuário cadastrado com sucesso!";

    echo json_encode($response);
}
?>