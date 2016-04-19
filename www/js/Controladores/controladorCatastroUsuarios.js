angular.module('starter.controladorcatastrousuarios', [])

.controller('CatastroUsuarios', function($scope, $ionicLoading, $cordovaFile)
{
    angular.element(document).ready(function () 
    {
        console.log("Logo");
        $cordovaFile.checkFile(cordova.file.externalRootDirectory, "AQuaMovil/Entradas/LogoImpresion.png")
        .then(function (archivo) {
          console.log(archivo);
          var ruta = archivo.nativeURL;
          $("#logoEmpresaESPCatastro").attr('src', ruta);
          $("#logoEmpresaESPCatastro").attr('width', "100%");
        }, function (error) {
        });
    });
});