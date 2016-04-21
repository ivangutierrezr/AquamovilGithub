//Funcion inicial de la app, crea las tablas de la base de datos y lanza las funciones auxiliares principales
var CantidadCausal=0;
var CantidadLecturas=0;
function CrearTabla(tx)
{
	console.log('CrearTabla');
	dbShell.transaction(function(tx) 
	{
		tx.executeSql("CREATE  TABLE IF NOT EXISTS  TipoMedidor (IdTipo NUMERIC PRIMARY KEY  NOT NULL, RangoMayor NUMERIC)");
			
			CrearTablaUsuarios(tx);
			CrearTablaPermisosAquamovil(tx);
			CrearTablaUsuariosServicios(tx);
			CrearTablaAsignacionRutas(tx);
			CrearTablaCausales(tx);
			CrearTablaObservaciones(tx);
			CrearTablaParametros(tx);
			CrearTablaAcumuladosAnteriores(tx);
			CrearTablaCargosFacturacion(tx);
			CrearTablaIndicesSubsidiosAportes(tx);
			CrearTablaPeriodos(tx);
			CrearTablaProyectoCatastro(tx);
			CrearTablaOpcionesCatastro(tx);
			CrearTablaInformacionEncuestas(tx);
			CrearTablaRespuestasCerradas(tx);
			CrearTablaRespuestasAbiertas(tx);
			CrearTablaAuxiliarCatastro(tx);
			IdOperario();
			mostrarParametros();
			mostrarPeriodos();
			GuardarUsuario(tx);
		    ConsultaLecturas();
			ConsultaCausales();
			ContarRegistros();
	});
}

function CrearTablaUsuarios(tx)
{
	dbShell.transaction(function(tx) 
	{	
		tx.executeSql("CREATE TABLE  IF NOT EXISTS Usuarios(Id NUMERIC PRIMARY KEY NOT NULL, Nombres VARCHAR, Apellidos VARCHAR, Login VARCHAR, Pass VARCHAR, UltimoNoFactura VARCHAR, Control VARCHAR)");

		tx.executeSql("CREATE  TABLE IF NOT EXISTS  ControlNumero (Id NUMERIC PRIMARY KEY  NOT NULL, Control NUMERIC)");
	});
}

function CrearTablaPermisosAquamovil(tx)
{
	dbShell.transaction(function(tx) 
	{	
		tx.executeSql("CREATE TABLE  IF NOT EXISTS PermisosAquamovil (Numero NUMERIC PRIMARY KEY NOT NULL, IdUsuario NUMERIC, IdProceso NUMERIC, IdOpcion NUMERIC, Habilitado VARCHAR, Control VARCHAR)");
	});
}

function CrearTablaUsuariosServicios(tx)
{
	dbShell.transaction(function(tx) 
	{	
		tx.executeSql("CREATE  TABLE IF NOT EXISTS UsuariosServicios (Numero NUMERIC PRIMARY KEY  NOT NULL, IdUsuario NUMERIC, Ciclo NUMERIC, Ruta NUMERIC, Consecutivo NUMERIC, Direccion VARCHAR, NumeroMedidor VARCHAR, TipoMedidor NUMERIC, LecturaAnterior NUMERIC, ConsumoMedio NUMERIC, Suscriptor VARCHAR, IdUso NUMERIC, IdCategoria NUMERIC, EdadAcueducto NUMERIC, VolumenAseo VARCHAR, CtasAcR NUMERIC, CtasAcNR NUMERIC, CtasAlR NUMERIC, CtasAlNR NUMERIC, CtasAsR NUMERIC, CtasAsNR NUMERIC, UltimaFechaDeFacturacion VARCHAR, Consumo NUMERIC, ConceptoCritica VARCHAR, LecturaActual NUMERIC, CausalActual NUMERIC, ObservacionActual NUMERIC, ObservacionDos NUMERIC, ObservacionTres NUMERIC, Fecha VARCHAR, Hora VARCHAR, latitud VARCHAR, longitud VARCHAR, altura VARCHAR, CicloNuevo NUMERIC, RutaNueva NUMERIC, ConsecutivoNuevo NUMERIC, NumeroFotos NUMERIC, Usuario VARCHAR, impreso VARCHAR, editado VARCHAR, numeroFactura VARCHAR, fechaFactura VARCHAR, fechaLimiteDePago VARCHAR)");
	});
}

function CrearTablaAsignacionRutas(tx)
{
	dbShell.transaction(function(tx) 
	{	
		tx.executeSql("CREATE TABLE IF NOT EXISTS  AsignacionRutas (Numero NUMERIC PRIMARY KEY NOT NULL, Ciclo NUMERIC NOT NULL, Ruta NUMERIC NOT NULL, Oper NUMERIC NOT NULL, Control VARCHAR)");
	});
}

function CrearTablaCausales(tx)
{
	dbShell.transaction(function(tx) 
	{	
		tx.executeSql("CREATE  TABLE IF NOT EXISTS  Causales (IdCausal NUMERIC PRIMARY KEY  NOT NULL, NombreCausal VARCHAR, exigeObservacion VARCHAR, exigeFoto VARCHAR,Numero NUMERIC)");
	});
}

function CrearTablaObservaciones(tx)
{
	dbShell.transaction(function(tx) 
	{	
		tx.executeSql("CREATE  TABLE IF NOT EXISTS  Observaciones (IdObservacion NUMERIC PRIMARY KEY NOT NULL, NombreObservacion VARCHAR , exigeFoto VARCHAR, Numero NUMERIC)");
	});
}

function CrearTablaParametros(tx)
{
	dbShell.transaction(function(tx) 
	{	
		tx.executeSql("CREATE  TABLE IF NOT EXISTS Parametros (IdParametro NUMERIC PRIMARY KEY  NOT NULL, ValorParametro NUMERIC, ObservacionParametro VARCHAR, Control VARCHAR)");
	});
}

function CrearTablaAcumuladosAnteriores(tx)
{
	dbShell.transaction(function(tx) 
	{	
		tx.executeSql("CREATE  TABLE IF NOT EXISTS AcumuladosAnteriores (Numero NUMERIC PRIMARY KEY  NOT NULL, IdCargo NUMERIC, IdUsuario NUMERIC, ValorAnterior NUMERIC, Control VARCHAR)");
	});
}

function CrearTablaCargosFacturacion(tx)
{
	dbShell.transaction(function(tx) 
	{	
		tx.executeSql("CREATE  TABLE IF NOT EXISTS CargosFacturacion (Numero NUMERIC PRIMARY KEY  NOT NULL, IdCargo NUMERIC, IdServicio NUMERIC, NombreCargo VARCHAR, Tarifa NUMERIC, Control VARCHAR)");
	});
}

function CrearTablaIndicesSubsidiosAportes(tx)
{
	dbShell.transaction(function(tx) 
	{	
		tx.executeSql("CREATE  TABLE IF NOT EXISTS IndicesSubsidiosAportes (Numero NUMERIC PRIMARY KEY  NOT NULL, IdCargo NUMERIC, IdUso NUMERIC, IdCategoria NUMERIC, Indice VARCHAR, Control VARCHAR)");
	});
}


function CrearTablaPeriodos(tx)
{
	dbShell.transaction(function(tx) 
	{	
		tx.executeSql("CREATE  TABLE IF NOT EXISTS Periodos (Numero NUMERIC PRIMARY KEY  NOT NULL, IdPeriodo NUMERIC, NombrePeriodo VARCHAR, FechaInicial VARCHAR, FechaFinal VARCHAR, FechaLimite VARCHAR, Control VARCHAR)");
	});
}

function CrearTablaProyectoCatastro(tx)
{
	dbShell.transaction(function(tx) 
	{	
		tx.executeSql("CREATE  TABLE IF NOT EXISTS ProyectoCatastro (Numero NUMERIC PRIMARY KEY  NOT NULL, IdProyecto NUMERIC, IdSeccion NUMERIC, IdPregunta NUMERIC, TipoPregunta NUMERIC, TextoPregunta VARCHAR, TextoAyuda VARCHAR, IdEntorno NUMERIC, ValidacionTamano VARCHAR, TamanoMinimo NUMERIC, TamanoMaximo NUMERIC, ValidacionTipoCaracter VARCHAR, TipoCaracter VARCHAR, ValidacionTabla VARCHAR, NombreTabla VARCHAR, Control VARCHAR, PreguntaDepende VARCHAR, IdOpcionDepende VARCHAR)");
	});
}

function CrearTablaOpcionesCatastro(tx)
{
	dbShell.transaction(function(tx) 
	{	
		tx.executeSql("CREATE  TABLE IF NOT EXISTS OpcionesCatastro (Numero NUMERIC PRIMARY KEY  NOT NULL, IdEntorno NUMERIC, IdOpcion NUMERIC, EtiquetaOpcion VARCHAR, TextoOpcion VARCHAR, Control VARCHAR)");
	});
}

function CrearTablaInformacionEncuestas(tx)
{
	dbShell.transaction(function(tx) 
	{	
		tx.executeSql("CREATE  TABLE IF NOT EXISTS InformacionEncuesta (Numero NUMERIC PRIMARY KEY  NOT NULL, IdOperario VARCHAR, NumeroEncuesta NUMERIC, Fecha VARCHAR, HoraInicial VARCHAR, HoraFinal VARCHAR, Latitud VARCHAR, Longitud VARCHAR, Altitud VARCHAR, Editado VARCHAR, FechaEdicion VARCHAR, HoraInicialEdicion VARCHAR, HoraFinalEdicion VARCHAR, CantidadFotos NUMERIC, Control VARCHAR)");
	});
}

function CrearTablaRespuestasCerradas(tx)
{
	dbShell.transaction(function(tx) 
	{	
		tx.executeSql("CREATE  TABLE IF NOT EXISTS RespuestasCerradas (Numero NUMERIC PRIMARY KEY  NOT NULL, IdOperario VARCHAR, IdEncuesta NUMERIC, IdPregunta NUMERIC, IdOpcion NUMERIC, Control VARCHAR)");
	});
}

function CrearTablaRespuestasAbiertas(tx)
{
	dbShell.transaction(function(tx) 
	{	
		tx.executeSql("CREATE  TABLE IF NOT EXISTS RespuestasAbiertas (Numero NUMERIC PRIMARY KEY  NOT NULL, IdOperario VARCHAR, IdEncuesta NUMERIC, IdPregunta NUMERIC, TextoRespuesta VARCHAR, Control VARCHAR)");
	});
}

function CrearTablaAuxiliarCatastro(tx)
{
	dbShell.transaction(function(tx) 
	{	
		tx.executeSql("CREATE  TABLE IF NOT EXISTS AuxiliarCatastro (Numero NUMERIC PRIMARY KEY  NOT NULL, Id VARCHAR, DescripcionId VARCHAR, Control VARCHAR)");
	});
}

function getEntries() 
{
	dbShell.transaction(function(tx) 
	{
		tx.executeSql("select Id, Nombres, Apellidos, Login, Pass, Rol  from Usuarios Where Login=? order by Id desc ",
		['Admin'],renderEntries,dbErrorHandler)
	}, dbErrorHandler);

}

/*--------------------------------------------------------------------------------*/
//Funcion para definir las entradas a bases de datos que se llenan automáticamente y no requieren ingreso de archivos por parte del usuario

function GuardarUsuario(tx) 
{
	dbShell.transaction(function(tx) 
	{    		
		tx.executeSql("select Count(*) as Cantidad  from Usuarios  ",[], 
		
		function(tx, result)
		{
			if(result.rows.item(0)['Cantidad']==0)
			{
				tx.executeSql("Insert Into TipoMedidor(IdTipo, RangoMAyor)"
				          +"Values(?,?)",[1,9999]); 
				
				tx.executeSql("Insert Into TipoMedidor(IdTipo, RangoMAyor)"
				             +"Values(?,?)",[2,99999]);

				tx.executeSql("Insert Into TipoMedidor(IdTipo, RangoMAyor)"
				             +"Values(?,?)",[3,999999]);
			}
		});
	});
}

/*----------------------------------------------------------------------------------*/

//Función de carga de parametros

function mostrarParametros()
{
	dbShell.transaction(function(tx) 
	{   
		tx.executeSql("select * from Parametros ",[], 
		function(tx, result)
		{
			var critica1 = result.rows.item(0)['ValorParametro'];
			var critica2 = result.rows.item(1)['ValorParametro'];
			var critica3 = result.rows.item(2)['ValorParametro'];

			var limiteSuperiorBasico = result.rows.item(6)['ValorParametro'];
			var limiteSuperiorComplementario = result.rows.item(7)['ValorParametro'];
			var tasaInteresResidencial = result.rows.item(8)['ValorParametro'];
			var tasaInteresNoResidencial = result.rows.item(9)['ValorParametro'];

			document.getElementById("nombreEmpresa").value = result.rows.item(3)['ValorParametro'];

			var criticaAltaMenor6 = 1 + critica1;
			var criticaBajaMenor35 = 1 - critica2;
			var criticaAltaMenor35 = 1 + critica2;
			var criticaBajaMayor35 = 1 - critica3;
			var criticaAltaMayor35 = 1 + critica3;

			document.getElementById("criticaAltaMenor6").value = criticaAltaMenor6;
			document.getElementById("criticaBajaMenor35").value = criticaBajaMenor35;
			document.getElementById("criticaAltaMenor35").value = criticaAltaMenor35;
			document.getElementById("criticaBajaMayor35").value = criticaBajaMayor35;
			document.getElementById("criticaAltaMayor35").value = criticaAltaMayor35;
			document.getElementById("limiteSuperiorBasico").value = limiteSuperiorBasico;
			document.getElementById("limiteSuperiorComplementario").value = limiteSuperiorComplementario;
			document.getElementById("tasaInteresResidencial").value = tasaInteresResidencial;
			document.getElementById("tasaInteresNoResidencial").value = tasaInteresNoResidencial;
		});
	});
}

/*--------------------------------------------------------------------------------*/
//Función para mostrar error si la conexión a base de datos falla

function dbErrorHandler(err)
{
	
	if(err.code=='0')
	{
		VerNotificaciones("Conexión Exitosa");
	}
	else
	{
		VerNotificaciones("Estado de Conexión: "+err.message + " \nCode= "+err.code);
		
	}
}

function resetearMenuPrincipal()
{
	$("#MenulecturaMedidores").slideUp();
	$("#irALecturaMedidores i").removeClass('ion-ios-redo');
	$("#irALecturaMedidores i").addClass('ion-clipboard');
	$('#irALecturaMedidores').addClass("disableMP");

	$('#botonRealizarLecturas').off("click");
	$('#botonRealizarLecturas').addClass("disableMP");

	$('#botonReporteProgreso').attr("href", "#");
	$('#botonReporteProgreso').off("click");
	$('#botonReporteProgreso').addClass("disableMP");

	$("#MenuFacturacionEnSitio").slideUp();
	$('#MenuFacturacionEnSitio').addClass("disableMP");
	$("#irAFacturacionEnSitio i").removeClass('ion-ios-redo');
	$("#irAFacturacionEnSitio i").addClass('ios-paper-outline');
	$('#irAFacturacionEnSitio').attr("href", "#");
	$('#irAFacturacionEnSitio').addClass("disableMP");

	$("#MenuCatastroUsuarios").slideUp();
	$('#MenuCatastroUsuarios').addClass("disableMP");
	$("#irACatastroUsuarios i").removeClass('ion-ios-redo');
	$("#irACatastroUsuarios i").addClass('ion-compose');
	$('#irACatastroUsuarios').attr("href", "#");
	$('#irACatastroUsuarios').addClass("disableMP");

	$("#MenuTrabajoDeCampo").slideUp();
	$('#MenuTrabajoDeCampo').addClass("disableMP");
	$("#irATrabajoDeCampo i").removeClass('ion-ios-redo');
	$("#irATrabajoDeCampo i").addClass('ion-briefcase');
	$('#irATrabajoDeCampo').attr("href", "#");
	$('#irATrabajoDeCampo').addClass("disableMP");

	$('#irACargarDeArchivos').attr("href", "#");
	$('#irACargarDeArchivos').addClass("disableMP");
}

function resetearMenu()
{
	$("#archivosGenerales").css('display', 'none');
	$("#lecturaMedidores").css('display', 'none');

	$("#archivosGenerales").slideUp();
	$("#botonArchivosGenerales i").removeClass('ion-chevron-up');
	$("#botonArchivosGenerales i").addClass('ion-chevron-down');

	$("#lecturaMedidores").slideUp();
	$("#botonLecturaMedidores i").removeClass('ion-chevron-up');
	$("#botonLecturaMedidores i").addClass('ion-chevron-down');

	$("#FacturacionEnSitio").slideUp();
	$("#botonFacturacionEnSitio i").removeClass('ion-chevron-up');
	$("#botonFacturacionEnSitio i").addClass('ion-chevron-down');

	$("#CatastroUsuarios").slideUp();
	$("#botonCatastroUsuarios i").removeClass('ion-chevron-up');
	$("#botonCatastroUsuarios i").addClass('ion-chevron-down');

	$("#TrabajoDeCampo").slideUp();
	$("#botonTrabajoDeCampo i").removeClass('ion-chevron-up');
	$("#botonTrabajoDeCampo i").addClass('ion-chevron-down');
}

/*--------------------------------------------------------------------------------*/
//Funciones para mostrar los archivos que ya se encuentren cargados


function confimarUsuariosOperativos()
{
	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM Usuarios", [],
		function(tx, result)
		{
			if(result.rows.length > 0)
			{
				$("#confirmado1").show();
				$("#confirmadoUsuarios").show();
			}
			else
			{
				$("#confirmado1").hide();
				$("#confirmadoUsuarios").hide();
			}
		});
	});
}

function confimarUsuariosServicios()
{
	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM UsuariosServicios", [],
		function(tx, result)
		{
			if(result.rows.length > 0)
			{
				$("#confirmado2").show();
			}
			else
			{
				$("#confirmado2").hide();
			}
		});
	});
}

function confimarAsignacionRutas()
{
	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM AsignacionRutas", [],
		function(tx, result)
		{
			if(result.rows.length > 0)
			{
				$("#confirmado3").show();
				var idbd = document.getElementById("idOperario").value;
				listaCicloRuta(idbd);
			}
			else
			{
				$("#confirmado3").hide();
			}
		});
	});
}

function confimarPermisosAquamovil()
{
	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM PermisosAquamovil", [],
		function(tx, result)
		{
			if(result.rows.length > 0)
			{
				$("#confirmado4").show();
				$("#confirmadoPermisos").show();
			}
			else
			{
				$("#confirmado4").hide();
				$("#confirmadoPermisos").hide();
			}
		});
	});
}

function confimarParametros()
{
	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM Parametros", [],
		function(tx, result)
		{
			if(result.rows.length > 0)
			{
				$("#confirmado5").show();
			}
			else
			{
				$("#confirmado5").hide();
			}
		});
	});
}

function confimarCausales()
{
	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM Causales", [],
		function(tx, result)
		{
			if(result.rows.length > 0)
			{
				$("#confirmado6").show();
			}
			else
			{
				$("#confirmado6").hide();
			}
		});
	});
}

function confimarObservaciones()
{
	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM Observaciones", [],
		function(tx, result)
		{
			if(result.rows.length > 0)
			{
				$("#confirmado7").show();
			}
			else
			{
				$("#confirmado7").hide();
			}
		});
	});
}

function confimarAcumuladosAnteriores()
{
	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM AcumuladosAnteriores", [],
		function(tx, result)
		{
			if(result.rows.length > 0)
			{
				$("#confirmado8").show();
			}
			else
			{
				$("#confirmado8").hide();
			}
		});
	});
}

function confimarCargosFacturacion()
{
	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM CargosFacturacion", [],
		function(tx, result)
		{
			if(result.rows.length > 0)
			{
				$("#confirmado9").show();
			}
			else
			{
				$("#confirmado9").hide();
			}
		});
	});
}

function confimarIndicesSubsidiosAportes()
{
	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM IndicesSubsidiosAportes", [],
		function(tx, result)
		{
			if(result.rows.length > 0)
			{
				$("#confirmado10").show();
			}
			else
			{
				$("#confirmado10").hide();
			}
		});
	});
}

function confimarPeriodos()
{
	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM Periodos", [],
		function(tx, result)
		{
			if(result.rows.length > 0)
			{
				$("#confirmado11").show();
			}
			else
			{
				$("#confirmado11").hide();
			}
		});
	});
}

function confimarProyectoCatastro()
{
	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM ProyectoCatastro", [],
		function(tx, result)
		{
			if(result.rows.length > 0)
			{
				$("#confirmado12").show();
			}
			else
			{
				$("#confirmado12").hide();
			}
		});
	});
}

function confimarOpcionesCatastro()
{
	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM OpcionesCatastro", [],
		function(tx, result)
		{
			if(result.rows.length > 0)
			{
				$("#confirmado13").show();
			}
			else
			{
				$("#confirmado13").hide();
			}
		});
	});
}