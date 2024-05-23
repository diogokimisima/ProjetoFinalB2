<?php

    class Estoque{

        private $nomeEstoque;
        private $quantidade;
        private $nomeFuncionario;


        function __construct( $nomeEstoque, $quantidade, $nomeFuncionario ){
            $this -> nomeEstoque     = $nomeEstoque;
            $this -> quantidade     = $quantidade;
            $this -> nomeFuncionario     = $nomeFuncionario;
         
           
        }

        public function gravar(Db $db){
            $dados = [];
            $dados["nomeEstoque"] = $this->nomeEstoque;
            $dados["quantidade"] = $this->quantidade;
            $dados["nomeFuncionario"] = $this->nomeFuncionario;
            $db -> gravar($dados);
        }
        public function consultar(Db $db, $campos, $where){
            $dados = $db->consultar($campos, $where);
            return $dados;
        }
        public function alterar(Db $db, $where, $dados){
            $db->alterar($where, $dados);
        

        }

        public function excluir(Db $db, $where){
            $db->excluir($where);
        }

        }

    
?>