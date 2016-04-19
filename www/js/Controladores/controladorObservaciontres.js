angular.module('starter.controladorobservaciontres', [])

.controller('Observaciontres', function($scope, $ionicLoading, $cordovaFile, $cordovaCamera, factoryObservaciones)
{
	$scope.obs3 = factoryObservaciones.totalObservaciones;
    angular.element(document).ready(function () 
    {
    	if ($scope.obs3.length == 0) 
    	{
			dbShell.transaction( function(tx) 
			{            
				tx.executeSql("SELECT * FROM Observaciones", [],                
				
				function(tx, result)
				{              
					for(var i=1; i < result.rows.length; i++) 
					{
						var id3 = i;
						var idObservacion3 = result.rows.item(i)['IdObservacion'];
						var nombreObservacion3 = result.rows.item(i)['NombreObservacion'];

						$scope.newObs3 =
						{
							id3: id3,
							idObservacion3: idObservacion3,
							nombreObservacion3: nombreObservacion3
						};

						$scope.obs3.push($scope.newObs3);
					}               
				});    
			});
		}

		else
		{
			$scope.obs3 = factoryObservaciones.totalObservaciones;
		}
    });


	$scope.mostrarObs3 = function(a)
	{
		var idObservacion3 = $scope.obs3[a-1].idObservacion3;
		$('#txtCodObservacion3').val(idObservacion3);
		var nombreObservacion3 = $scope.obs3[a-1].nombreObservacion3;
		$('#txtNomObservacion3').val(nombreObservacion3);

		$("li").css("background-color", "transparent");
		$("li a div").css("color", "#000");
		$("li a div").css("font-weight", "normal");

		$("#ob3"+a).css("background-color", "#ef473a");
		$("#ob3"+a + " div").css("color", "#FFF");
		$("#ob3"+a + " div").css("font-weight", "bold");
	}

	/*----------------------------------------------------------------------------------*/
	// Verifica que la observación 3 exija foto

	$scope.verficarFotoObservacion3 = function()
	{
		var idObservacion = document.getElementById("txtCodObservacion3").value;
		
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
							  		$scope.FotoObservacion3();
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
						document.getElementById("txtObservacion3").value = idObservacion;
						ActualizarArchivo();
					}
				}
			});
		});
	}

	/*--------------------------------------------------------------------------------*/

	//Función para tomar foto de la tercera observación

	$scope.FotoObservacion3 = function()
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

			$scope.contarFotosObservacion3();

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

	$scope.contarFotosObservacion3 = function()
	{
		var idObservacion = document.getElementById("txtCodObservacion3").value;
		document.getElementById("txtObservacion3").value = idObservacion;
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