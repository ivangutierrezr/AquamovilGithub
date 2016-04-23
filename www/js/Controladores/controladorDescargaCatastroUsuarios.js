angular.module('starter.controladordescargacatastrousuarios', [])

.controller('Descargacatastrousuarios', function($scope, $ionicLoading, $cordovaFile)
{	
	//
	DescargarArchivoCatastro();
    //FUnciones para descarga archivos de catastro

	function DescargarArchivoCatastro() 
	{
		$("#numeroPaquete").val(0);
		$("#minimoDescarga").val(0);
		$("#maximoDescarga").val(0);
		swal({
			title: "Bloqueo de Seguridad",
			text: "Ingrese la clave para descarga",
			type: "input",
			inputType: "password",
			showCancelButton: true,
			closeOnConfirm: false,
			animation: "slide-from-top",
			inputPlaceholder: "Password" }, 
			function(inputValue)
			{
				if (inputValue === false) return false;

				if (inputValue === "") 
				{
						swal.showInputError("Debe ingresar la clave de seguridad");
						return false;
				}

				if (inputValue != "soportemv") 
				{
						swal.showInputError("Clave Incorrecta");
						return false;
				}

				if (inputValue == "soportemv") 
				{
					$scope.numeroProceso();	
				}
			});
	}

	$scope.numeroProceso =  function()
	{
		swal({
		title: "Ingrese el # de proceso",
		text: "1 - Info Encuestas\n2 - Respuestas Abiertas\n3 - Respuestas Cerradas",
		type: "input",
		inputType: "number",
		showCancelButton: true,
		closeOnConfirm: false,
		animation: "pop",
		inputPlaceholder: "1 - 2 - 3" }, 
		function(inputValue)
		{
			if (inputValue === false) return false;

			else if (inputValue === "") 
			{
					swal.showInputError("Debe ingresgar el número del proceso (1, 2 o 3");
					return false;
			}

			else if (inputValue == 1) 
			{
				$scope.definirPaqueteDeDatos(1);
			}

			else if (inputValue == 2)
			{
				$scope.definirPaqueteDeDatos(2); 
			}

			else if (inputValue == 3)
			{
				$scope.definirPaqueteDeDatos(3);
			}

			else
			{
				swal.showInputError("El proceso ingresado no existe");
				return false;
			}
		}); 
	}

	$scope.definirPaqueteDeDatos = function(numProceso)
	{
		swal({
		title: "Descargar paquete de datos",
		text: "Ingrese el número de paquete que desea descargar",
		type: "input",
		inputType: "number",
		showCancelButton: true,
		closeOnConfirm: false,
		animation: "pop",
		inputPlaceholder: "Ej:1" }, 
		function(inputValue)
		{
			if (inputValue === false) return false;

			else if (inputValue === "") 
			{
					swal.showInputError("Ingrese el numero del paquete");
					return false;
			}

			else if (inputValue > 0) 
			{
				var numeroPaquete = inputValue;
				$("#numeroPaquete").val(numeroPaquete);
				$scope.definirTamanoPaqueteDeDatos(numProceso);
			}

			else
			{
				swal.showInputError("Número de paquete incorrecto");
				return false;
			}
		}); 
	}

	$scope.definirTamanoPaqueteDeDatos = function(numProceso)
	{
		swal({
		title: "Descargar paquete de datos",
		text: "Ingrese el tamaño del paquete de datos",
		type: "input",
		inputType: "number",
		showCancelButton: true,
		closeOnConfirm: false,
		animation: "pop",
		inputPlaceholder: "Ej:250" }, 
		function(inputValue)
		{
			if (inputValue === false) return false;

			else if (inputValue === "") 
			{
					swal.showInputError("Ingrese el numero del paquete");
					return false;
			}

			else if (inputValue > 0) 
			{
				var numeroPaquete = parseInt($("#numeroPaquete").val());
				var tamanoPaquete = inputValue;
				var minimoDescarga = (numeroPaquete-1)*tamanoPaquete;
				var maximoDescarga = numeroPaquete*tamanoPaquete;

				$("#tamanoPaquete").val(tamanoPaquete);
				$("#minimoDescarga").val(minimoDescarga);
				$("#maximoDescarga").val(maximoDescarga);

				if(numProceso == 1)
				{
					$("#idProcesoDescargaCatastro").val(numProceso);
					$scope.descargarInformacionEncuestas();
				}

				if(numProceso == 2)
				{
					$("#idProcesoDescargaCatastro").val(numProceso);
					$scope.descargarRespuestasAbiertas();
				}

				if(numProceso == 3)
				{
					$("#idProcesoDescargaCatastro").val(numProceso);
					$scope.descargarRespuestasCerradas();
				}
			}

			else
			{
				swal.showInputError("Tamaño de paquete invalido");
				return false;
			}
		}); 
	}

	$scope.descargarSiguientePaquete = function()
	{
		var numPaquete = parseInt($("#numeroPaquete").val());
		var minDescarga = parseInt($("#minimoDescarga").val());
		var maxDescarga = parseInt($("#maximoDescarga").val());
		var tamanoPaquete = parseInt($("#tamanoPaquete").val());
		var sigPaquete = numPaquete + 1;
		swal({
			title: "Descarga de paquete #"+numPaquete+" completa",
			text: "¿Desea descargar el paquete no." + sigPaquete + "?",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#0088C4",
			confirmButtonText: "Si",
			cancelButtonText: "No",
			closeOnConfirm: false,
			closeOnCancel: false }, 
			function(isConfirm)
			{
				if (isConfirm) 
				{
					var minDescargaSig = minDescarga + tamanoPaquete;
					var maxDescargaSig = maxDescarga + tamanoPaquete;

					$("#numeroPaquete").val(sigPaquete);
					$("#minimoDescarga").val(minDescargaSig);
					$("#maximoDescarga").val(maxDescargaSig);
					var idProcesoDescarga = $("#idProcesoDescargaCatastro").val();

					if(idProcesoDescarga == 1 || idProcesoDescarga == "1")
					{
						$scope.descargarInformacionEncuestas();
					}

					if(idProcesoDescarga == 2 || idProcesoDescarga == "2")
					{
						$scope.descargarRespuestasAbiertas();
					}

					if(idProcesoDescarga == 3 || idProcesoDescarga == "3")
					{
						$scope.descargarRespuestasCerradas();
					}  
				} 
				else 
				{
					swal("Cancelado", "Regresando al menú principal", "error");
					window.location.href = "#/menuprincipal";
				}
				
			});
	}

	$scope.descargarInformacionEncuestas = function()
	{
		var idOperario = document.getElementById("idOperario").value;
	    var numPKG = document.getElementById("numeroPaquete").value;

	    var nombreArchivo = "C-IE" + "" + idOperario + "PKG" + numPKG + ".csv";
	    var ruta = cordova.file.externalRootDirectory + "AQuaMovil/Salidas/";

	    $cordovaFile.checkFile(ruta, nombreArchivo)
		.then(function (success) {
			$scope.borrarArchivoInformacionEncuestas(ruta,nombreArchivo);
		}, function (error) {
			$scope.crearArchivoInformacionEncuestas(ruta,nombreArchivo);
		});
	}

	$scope.descargarRespuestasAbiertas = function()
	{
		var idOperario = document.getElementById("idOperario").value;
	    var numPKG = document.getElementById("numeroPaquete").value;
	    //

	    var nombreArchivo = "C-RA" + "" + idOperario + "PKG" + numPKG + ".csv";
	    var ruta = cordova.file.externalRootDirectory + "AQuaMovil/Salidas/";

	    $cordovaFile.checkFile(ruta, nombreArchivo)
		.then(function (success) {
			$scope.borrarArchivoRespuestasAbiertas(ruta,nombreArchivo);
		}, function (error) {
			$scope.crearArchivoRespuestasAbiertas(ruta,nombreArchivo);
		});
	}

	$scope.descargarRespuestasCerradas = function()
	{
		var idOperario = document.getElementById("idOperario").value;
	    var numPKG = document.getElementById("numeroPaquete").value;

	    var nombreArchivo = "C-RC" + "" + idOperario + "PKG" + numPKG + ".csv";
	    var ruta = cordova.file.externalRootDirectory + "AQuaMovil/Salidas/";

	    $cordovaFile.checkFile(ruta, nombreArchivo)
		.then(function (success) {
			$scope.borrarArchivoRespuestasCerradas(ruta,nombreArchivo);
		}, function (error) {
			$scope.crearArchivoRespuestasCerradas(ruta,nombreArchivo);
		});
	}

	$scope.borrarArchivoInformacionEncuestas = function(ruta,nombreArchivo)
	{
		$cordovaFile.removeFile(ruta, nombreArchivo)
		.then(function (success) {
		 	$scope.crearArchivoInformacionEncuestas(ruta,nombreArchivo);
		}, function (error) {
			//
		});
	}

	$scope.borrarArchivoRespuestasAbiertas = function(ruta,nombreArchivo)
	{
		$cordovaFile.removeFile(ruta, nombreArchivo)
		.then(function (success) {
		 	$scope.crearArchivoRespuestasAbiertas(ruta,nombreArchivo);
		}, function (error) {
			//
		});
	}

	$scope.borrarArchivoRespuestasCerradas = function(ruta,nombreArchivo)
	{
		$cordovaFile.removeFile(ruta, nombreArchivo)
		.then(function (success) {
		 	$scope.crearArchivoRespuestasCerradas(ruta,nombreArchivo);
		}, function (error) {
			//
		});
	}

	$scope.crearArchivoInformacionEncuestas = function(ruta,nombreArchivo)
	{
		$cordovaFile.createFile(ruta, nombreArchivo, true)
		.then(function (success) {
			$scope.escrbirEncabezadoinformacionEncuestas(ruta,nombreArchivo);
		}, function (error) {
			swal("Atención","Error al crear archivo","warning");
		});
	}

	$scope.crearArchivoRespuestasAbiertas = function(ruta,nombreArchivo)
	{
		$cordovaFile.createFile(ruta, nombreArchivo, true)
		.then(function (success) {
			$scope.escrbirEncabezadoRespuestasAbiertas(ruta,nombreArchivo);
		}, function (error) {
			swal("Atención","Error al crear archivo","warning");
		});
	}

	$scope.crearArchivoRespuestasCerradas = function(ruta,nombreArchivo)
	{
		$cordovaFile.createFile(ruta, nombreArchivo, true)
		.then(function (success) {
			$scope.escrbirEncabezadoRespuestasCerradas(ruta,nombreArchivo);
		}, function (error) {
			swal("Atención","Error al crear archivo","warning");
		});
	}

	$scope.escrbirEncabezadoinformacionEncuestas = function(ruta,nombreArchivo)
	{
		var textoEncabezado = "IdOperario,NumeroEncuesta,Fecha,HoraInicial,HoraFinal,Latitud,Longitud,Altitud,Editado,FechaEdicion,HoraInicialEdicion,HoraFinalEdicion,CantidadFotos,\n";

		$cordovaFile.writeExistingFile(ruta, nombreArchivo, textoEncabezado)
		.then(function (success) {
			//
			$scope.escrbirArchivoInformacionEncuestas(0,ruta,nombreArchivo);
		}, function (error) {
			alert("Error al escribir linea")
		});
	}

	$scope.escrbirEncabezadoRespuestasAbiertas = function(ruta,nombreArchivo)
	{
		var textoEncabezado = "IdOperario,IdEncuesta,IdPregunta,TextoRespuesta,\n";

		$cordovaFile.writeExistingFile(ruta, nombreArchivo, textoEncabezado)
		.then(function (success) {
			//
			$scope.escrbirArchivoRespuestasAbiertas(0,ruta,nombreArchivo);
		}, function (error) {
			alert("Error al escribir linea")
		});
	}

	$scope.escrbirEncabezadoRespuestasCerradas = function(ruta,nombreArchivo)
	{
		 var textoEncabezado = "IdOperario,IdEncuesta,IdPregunta,IdOpcion,\n";

		$cordovaFile.writeExistingFile(ruta, nombreArchivo, textoEncabezado)
		.then(function (success) {
			//
			$scope.escrbirArchivoRespuestasCerradas(0,ruta,nombreArchivo);
		}, function (error) {
			alert("Error al escribir linea")
		});
	}

	$scope.escrbirArchivoInformacionEncuestas = function(contador,ruta,nombreArchivo)
	{
		var numPaquete = $("#numeroPaquete").val();
		var minDescarga = $("#minimoDescarga").val();
		var maxDescarga = $("#maximoDescarga").val();
		var idOperario = document.getElementById("idOperario").value;
	    var totalLineas;

    	dbShell.transaction( function(tx) 
        {            
            tx.executeSql("SELECT * FROM InformacionEncuesta where IdOperario=? ORDER BY Numero ASC",[idOperario],              
            function(tx, result)
            {
            	var nuevoNumero = contador + 1;

            	totalLineas = result.rows.length;

            	if(minDescarga <= totalLineas)
            	{
            		if (contador < result.rows.length && contador < maxDescarga) 
	                {  
	                	var porcentaje = (parseInt(nuevoNumero)/parseInt(maxDescarga))*100;
	                	var porcentajeInt = parseInt(porcentaje);
	                	swal("Descargando...", "Progreso: (" + porcentajeInt + "%) " + nuevoNumero + "/" + maxDescarga,"success"); 
	                    var IdOperario = result.rows.item(contador)['IdOperario'];
	                    var NumeroEncuesta = result.rows.item(contador)['NumeroEncuesta'];
	                    var Fecha = result.rows.item(contador)['Fecha'];
	                    var HoraInicial = result.rows.item(contador)['HoraInicial'];
	                    var HoraFinal = result.rows.item(contador)['HoraFinal'];
	                    var Latitud = result.rows.item(contador)['Latitud'];
	                    var Longitud = result.rows.item(contador)['Longitud'];
	                    var Altitud = result.rows.item(contador)['Altitud'];
						var Editado = result.rows.item(contador)['Editado'];
						var FechaEdicion = result.rows.item(contador)['FechaEdicion'];
						var HoraInicialEdicion = result.rows.item(contador)['HoraInicialEdicion'];
						var HoraFinalEdicion = result.rows.item(contador)['HoraFinalEdicion'];
	                    var CantidadFotos = result.rows.item(contador)['CantidadFotos'];

	                    var textoCatastro = IdOperario + ',' + NumeroEncuesta + ',' + Fecha + ',' + HoraInicial + ',' + HoraFinal + ',' + Latitud + ',' + Longitud + ',' + Altitud + ',' + Editado + ',' + FechaEdicion + ',' + HoraInicialEdicion + ',' + HoraFinalEdicion + ',' +  CantidadFotos + ',\n';

	                    $cordovaFile.writeExistingFile(ruta, nombreArchivo, textoCatastro)
						.then(function (success) 
						{
							$scope.escrbirArchivoInformacionEncuestas(nuevoNumero,ruta,nombreArchivo);
						}, 
						function (error) 
						{
							//
						});
	                }

	                if(contador == maxDescarga)
	                {
	                	$scope.descargarSiguientePaquete();
	                }

	                if(contador == result.rows.length)
	                {
	                	swal("Descarga Finalizada", "El archivo "+nombreArchivo+" se ha descargado por completo","success");
	                	window.location.href = "#/menuprincipal";
	                }
            	}
            });    
        });
	}

	$scope.escrbirArchivoRespuestasAbiertas = function(contador,ruta,nombreArchivo)
	{
		var numPaquete = $("#numeroPaquete").val();
		var minDescarga = $("#minimoDescarga").val();
		var maxDescarga = $("#maximoDescarga").val();
		var idOperario = document.getElementById("idOperario").value;
	    var totalLineas;

    	dbShell.transaction( function(tx) 
        {            
            tx.executeSql("SELECT * FROM RespuestasAbiertas where IdOperario=? ORDER BY IdEncuesta ASC, IdPregunta ASC",[idOperario],                
            function(tx, result)
            {
            	var nuevoNumero = contador + 1;

            	totalLineas = result.rows.length;

            	if(minDescarga <= totalLineas)
            	{
            		if (contador < result.rows.length && contador < maxDescarga) 
	                {  
	                	var porcentaje = (parseInt(nuevoNumero)/parseInt(maxDescarga))*100;
	                	var porcentajeInt = parseInt(porcentaje);
	                	swal("Descargando...", "Progreso: (" + porcentajeInt + "%) " + nuevoNumero + "/" + maxDescarga,"success"); 
	                    var IdOperario = result.rows.item(contador)['IdOperario'];
	                    var IdEncuesta = result.rows.item(contador)['IdEncuesta'];
	                    var IdPregunta = result.rows.item(contador)['IdPregunta'];
	                    var TextoRespuesta = result.rows.item(contador)['TextoRespuesta'];

	                    var contenidoListaRegistros = IdOperario + ',' + IdEncuesta + ',' + IdPregunta + ',' + TextoRespuesta + ',\n';

	                    $cordovaFile.writeExistingFile(ruta, nombreArchivo, contenidoListaRegistros)
						.then(function (success) 
						{
							$scope.escrbirArchivoRespuestasAbiertas(nuevoNumero,ruta,nombreArchivo);
						}, 
						function (error) 
						{
							//
						});
	                }

	                if(contador == maxDescarga)
	                {
	                	$scope.descargarSiguientePaquete();
	                }

	                if(contador == result.rows.length)
	                {
	                	swal("Descarga Finalizada", "El archivo "+nombreArchivo+" se ha descargado por completo","success");
	                	window.location.href = "#/menuprincipal";
	                }
            	}
            });    
        });
	}

	$scope.escrbirArchivoRespuestasCerradas = function(contador,ruta,nombreArchivo)
	{
		var numPaquete = $("#numeroPaquete").val();
		var minDescarga = $("#minimoDescarga").val();
		var maxDescarga = $("#maximoDescarga").val();
		var idOperario = document.getElementById("idOperario").value;
	    var totalLineas;

    	dbShell.transaction( function(tx) 
        {            
            tx.executeSql("SELECT * FROM RespuestasCerradas where IdOperario=? ORDER BY IdEncuesta ASC, IdPregunta ASC",[idOperario],                
            function(tx, result)
            {
            	var nuevoNumero = contador + 1;

            	totalLineas = result.rows.length;

            	if(minDescarga <= totalLineas)
            	{
            		if (contador < result.rows.length && contador < maxDescarga) 
	                {  
	                	var porcentaje = (parseInt(nuevoNumero)/parseInt(maxDescarga))*100;
	                	var porcentajeInt = parseInt(porcentaje);
	                	swal("Descargando...", "Progreso: (" + porcentajeInt + "%) " + nuevoNumero + "/" + maxDescarga,"success");
	                	var IdOperario = result.rows.item(contador)['IdOperario'];
	                    var IdEncuesta = result.rows.item(contador)['IdEncuesta'];
	                    var IdPregunta = result.rows.item(contador)['IdPregunta'];
	                    var IdOpcion = result.rows.item(contador)['IdOpcion'];

	                    var contenidoListaRegistros = IdOperario + ',' + IdEncuesta + ',' + IdPregunta + ',' + IdOpcion + ',\n';

	                    $cordovaFile.writeExistingFile(ruta, nombreArchivo, contenidoListaRegistros)
						.then(function (success) 
						{
							$scope.escrbirArchivoRespuestasCerradas(nuevoNumero,ruta,nombreArchivo);
						}, 
						function (error) 
						{
							//
						});
	                }

	                if(contador == maxDescarga)
	                {
	                	$scope.descargarSiguientePaquete();
	                }

	                if(contador == result.rows.length)
	                {
	                	swal("Descarga Finalizada", "El archivo "+nombreArchivo+" se ha descargado por completo","success");
	                	window.location.href = "#/menuprincipal";
	                }
            	}
            });    
        });
    }
});