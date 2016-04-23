angular.module('starter.controladorcausales', [])

.controller('Causales', function($scope, $ionicLoading, $cordovaFile, $cordovaCamera, factoryCausales)
{
	$scope.causal = factoryCausales.totalCausales;
    angular.element(document).ready(function () 
    {
    	if ($scope.causal.length == 0) 
    	{
    		dbShell.transaction( function(tx) 
			{            
				tx.executeSql("SELECT * FROM Causales", [],                
				
				function(tx, result)
				{                 
					for(var i=1; i < result.rows.length; i++) 
					{   
						var id = i;
						var idCausal = result.rows.item(i)['IdCausal'];
						var nombreCausal = result.rows.item(i)['NombreCausal'];

						$scope.newCausal = 
						{
							id: id,
							idCausal: idCausal,
							nombreCausal: nombreCausal
						};

						$scope.causal.push($scope.newCausal);
					}               
				});    
			});
    	}
    });

	$scope.mostrarCausal = function(a)
	{
		var idCausal = $scope.causal[a-1].idCausal;
		$('#txtCodCausal').val(idCausal);
		var nombreCausal = $scope.causal[a-1].nombreCausal;
		$('#txtNomCausal').val(nombreCausal);

		$("li").css("background-color", "transparent");
		$("li a div").css("color", "#000");
		$("li a div").css("font-weight", "normal");

		$("#c"+a).css("background-color", "#ef473a");
		$("#c"+a + " div").css("color", "#FFF");
		$("#c"+a + " div").css("font-weight", "bold");
	}

	/*----------------------------------------------------------------------------------*/
	// Verifica que la causal exija foto u observación

	$scope.verficarFotoCausal = function()
	{
		var idCausal = document.getElementById("txtCodCausal").value;
		document.getElementById("txtCausal").value = document.getElementById("txtCodCausal").value;
		dbShell.transaction(function(tx) 
		{
			tx.executeSql("select * from Causales Where IdCausal=? ",[idCausal], 
				function(tx, result)
			{
				var exFoto = result.rows.item(0)['exigeFoto'];
				var exObs = result.rows.item(0)['exigeObservacion'];

				if(exFoto == "TRUE" || exFoto == "true" || exFoto == "True" || exFoto == "1" || exFoto == "VERDADERO" || exFoto == "verdadero" || exFoto == "Verdadero" || exFoto == "si" || exFoto == "SI" || exFoto == "Si")
				{
					swal({
						title: "Atencíon!",
						text: "Esta Causal Requiere una foto de evidencia, debe tomar una antes de continuar",
						type: "warning",
						showCancelButton: true,
						confirmButtonColor: "#0088C4",
						confirmButtonText: "Foto",
						cancelButtonText: "Volver",
						closeOnConfirm: true,
						closeOnCancel: false},

						function(isConfirm)
						{
							if (isConfirm) 
							{
						  		$scope.FotoCausal();
						  	}

						  	else 
						  	{	
						  		swal("Cancelado", "", "error");   
							} 
						});
				}

				else
				{
					verficarCausal();
				}
			});
		});
	}


	/*--------------------------------------------------------------------------------*/

	//Función para tomar foto de Causal

	$scope.FotoCausal = function()
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

			if (idOperador.length < 10)
			{
				idOperador = "0" + idOperador;
			}

			var idUsuario = document.getElementById("txtIdUsuarioLectura").value;

			while(idUsuario.length < 6)
			{
				idUsuario = "0" + idUsuario;
			}

			var periodo = document.getElementById("periodoActual").value;

			while(periodo.length < 3)
			{
				periodo = "0" + periodo;
			}

			var date = new Date();
			var d  = date.getDate();
			var day = (d < 10) ? '0' + d : d;
			var w = date.getMonth() + 1;
			var month = (w < 10) ? '0' + w : w;
			var yy = date.getYear();
			var year = (yy < 1000) ? yy + 1900 : yy;
			var year2 = year.toString();
			var año = year2.substring(2,4);

			var fecha =day+""+month+""+año;

			var consecutivoFoto = (parseInt(document.getElementById("contadorFotos").value) + 1) + "";

			while(consecutivoFoto.length < 3)
			{
				consecutivoFoto = "0" + consecutivoFoto;
			}

			//new file name
			var nombreFoto = "F" + idOperador + "" + idUsuario + "" + fecha + "" + periodo + "" +consecutivoFoto + ".jpg";

			$cordovaFile.moveFile(sourceDirectory, sourceFileName, ruta, nombreFoto)
			.then(function(success) 
			{
		 		//
			}, 
			function(error) 
			{
		 		//
			});

		}, 
		function(err) 
		{
			//
		});
	}

	$scope.contarFotosCausal = function()
	{
		var numeroReg = document.getElementById('txtNumero').value;
		var fotosReg = parseInt(document.getElementById("contadorFotos").value);

		fotosReg = fotosReg + 1;

		//

		dbShell.transaction(function(tx) 
		{    		
			tx.executeSql("Update UsuariosServicios set NumeroFotos=? where Numero=?",[fotosReg,numeroReg],
			function(tx, result)
			{
				document.getElementById("contadorFotos").value = fotosReg;
				//
				swal({
						title: "Correcto",
						text: "Foto Guardada",
						type: "success",
						timer: 2000,
						showConfirmButton: false
					});

				setTimeout("verficarCausal()", 2200);
			});
		});
	}
});
 
