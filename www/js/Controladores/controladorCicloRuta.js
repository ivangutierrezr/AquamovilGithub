angular.module('starter.controladorcicloruta', [])

.controller('Cicloruta', function($scope, $ionicLoading, $cordovaFile)
{
	$scope.listacicloruta = [];
    angular.element(document).ready(function () 
    {
    	//
    	var idbd = document.getElementById("idOperario").value;
    	dbShell.transaction( function(tx) 
		{            
			tx.executeSql("SELECT * FROM AsignacionRutas where Oper=?", [idbd],                
			function(tx, result)
			{  
				if (result.rows.length == 0) 
				{
			        swal("Atención","No se encuentran rutas asignadas a su usuario, por favor comuniquese con el adminsitrador","error");
					window.location.href = "#/menuprincipal"
			    }

				for(var i=0; i < result.rows.length; i++) 
				{   
					if(result.rows.length != 0)
					{
						var numDato = 0;
						var ciclo = result.rows.item(i)['Ciclo'];
						var ruta = result.rows.item(i)['Ruta'];             
						
						$scope.newCR =
						{
							numDato: numDato,
							ciclo: ciclo,
							ruta: ruta
						};

						$scope.listacicloruta.push($scope.newCR);
						$("#inputControlCR").val($scope.listacicloruta.length);
					}
					
					else
					{
						swal("Atención", "Usted no tiene permisos para efectuar lecturas", "error");
					}
				}              
			});    
		});
    });

	/*----------------------------------------------------------------------------------*/

	//Mostrar el primer dato de lectura

	$scope.primeraLectura = function(ciclo,ruta,a)
	{
		document.getElementById('txtCiclo').value = ciclo;
		document.getElementById('txtRuta').value = ruta;
		var dato = a;
		//
		dbShell.transaction(function(tx) 
		{ 	
			tx.executeSql("select * FROM UsuariosServicios where Ciclo=? and Ruta=?",[ciclo,ruta], 
			function(tx,result)
			{
				if(result.rows.length == 0)
				{
					swal("Atención","No existen registros con el Ciclo y Ruta seleccionados","error");
					window.location.href = "#/cicloruta"
				}

				if(result.rows.length > 0)
				{
					var LectActual = parseInt(result.rows.item(dato)['LecturaActual']);
					var CauActual = parseInt(result.rows.item(dato)['CausalActual']);
					var ciclo2 = parseInt(result.rows.item(dato)['Ciclo']);
					var ruta2 = parseInt(result.rows.item(dato)['Ruta']);

					if((LectActual >= 0 || CauActual > 0) && dato <= result.rows.length - 2)
					{
						var num = dato + 1;
						$scope.primeraLectura(ciclo2,ruta2,num);
					}

					else
					{
						MostrarPrimeraLectura(ciclo2,ruta2,dato);
					}
				}
			});
		});	
	}

	function MostrarPrimeraLectura(ciclo,ruta,a)
	{
		var dato = a;
		//
		dbShell.transaction(function(tx) 
		{ 	
			tx.executeSql("select * FROM UsuariosServicios where Ciclo=? and Ruta=?",[ciclo,ruta], 
			function(tx,result)
			{
				if(result.rows.length > 0)
				{
					var RegSig = dato + 1;
					var RegAnt = dato - 1;

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
						var ConsecAnt = result.rows.item(RegAnt)['Consecutivo'];
						var ConsecSig = result.rows.item(RegSig)['Consecutivo'];

						$("#btnSig i").removeClass("disable");
						$("#btnSig span").removeClass("disable");
						$("#btnAnt span").removeClass("disable");
						$("#btnAnt i").removeClass("disable");
						$("#btnSig").attr("onClick", "ContarLecturas()");
						$("#btnAnt").attr("onClick", "validarLectAnt()");

						document.getElementById('txtIdUsuarioLecturaAnt').value = "Anterior: " + result.rows.item(RegAnt)['IdUsuario'] + ": " + ciclo + "-" + ruta + "-" + ConsecAnt;

						document.getElementById('txtIdUsuarioLecturaSig').value = "Siguiente: " + result.rows.item(RegSig)['IdUsuario'] + ": " + ciclo + "-" + ruta + "-" + ConsecSig;			
					}

					ContarRegistros(ciclo,ruta);

					document.getElementById("txtIdOperario").innerHTML = document.getElementById("nombreOperario").value;

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

					if(document.getElementById('txtLectura').value >= 0 || document.getElementById('txtCausal').value >= 1)
					{
						activarImpresion();
						permitirEditar();
					}

					if(document.getElementById('txtLectura').value == '' && document.getElementById('txtCausal').value == 0)
					{
						desactivarImpresion();
						permitirEditar();
					}
				}
			});
		});	
	}

	/*--------------------------------------------------------------------------------*/
	//Funciones para descargar Archivo de Lectura
	 
	$scope.DescargarArchivo = function(cic,rut) 
	{
	    var cicloParaDescargar = cic;
	    var rutaParaDescargar = rut;

	    var ruta = cordova.file.externalRootDirectory + "AQuaMovil/Salidas/";
	    var nombreArchivo;

	    swal(
	    {
	        title: "Atención",
	        text: "¿Desea descargar Archivo de Lecturas del Ciclo: " + cic + " y Ruta: " + rut +"?, Esto puede tardar varios minutos",
	        type: "warning",
	        showCancelButton: true,
	        confirmButtonColor: "#0088C4",
	        confirmButtonText: "Si",
	        cancelButtonText: "Cancelar",
	        closeOnConfirm: false,
	        closeOnCancel: false
	    }, 

	    function(isConfirm)
	    {
	        if (isConfirm) 
	        {
	            $scope.iniciarDescargaLecturas();
	        }

	        else 
	        {
	            swal(
	            {
	                title: "Descarga Cancelada",
	                text: "Regresando",
	                timer: 2000,
	                showConfirmButton: false 
	            });
	        }   
	    });


		$scope.iniciarDescargaLecturas = function() 
		{
		    var periodo = document.getElementById("periodoActual").value;

		    while(periodo.length < 3)
		    {
		        periodo = "0" + periodo;
		    }

		    var cic = cicloParaDescargar.toString();
		    var rut = rutaParaDescargar.toString();

		    while(cic.length < 2)
		    {
		        cic = "0" + cic;
		    }

		    while(rut.length < 2)
		    {
		        rut = "0" + rut;
		    }

		    nombreArchivo = "L" + "" + periodo + "" + cic + "" + rut + ".csv";

		     $cordovaFile.checkFile(ruta, nombreArchivo)
		      .then(function (success) {
		        $scope.borrarArchivoLecturas();
		      }, function (error) {
		        $scope.crearArchivoLecturas();
		      });
		}

		$scope.borrarArchivoLecturas = function()
		{
			$cordovaFile.removeFile(ruta, nombreArchivo)
			.then(function (success) {
			 	$scope.crearArchivoLecturas();
			}, function (error) {
				//
			});
		}

		$scope.crearArchivoLecturas = function()
		{
			$cordovaFile.createFile(ruta, nombreArchivo, true)
			.then(function (success) {
				$scope.escrbirEncabezadoLecturas();
			}, function (error) {
				swal("Atención","Error al crear archivo","warning");
			});
		}

		$scope.escrbirEncabezadoLecturas = function()
		{
			var textoEncabezado = 'IdUsuario,Ciclo,Ruta,Consecutivo,Direccion,NumeroMedidor,TipoMedidor,LecturaAnterior,ConsumoMedio,Suscriptor,IdUso,IdCategoria,EdadAcueducto,VolumenAseo,CtasAcR,CtasAcNR,CtasAlR,CtasAlNR,CtasAsR,CtasAsNR,UltimaFechaDeFacturacion,Consumo,ConceptoCritica,LecturaActual,CausalActual,ObservacionActual,ObservacionDos,ObservacionTres,Fecha,Hora,latitud,longitud,altura,CicloNuevo,RutaNueva,ConsecutivoNuevo,NumeroFotos,Usuario,impreso,editado,numeroFactura,fechaFactura,fechaLimiteDePago,\n'

			$cordovaFile.writeExistingFile(ruta, nombreArchivo, textoEncabezado)
			.then(function (success) {
				//
				$scope.escrbirArchivoLecturas(0);
			}, function (error) {
				alert("Error al escribir linea")
			});
		}

		$scope.escrbirArchivoLecturas = function(numero)
		{
			dbShell.transaction(function(tx) 
	        {            
	            tx.executeSql("SELECT * FROM UsuariosServicios where Ciclo=? and Ruta=?",[cicloParaDescargar,rutaParaDescargar],                
	            function(tx, result)
	            {
	            	var nuevoNumero = numero + 1;

	            	if (numero == result.rows.length)
	                {
						swal("Correcto", "Archivo " + nombreArchivo + " descargado con éxito","success");
	                }

	            	if (numero < result.rows.length)
	                {   
	                	var porcentaje = (parseInt(nuevoNumero)/parseInt(result.rows.length))*100;
	                	var porcentajeInt = parseInt(porcentaje);
	                	swal("Descargando...", "Progreso: (" + porcentajeInt + "%) " + nuevoNumero + "/" + result.rows.length,"success");
						var IdUsuario = result.rows.item(numero)['IdUsuario'];
						var Ciclo = result.rows.item(numero)['Ciclo'];
						var Ruta = result.rows.item(numero)['Ruta'];
						var Consecutivo = result.rows.item(numero)['Consecutivo'];
						var Direccion = result.rows.item(numero)['Direccion'];
						var NumeroMedidor = result.rows.item(numero)['NumeroMedidor'];
						var TipoMedidor = result.rows.item(numero)['TipoMedidor'];
						var LecturaAnterior = result.rows.item(numero)['LecturaAnterior'];
						var ConsumoMedio = result.rows.item(numero)['ConsumoMedio'];
						var Suscriptor = result.rows.item(numero)['Suscriptor'];
						var IdUso = result.rows.item(numero)['IdUso'];
						var IdCategoria = result.rows.item(numero)['IdCategoria'];
						var EdadAcueducto = result.rows.item(numero)['EdadAcueducto'];
						var VolumenAseo = result.rows.item(numero)['VolumenAseo'];
						var CtasAcR = result.rows.item(numero)['CtasAcR'];
						var CtasAcNR = result.rows.item(numero)['CtasAcNR'];
						var CtasAlR = result.rows.item(numero)['CtasAlR'];
						var CtasAlNR = result.rows.item(numero)['CtasAlNR'];
						var CtasAsR = result.rows.item(numero)['CtasAsR'];
						var CtasAsNR = result.rows.item(numero)['CtasAsNR'];
						var UltimaFechaDeFacturacion = result.rows.item(numero)['UltimaFechaDeFacturacion'];
						var Consumo = result.rows.item(numero)['Consumo'];
						var ConceptoCritica = result.rows.item(numero)['ConceptoCritica'];
						var LecturaActual = result.rows.item(numero)['LecturaActual'];
						var CausalActual = result.rows.item(numero)['CausalActual'];
						var ObservacionActual = result.rows.item(numero)['ObservacionActual'];
						var ObservacionDos = result.rows.item(numero)['ObservacionDos'];
						var ObservacionTres = result.rows.item(numero)['ObservacionTres'];
						var Fecha = result.rows.item(numero)['Fecha'];
						var Hora = result.rows.item(numero)['Hora'];
						var latitud = result.rows.item(numero)['latitud'];
						var longitud = result.rows.item(numero)['longitud'];
						var altura = result.rows.item(numero)['altura'];
						var CicloNuevo = result.rows.item(numero)['CicloNuevo'];
						var RutaNueva = result.rows.item(numero)['RutaNueva'];
						var ConsecutivoNuevo = result.rows.item(numero)['ConsecutivoNuevo'];
						var NumeroFotos = result.rows.item(numero)['NumeroFotos'];
						var Usuario = result.rows.item(numero)['Usuario'];
						var impreso = result.rows.item(numero)['impreso'];
						var editado = result.rows.item(numero)['editado'];
						var numeroFactura = result.rows.item(numero)['numeroFactura'];
						var fechaFactura = result.rows.item(numero)['fechaFactura'];
						var fechaLimiteDePago = result.rows.item(numero)['fechaLimiteDePago'];

						var textoLectura = IdUsuario + ',' + Ciclo + ',' + Ruta + ',' + Consecutivo + ',' + Direccion + ',' + NumeroMedidor + ',' + TipoMedidor + ',' + LecturaAnterior + ',' + ConsumoMedio + ',' + Suscriptor + ',' + IdUso + ',' + IdCategoria + ',' + EdadAcueducto + ',' + VolumenAseo + ',' + CtasAcR + ',' + CtasAcNR + ',' + CtasAlR + ',' + CtasAlNR + ',' + CtasAsR + ',' + CtasAsNR + ',' + UltimaFechaDeFacturacion + ',' + Consumo + ',' + ConceptoCritica + ',' + LecturaActual + ',' + CausalActual + ',' + ObservacionActual + ',' + ObservacionDos + ',' + ObservacionTres + ',' + Fecha + ',' + Hora + ',' + latitud + ',' + longitud + ',' + altura + ',' + CicloNuevo + ',' + RutaNueva + ',' + ConsecutivoNuevo + ',' + NumeroFotos + ',' + Usuario + ',' + impreso + ',' + editado + ',' + numeroFactura + ',' + fechaFactura + ',' + fechaLimiteDePago + ',' + '\n';

						$cordovaFile.writeExistingFile(ruta, nombreArchivo, textoLectura)
						.then(function (success) 
						{
							$scope.escrbirArchivoLecturas(nuevoNumero);
						}, 
						function (error) 
						{
							//
						});
	                }
	            });    
	        });
		}	   
	}
});