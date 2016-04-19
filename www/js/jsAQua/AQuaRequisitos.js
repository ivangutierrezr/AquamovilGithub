/*--------------------------------------------------------------------------------*/
//Funciones para mostrar los archivos que ya se encuentren cargados


function VerificarCargaDeParametros()
{
	var mensaje = "";
	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM Parametros", [],
		function(tx, result)
		{
			if(result.rows.length > 0)
			{
				mensaje = "";
				console.log(mensaje);
				VerificarCargaDeUsuariosServicios(mensaje);

			}
			else
			{
				mensaje = "Parámetros \n";
				console.log(mensaje);
				VerificarCargaDeUsuariosServicios(mensaje);
			}
		});
	});
}

function VerificarCargaDeUsuariosServicios(m)
{
	var mensajeAnterior = m;
	console.log(mensajeAnterior);
	var mensaje = "";
	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM UsuariosServicios", [],
		function(tx, result)
		{
			if(result.rows.length > 0)
			{
				mensaje = mensajeAnterior + "";
				VerificarCargaDeAsignacionRutas(mensaje);
			}
			else
			{
				mensaje = mensajeAnterior + "Usuarios Servicios \n";
				VerificarCargaDeAsignacionRutas(mensaje);
			}
		});
	});
}

function VerificarCargaDeAsignacionRutas(m)
{
	var mensajeAnterior = m;
	var mensaje = "";
	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM AsignacionRutas", [],
		function(tx, result)
		{
			if(result.rows.length > 0)
			{
				mensaje = mensajeAnterior + "";
				VerificarCargaDeCausales(mensaje);
			}
			else
			{
				mensaje = mensajeAnterior + "Asignación de Rutas \n";
				VerificarCargaDeCausales(mensaje);
			}
		});
	});
}

function VerificarCargaDeCausales(m)
{
	var mensajeAnterior = m;
	var mensaje = "";
	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM Causales", [],
		function(tx, result)
		{
			if(result.rows.length > 0)
			{
				mensaje = mensajeAnterior + "";
				VerificarCargaDeObservaciones(mensaje);
			}
			else
			{
				mensaje = mensajeAnterior + "Causales \n";
				VerificarCargaDeObservaciones(mensaje);
			}
		});
	});
}

function VerificarCargaDeObservaciones(m)
{
	var mensajeAnterior = m;
	var mensaje = "";
	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM Observaciones", [],
		function(tx, result)
		{
			if(result.rows.length > 0)
			{
				mensaje = mensajeAnterior + "";
				VerificarCargaDeArchivosParaLecturas(mensaje);
			}
			else
			{
				mensaje = mensajeAnterior + "Observaciones \n";
				VerificarCargaDeArchivosParaLecturas(mensaje);
			}

			
		});
	});
}

function VerificarCargaDeArchivosParaLecturas(m)
{
	var mensaje = m;
	if(mensaje == "")
	{
		window.location.href = "#/cicloruta";
	}

	else
	{
		swal("Atención","Falta la carga de los siguientes archivos:\n\n" + mensaje);
	}
}

/*Verificación de carga de archivos para Facturación*/

function VerificarCargaDeUsuariosServiciosFacturacion(m)
{
	var mensaje = "";
	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM UsuariosServicios", [],
		function(tx, result)
		{
			if(result.rows.length > 0)
			{
				mensaje = "";
				VerificarCargaDeAcumuladosAnteriores(mensaje);
			}
			else
			{
				mensaje = "Usuarios Servicios \n";
				VerificarCargaDeAcumuladosAnteriores(mensaje);
			}
		});
	});
}

function VerificarCargaDeAcumuladosAnteriores(m)
{
	var mensajeAnterior = m;
	var mensaje = "";
	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM AcumuladosAnteriores", [],
		function(tx, result)
		{
			if(result.rows.length > 0)
			{
				mensaje = mensajeAnterior + "";
				VerificarCargaDeCargosFacturacion(mensaje);
			}
			else
			{
				mensaje = mensajeAnterior + "Acumulados Anteriores \n";
				VerificarCargaDeCargosFacturacion(mensaje);
			}	
		});
	});
}

function VerificarCargaDeCargosFacturacion(m)
{
	var mensajeAnterior = m;
	var mensaje = "";
	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM CargosFacturacion", [],
		function(tx, result)
		{
			if(result.rows.length > 0)
			{
				mensaje = mensajeAnterior + "";
				VerificarCargaDeIndicesSubsidiosAportes(mensaje);
			}
			else
			{
				mensaje = mensajeAnterior + "Cargos Facturación \n";
				VerificarCargaDeIndicesSubsidiosAportes(mensaje);
			}	
		});
	});
}

function VerificarCargaDeIndicesSubsidiosAportes(m)
{
	var mensajeAnterior = m;
	var mensaje = "";
	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM IndicesSubsidiosAportes", [],
		function(tx, result)
		{
			if(result.rows.length > 0)
			{
				mensaje = mensajeAnterior + "";
				VerificarCargaDePeriodos(mensaje);
			}
			else
			{
				mensaje = mensajeAnterior + "Indices Subsidios Aportes \n";
				VerificarCargaDePeriodos(mensaje);
			}	
		});
	});
}

function VerificarCargaDePeriodos(m)
{
	var mensajeAnterior = m;
	var mensaje = "";
	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM Periodos", [],
		function(tx, result)
		{
			if(result.rows.length > 0)
			{
				mensaje = mensajeAnterior + "";
				VerificarCargaDeArchivosParaFacturas(mensaje);
			}
			else
			{
				mensaje = mensajeAnterior + "Periodos \n";
				VerificarCargaDeArchivosParaFacturas(mensaje);
			}	
		});
	});
}


function VerificarCargaDeArchivosParaFacturas(m)
{
	var mensaje = m;
	if(mensaje == "")
	{
		window.location.href = "#/Ciclorutafacturacion";
	}

	else
	{
		swal("Atención","Falta la carga de los siguientes archivos:\n\n" + mensaje);
	}
}

function VerificarCargaDeProyectoCatastro()
{
	var mensaje = "";
	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM ProyectoCatastro", [],
		function(tx, result)
		{
			if(result.rows.length > 0)
			{
				mensaje = "";
				VerificarCargaDeOpcionesCatastro(mensaje);
			}
			else
			{
				mensaje = "Proyecto \n";
				VerificarCargaDeOpcionesCatastro(mensaje);
			}	
		});
	});
}

function VerificarCargaDeOpcionesCatastro(m)
{
	var mensajeAnterior = m;
	var mensaje = "";
	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM OpcionesCatastro", [],
		function(tx, result)
		{
			if(result.rows.length > 0)
			{
				mensaje = mensajeAnterior + "";
				VerificarCargaDeArchivosParaCatastro(mensaje);
			}
			else
			{
				mensaje = mensajeAnterior + "Opciones Catastro \n";
				VerificarCargaDeArchivosParaCatastro(mensaje);
			}	
		});
	});
}


function VerificarCargaDeArchivosParaCatastro(m)
{
	var mensaje = m;
	if(mensaje == "")
	{
		window.location.href = "#/catastrousuarios";
	}

	else
	{
		swal("Atención","Falta la carga de los siguientes archivos:\n\n" + mensaje);
	}
}