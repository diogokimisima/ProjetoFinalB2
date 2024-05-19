<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'classe/Db.class.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['enviar'])) {
    
    if (!empty($_POST['nomeuser']) && !empty($_POST['senhauser'])) {
       
        $nomeuser = $_POST['nomeuser'];
        $senhauser = md5($_POST['senhauser']); 

        $db = new Db();
        $db->conectar();
        $db->setTabela("usuarios");

        $resultado = $db->consultar('*', "login='$nomeuser' AND senha='$senhauser'");

        if ($resultado) {
            echo '<div class="mensagem-sucesso">Login efetuado com sucesso!</div>';

            header('Location: menu.php');
        } else {
            echo '<div class="mensagem-erro">Usuário não encontrado!</div>';
        }
    } else {
        echo '<div class="mensagem-erro">Necessário preencher todos os campos</div>';
    }
}
?>