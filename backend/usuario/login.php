<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once '../classe/Db.class.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['enviar'])) {
    
    if (!empty($_POST['nomeuser']) && !empty($_POST['senhauser'])) {
       
        $nomeuser = $_POST['nomeuser'];
        $senhauser = md5($_POST['senhauser']); 

        $db = new Db();
        $db->conectar();
        $db->setTabela("usuarios");

        $resultado = $db->consultar('*', "BINARY login = '$nomeuser' AND senha = '$senhauser'");


        if ($resultado) {
            $isAdmin = $nomeuser === 'admin' ? 1 : 0;
            echo json_encode([
                'success' => true,
                'message' => 'Login efetuado com sucesso!',
                'isAdmin' => $isAdmin
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Usuário ou senha incorreto!'
            ]);
        }
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Necessário preencher todos os campos'
        ]);
    }
}
?>
