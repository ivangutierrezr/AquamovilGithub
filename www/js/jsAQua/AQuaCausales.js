/*----------------------------------------------------------------------------------*/

//Funcion para Saber la cantidad de causales registradas

function ConsultaCausales()
{ 
   	dbShell.transaction(function(tx) 
	{    		
		tx.executeSql("select  Count(*) as Cantidad  from UsuariosServicios Where CausalActual<>'' ",[], 
		function(tx, result)
		{
			 CantidadCausal=result.rows.item(0)['Cantidad'];
		});
	});		
}

function verficarCausal()
{
	var idCausal = document.getElementById("txtCodCausal").value;
	dbShell.transaction(function(tx) 
	{
		tx.executeSql("select * from Causales Where IdCausal=? ",[idCausal], 
			function(tx, result)
		{
			var exFoto = (result.rows.item(0)['exigeFoto']).toUpperCase();
			var exObs = result.rows.item(0)['exigeObservacion'];

			if(exObs == "TRUE" || exObs == "true" || exObs == "True" || exObs == "1" || exObs == "VERDADERO" || exObs == "verdadero" || exObs == "Verdadero" || exObs == "si" || exObs == "SI" || exObs == "Si")
			{
				swal("Atención","Esta causal requiere Observación","warning");
				document.getElementById('txtCausal').value = document.getElementById('txtCodCausal').value;
				validarObservacion();
			}
			else
			{
				ActualizarArchivo();
			}
		});
	});
}