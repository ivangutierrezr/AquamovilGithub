angular.module('starter.controladorcatastrousuariosnuevaencuesta', [])

.controller('CatastroUsuariosnuevaencuesta', function($scope, $ionicLoading, $cordovaFile)
{
    angular.element(document).ready(function () 
    {
        console.log("Logo");
        $cordovaFile.checkFile(cordova.file.externalRootDirectory, "AQuaMovil/Entradas/LogoImpresion.png")
        .then(function (archivo) {
          console.log(archivo);
          var ruta = archivo.nativeURL;
          $("#logoEmpresaESPNuevaEncuesta").attr('src', ruta);
          $("#logoEmpresaESPNuevaEncuesta").attr('width', "100%");
        }, function (error) {
        });
    });
});