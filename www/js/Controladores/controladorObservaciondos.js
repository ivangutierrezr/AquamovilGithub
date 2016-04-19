angular.module('starter.controladorobservaciondos', [])

.controller('Observaciondos', function($scope, $ionicLoading, $cordovaFile, $cordovaCamera, factoryObservaciones)
{
	$scope.obs2 = factoryObservaciones.totalObservaciones;
    angular.element(document).ready(function () 
    {
    	if ($scope.obs2.length == 0) 
    	{
			dbShell.transaction( function(tx) 
			{            
				tx.executeSql("SELECT * FROM Observaciones", [],                
				
				function(tx, result)
				{              
					for(var i=1; i < result.rows.length; i++) 
					{
						var id2 = i;
						var idObservacion2 = result.rows.item(i)['IdObservacion'];
						var nombreObservacion2 = result.rows.item(i)['NombreObservacion'];

						$scope.newObs2 =
						{
							id2: id2,
							idObservacion2: idObservacion2,
							nombreObservacion2: nombreObservacion2
						};

						$scope.obs2.push($scope.newObs2);
					}               
				});    
			});
		}
		else
		{
			$scope.obs2 = factoryObservaciones.totalObservaciones;
		}
    });


	$scope.mostrarObs2 = function(a)
	{
		var idObservacion2 = $scope.obs2[a-1].idObservacion2;
		$('#txtCodObservacion2').val(idObservacion2);
		var nombreObservacion2 = $scope.obs2[a-1].nombreObservacion2;
		$('#txtNomObservacion2').val(nombreObservacion2);

		$("li").css("background-color", "transparent");
		$("li a div").css("color", "#000");
		$("li a div").css("font-weight", "normal");

		$("#ob2"+a).css("background-color", "#ef473a");
		$("#ob2"+a + " div").css("color", "#FFF");
		$("#ob2"+a + " div").css("font-weight", "bold");
	}

	/*----------------------------------------------------------------------------------*/
	// Verifica que la observación 2 exija foto

	$scope.verficarFotoObservacion2 = function()
	{
		var idObservacion = document.getElementById("txtCodObservacion2").value;
		
		dbShell.transaction(function(tx) 
		{
			tx.executeSql("select * from Observaciones Where IdObservacion=? ",[idObservacion], 
				function(tx, result)
			{
				var exFoto = result.rows.item(0)['exigeFoto'];

				if(idObservacion == document.getElementById("txtObservacion").value || idObservacion == document.getElementById("txtObservacion3").value)
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
							  		$scope.FotoObservacion2();
							  	}

							  	else 
							  	{	
							  		swal("Cancelado", "", "error");
							  		document.getElementById("txtObservacion2").value = ""; 
								} 
							});
					}

					else
					{
						document.getElementById("txtObservacion2").value = idObservacion;
						ActualizarArchivo(); 
					}
				}
			});
		});
	}


	/*--------------------------------------------------------------------------------*/

	//Función para tomar foto de la segunda observación

	$scope.FotoObservacion2 = function()
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

			$scope.contarFotosObservacion2();

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

	$scope.contarFotosObservacion2 = function()
	{
		var idObservacion = document.getElementById("txtCodObservacion2").value;
		document.getElementById("txtObservacion2").value = idObservacion;
		var numeroReg = document.getElementById('txtNumero').value;
		var fotosReg = parseInt(document.getElementById("contadorFotos").value);

		fotosReg = fotosReg + 1;

		console.log(fotosReg);

		dbShell.transaction(function(tx) 
		{    		
			tx.executeSql("Update UsuariosServicios set NumeroFotos=? where Numero=?",[fotosReg,numeroReg],
			function(tx, result)
			{
				document.getElementById("contadorFotos").value = fotosReg;
				console.log(fotosReg);
				swal({
					title: "Correcto",
					text: "Foto Guardada",
					type: "success",
					timer: 2000,
					showConfirmButton: false
					});

				setTimeout("ActualizarArchivo()", 2200);
			});
		});
	}
});