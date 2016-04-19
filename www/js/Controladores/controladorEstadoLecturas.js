angular.module('starter.controladorestadolecturas', [])

.controller('Estadolecturas', function($scope, $ionicLoading, $cordovaFile, $cordovaCamera, factoryEstadoLecturas)
{
    angular.element(document).ready(function () 
    {
    	$scope.estadolectura = factoryEstadoLecturas.totalLecturas;
    	console.log("Logo");
        $cordovaFile.checkFile(cordova.file.externalRootDirectory, "AQuaMovil/Entradas/LogoImpresion.jpg")
        .then(function (archivo) {
          console.log(archivo);
          var ruta = archivo.nativeURL;
          document.getElementById("rutaImagenLectura").value = ruta;
        }, function (error) {
        });

    	if ($scope.estadolectura.length == 0) 
    	{
	    	var cicloGuardado = document.getElementById("txtCiclo").value;
			var rutaGuardada = document.getElementById("txtRuta").value;
	    	dbShell.transaction(function(tx) 
			{            
				tx.executeSql("SELECT * FROM UsuariosServicios where Ciclo=? and Ruta=?", [cicloGuardado,rutaGuardada],                
				
				function(tx, result)
				{
					for(var i = 0; i < result.rows.length; i++) 
					{  
						var idLista = i;
						var idUsuario = result.rows.item(i)['IdUsuario'];
						var numeroMedidor = result.rows.item(i)['NumeroMedidor'];
						var lecturaActual = result.rows.item(i)['LecturaActual'];
						var causalActual = result.rows.item(i)['CausalActual'];
						var ciclo = result.rows.item(i)['Ciclo'];
						var ruta = result.rows.item(i)['Ruta'];
						var observacionActual = result.rows.item(i)['ObservacionActual'];
						var consecutivo = result.rows.item(i)['Consecutivo'];   
						
						$scope.newEstadoLecturas =
						{
							idLista: idLista,
							idUsuario: idUsuario,
							numeroMedidor: numeroMedidor,
							lecturaActual: lecturaActual,
							causalActual: causalActual,
							ciclo: ciclo,
							ruta: ruta,
							observacionActual: observacionActual,
							consecutivo: consecutivo 
						};

						$scope.estadolectura.push($scope.newEstadoLecturas);
						$("#inputControlLecturas").val($scope.estadolectura.length);
					}
					console.log($("#inputControlLecturas").val());
				});    
			});
		}
    });

	//Función para mostrar en pantalla el registro buscado

	$scope.ubicarRegistro = function(a,b,ciclo,ruta) 
	{	
	    dbShell.transaction(function(tx) 
		{  
			var a1 = a;
			var a2 = b;
			var ciclo1 = ciclo;
			var ruta1 = ruta;

			tx.executeSql("SELECT * FROM UsuariosServicios where Ciclo=? and Ruta=?",[ciclo1,ruta1], 
			function(tx, result)
			{
				var idUsu = a2;
				var dato = a1;
				var RegAnt = dato - 1;
				var RegSig = dato + 1;

				var LectActual = parseInt(result.rows.item(dato)['LecturaActual']);

				var CauActual = parseInt(result.rows.item(dato)['CausalActual']);

				if(dato == 0)
				{
					document.getElementById('txtIdUsuarioLecturaAnt').value = " ";
					$("#btnSig i").removeClass("disable");
					$("#btnSig span").removeClass("disable");
					$("#btnAnt span").addClass("disable");
					$("#btnAnt i").addClass("disable");
					$("#btnSig").attr("onClick", "ContarLecturas()");
					$("#btnAnt").attr("onClick", " ");

					var ConsecSig = result.rows.item(RegSig)['Consecutivo'];
					document.getElementById('txtIdUsuarioLecturaSig').value = "Siguiente: " + result.rows.item(RegSig)['IdUsuario'] + ": " + ciclo + "-" + ruta + "-" + ConsecSig;
				}

				if(dato == result.rows.length-1)
				{
					document.getElementById('txtIdUsuarioLecturaSig').value = " ";
					$("#btnSig i").addClass("disable");
					$("#btnSig span").addClass("disable");
					$("#btnAnt span").removeClass("disable");
					$("#btnAnt i").removeClass("disable");
					$("#btnSig").attr("onClick", " ");
					$("#btnAnt").attr("onClick", "validarLectAnt()");

					var ConsecAnt = result.rows.item(RegAnt)['Consecutivo'];

					document.getElementById('txtIdUsuarioLecturaAnt').value = "Anterior: " + result.rows.item(RegAnt)['IdUsuario'] + ": " + ciclo + "-" + ruta + "-" + ConsecAnt;
				}

				if(dato > 0 && dato <= result.rows.length-2)
				{
					$("#btnSig i").removeClass("disable");
					$("#btnSig span").removeClass("disable");
					$("#btnAnt span").removeClass("disable");
					$("#btnAnt i").removeClass("disable");
					$("#btnSig").attr("onClick", "ContarLecturas()");
					$("#btnAnt").attr("onClick", "validarLectAnt()");

					var ConsecAnt = result.rows.item(RegAnt)['Consecutivo'];
					var ConsecSig = result.rows.item(RegSig)['Consecutivo'];

					document.getElementById('txtIdUsuarioLecturaAnt').value = "Anterior: " + result.rows.item(RegAnt)['IdUsuario'] + ": " + ciclo + "-" + ruta + "-" + ConsecAnt;

					document.getElementById('txtIdUsuarioLecturaSig').value = "Siguiente: " + result.rows.item(RegSig)['IdUsuario'] + ": " + ciclo + "-" + ruta + "-" + ConsecSig;				
				}

				ContarRegistros(ciclo,ruta);

				document.getElementById('txtNumRegistro').value = dato;
				document.getElementById('txtNumero').value = result.rows.item(dato)['Numero'];

				document.getElementById('txtIdUsuarioLectura').value = result.rows.item(dato)['IdUsuario'];
				document.getElementById('txtidUsuarioLecturaCtrl').value = result.rows.item(dato)['IdUsuario'];

				var Ciclotx = result.rows.item(dato)['Ciclo'];
				document.getElementById('txtCiclo2').value = "Ciclo: " + Ciclotx;
				
				var Rutatx = result.rows.item(dato)['Ruta'];
				document.getElementById('txtRuta2').value = "Ruta: " + Rutatx;

				document.getElementById('txtCRC').value = result.rows.item(dato)['Consecutivo'];			
				document.getElementById("txtCicloNuevo").value = result.rows.item(dato)['CicloNuevo'];
				document.getElementById("txtRutaNueva").value = result.rows.item(dato)['RutaNueva'];
				document.getElementById("txtConsecutivoNuevo").value = result.rows.item(dato)['ConsecutivoNuevo'];
				document.getElementById("txtImpreso").value = result.rows.item(dato)['impreso'];
				document.getElementById("txtEditado").value = result.rows.item(dato)['editado'];
				document.getElementById('txtDireccion').value = result.rows.item(dato)['Direccion'];
				document.getElementById('txtMedidor').value = "MED.# " + result.rows.item(dato)['NumeroMedidor'];	
				document.getElementById('txtTipoMedidor').value = result.rows.item(dato)['TipoMedidor'];
				document.getElementById('consumo').value = result.rows.item(dato)['Consumo'];
				document.getElementById('conceptoCritica').value = result.rows.item(dato)['ConceptoCritica'];

				var IdUsotx = result.rows.item(dato)['IdUso'];

				if(IdUsotx == 1)
				{
					document.getElementById('txtUso').value = "USO: RESIDENCIAL";
				}

				if(IdUsotx == 2)
				{
					document.getElementById('txtUso').value = "USO: COMERCIAL";
				}

				if(IdUsotx == 3)
				{
					document.getElementById('txtUso').value = "USO: INDUSTRIAL";
				}

				if(IdUsotx == 4)
				{
					document.getElementById('txtUso').value = "USO: OFICIAL";
				}

				if(IdUsotx == 5)
				{
					document.getElementById('txtUso').value = "USO: ESPECIAL";
				}

				if(IdUsotx == 6)
				{
					document.getElementById('txtUso').value = "USO: PROVISIONAL";
				}

				document.getElementById('txtCategoria').value = "CATEGORIA: " + result.rows.item(dato)['IdCategoria'];

				var numeroFotostx = result.rows.item(dato)['NumeroFotos'];
				document.getElementById('contadorFotos').value = numeroFotostx;

				//var LecturaAnteriortx = document.getElementById('txtLecturaAnterior').value;
				//LecturaAnteriortx.innerHTML = result.rows.item(dato)['LecturaAnterior'];

				//var ConsumoMediotx = document.getElementById('txtPromedio').value;
				//ConsumoMediotx.innerHTML = result.rows.item(dato)['ConsumoMedio'];

				document.getElementById('txtNombre').value = result.rows.item(dato)['Suscriptor'];
				document.getElementById('txtLectura').value = result.rows.item(dato)['LecturaActual'];
				document.getElementById('txtObservacion2').value = result.rows.item(dato)['ObservacionDos'];
				document.getElementById('txtObservacion3').value = result.rows.item(dato)['ObservacionTres'];
				document.getElementById('txtCausal').value = result.rows.item(dato)['CausalActual'];
				document.getElementById('txtObservacion').value = result.rows.item(dato)['ObservacionActual'];

				if(LectActual >= 0 || CauActual >= 1)
				{
					activarImpresion();
					permitirEditar();
				}

				else
				{
					desactivarImpresion();
					permitirEditar();
				}
			});
		});
	}

	/*--------------------------------------------------------------------------------*/

	//Función para tomar foto desde el menú de cargue

	$scope.Foto = function()
	{
		var siImpreso = document.getElementById("txtImpreso").value; 
		if (siImpreso == "si") {
			swal("Atención", "El tiquete ya se imprimió y no es posible tomar mas fotos", "warning");
		}

		else
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

			$scope.contarFotos();

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
	}

	$scope.contarFotos = function()
	{
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
				swal("Correcto", "Foto Guardada", "success");
			});
		});
	}
});

		