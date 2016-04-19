angular.module('starter.controladorcargainicial', [])

.controller('Cargainicial', function($scope, $ionicLoading, $cordovaFile)
{

	//Funciones para Cargar Usuarios

	$scope.borrarUsuarios = function ()
	{
		dbShell.transaction(function(tx)
		{
			tx.executeSql("Drop Table Usuarios");
			CrearTablaUsuarios();
			$scope.Usuarios();
		});
	}

	$scope.Usuarios = function ()
	{
		$cordovaFile.checkFile(cordova.file.externalRootDirectory, "AQuaMovil/Entradas/Usuarios.csv")
	      .then(function (archivo) {
	        console.log(archivo);
	        $cordovaFile.readAsText(cordova.file.externalRootDirectory, "AQuaMovil/Entradas/Usuarios.csv")
		      .then(function (archivo) {
		        var usuarios = archivo;
				dbShell.transaction(function(tx) 
				{   
					tx.executeSql("select Count(*) as Cantidad from Usuarios  ",[], 
					function(tx, result)
					{
						var tipoArchivo = typeof result.rows.item(0)['Cantidad'];
						if(1==1)
						{
							var Control = usuarios.match(/\n/g);
							for(var i = 0; i < Control.length; i++)
							{											
								var UltimoDato = usuarios.indexOf('\n') // Se determina que ";" es salto de linea
								var Dato = usuarios.substring(0,UltimoDato);
								var SeperarDato = Dato.split(','); // Se determina que cada dato a incluir en la BD se separa con ","

								tx.executeSql("Insert Into Usuarios (Id, Nombres, Apellidos, Login, Pass, UltimoNoFactura, Control)Values(?,?,?,?,?,?,?)",[SeperarDato[0],SeperarDato[1],SeperarDato[2],SeperarDato[3],SeperarDato[4],SeperarDato[5],i]);

								console.log(SeperarDato[0]);
								console.log(SeperarDato[1]);
								console.log(SeperarDato[2]);
								console.log(SeperarDato[3]);
								console.log(SeperarDato[4]);
								console.log(SeperarDato[5]);
								console.log(i);
															
								usuarios=usuarios.substring(UltimoDato+1,usuarios.length); 
								usuariosSubidos = i+1;
							}
							swal("Cargue Realizado con éxito", "Cargados " + usuariosSubidos + " Usuarios", "success");
							confimarUsuariosOperativos();
						}
					});
				});
		      }, function (error) {
		        //
		      });

	      }, function (error) {
	        swal("El archivo no se encuentra");
	      });
	}

	//Funciones para Cargar Permisos Aquamovil

	$scope.borrarPermisosAquamovil = function ()
	{
		dbShell.transaction(function(tx)
		{
			tx.executeSql("Drop Table PermisosAquamovil");
			CrearTablaPermisosAquamovil();
			$scope.PermisosAquamovil();
		});
	}

	$scope.PermisosAquamovil = function ()
	{
		$cordovaFile.checkFile(cordova.file.externalRootDirectory, "AQuaMovil/Entradas/PermisosAQuamovil.csv")
	      .then(function (archivo) {
	        console.log(archivo);
	        $cordovaFile.readAsText(cordova.file.externalRootDirectory, "AQuaMovil/Entradas/PermisosAQuamovil.csv")
		      .then(function (archivo) {
		       	var permisosAquamovil=archivo;		
				dbShell.transaction(function(tx) 
				{   
					tx.executeSql("select Count(*) as Cantidad from PermisosAquamovil",[], 
					function(tx, result)
					{				
						var tipoArchivo = typeof result.rows.item(0)['Cantidad'];
						if(1 == 1)
						{
							var Control = permisosAquamovil.match(/\n/g);
							for(var i = 0; i < Control.length; i++)
							{						
								var UltimoDato = permisosAquamovil.indexOf('\n') // Se determina que ";" es salto de linea
								var Dato = permisosAquamovil.substring(0,UltimoDato);
								var SepararDato = Dato.split(","); // Se determina que cada dato a incluir en la BD se separa con ","

								tx.executeSql("Insert Into PermisosAquamovil (Numero, IdUsuario, IdProceso,IdOpcion,Habilitado,Control) Values(?,?,?,?,?,?)",[
									i,
									SepararDato[0],
									SepararDato[1],
									SepararDato[2],
									SepararDato[3],
									"a"]);

								console.log(SepararDato[0]);
								console.log(SepararDato[1]);
								console.log(SepararDato[2]);
								console.log(SepararDato[3]);
								console.log(SepararDato[4]);
								console.log(i);
								
								permisosAquamovil=permisosAquamovil.substring(UltimoDato+1,permisosAquamovil.length); 
								permisosAquamovilSubidos = i+1;
							}
							swal("Cargue Realizado con éxito", "Cargados " + permisosAquamovilSubidos + " Permisos", "success");
							confimarPermisosAquamovil();
						}
					});
				});
		      }, function (error) {
		        //
		      });

	      }, function (error) {
	        swal("El archivo no se encuentra");
	      });
	}


	//Funciones para Cargar UsuariosServicios

	$scope.confirmarNuevosUsuariosServicios = function ()
	{
		dbShell.transaction(function(tx) 
		{    		
			tx.executeSql("select Count(*) as Cantidad from UsuariosServicios Where LecturaActual<>'' or CausalActual>0 ",[], 
			function(tx, result)
			{
				if(result.rows.item(0)['Cantidad'] > 0)
				{
					swal({
					title: "Seguro?",   
					text: "Hay registros diligenciados en la base de datos, una vez borrados no podrán recuperarse!",   
					type: "warning",   
					showCancelButton: true,   
					confirmButtonColor: "#FFDC8B",   
					confirmButtonText: "Si, Actualizar",   
					cancelButtonText: "No",   
					closeOnConfirm: false,   
					closeOnCancel: false
					}, 

					function(isConfirm)
					{   
						if (isConfirm)
						{
							$scope.borrarUsuariosServicios();
							$("#divCR li").removeClass('pintarCRDiligenciado');
							$("#divCR li").addClass('pintarCRSinDiligenciar');
						} 
						else 
						{
							swal("Cancelado", "Archivo de Usuarios de Servicios Convservado", "error");   
						}
					});
				}
				else
				{
					$scope.borrarUsuariosServicios();		
				}	
			});
		});
	}

	$scope.borrarUsuariosServicios = function ()
	{
		dbShell.transaction(function(tx)
		{
			tx.executeSql("Drop Table UsuariosServicios");
			CrearTablaUsuariosServicios();
			$scope.UsuariosServicios();
		});
	}

	$scope.UsuariosServicios = function ()
	{
		console.log("Entro");
		$cordovaFile.checkFile(cordova.file.externalRootDirectory, "AQuaMovil/Entradas/UsuariosServicios.csv")
	      .then(function (archivo) {
	        console.log(archivo);
	        $cordovaFile.readAsText(cordova.file.externalRootDirectory, "AQuaMovil/Entradas/UsuariosServicios.csv")
		      .then(function (archivo) {
		       	var UsuariosServicios = archivo;			
				dbShell.transaction(function(tx) 
				{   
					tx.executeSql("select Count(*) as Cantidad  from Usuarios  ",[], 
					function(tx, result)
					{				
						var tipoArchivo= typeof result.rows.item(0)['Cantidad'];
						if(1 == 1)
						{
							var Control = UsuariosServicios.match(/\n/g);
							for(var i = 0; i < Control.length ; i++)
							{						
								var UltimoDato = UsuariosServicios.indexOf('\n'); // Se determina que "/n" es salto de linea
								var Dato = UsuariosServicios.substring(0,UltimoDato);
								var SepararDato = Dato.split(','); // Se determina que cada dato a incluir en la BD se separa con ","
								
								tx.executeSql("Insert Into UsuariosServicios (Numero, IdUsuario, Ciclo, Ruta, Consecutivo, Direccion, NumeroMedidor, TipoMedidor, LecturaAnterior, ConsumoMedio, Suscriptor, IdUso, IdCategoria, EdadAcueducto, VolumenAseo, CtasAcR, CtasAcNR, CtasAlR, CtasAlNR, CtasAsR, CtasAsNR, UltimaFechaDeFacturacion, Consumo, ConceptoCritica, LecturaActual, CausalActual, ObservacionActual, ObservacionDos, ObservacionTres, Fecha, Hora, latitud, longitud, altura, CicloNuevo, RutaNueva, ConsecutivoNuevo, NumeroFotos, Usuario, impreso, editado,numeroFactura,fechaFactura,fechaLimiteDePago)Values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[
									i, //Numero
									SepararDato[0],  //IdUsuario
									SepararDato[1],  //Ciclo
									SepararDato[2],  //Ruta
									SepararDato[3],  //Consecutivo
									SepararDato[4],  //Dirección
									SepararDato[5],  //Numero Medidor
									SepararDato[6],  //Tipo Medidor
									SepararDato[7],  //Lectura Anterior
									SepararDato[8],  //Consumo Medio
									SepararDato[9],  //Suscriptor
									SepararDato[10], //Id Uso
									SepararDato[11], //Id Categoria
									SepararDato[12], //Edad Acueducto
									SepararDato[13], //Volumen Aseo
									SepararDato[14], //Cuentas Acueducto Residencial
									SepararDato[15], //Cuentas Acueducto No Residencial
									SepararDato[16], //Cuentas Alcantarillado Residencial
									SepararDato[17], //Cuentas Alcantarillado No Residencial
									SepararDato[18], //Cuentas Aseo Residencial
									SepararDato[19], //Cuentas Aseo No Residencial
									SepararDato[20], //Ultima Fecha de Facturacion
									"",				 //Consumo
									"",				 //ConceptoCrítica
									"", 			 //Lectura Actual
									0, 				 //Causal Actual
									0, 				 //Obs 1
									0, 				 //Obs 2
									0, 				 //Obs 3
									"", 			 //Fecha
									"", 			 //Hora
									"", 			 //Latitud
									"", 			 //Longitud
									"", 			 //Altura
									"", 			 //Ciclo Nuevo
									"", 			 //Ruta Nueva
									"", 			 //Consecutivo Nuevo						
									0,				 //Num Fotos
									"", 			 //Usuario
									"no",			 //Impreso
									"no", 			 //Editado
									"",
									"",
									""]);			 
								
								UsuariosServicios=UsuariosServicios.substring(UltimoDato+1,UsuariosServicios.length); 
								UsuariosServiciosSubidos = i+1;
							}
							swal("Cargue Realizado con éxito", "Cargados " + UsuariosServiciosSubidos + " Usuarios de Servicios", "success");

							confimarUsuariosServicios();
						}
					});
				});
		      }, function (error) {
		        //
		      });

	      }, function (error) {
	        swal("El archivo no se encuentra");
	      });
	}

	//Funciones para Cargar AsignacionRutas

	$scope.borrarAsignacionRutas = function ()
	{
		dbShell.transaction(function(tx)
		{
			tx.executeSql("Drop Table AsignacionRutas");
			CrearTablaAsignacionRutas();
			$scope.AsignacionRutas();
		});
	}

	$scope.AsignacionRutas = function ()
	{
		$cordovaFile.checkFile(cordova.file.externalRootDirectory, "AQuaMovil/Entradas/AsignacionRutas.csv")
	      .then(function (archivo) {
	        console.log(archivo);
	        $cordovaFile.readAsText(cordova.file.externalRootDirectory, "AQuaMovil/Entradas/AsignacionRutas.csv")
		      .then(function (archivo) {
		        var AsignacionRutas = archivo;
				dbShell.transaction(function(tx) 
				{   

					tx.executeSql("select Count(*) as Cantidad from AsignacionRutas ",[], 
					function(tx, result)
					{
						var tipoArchivo = typeof result.rows.item(0)['Cantidad'];
						if(1==1)
						{
							var Control = AsignacionRutas.match(/\n/g);
							for(var i = 0; i < Control.length; i++)
							{											
								var UltimoDato = AsignacionRutas.indexOf('\n') // Se determina que ";" es salto de linea
								var Dato = AsignacionRutas.substring(0,UltimoDato);
								var SeperarDato = Dato.split(','); // Se determina que cada dato a incluir en la BD se separa con ","

								tx.executeSql("Insert Into AsignacionRutas (Numero, Ciclo, Ruta, Oper, Control)Values(?,?,?,?,?)",[
									i,
									SeperarDato[0],
									SeperarDato[1],
									SeperarDato[2],
									"a"]);
															
								AsignacionRutas=AsignacionRutas.substring(UltimoDato+1,AsignacionRutas.length); 
								AsignacionRutasSubidas = i+1;
							}
							swal("Cargue Realizado con éxito", "Cargadas " + AsignacionRutasSubidas + " Asignaciones de Rutas", "success");
							confimarAsignacionRutas();
						}
					});
				});
		      }, function (error) {
		        //
		      });

	      }, function (error) {
	        swal("El archivo no se encuentra");
	      });
	}

	//Funciones para Cargar ParametrosAQuamovil

	$scope.borrarParametros = function ()
	{
		dbShell.transaction(function(tx)
		{
			tx.executeSql("Drop Table Parametros");
			CrearTablaParametros();
			$scope.Parametros();
		});
	}

	$scope.Parametros = function ()
	{
		$cordovaFile.checkFile(cordova.file.externalRootDirectory, "AQuaMovil/Entradas/ParametrosAQuamovil.csv")
	      .then(function (archivo) {
	        console.log(archivo);
	        $cordovaFile.readAsText(cordova.file.externalRootDirectory, "AQuaMovil/Entradas/ParametrosAQuamovil.csv")
		      .then(function (archivo) {
		        var parametros = archivo;
				dbShell.transaction(function(tx) 
				{   
					tx.executeSql("select Count(*) as Cantidad from Usuarios  ",[], 
					function(tx, result)
					{				
						var tipoArchivo = typeof result.rows.item(0)['Cantidad'];
						if(1 == 1)
						{
							var Control = parametros.match(/\n/g);
							for(var i = 0; i < Control.length; i++)
							{						
								var UltimoDato = parametros.indexOf('\n') // Se determina que ";" es salto de linea
								var Dato = parametros.substring(0,UltimoDato);
								var SepararDato = Dato.split(","); // Se determina que cada dato a incluir en la BD se separa con ","
								
								tx.executeSql("Insert Into Parametros (IdParametro, ValorParametro, ObservacionParametro,Control) Values(?,?,?,?)",[
									SepararDato[0],
									SepararDato[1],
									SepararDato[2],
									i]);

								console.log(SepararDato[0]);
								console.log(SepararDato[1]);
								console.log(SepararDato[2]);
								
								parametros=parametros.substring(UltimoDato+1,parametros.length); 
								parametrosSubidos = i+1;
							}
							swal("Cargue Realizado con éxito", "Cargados " + parametrosSubidos + " Parametros", "success");
							confimarParametros();
							mostrarParametros();
						}
					});
				});
		      }, function (error) {
		        //
		      });

	      }, function (error) {
	        swal("El archivo no se encuentra");
	      });
	}

	//Funciones para Cargar Causales

	$scope.borrarCausales = function ()
	{
		dbShell.transaction(function(tx)
		{
			tx.executeSql("Drop Table Causales");
			CrearTablaCausales();
			$scope.Causales();
		});
	}

	$scope.Causales = function ()
	{
		$cordovaFile.checkFile(cordova.file.externalRootDirectory, "AQuaMovil/Entradas/Causales.csv")
	      .then(function (archivo) {
	        console.log(archivo);
	        $cordovaFile.readAsText(cordova.file.externalRootDirectory, "AQuaMovil/Entradas/Causales.csv")
		      .then(function (archivo) {
		        var causal=archivo;	
				dbShell.transaction(function(tx) 
				{   
					tx.executeSql("select Count(*) as Cantidad from Usuarios  ",[], 
					function(tx, result)
					{				
						var tipoArchivo = typeof result.rows.item(0)['Cantidad'];
						if(1 == 1)
						{
							var Control = causal.match(/\n/g);
							for(var i = 0; i < Control.length; i++)
							{						
								var UltimoDato = causal.indexOf('\n') // Se determina que ";" es salto de linea
								var Dato = causal.substring(0,UltimoDato);
								var SepararDato = Dato.split(","); // Se determina que cada dato a incluir en la BD se separa con ","
								
								tx.executeSql("Insert Into Causales (IdCausal, NombreCausal, exigeObservacion, exigeFoto, Numero) Values(?,?,?,?,?)",[
									SepararDato[0],
									SepararDato[1],
									SepararDato[2],
									SepararDato[3],
									i]);
								
								causal=causal.substring(UltimoDato+1,causal.length); 
								causalesSubidas = i+1;
							}
							swal("Cargue Realizado con éxito", "Cargadas " + causalesSubidas + " Causales", "success");

							confimarCausales();
						}
					});
				});
		      }, function (error) {
		        //
		      });

	      }, function (error) {
	        swal("El archivo no se encuentra");
	      });
	}

	//Funciones para Cargar Observaciones

	$scope.borrarObservaciones = function ()
	{
		dbShell.transaction(function(tx)
		{
			tx.executeSql("Drop Table Observaciones");
			CrearTablaObservaciones();
			$scope.Observaciones();
		});
	}

	$scope.Observaciones = function ()
	{
		$cordovaFile.checkFile(cordova.file.externalRootDirectory, "AQuaMovil/Entradas/Observaciones.csv")
	      .then(function (archivo) {
	        console.log(archivo);
	        $cordovaFile.readAsText(cordova.file.externalRootDirectory, "AQuaMovil/Entradas/Observaciones.csv")
		      .then(function (archivo) {
		        var observacion = archivo;
				dbShell.transaction(function(tx) 
				{   
					tx.executeSql("select Count(*) as Cantidad from Usuarios  ",[], 
					function(tx, result)
					{				
						var tipoArchivo = typeof result.rows.item(0)['Cantidad'];
						if(1 == 1)
						{
							var Control = observacion.match(/\n/g);
							for(var i = 0; i < Control.length ; i++)
							{						
								var UltimoDato = observacion.indexOf('\n') // Se determina que ";" es salto de linea
								var Dato = observacion.substring(0,UltimoDato);
								var SepararDato = Dato.split(",");  // Se determina que cada dato a incluir en la BD se separa con ","
								
								tx.executeSql("Insert Into Observaciones (IdObservacion, NombreObservacion, exigeFoto, Numero) Values(?,?,?,?)",[
									SepararDato[0],
									SepararDato[1],
									SepararDato[2],
									i]);
								
								observacion=observacion.substring(UltimoDato+1,observacion.length); 
								observacionesSubidas = i+1;
							}
							swal("Cargue Realizado con éxito", "Cargadas " + observacionesSubidas + " Observaciones", "success");

							confimarObservaciones();
						}
					});
				});
		      }, function (error) {
		        //
		      });

	      }, function (error) {
	        swal("El archivo no se encuentra");
	      });
	}

	//Funciones para Cargar AcumuladosAnteriores

	$scope.borrarAcumuladosAnteriores = function ()
	{
		dbShell.transaction(function(tx)
		{
			tx.executeSql("Drop Table AcumuladosAnteriores");
			CrearTablaAcumuladosAnteriores();
			$scope.AcumuladosAnteriores();
		});
	}

	$scope.AcumuladosAnteriores = function ()
	{
		$cordovaFile.checkFile(cordova.file.externalRootDirectory, "AQuaMovil/Entradas/AcumuladosAnteriores.csv")
	      .then(function (archivo) {
	        console.log(archivo);
	        $cordovaFile.readAsText(cordova.file.externalRootDirectory, "AQuaMovil/Entradas/AcumuladosAnteriores.csv")
		      .then(function (archivo) {
		        var AcumuladosAnteriores = archivo;			
				dbShell.transaction(function(tx) 
				{   
					tx.executeSql("select Count(*) as Cantidad  from Usuarios  ",[], 
					function(tx, result)
					{				
						var tipoArchivo= typeof result.rows.item(0)['Cantidad'];
						if(1 == 1)
						{
							var Control = AcumuladosAnteriores.match(/\n/g);
							for(var i = 0; i < Control.length ; i++)
							{						
								var UltimoDato = AcumuladosAnteriores.indexOf('\n'); // Se determina que "/n" es salto de linea
								var Dato = AcumuladosAnteriores.substring(0,UltimoDato);
								var SepararDato = Dato.split(','); // Se determina que cada dato a incluir en la BD se separa con ","
								
								tx.executeSql("Insert Into AcumuladosAnteriores (Numero, IdCargo, IdUsuario, ValorAnterior, Control)Values(?,?,?,?,?)",[
									i, //Numero
									SepararDato[0],  //IdCargo
									SepararDato[1],  //IdUsuario
									SepararDato[2],  //ValorAnterior
									0]); //Control
								
								AcumuladosAnteriores=AcumuladosAnteriores.substring(UltimoDato+1,AcumuladosAnteriores.length); 
								AcumuladosAnterioresSubidos = i+1;
							}
							swal("Cargue Realizado con éxito", "Cargados " + AcumuladosAnterioresSubidos + " Acumulados Anteriores", "success");

							confimarAcumuladosAnteriores();
						}
					});
				});
		      }, function (error) {
		        //
		      });

	      }, function (error) {
	        swal("El archivo no se encuentra");
	      });
	}

	//Funciones para Cargar CargosFacturacion

	$scope.borrarCargosFacturacion = function ()
	{
		dbShell.transaction(function(tx)
		{
			tx.executeSql("Drop Table CargosFacturacion");
			CrearTablaCargosFacturacion();
			$scope.CargosFacturacion();
		});
	}

	$scope.CargosFacturacion = function ()
	{
		$cordovaFile.checkFile(cordova.file.externalRootDirectory, "AQuaMovil/Entradas/CargosFacturacion.csv")
	      .then(function (archivo) {
	        console.log(archivo);
	        $cordovaFile.readAsText(cordova.file.externalRootDirectory, "AQuaMovil/Entradas/CargosFacturacion.csv")
		      .then(function (archivo) {
		        var CargosFacturacion = archivo;			
				dbShell.transaction(function(tx) 
				{   
					tx.executeSql("select Count(*) as Cantidad  from Usuarios  ",[], 
					function(tx, result)
					{				
						var tipoArchivo= typeof result.rows.item(0)['Cantidad'];
						if(1 == 1)
						{
							var Control = CargosFacturacion.match(/\n/g);
							for(var i = 0; i < Control.length ; i++)
							{						
								var UltimoDato = CargosFacturacion.indexOf('\n'); // Se determina que "/n" es salto de linea
								var Dato = CargosFacturacion.substring(0,UltimoDato);
								var SepararDato = Dato.split(','); // Se determina que cada dato a incluir en la BD se separa con ","
								
								tx.executeSql("Insert Into CargosFacturacion (Numero, IdCargo, IdServicio, NombreCargo, Tarifa, Control)Values(?,?,?,?,?,?)",[
									i,				 //Numero
									SepararDato[0],  //IdCargo
									SepararDato[1],  //IdSevicio
									SepararDato[2],  //NombreCargo
									SepararDato[3],  //Tarifa
									""]); //Control
								
								CargosFacturacion=CargosFacturacion.substring(UltimoDato+1,CargosFacturacion.length); 
								CargosFacturacionSubidos = i+1;
							}
							swal("Cargue Realizado con éxito", "Cargados " + CargosFacturacionSubidos + " Cargos de Facturación", "success");

							confimarCargosFacturacion();
						}
					});
				});
		      }, function (error) {
		        //
		      });

	      }, function (error) {
	        swal("El archivo no se encuentra");
	      });
	}

	//Funciones para Cargar IndicesSubsidiosAportes

	$scope.borrarIndicesSubsidiosAportes = function ()
	{
		dbShell.transaction(function(tx)
		{
			tx.executeSql("Drop Table IndicesSubsidiosAportes");
			CrearTablaIndicesSubsidiosAportes();
			$scope.IndicesSubsidiosAportes();
		});
	}

	$scope.IndicesSubsidiosAportes = function ()
	{
		$cordovaFile.checkFile(cordova.file.externalRootDirectory, "AQuaMovil/Entradas/IndicesSubsidiosAportes.csv")
	      .then(function (archivo) {
	        console.log(archivo);
	        $cordovaFile.readAsText(cordova.file.externalRootDirectory, "AQuaMovil/Entradas/IndicesSubsidiosAportes.csv")
		      .then(function (archivo) {
		        var IndicesSubsidiosAportes = archivo;			
				dbShell.transaction(function(tx) 
				{   
					tx.executeSql("select Count(*) as Cantidad  from Usuarios  ",[], 
					function(tx, result)
					{				
						var tipoArchivo= typeof result.rows.item(0)['Cantidad'];
						if(1 == 1)
						{
							var Control = IndicesSubsidiosAportes.match(/\n/g);
							for(var i = 0; i < Control.length ; i++)
							{						
								var UltimoDato = IndicesSubsidiosAportes.indexOf('\n'); // Se determina que "/n" es salto de linea
								var Dato = IndicesSubsidiosAportes.substring(0,UltimoDato);
								var SepararDato = Dato.split(','); // Se determina que cada dato a incluir en la BD se separa con ","
								
								tx.executeSql("Insert Into IndicesSubsidiosAportes (Numero, IdCargo, IdUso, IdCategoria, Indice, Control)Values(?,?,?,?,?,?)",[
									i,				 //Numero
									SepararDato[0],  //IdCargo
									SepararDato[1],  //IdSevicio
									SepararDato[2],  //NombreCargo
									SepararDato[3],  //Tarifa
									0]); //Control

								console.log(i);
								console.log(SepararDato[0]);
								console.log(SepararDato[1]);
								console.log(SepararDato[2]);
								console.log(SepararDato[3]);
								
								IndicesSubsidiosAportes=IndicesSubsidiosAportes.substring(UltimoDato+1,IndicesSubsidiosAportes.length); 
								IndicesSubsidiosAportesSubidos = i+1;
							}
							swal("Cargue Realizado con éxito", "Cargados " + IndicesSubsidiosAportesSubidos + " indices Subsidios Aportes", "success");

							confimarIndicesSubsidiosAportes();
						}
					});
				});
		      }, function (error) {
		        //
		      });

	      }, function (error) {
	        swal("El archivo no se encuentra");
	      });
	}

	//Funciones para Cargar Periodos

	$scope.borrarPeriodos = function ()
	{
		dbShell.transaction(function(tx)
		{
			tx.executeSql("Drop Table Periodos");
			CrearTablaPeriodos();
			$scope.Periodos();
		});
	}

	$scope.Periodos = function ()
	{
		$cordovaFile.checkFile(cordova.file.externalRootDirectory, "AQuaMovil/Entradas/Periodos.csv")
	      .then(function (archivo) {
	        console.log(archivo);
	        $cordovaFile.readAsText(cordova.file.externalRootDirectory, "AQuaMovil/Entradas/Periodos.csv")
		      .then(function (archivo) {
		      	console.log(archivo);
		        var Periodos = archivo;			
				dbShell.transaction(function(tx) 
				{   
					tx.executeSql("select Count(*) as Cantidad  from Usuarios  ",[], 
					function(tx, result)
					{				
						var tipoArchivo= typeof result.rows.item(0)['Cantidad'];
						if(1 == 1)
						{
							var Control = Periodos.match(/\n/g);
							for(var i = 0; i < Control.length ; i++)
							{						
								var UltimoDato = Periodos.indexOf('\n'); // Se determina que "/n" es salto de linea
								var Dato = Periodos.substring(0,UltimoDato);
								var SepararDato = Dato.split(','); // Se determina que cada dato a incluir en la BD se separa con ","
								
								tx.executeSql("Insert Into Periodos (Numero, IdPeriodo, NombrePeriodo, FechaInicial, FechaFinal, FechaLimite, Control)Values(?,?,?,?,?,?,?)",[
									i,				 //Numero
									SepararDato[0],  //IdPeriodo
									SepararDato[1],  //NombrePeriodo
									SepararDato[2],  //FechaInicial
									SepararDato[3],  //FechaFinal
									SepararDato[4],  //FechaLimite
									0]); //Control

								console.log(i);
								console.log(SepararDato[0]);
								console.log(SepararDato[1]);
								console.log(SepararDato[2]);
								console.log(SepararDato[3]);
								console.log(SepararDato[4]);
								
								Periodos=Periodos.substring(UltimoDato+1,Periodos.length); 
								PeriodosSubidos = i+1;
							}
							swal("Cargue Realizado con éxito", "Cargado " + PeriodosSubidos + " Periodo", "success");

							confimarPeriodos();
							mostrarPeriodos();
						}
					});
				});
		      }, function (error) {
		        //
		      });

	      }, function (error) {
	        swal("El archivo no se encuentra");
	      });
	}

	//Funciones para Cargar ProyectoCatastro

	$scope.confirmarNuevoProyectoCatastro = function ()
	{
		dbShell.transaction(function(tx) 
		{    		
			tx.executeSql("select Count(*) as Cantidad from ProyectoCatastro",[], 
			function(tx, result)
			{
				if(result.rows.item(0)['Cantidad'] > 0)
				{
					swal({
					title: "Seguro?",   
					text: "Hay datos de encuestas diligenciadas en la base de datos, una vez borrados no podrán recuperarse!",   
					type: "warning",   
					showCancelButton: true,   
					confirmButtonColor: "#FFDC8B",   
					confirmButtonText: "Si, Actualizar",   
					cancelButtonText: "No",   
					closeOnConfirm: false,   
					closeOnCancel: false
					}, 

					function(isConfirm)
					{   
						if (isConfirm)
						{
							$scope.borrarProyectoCatastro();
						} 
						else 
						{
							swal("Cancelado", "Archivo de Proyecto de Catastro", "error");   
						}
					});
				}
				else
				{
					$scope.borrarProyectoCatastro();		
				}	
			});
		});
	}	

	$scope.borrarProyectoCatastro = function ()
	{
		dbShell.transaction(function(tx)
		{
			tx.executeSql("Drop Table ProyectoCatastro");
			tx.executeSql("Drop Table InformacionEncuesta");
			tx.executeSql("Drop Table RespuestasCerradas");
			tx.executeSql("Drop Table RespuestasAbiertas");
			CrearTablaProyectoCatastro();
			CrearTablaInformacionEncuestas();
			CrearTablaRespuestasCerradas();
			CrearTablaRespuestasAbiertas();
			$scope.ProyectoCatastro();
		});
	}

	$scope.ProyectoCatastro = function ()
	{
		$cordovaFile.checkFile(cordova.file.externalRootDirectory, "AQuaMovil/Entradas/ProyectoCatastro.csv")
	      .then(function (archivo) {
	        console.log(archivo);
	        $cordovaFile.readAsText(cordova.file.externalRootDirectory, "AQuaMovil/Entradas/ProyectoCatastro.csv")
		      .then(function (archivo) {
		        var ProyectoCatastro = archivo;			
				dbShell.transaction(function(tx) 
				{   
					tx.executeSql("select Count(*) as Cantidad  from Usuarios  ",[], 
					function(tx, result)
					{				
						var tipoArchivo= typeof result.rows.item(0)['Cantidad'];
						if(1 == 1)
						{
							var Control = ProyectoCatastro.match(/\n/g);
							for(var i = 0; i < Control.length ; i++)
							{						
								var UltimoDato = ProyectoCatastro.indexOf('\n'); // Se determina que "/n" es salto de linea
								var Dato = ProyectoCatastro.substring(0,UltimoDato);
								var SepararDato = Dato.split(','); // Se determina que cada dato a incluir en la BD se separa con ","
								
								tx.executeSql("Insert Into ProyectoCatastro (Numero,IdProyecto,IdSeccion,IdPregunta,TipoPregunta,TextoPregunta,TextoAyuda,IdEntorno,ValidacionTamano,TamanoMinimo,TamanoMaximo,ValidacionTipoCaracter,TipoCaracter,ValidacionTabla,NombreTabla,Control,PreguntaDepende,IdOpcionDepende)Values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[
									i, //Numero
									SepararDato[0],  //IdProyecto
									SepararDato[1],  //IdSeccion
									SepararDato[2],  //IdPregunta
									SepararDato[3],  //TipoPregunta
									SepararDato[4],  //TextoPregunta
									SepararDato[5],  //TextoAyuda
									SepararDato[6],  //IdEntorno
									SepararDato[7],  //ValidacionTamano
									SepararDato[8],  //TamanoMinimo
									SepararDato[9],  //TamanoMaximo
									SepararDato[10],  //ValidacionTipoCaracter
									SepararDato[11],  //TipoCaracter
									SepararDato[12],  //ValidacionTabla
									SepararDato[13],  //NombreTabla
									SepararDato[14],  //Control
									SepararDato[15],  //PreguntaDepende
									SepararDato[16]]); //IdOpcionDepende
								
								console.log(i+","+SepararDato[0]+","+SepararDato[1]+","+SepararDato[2]+","+SepararDato[3]+","+SepararDato[4]+","+SepararDato[5]+","+SepararDato[6]+","+SepararDato[7]+","+SepararDato[8]+","+SepararDato[9]+","+SepararDato[10]+","+SepararDato[11]+","+SepararDato[12]+","+SepararDato[13]+","+SepararDato[14]+","+SepararDato[15]+","+SepararDato[16]);
								ProyectoCatastro=ProyectoCatastro.substring(UltimoDato+1,ProyectoCatastro.length); 
								ProyectoCatastroSubidos = i+1;
							}

							swal("Cargue Realizado con éxito", "Cargadas " + ProyectoCatastroSubidos + " Preguntas", "success");

							confimarProyectoCatastro();
						}
					});
				});
		      }, function (error) {
		        //
		      });

	      }, function (error) {
	        swal("El archivo no se encuentra");
	      });
	}

	//Funciones para Cargar OpcionesCatastro

	$scope.borrarOpcionesCatastro = function ()
	{
		dbShell.transaction(function(tx)
		{
			tx.executeSql("Drop Table OpcionesCatastro");
			CrearTablaOpcionesCatastro();
			$scope.OpcionesCatastro();
		});
	}

	$scope.OpcionesCatastro = function ()
	{
		$cordovaFile.checkFile(cordova.file.externalRootDirectory, "AQuaMovil/Entradas/OpcionesCatastro.csv")
	      .then(function (archivo) {
	        console.log(archivo);
	        $cordovaFile.readAsText(cordova.file.externalRootDirectory, "AQuaMovil/Entradas/OpcionesCatastro.csv")
		      .then(function (archivo) {
		        var OpcionesCatastro = archivo;			
				dbShell.transaction(function(tx) 
				{   
					tx.executeSql("select Count(*) as Cantidad from Usuarios  ",[], 
					function(tx, result)
					{				
						var tipoArchivo= typeof result.rows.item(0)['Cantidad'];
						if(1 == 1)
						{
							var Control = OpcionesCatastro.match(/\n/g);
							for(var i = 0; i < Control.length ; i++)
							{						
								var UltimoDato = OpcionesCatastro.indexOf('\n'); // Se determina que "/n" es salto de linea
								var Dato = OpcionesCatastro.substring(0,UltimoDato);
								var SepararDato = Dato.split(','); // Se determina que cada dato a incluir en la BD se separa con ","
								
								tx.executeSql("Insert Into OpcionesCatastro (Numero, IdEntorno, IdOpcion, EtiquetaOpcion, TextoOpcion, Control)Values(?,?,?,?,?,?)",[
									i, //Numero
									SepararDato[0],  //IdEntorno
									SepararDato[1],  //IdOpcion
									SepararDato[2],  //EtiquetaOpcion
									SepararDato[3],  //TextoOpcion
									0]); //Control
								
								console.log(i+","+SepararDato[0]+","+SepararDato[1]+","+SepararDato[2]+","+SepararDato[3]);
								OpcionesCatastro=OpcionesCatastro.substring(UltimoDato+1,OpcionesCatastro.length); 
								OpcionesCatastroSubidos = i+1;
							}

							swal("Cargue Realizado con éxito", "Cargados " + OpcionesCatastroSubidos + " Opciones Catastro", "success");

							confimarOpcionesCatastro();
						}
					});
				});
		      }, function (error) {
		        //
		      });

	      }, function (error) {
	        swal("El archivo no se encuentra");
	      });
	}
});

