angular.module('starter.controladorcatastrousuarios', [])

.controller('CatastroUsuarios', function($scope, $ionicLoading, $cordovaFile, $cordovaCamera)
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

 /*--------------------------------------------------------------------------------*/

  //Función para tomar foto de Catastro

  $scope.FotoCatastro = function()
  {
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.JPEG,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    $cordovaCamera.getPicture(options).then(function(sourcePath)
    {
      var sourceDirectory = sourcePath.substring(0, sourcePath.lastIndexOf('/') + 1);
      var sourceFileName = sourcePath.substring(sourcePath.lastIndexOf('/') + 1, sourcePath.length);

      var ruta = cordova.file.externalRootDirectory + 'AQuaMovil/Salidas/Fotos';

      $scope.contarFotosCausal();

      var idOperador = document.getElementById("idOperario").value;

        while (idOperador.length < 10)
        {
          idOperador = "0" + idOperador;
        }

        var numeroEncuesta = parseInt(document.getElementById("numeroEncuesta").value) + "";

        var numeroFoto = (parseInt(document.getElementById("numeroFotosCat").value) + 1);

        var consecutivoFoto = (parseInt(document.getElementById("numeroFotosCat").value) + 1) + "";

        document.getElementById("numeroFotosCat").value = numeroFoto;

        while(consecutivoFoto.length < 2)
        {
          consecutivoFoto = "0" + consecutivoFoto;
        }

        //new file name
        var newFileName = "FC" + numeroEncuesta + "" + idOperador + "" + consecutivoFoto + ".jpg";

      $cordovaFile.moveFile(sourceDirectory, sourceFileName, ruta, nombreFoto)
      .then(function(success) 
      {
        console.log("Imagen Guardada");
      }, 
      function(error) 
      {
        console.log(error);
      });

    }, 
    function(err) 
    {
      console.log(err);
    });
  }
});