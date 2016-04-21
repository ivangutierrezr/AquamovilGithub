var Rol = "";

function inicioSesion()
{
	var login =  document.getElementById("User").value;
	var loginName = login.toLowerCase()
	var contrasena = document.getElementById("Pass").value;

	dbShell.transaction(function(tx) 
	{   
		tx.executeSql("select Nombres, Count(*) as Cantidad  from Usuarios  ",[],
		
		function(tx, result)
		{
			if(result.rows.item(0)['Cantidad'] == 0)
			{
				if(loginName=='admin' && contrasena=='admin') 
				{
					window.location.href = "#/cargausuarios";
					document.getElementById("User").value="";
					document.getElementById("Pass").value="";
				}
				else
				{
					swal("Error!", "Usuario incorrecto!", "error");
					document.getElementById("Pass").value="";
				}	
			}
			
			else
			{		
				dbShell.transaction(function(tx) 
				{
					tx.executeSql("select Nombres, Apellidos, Login, Pass, Count(*) as Cantidad from Usuarios Where Login=? and Pass=?",[loginName, contrasena],

					function(tx, result)
					{
						if(loginName=='admin' && contrasena=='admin') 
						{
							swal("Error!", "Este Usuario ya no es valido", "error");
							document.getElementById("User").value="";
							document.getElementById("Pass").value="";
						}

						else
						{
							if(result.rows.item(0)['Cantidad'] > 0)
							{
								loginbd = result.rows.item(0)['Login'];
								IdOperario(loginbd);
							}

							else
							{
								swal("Error!", "Verifique el Nombre de Usuario y Contraseña ingresados", "error");
								document.getElementById("Pass").value="";
							}
						}
					});
				});
			}
		});
	});
}

/*----------------------------------------------------------------------------------*/
//Función para conservar el Id de Usuario

function IdOperario(login)
{
	var idOp = login;
	dbShell.transaction(function(tx) 
	{    		
		tx.executeSql("select Id, Nombres, Apellidos, Login, Count(*) as Cantidad  from Usuarios Where Login=? ",[idOp], 
		function(tx, result)
		{
			if(result.rows.item(0)['Cantidad'] > 0)
			{
				var idbd = parseInt(result.rows.item(0)['Id']);
				var nombresbd = result.rows.item(0)['Nombres'];
				var apellidosbd = result.rows.item(0)['Apellidos'];
				var loginGuardado = result.rows.item(0)['Login'];

				ManejarRoles(idbd,nombresbd,apellidosbd);
				mostrarParametros();

				document.getElementById("idOperario").value = idbd;
				document.getElementById("Pass").value = "";
				document.getElementById("User").value = loginGuardado;
				document.getElementById("nombreOperario").value = loginGuardado;
			}
		});
	});	
}



/*----------------------------------------------------------------------------------*/
//Función para resetear el Id de Usuario

function resetear()
{
	resetearMenuPrincipal();
	document.getElementById("User").value = "";
	window.location.href = "#/home";
}

function resetearPrimerUsuario()
{
	dbShell.transaction(function(tx) 
	{   
		tx.executeSql("select * from Usuarios",[], 
		function(tx, result)
		{
			if(result.rows.length == 0)
			{
				swal({
				title: "Atención!",
				text: "No existen usuarios cargados, si da click en continuar, la aplicación volverá a sus valores por defecto",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#0088C4",
				confirmButtonText: "Continuar",
				cancelButtonText: "Cancelar",
				closeOnConfirm: false,
				closeOnCancel: false 
				}, 

				function(isConfirm)
				{
					if (isConfirm) 
					{
						dbShell.transaction(function(tx) 
						{
							tx.executeSql("Delete From PermisosAquamovil");
							tx.executeSql("Delete From Usuarios");
						});

						$("#confirmadoUsuarios").hide();
						$("#confirmadoPermisos").hide();

						swal("Correcto!", "Aplicación restaurada, regresando al menu principal","success");

						resetearMenuPrincipal();
						document.getElementById("User").value = "";
						window.location.href = "#/home";
					} 

					else 
					{
						swal("Cancelado", "", "error");
					}
				});
			}

			else
			{
				validarQueExistanPermisos();
			}
		});
	});
}


function validarQueExistanPermisos()
{
	dbShell.transaction(function(tx) 
	{   
		tx.executeSql("select * from PermisosAquamovil",[], 
		function(tx, result)
		{
			if(result.rows.length == 0)
			{
				swal({
				title: "Atención!",
				text: "No existen permisos cargados, si da click en continuar, la aplicación volverá a sus valores por defecto",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#0088C4",
				confirmButtonText: "Continuar",
				cancelButtonText: "Cancelar",
				closeOnConfirm: false,
				closeOnCancel: false 
				}, 

				function(isConfirm)
				{
					if (isConfirm) 
					{
						dbShell.transaction(function(tx) 
						{
							tx.executeSql("Delete From Usuarios");
							tx.executeSql("Delete From PermisosAquamovil");
						});

						$("#confirmadoUsuarios").hide();
						$("#confirmadoPermisos").hide();

						swal("Correcto!", "Aplicación restaurada, regresando al menu principal","success");

						resetearMenuPrincipal();
						document.getElementById("User").value = "";
						window.location.href = "#/home";
					} 

					else 
					{
						swal("Cancelado", "", "error");
					}
				});
			}

			else
			{
				swal("Correcto!", "Archivos Cargados Correctamente, regresando al menu principal","success");
				resetearMenuPrincipal();
				document.getElementById("User").value = "";
				window.location.href = "#/home";
			}
		});
	});
}


/*----------------------------------------------------------------------------------*/
//Función para redirecciónar según el rol de la persona que haya ingresado

function ManejarRoles(idbd,nombresbd,apellidosbd)
{
	window.location.href = "#/menuprincipal";

	dbShell.transaction(function(tx) 
	{   
		tx.executeSql("select * from PermisosAquamovil where IdUsuario=?",[idbd], 
		function(tx, result)
		{
			var Habilitado = result.rows.item(0)['Habilitado'];
			var Habilitado2 = result.rows.item(1)['Habilitado'];
			var Habilitado3 = result.rows.item(2)['Habilitado'];
			var Habilitado4 = result.rows.item(3)['Habilitado'];
			var Habilitado5 = result.rows.item(4)['Habilitado'];
			var Habilitado6 = result.rows.item(5)['Habilitado'];

			if(Habilitado == "TRUE" || Habilitado == "true" || Habilitado == "True" || Habilitado == "1" || Habilitado == "VERDADERO" || Habilitado == "verdadero" || Habilitado == "Verdadero" || Habilitado == "si" || Habilitado == "SI" || Habilitado == "Si" || Habilitado2 == "TRUE" || Habilitado2 == "true" || Habilitado2 == "True" || Habilitado2 == "1" || Habilitado2 == "VERDADERO" || Habilitado2 == "verdadero" || Habilitado2 == "Verdadero" || Habilitado2 == "si" || Habilitado2 == "SI" || Habilitado2 == "Si")
			{
				$('#irALecturaMedidores').removeClass("disableMP");
			}

			if(Habilitado == "TRUE" || Habilitado == "true" || Habilitado == "True" || Habilitado == "1" || Habilitado == "VERDADERO" || Habilitado == "verdadero" || Habilitado == "Verdadero" || Habilitado == "si" || Habilitado == "SI" || Habilitado == "Si")
			{				
				$('#botonRealizarLecturas').removeClass("disableMP");
				$('#botonRealizarLecturas').attr("onClick", "VerificarCargaDeParametros()");	
			}

			if(Habilitado2 == "TRUE" || Habilitado2 == "true" || Habilitado2 == "True" || Habilitado2 == "1" || Habilitado2 == "VERDADERO" || Habilitado2 == "verdadero" || Habilitado2 == "Verdadero" || Habilitado2 == "si" || Habilitado2 == "SI" || Habilitado2 == "Si")
			{
				$('#botonReporteProgreso').removeClass("disableMP");
				$('#botonReporteProgreso').attr("href", "#/reporte");
				$('#botonReporteProgreso').attr("onClick", "GenerarReporteLecturasGeneral()");
			}
			
			if(Habilitado3 == "TRUE" || Habilitado3 == "true" || Habilitado3 == "True" || Habilitado3 == "1" || Habilitado3 == "VERDADERO" || Habilitado3 == "verdadero" || Habilitado3 == "Verdadero" || Habilitado3 == "si" || Habilitado3 == "SI" || Habilitado3 == "Si")
			{
				$('#irAFacturacionEnSitio').attr("href", "#");
				$('#irAFacturacionEnSitio').removeClass("disableMP");
				$('#MenuFacturacionEnSitio a').removeClass("disableMP");
				$('#botonRealizarFacturas').attr("onClick", "VerificarCargaDeUsuariosServiciosFacturacion()");
				/*$('#botonReporteProgresoFacturas').attr("onClick", "");*/
			}
		

			if(Habilitado4 == "TRUE" || Habilitado4 == "true" || Habilitado4 == "True" || Habilitado4 == "1" || Habilitado4 == "VERDADERO" || Habilitado4 == "verdadero" || Habilitado4 == "Verdadero" || Habilitado4 == "si" || Habilitado4 == "SI" || Habilitado4 == "Si")
			{
				$('#irACatastroUsuarios').attr("href", "#");
				$('#irACatastroUsuarios').removeClass("disableMP");
				$('#MenuCatastroUsuarios a').removeClass("disableMP");
				$('#botonRealizarEncuestas').attr("onClick", "VerificarCargaDeProyectoCatastro()");
				$('#botonEditarEncuestas').attr("onClick", "VerificarEncuesta()");
				$('#botonDescargarEncuestas').attr("href", "#/descargacatastrousuarios");
			}		

			if(Habilitado5 == "TRUE" || Habilitado5 == "true" || Habilitado5 == "True" || Habilitado5 == "1" || Habilitado5 == "VERDADERO" || Habilitado5 == "verdadero" || Habilitado5 == "Verdadero" || Habilitado5 == "si" || Habilitado5 == "SI" || Habilitado5 == "Si")
			{
				$('#irATrabajoDeCampo').attr("href", "#");
				$('#irATrabajoDeCampo').removeClass("disableMP");
				$('#MenuTrabajoDeCampo a').removeClass("disableMP");
			}

			if(Habilitado6 == "TRUE" || Habilitado6 == "true" || Habilitado6 == "True" || Habilitado6 == "1" || Habilitado6 == "VERDADERO" || Habilitado6 == "verdadero" || Habilitado6 == "Verdadero" || Habilitado6 == "si" || Habilitado6 == "SI" || Habilitado6 == "Si")
			{
				$('#irACargarDeArchivos').attr("href", "#/cargaarchivos");
				$('#irACargarDeArchivos').removeClass("disableMP");
			}
		});
	});
	swal("Bienvenido! " + nombresbd + " " + apellidosbd, "Ha iniciado sesión correctamente!", "success");
}

/*----------------------------------------------------------------------------------*/

//RETORNO A LA PAGINA CICLO-RUTA

function regresar()
{
	window.location.href = "#/cicloruta";

	var cicloColor = document.getElementById("txtCiclo").value;
	var rutaColor = document.getElementById("txtRuta").value;
	var id = "Ciclo"+cicloColor+"ruta"+rutaColor;

	dbShell.transaction(function(tx) 
	{            
		tx.executeSql("SELECT * FROM UsuariosServicios where Ciclo=? and Ruta=?", [cicloColor,rutaColor],                
		function(tx, result)
		{
			var contador = 0;         
			for(var i = 0; i < result.rows.length; i++) 
			{   
				var a1 = result.rows.item(i)['LecturaActual'];
				var a2 = result.rows.item(i)['CausalActual'];
				var a3 = result.rows.item(i)['ObservacionActual'];

				if(a1 != '' || a2 != '')
				{
					contador++;
				}

				if(contador == result.rows.length)
				{
					$("#"+id).removeClass('pintarCRSinDiligenciar');
					$("#"+id).addClass('pintarCRDiligenciado');
				}
			}

			if(cicloColor != '' && rutaColor != '')
			{
				$("#divCR a").removeClass('pintarLR');
				$("#"+id).addClass('pintarLR');
			}
		});    
	});
}

/*----------------------------------------------------------------------------------*/

//Funciones para Ciclo Nuevo, Ruta Nueva y Consecutivo Nuevo
function confirmarNuevoCRC()
{
	swal({
		title: "Atención",
		text: "¿Desea cambiar Ciclo, Ruta y Consecutivo?",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "SI",
		cancelButtonText: "No",
		closeOnConfirm: false,
		closeOnCancel: false 
		}, function(isConfirm)
			{
				if (isConfirm) 
				{
					nuevoCiclo(); 
				} 

				else 
				{
					swal("Cancelado", "", "error");   
				} 
			}
		);
}

function nuevoCiclo()
{
	swal({title: "Nuevo Ciclo",
		text: "",
		type: "input",
		showCancelButton: true,
		closeOnConfirm: false,
		animation: "slide-from-top",
		inputType: "number",
		inputPlaceholder: "# Ciclo" 
		},function(inputValue)
			{   
				if (inputValue === false) 
					return false;

				if (inputValue === "") 
					{     
						swal.showInputError("Debe Ingresar un número");
						return false;
					}      

					document.getElementById("txtCicloNuevo").value = inputValue;
					rutaNueva(); 
			});
}

function rutaNueva()
{
	swal({title: "Nueva Ruta",
		text: "",
		type: "input",
		showCancelButton: true,
		closeOnConfirm: false,
		animation: "slide-from-top",
		inputType: "number",
		inputPlaceholder: "# Ruta" 
		},function(inputValue)
			{   
				if (inputValue === false) 
					return false;

				if (inputValue === "") 
					{     
						swal.showInputError("Debe Ingresar un número");
						return false;
					}      

					document.getElementById("txtRutaNueva").value = inputValue;
					consecutivoNuevo();
			});
}

function consecutivoNuevo()
{
	swal({title: "Nuevo Consecutivo",
		text: "",
		type: "input",
		showCancelButton: true,
		closeOnConfirm: false,
		animation: "slide-from-top",
		inputType: "number",
		inputPlaceholder: "# Consecutivo" 
		},function(inputValue)
			{   
				if (inputValue === false) 
					return false;

				if (inputValue === "") 
					{     
						swal.showInputError("Debe Ingresar un número");
						return false;
					}      

					document.getElementById("txtConsecutivoNuevo").value = inputValue;
					actualizarCRC();
			});
}

function actualizarCRC()
{
	var cicloNuevotx = document.getElementById("txtCicloNuevo").value;
	var rutaNuevatx = document.getElementById("txtRutaNueva").value;
	var consecutivoNuevotx = document.getElementById("txtConsecutivoNuevo").value;

	var numeroReg = document.getElementById("txtNumero").value;

	dbShell.transaction(function(tx) 
	{
		tx.executeSql("Update UsuariosServicios set CicloNuevo=?, RutaNueva=?, ConsecutivoNuevo=? where Numero=?",[cicloNuevotx,rutaNuevatx,consecutivoNuevotx,numeroReg], 
	
		function(tx, result)
		{
			swal("Guardado", "Ciclo: " + cicloNuevotx + " Ruta: " + rutaNuevatx + " Consecutivo: " + consecutivoNuevotx, "success");	
		});
	});	
}

/*--------------------------------------------------------------------------------*/
//Función que cuenta el número de registros de lectura que hay en el archivo de lecturas 

function Cantidad(ciclo,ruta)
{ 
   	dbShell.transaction(function(tx) 
	{    		
		tx.executeSql("select  Count(*) as Cantidad from UsuariosServicios Where Ciclo=? and Ruta=? ",[ciclo,ruta], 
		function(tx, result)
		{	
			CantidadTotal = parseInt(result.rows.item(0)['Cantidad']);
		});
	});	
}

/*--------------------------------------------------------------------------------*/
//Función que sirve para llevar el número de lecturas procesadas/lecturas totales	

function ContarRegistros(ciclo,ruta)
{ 
    Cantidad(ciclo,ruta);
   	dbShell.transaction(function(tx) 
	{    		
		tx.executeSql("select * from UsuariosServicios Where Ciclo=? and Ruta=? ",[ciclo,ruta], 
		function(tx, result)
		{
			var CantidadProcesado = 0;
			var LectActual;
			var CauActual;
			for ( var i = 0; i < result.rows.length; i++)
			{
				LectActual = parseInt(result.rows.item(i)['LecturaActual']);
				CauActual = parseInt(result.rows.item(i)['CausalActual']);
				
				if(LectActual>=0 || CauActual>0)
				{
				  	CantidadProcesado = CantidadProcesado + 1;
				}

				else
				{
					CantidadProcesado = CantidadProcesado + 0;
				}
	
			}
			document.getElementById('Contador').innerHTML = CantidadProcesado + '/' + CantidadTotal;
		});
	});
}

/*----------------------------------------------------------------------------------*/

// Recibe la información de la observación y actualiza el registro actual en la base de datos

function ActualizarArchivo() 
{
	var CodigoObservacion = document.getElementById('txtObservacion').value;
	var CodigoObservacion2 = document.getElementById('txtObservacion2').value;
	var CodigoObservacion3 = document.getElementById('txtObservacion3').value;
	var txtCausal = document.getElementById('txtCausal').value;
	var ciclo = document.getElementById("txtCiclo").value;
	var ruta = document.getElementById("txtRuta").value;	
    var txtIdUsuario = document.getElementById("txtIdUsuarioLectura").value;
	var txtLectura = document.getElementById("txtLectura").value;
	var fecha = document.getElementById("fecha").value;
	var hora = document.getElementById("hora").value;
	var usuario = document.getElementById("User").value;
	var latitud = document.getElementById("latitud").value;
	var longitud = document.getElementById("longitud").value;
	var altitud = document.getElementById("altitud").value;
	var reg = document.getElementById("txtNumero").value;
	var consumo = document.getElementById("consumo").value;
	var conceptoCritica = document.getElementById("conceptoCritica").value;

	console.log(CodigoObservacion);
	console.log(CodigoObservacion2);
	console.log(CodigoObservacion3);
	console.log(txtCausal);
	console.log(ciclo);
	console.log(ruta);
	console.log(txtIdUsuario);
	console.log(txtLectura);
	console.log(fecha);
	console.log(hora);
	console.log(usuario);
	console.log(latitud);
	console.log(longitud);
	console.log(altitud);
	console.log(consumo);
	console.log(conceptoCritica);

	dbShell.transaction(function(tx) 
	{
		tx.executeSql("Update UsuariosServicios set Consumo=?, ConceptoCritica=?, Fecha=?, Hora=?, latitud=?, longitud=?, altura=?, LecturaActual=?, CausalActual=?, ObservacionActual=?, ObservacionDos=?, ObservacionTres=?, Usuario=? where Numero=?",[consumo,conceptoCritica,fecha,hora,latitud,longitud,altitud,txtLectura,txtCausal,CodigoObservacion,CodigoObservacion2,CodigoObservacion3,usuario,reg], 
	
		function(tx, result)
		{
			document.getElementById("txtNumero").value = reg;
			document.getElementById("txtLectura").value = txtLectura;
			document.getElementById('txtObservacion').value = CodigoObservacion;
			document.getElementById('txtObservacion2').value = CodigoObservacion2;
			document.getElementById('txtObservacion3').value = CodigoObservacion3;
			document.getElementById('txtCausal').value = txtCausal;

			activarImpresion();
			ContarRegistros(ciclo,ruta);
			setTimeout("mensajeLecturaRegistrada()", 1000);
		});
	});		
}

function mensajeLecturaRegistrada()
{
	swal({
	title: "Lectura Registrada",   
	text: "Regresando al menu principal",   
	timer: 2000,   
	showConfirmButton: false 
	});
	window.location.href = "#/medidorlecturas";
}


