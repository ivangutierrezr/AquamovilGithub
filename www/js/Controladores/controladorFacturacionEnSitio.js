angular.module('starter.controladordacturacionensitio', [])

.controller('Facturacionensitio', function($scope, $ionicLoading, $cordovaFile)
{
    angular.element(document).ready(function () 
    {
        console.log("Logo");
        $cordovaFile.checkFile(cordova.file.externalRootDirectory, "AQuaMovil/Entradas/LogoImpresion.jpg")
        .then(function (archivo) {
          console.log(archivo);
          var ruta = archivo.nativeURL;
          document.getElementById("rutaImagenFactura").value = ruta;
        }, function (error) {
        });

        $cordovaFile.checkFile(cordova.file.externalRootDirectory, "AQuaMovil/Entradas/Logo.png")
        .then(function (archivo) {
          console.log(archivo);
          var ruta2 = archivo.nativeURL;
          $("#logoEmpresaESP").attr('src', ruta2);
          $("#logoEmpresaESP").attr('width', "100%");
        }, function (error) {
        });
    });
});