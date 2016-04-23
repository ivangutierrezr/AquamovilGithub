/*----------------------------------------------------------------------------------*/

//Funcion para validar si el usuario ha ingresado observaciones desde la pantalla de lecturas

function validarObservacion()
{
	dbShell.transaction(function(tx) 
	{  
		var numero = document.getElementById("txtNumero").value;

		tx.executeSql("SELECT * FROM UsuariosServicios where Numero=?",[numero], 
		function(tx, result)
		{
			var lect = result.rows.item(0)['LecturaActual'];
			var cau = result.rows.item(0)['CausalActual'];

			//
			//

			if(lect != '' || cau > 0)
			{
				document.getElementById("txtCausal").value = 0;
				document.getElementById("txtObservacion").value = 0;
				document.getElementById("txtObservacion2").value = 0;
				document.getElementById("txtObservacion3").value = 0;
				window.location.href="#/observacionuno";
			}

			else
			{
				var Observacion1 = document.getElementById("txtObservacion").value;
				var Observacion2 = document.getElementById("txtObservacion2").value;

				if(Observacion1 > 0)
				{
					if(Observacion2 > 0)
					{
						window.location.href="#/observaciontres";
					}

					else
					{
						window.location.href="#/observaciondos";
					}
				}
					
				else
				{
					window.location.href="#/observacionuno";
				}
			}
		});
	});
}

function validarNuevaObs1(idObservacion)
{
	dbShell.transaction(function(tx) 
	{  
		var numero = document.getElementById("txtNumero").value;
		var obs = idObservacion;

		tx.executeSql("SELECT * FROM UsuariosServicios where Numero=?",[numero], 
		function(tx, result)
		{
			var lect = result.rows.item(0)['LecturaActual'];
			var cau = result.rows.item(0)['CausalActual'];

			if(lect != '' || cau > 0)
			{
				ActualizarObs1(obs);
			}
			else
			{
				document.getElementById("txtObservacion").value = obs;
				window.location.href= "#/medidorlecturas";
			}
		});
	});
}

function ActualizarObs1(obs)
{
	var numero = document.getElementById("txtNumero").value;
	dbShell.transaction(function(tx) 
	{
		//
		tx.executeSql("Update UsuariosServicios set ObservacionActual=? where Numero=?",[obs,numero], 

		function(tx, result)
		{
			document.getElementById("txtObservacion").value = obs;
			window.location.href= "#/medidorlecturas";
		});
	});
}

function validarNuevaObs2(idObservacion)
{
	dbShell.transaction(function(tx) 
	{  
		var numero = document.getElementById("txtNumero").value;
		var obs = idObservacion;

		tx.executeSql("SELECT * FROM UsuariosServicios where Numero=?",[numero], 
		function(tx, result)
		{
			var lect = result.rows.item(0)['LecturaActual'];
			var cau = result.rows.item(0)['CausalActual'];

			//
			//

			if(lect != '' || cau > 0)
			{
				//
				ActualizarObs2(obs);
			}
			else
			{
				document.getElementById("txtObservacion2").value = obs;
				window.location.href= "#/medidorlecturas";
			}
		});
	});
}

function ActualizarObs2(obs)
{
	var numero = document.getElementById("txtNumero").value;
	dbShell.transaction(function(tx) 
	{
		//
		tx.executeSql("Update UsuariosServicios set ObservacionDos=? where Numero=?",[obs,numero], 

		function(tx, result)
		{
			document.getElementById("txtObservacion2").value = obs;
			window.location.href= "#/medidorlecturas";
		});
	});
}

function validarNuevaObs3(idObservacion)
{
	dbShell.transaction(function(tx) 
	{  
		var numero = document.getElementById("txtNumero").value;
		var obs = idObservacion;

		tx.executeSql("SELECT * FROM UsuariosServicios where Numero=?",[numero], 
		function(tx, result)
		{
			var lect = result.rows.item(0)['LecturaActual'];
			var cau = result.rows.item(0)['CausalActual'];

			if(lect != '' || cau > 0)
			{
				ActualizarObs3(obs);
			}
			else
			{
				document.getElementById("txtObservacion3").value = obs;
				window.location.href= "#/medidorlecturas";
			}
		});
	});
}

function ActualizarObs3(obs)
{
	var numero = document.getElementById("txtNumero").value;
	dbShell.transaction(function(tx) 
	{
		//
		tx.executeSql("Update UsuariosServicios set ObservacionTres=? where Numero=?",[obs,numero], 

		function(tx, result)
		{
			document.getElementById("txtObservacion3").value = obs;
			window.location.href= "#/medidorlecturas";
		});
	});
}