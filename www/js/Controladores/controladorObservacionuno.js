angular.module('starter.controladorobservacionuno', [])

.controller('Observacionuno', function($scope, $ionicLoading, $cordovaFile, $cordovaCamera, factoryObservaciones)
{
	$scope.obs1 = factoryObservaciones.totalObservaciones;
    angular.element(document).ready(function () 
    {
    	if ($scope.obs1.length == 0) 
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

						$scope.newObs1 =
						{
							id: id,
							idObs: idObs,
							nombreObs: nombreObs
						};

						$scope.obs1.push($scope.newObs1);
					}               
				});    
			});
		}

		else
		{
			$scope.obs1 = factoryObservaciones.totalObservaciones;
		}
    });

	$scope.mostrarObs1 = function(a)
	{
		var idObservacion1 = $scope.obs1[a-1].idObs;
		$('#txtCodObservacion').val(idObservacion1);
		var nombreObservacion1 = $scope.obs1[a-1].nombreObs;
		$('#txtNomObservacion').val(nombreObservacion1);

		$("li").css("background-color", "transparent");
		$("li a div").css("color", "#000");
		$("li a div").css("font-weight", "normal");

		$("#ob1"+a).css("background-color", "#ef473a");
		$("#ob1"+a + " div").css("color", "#FFF");
		$("#ob1"+a + " div").css("font-weight", "bold");
	}

	/*----------------------------------------------------------------------------------*/
	// Verifica que la observación 1 exija foto

	$scope.verficarFotoObservacion = function()
	{
		var idObservacion = document.getElementById("txtCodObservacion").value;
		
		dbShell.transaction(function(tx) 
		{
			tx.executeSql("select * from Observaciones Where IdObservacion=? ",[idObservacion], 
				function(tx, result)
			{
				var exFoto = result.rows.item(0)['exigeFoto'];

				if(idObservacion == document.getElementById("txtObservacion2").value || idObservacion == document.getElementById("txtObservacion3").value)
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
							  		$scope.FotoObservacion1();
							  	}

							  	else 
							  	{	
							  		swal("Cancelado", "", "error");
							  		document.getElementById("txtObservacion").value = ""; 
								} 
							});
					}

					else
					{
						document.getElementById("txtObservacion").value = idObservacion;
						ActualizarArchivo(); 
					}
				}
			});
		});
	}

	/*--------------------------------------------------------------------------------*/

	//Función para tomar foto de la primera observación

	$scope.FotoObservacion1 = function()
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

			$scope.contarFotosObservacion1();

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

	$scope.contarFotosObservacion1 = function()
	{
		var idObservacion = document.getElementById("txtCodObservacion").value
		document.getElementById("txtObservacion").value = idObservacion;
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

				setTimeout("ActualizarArchivo()", 2200);
			});
		});
	}
});