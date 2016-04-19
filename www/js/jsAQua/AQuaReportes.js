function GenerarReporteLecturasGeneral()
{
	var idOperario = $("#idOperario").val();
	ListarReporteCiclo(idOperario);
	ListarReporteRuta(idOperario);
}

function ListarReporteCiclo(idOperario)
{
	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM AsignacionRutas where Oper=?",[idOperario],                
		function(tx, result)
		{
			var output = [];                    
			for(var i=0; i < result.rows.length; i++) 
			{

				var cantidadTotal = result.rows.length;

				if(cantidadTotal != 0)
				{       
					var a1 = result.rows.item(i)['Ciclo'];
					output.push([a1]);
				}
			}
			MostrarReporteCiclo(output);
		});    
	});
}

function MostrarReporteCiclo(users) 
{   
	var place = document.getElementById("listaCiclo");

	var list = document.createElement("ul");         
		
	for ( var i = 0; i < users.length; i++) 
	{            
		var item = document.createElement("li");

		var ciclo = users[i][0];

		item.innerHTML += ciclo; 

		list.appendChild(item);
	}
	place.appendChild(list);
}

function ListarReporteRuta(idOperario)
{
	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM AsignacionRutas where Oper=?",[idOperario],                
		function(tx, result)
		{
			var output = [];                    
			for(var i=0; i < result.rows.length; i++) 
			{

				var cantidadTotal = result.rows.length;

				if(cantidadTotal != 0)
				{       
					var a1 = result.rows.item(i)['Ruta'];
					output.push([a1]);
				}
			}
			MostrarReporteRuta(output);
			ListarReporteLecturas();
		});    
	});
}

function MostrarReporteRuta(users) 
{   
	var place = document.getElementById("listaRuta");

	var list = document.createElement("ul");         
		
	for ( var i = 0; i < users.length; i++) 
	{            
		var item = document.createElement("li");

		var ruta = users[i][0];

		item.innerHTML += ruta; 

		list.appendChild(item);
	}
	place.appendChild(list);
}

function ListarReporteLecturas()
{ 
	var listaCiclo = $("#listaCiclo ul").children().length;

	ListarReporte(1,listaCiclo);
}

function ListarReporte(a,b)
{
	var total = b;
	console.log(total);
	console.log(a);
	if(a < b)
	{
		var numero = a+1;
	}
	var ciclo = parseInt($("#listaCiclo ul li:nth-child("+a+")").html());
	var ruta = parseInt($("#listaRuta ul li:nth-child("+a+")").html());


	dbShell.transaction(function(tx) 
	{    		
		tx.executeSql("select * from UsuariosServicios Where Ciclo=? and Ruta=? ",[ciclo,ruta], 
		function(tx, result)
		{
			var CantidadProcesado = 0;
			var CantidadTotal = 0;
			var LectActual;
			var CauActual;
			for ( var i = 0; i < result.rows.length; i++)
			{
				LectActual = parseInt(result.rows.item(i)['LecturaActual']);
				CauActual = parseInt(result.rows.item(i)['CausalActual']);
				
				if(LectActual>=0 || CauActual>0)
				{
				  	CantidadProcesado = CantidadProcesado + 1;
				  	CantidadTotal = CantidadTotal + 1;
				}

				else
				{
					CantidadProcesado = CantidadProcesado + 0;
					CantidadTotal = CantidadTotal + 1;
				}
			}
			var lista = document.createElement("li");
			var lista2 = document.createElement("li");

			var porcentaje = ((CantidadProcesado/CantidadTotal)*100).toFixed(1);

			lista.innerHTML += CantidadProcesado + "/" + CantidadTotal;
			lista2.innerHTML += porcentaje + "%";
			document.getElementById('listaDeProceso').appendChild(lista);
			document.getElementById('listaDePorcentaje').appendChild(lista2);
			
			if(result.rows.length != 0)
			{
				ListarReporte(numero,total);
			}
		});
	});
}