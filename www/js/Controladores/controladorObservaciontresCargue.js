angular.module('starter.controladorobservaciontrescargue', [])

.controller('Observaciontrescargue', function($scope, $ionicLoading, $cordovaFile, $cordovaCamera, factoryObservaciones)
{
	$scope.obs3cargue = factoryObservaciones.totalObservaciones;
    angular.element(document).ready(function () 
    {
    	if ($scope.obs3cargue.length == 0) 
    	{
			dbShell.transaction( function(tx) 
			{            
				tx.executeSql("SELECT * FROM Observaciones", [],                
				
				function(tx, result)
				{              
					for(var i=1; i < result.rows.length; i++) 
					{
						var id = i;
						var idObs = result.rows.item(i)['IdObservacion'];
						var nombreObs = result.rows.item(i)['NombreObservacion'];

						$scope.newObs3Cargue =
						{
							id: id,
							idObs: idObs,
							nombreObs: nombreObs
						};

						$scope.obs3cargue.push($scope.newObs3Cargue);
					}               
				});    
			});
		}
		else
		{
			$scope.obs3cargue = factoryObservaciones.totalObservaciones;
		}
    });

	$scope.mostrarObs3Cargue = function(a)
	{
		var idObservacion3Cargue = $scope.obs3cargue[a-1].idObs;
		$('#txtCodObservacion3Cargue').val(idObservacion3Cargue);
		var nombreObservacion3Cargue = $scope.obs3cargue[a-1].nombreObs;
		$('#txtNomObservacion3Cargue').val(nombreObservacion3Cargue);

		$("li").css("background-color", "transparent");
		$("li a div").css("color", "#000");
		$("li a div").css("font-weight", "normal");

		$("#ob3cargue"+a).css("background-color", "#ef473a");
		$("#ob3cargue"+a + " div").css("color", "#FFF");
		$("#ob3cargue"+a + " div").css("font-weight", "bold");
	}

	/*----------------------------------------------------------------------------------*/
	// Verifica que la observación 2 ingresada desde el menu de Cargue exija foto

	$scope.verficarFotoObservacion6 = function()
	{
		var idObservacion = document.getElementById("txtCodObservacion3Cargue").value;
		
		dbShell.transaction(function(tx) 
		{
			tx.executeSql("select * from Observaciones Where IdObservacion=? ",[idObservacion], 
				function(tx, result)
			{
				var exFoto = result.rows.item(0)['exigeFoto'];

				if(idObservacion == document.getElementById("txtObservacion").value || idObservacion == document.getElementById("txtObservacion2").value)
				{
					swal("Atención", "Este Código de Observación ya ha sido ingresado, escoja otro", "warning");
				}

				else
				{
					if(exFoto == "TRUE" || exFoto == "true" || exFoto == "True" || exFoto == "-1" || exFoto == "VERDADERO" || exFoto == "verdadero" || exFoto == "Verdadero" || exFoto == "si" || exFoto == "SI" || exFoto == "Si")
					{
						swal({
							title: "Atencíon!",
							text: "Esta Observación Requiere una foto de evidencia, debe tomar una antes de continuar",
							type: "warning",
							showCancelButton: true,
							confirmButtonColor: "#0088C4",
							confirmButtonText: "Foto",
							cancelButtonText: "Volver",
							closeOnConfirm: true,
							closeOnCancel: false },

							function(isConfirm)
							{
								if (isConfirm) 
								{
							  		$scope.FotoObservacion6();
							  	}

							  	else 
							  	{	
							  		swal("Cancelado", "", "error");
							  		document.getElementById("txtObservacion3").value = "";
								} 
							});
					}

					else
					{
						validarNuevaObs3(idObservacion);
					}
				}
			});
		});
	}


	/*--------------------------------------------------------------------------------*/

	//Función para tomar foto de la segunda observación ingresadas desde el menú de cargue

	$scope.FotoObservacion6 = function()
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

			$scope.contarFotosObservacion6();

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

	$scope.contarFotosObservacion6 = function()
	{
		var idObservacion = document.getElementById("txtCodObservacion3Cargue").value;
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
					showCancelButton: false,
					confirmButtonColor: "#0088C4",
					confirmButtonText: "Aceptar",
					closeOnConfirm: true,
					closeOnCancel: false},

					function(isConfirm)
					{
						if (isConfirm) 
						{
							validarNuevaObs3(idObservacion);
					  	}
					});
			});
		});
	}
});