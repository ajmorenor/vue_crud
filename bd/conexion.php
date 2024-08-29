<?php
    class Conexion {
        
        public static function Conectar() {
            define('servidor','localhost');
            define('nombre_bd','crudconvuejs');
            define('usuario','root');
            define('password','');
            //$opciones = array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8');
            try{
                $conexion = new PDO("mysql:dbname=".nombre_bd."; host=".servidor."; charset=UTF8; port=3306", usuario, password);//, $opciones);
                return $conexion;
            }catch (Exception $e){
                die("Error de conexion es: " . $e->getMessage());
            }
        }
    }
?>