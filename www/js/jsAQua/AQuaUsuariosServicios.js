/*----------------------------------------------------------------------------------*/

//Funciones para contar lecturas

function ContarLecturas()
{ 
	var ciclo = document.getElementById("txtCiclo").value;
	var ruta = document.getElementById("txtRuta").value;
	var numero = document.getElementById("txtNumRegistro").value;
   	dbShell.transaction(function(tx) 
	{    		
		tx.executeSql("select  Count(*) as Cantidad from UsuariosServicios Where Ciclo=? and Ruta=? ",[ciclo,ruta], 
		function(tx, result)
		{
			var CantidadLecturas=result.rows.item(0)['Cantidad'];
			Adelante(CantidadLecturas,ciclo,ruta,numero);
		});
	});
}

/*----------------------------------------------------------------------------------*/

//Mostrar el registro siguiente

function Adelante(dato,ciclo,ruta,num)
{
	$("#btnAnt").attr("onClick", "validarLectAnt()");
	var numero =  parseInt(num);
	var cantidad = dato;
	var cic = ciclo;
	var rut = ruta;

	if(numero != cantidad-1)
	{
		var RegAnt = numero;	
		var RegSig = numero + 1;
		var RegSigSig = numero + 2;
		document.getElementById('txtNumRegistro').value=RegSig;
	}

   	dbShell.transaction(function(tx) 
	{    		
		tx.executeSql("select * from UsuariosServicios where Ciclo=? and Ruta=?",[cic,rut], 
		function(tx, result)
		{
			$("#btnAnt span").removeClass("disable");
			$("#btnAnt i").removeClass("disable");

			if(RegSig == cantidad-1)
			{
				document.getElementById('txtIdUsuarioLecturaSig').value = " ";
				$("#btnSig i").addClass("disable");
				$("#btnSig span").addClass("disable");
				$("#btnSig").attr("onClick", " ");
			}

			if(RegSig > 0 && RegSig <= cantidad-2)
			{
				$("#btnSig i").removeClass("disable");
				$("#btnSig span").removeClass("disable");
	
				var ConsecSig = result.rows.item(RegSigSig)['Consecutivo'];

				document.getElementById('txtIdUsuarioLecturaSig').value = "Siguiente: " + result.rows.item(RegSigSig)['IdUsuario'] + ": " + ciclo + "-" + ruta + "-" + ConsecSig;
			}

			var ConsecAnt = result.rows.item(RegAnt)['Consecutivo'];

			document.getElementById('txtIdUsuarioLecturaAnt').value = "Anterior: " + result.rows.item(RegAnt)['IdUsuario'] + ": " + ciclo + "-" + ruta + "-" + ConsecAnt;

			document.getElementById('txtNumero').value = result.rows.item(RegSig)['Numero'];

			document.getElementById('txtIdUsuarioLectura').value = result.rows.item(RegSig)['IdUsuario'];
			document.getElementById('txtidUsuarioLecturaCtrl').value = result.rows.item(RegSig)['IdUsuario'];

			var Ciclotx = result.rows.item(RegSig)['Ciclo'];	
			document.getElementById('txtCiclo2').value = "Ciclo: " + Ciclotx;

			var Rutatx = result.rows.item(RegSig)['Ruta'];
			document.getElementById('txtRuta2').value = "Ruta: " +  Rutatx;

			document.getElementById('txtCRC').value = result.rows.item(RegSig)['Consecutivo'];
			document.getElementById("txtCicloNuevo").value = result.rows.item(RegSig)['CicloNuevo'];
			document.getElementById("txtRutaNueva").value = result.rows.item(RegSig)['RutaNueva'];
			document.getElementById("txtConsecutivoNuevo").value = result.rows.item(RegSig)['ConsecutivoNuevo'];
			document.getElementById("txtImpreso").value = result.rows.item(RegSig)['impreso'];
			document.getElementById("txtEditado").value = result.rows.item(RegSig)['editado'];
			document.getElementById('txtDireccion').value = result.rows.item(RegSig)['Direccion'];
			document.getElementById('txtMedidor').value = "MED.# " + result.rows.item(RegSig)['NumeroMedidor'];
			document.getElementById('consumo').value = result.rows.item(RegSig)['Consumo'];
			document.getElementById('conceptoCritica').value = result.rows.item(RegSig)['ConceptoCritica'];

			var numeroFotostx = result.rows.item(RegSig)['NumeroFotos'];

			document.getElementById('contadorFotos').value = numeroFotostx;
			
			document.getElementById('txtTipoMedidor').value = result.rows.item(RegSig)['TipoMedidor'];

			var IdUsotx = result.rows.item(RegSig)['IdUso'];

			if(IdUsotx == 1){
				document.getElementById('txtUso').value = "USO: RESIDENCIAL";
			}

			if(IdUsotx == 2){
				document.getElementById('txtUso').value = "USO: COMERCIAL";
			}

			if(IdUsotx == 3){
				document.getElementById('txtUso').value = "USO: INDUSTRIAL";
			}

			if(IdUsotx == 4){
				document.getElementById('txtUso').value = "USO: OFICIAL";
			}

			if(IdUsotx == 5){
				document.getElementById('txtUso').value = "USO: ESPECIAL";
			}

			if(IdUsotx == 6){
				document.getElementById('txtUso').value = "USO: PROVISIONAL";
			}

			document.getElementById('txtCategoria').value = "CATEGORIA: " + result.rows.item(RegSig)['IdCategoria'];

			//var LecturaAnteriortx = document.getElementById('txtLecturaAnterior').value;
			//LecturaAnteriortx.innerHTML = result.rows.item(RegSig)['LecturaAnterior'];

			//var ConsumoMediotx = document.getElementById('txtPromedio').value;
			//ConsumoMediotx.innerHTML = result.rows.item(RegSig)['ConsumoMedio'];

			document.getElementById('txtNombre').value = result.rows.item(RegSig)['Suscriptor'];
			document.getElementById('txtLectura').value = result.rows.item(RegSig)['LecturaActual'];
			document.getElementById('txtCausal').value = result.rows.item(RegSig)['CausalActual'];
			document.getElementById('txtObservacion').value = result.rows.item(RegSig)['ObservacionActual'];
			document.getElementById('txtObservacion2').value = result.rows.item(RegSig)['ObservacionDos'];
			document.getElementById('txtObservacion3').value = result.rows.item(RegSig)['ObservacionTres'];

			if(parseInt(result.rows.item(RegSig)['LecturaActual']) >= 0 || parseInt(result.rows.item(RegSig)['CausalActual']) >= 1)
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

/*----------------------------------------------------------------------------------*/

//Mostrar el registro anterior

function validarLectAnt()
{
	var ciclo = document.getElementById("txtCiclo").value;
	var ruta = document.getElementById("txtRuta").value;
	var numero = document.getElementById('txtNumRegistro').value
	Atras(ciclo,ruta,numero);
}

function Atras(ciclo,ruta,num) 
{
	$("#btnSig").attr("onClick", "ContarLecturas()");

	var numero = parseInt(num);
	//

	if(numero != 0)
	{
		var RegAnt = numero - 2;
		var Reg = numero -1;
		document.getElementById('txtNumRegistro').value = Reg;
		var RegSig = numero;
	}
	
   	dbShell.transaction(function(tx) 
	{    		
		tx.executeSql("select * from UsuariosServicios where Ciclo=? and Ruta=?",[ciclo,ruta], function(tx, result)
		{

			$("#btnSig i").removeClass("disable");
			$("#btnSig span").removeClass("disable");

			if(Reg == 0)
			{
				document.getElementById('txtIdUsuarioLecturaAnt').value = " ";
				$("#btnAnt span").addClass("disable");
				$("#btnAnt i").addClass("disable");
				$("#btnAnt").attr("onClick", " ");
			}

			if(Reg > 0 && Reg < result.rows.length-1)
			{
				$("#btnSig i").removeClass("disable");
				$("#btnAnt i").removeClass("disable");

				var ConsecAnt = result.rows.item(RegAnt)['Consecutivo'];
				
				document.getElementById('txtIdUsuarioLecturaAnt').value = "Anterior: " + result.rows.item(RegAnt)['IdUsuario'] + ": " + ciclo + "-" + ruta + "-" + ConsecAnt;
			}

			var ConsecSig = result.rows.item(RegSig)['Consecutivo'];
			document.getElementById('txtIdUsuarioLecturaSig').value = "Siguiente: " + result.rows.item(RegSig)['IdUsuario'] + ": " + ciclo + "-" + ruta + "-" + ConsecSig;
			  
			document.getElementById('txtIdUsuarioLectura').value = result.rows.item(Reg)['IdUsuario'];
			document.getElementById('txtidUsuarioLecturaCtrl').value = result.rows.item(Reg)['IdUsuario'];

			var Ciclotx = result.rows.item(Reg)['Ciclo'];	
			document.getElementById('txtCiclo2').value = "Ciclo: " + Ciclotx;

			var Rutatx = result.rows.item(Reg)['Ruta'];
			document.getElementById('txtRuta2').value = "Ruta: " + Rutatx;			
			document.getElementById('txtCRC').value = result.rows.item(Reg)['Consecutivo'];
			document.getElementById("txtCicloNuevo").value = result.rows.item(Reg)['CicloNuevo'];
			document.getElementById("txtRutaNueva").value = result.rows.item(Reg)['RutaNueva'];
			document.getElementById("txtConsecutivoNuevo").value = result.rows.item(Reg)['ConsecutivoNuevo'];
			document.getElementById("txtImpreso").value = result.rows.item(Reg)['impreso'];
			document.getElementById("txtEditado").value = result.rows.item(Reg)['editado'];			
			document.getElementById('txtNumero').value = result.rows.item(Reg)['Numero'];
			document.getElementById('txtDireccion').value = result.rows.item(Reg)['Direccion'];
			document.getElementById('txtMedidor').value = "MED.# " + result.rows.item(Reg)['NumeroMedidor'];
			document.getElementById('consumo').value = result.rows.item(Reg)['Consumo'];
			document.getElementById('conceptoCritica').value = result.rows.item(Reg)['ConceptoCritica'];

			var numeroFotostx = result.rows.item(Reg)['NumeroFotos'];

			document.getElementById('contadorFotos').value = numeroFotostx;
						
			document.getElementById('txtTipoMedidor').value = result.rows.item(Reg)['TipoMedidor'];

			var IdUsotx = result.rows.item(Reg)['IdUso'];

			if(IdUsotx == 1){
				document.getElementById('txtUso').value = "USO: RESIDENCIAL";
			}

			if(IdUsotx == 2){
				document.getElementById('txtUso').value = "USO: COMERCIAL";
			}

			if(IdUsotx == 3){
				document.getElementById('txtUso').value = "USO: INDUSTRIAL";
			}

			if(IdUsotx == 4){
				document.getElementById('txtUso').value = "USO: OFICIAL";
			}

			if(IdUsotx == 5){
				document.getElementById('txtUso').value = "USO: ESPECIAL";
			}

			if(IdUsotx == 6){
				document.getElementById('txtUso').value = "USO: PROVISIONAL";
			}

			document.getElementById('txtCategoria').value = "CATEGORIA: " + result.rows.item(Reg)['IdCategoria'];

			//var LecturaAnteriortx = document.getElementById('txtLecturaAnterior').value;
			//LecturaAnteriortx.innerHTML = result.rows.item(Reg)['LecturaAnterior'];

			//var ConsumoMediotx = document.getElementById('txtPromedio').value;
			//ConsumoMediotx.innerHTML = result.rows.item(Reg)['ConsumoMedio'];

			document.getElementById('txtNombre').value = result.rows.item(Reg)['Suscriptor'];

			document.getElementById('txtLectura').value = result.rows.item(Reg)['LecturaActual'];

			document.getElementById('txtCausal').value = result.rows.item(Reg)['CausalActual'];

			document.getElementById('txtObservacion').value = result.rows.item(Reg)['ObservacionActual'];

			document.getElementById('txtObservacion2').value = result.rows.item(Reg)['ObservacionDos'];

			document.getElementById('txtObservacion3').value = result.rows.item(Reg)['ObservacionTres'];

			if(parseInt(result.rows.item(Reg)['LecturaActual']) >= 0 || parseInt(result.rows.item(Reg)['CausalActual']) >= 1)
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

//Funciones para habilitar el boton de imprimir

function activarImpresion()
{
	$("#imprimir i").removeClass("disable");
	$("#imprimir").attr('onClick', 'Imprimir()');
}

function Imprimir()
{
	var siImprimio = "si";
	var numero = $('#txtNumRegistro').val();

	dbShell.transaction(function(tx) 
	{  
		tx.executeSql("Update UsuariosServicios set impreso=? where Numero=?",["si",numero], 
		function(tx, result)
		{
			document.getElementById("txtImpreso").value = "si";
			permitirEditar();
			//
			EjecutarImpresion();
		});
	});
}

function EjecutarImpresion()
{
	window.DatecsPrinter.listBluetoothDevices(
    function (devices) 
    {
        window.DatecsPrinter.connect(devices[0].address, 
        	function()
        	{
				var ruta = document.getElementById("rutaImagenLectura").value;
			    var image = new Image();
			    image.src = ruta;
			    image.onload = function() 
			    {
			        var canvas = document.createElement('canvas');
			        canvas.height = 100;
			        canvas.width = 100;
			        var context = canvas.getContext('2d');
			        context.drawImage(image, 0, 0);
			        var imageData = canvas.toDataURL('image/jpeg').replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
			        window.DatecsPrinter.printImage(
			        imageData, 
			        canvas.width, 
			        canvas.height, 
			        1, 
			        function() 
			        {
			    		//
			        },
			        function (error) {
			            //
			        });
			    }

			    dbShell.transaction(function(tx) 
				{ 	
					tx.executeSql("select * FROM Parametros",[], 
					function(tx,result)
					{
						var otroTexto = "";
						var nombreEmpresa = result.rows.item(3)['ValorParametro'];
						var nitEmpresa = result.rows.item(4)['ValorParametro'];

						var texto = '{center}{b}' + nombreEmpresa + '{br}NIT: ' + nitEmpresa + '{br}{/b}'+ otroTexto;

			    		window.DatecsPrinter.printText(texto,"ISO-8859-1",function ()
					    {
					    	//
					    	
						},
				        function (error) {
				        	swal(JSON.stringify(error));
				        });
					});
				});

				var numero = $('#txtNumero').val();
				dbShell.transaction(function(tx) 
				{ 
					tx.executeSql("select * from UsuariosServicios where Numero=?",[numero], 
					function(tx, result)
					{
						var lecturaMedidor = result.rows.item(0)['LecturaActual'];
						//
						var consumo = $("#consumo").val();
						//
						var consumoImpreso;

						if(consumo == '')
						{
							var consumoImpreso = ' ';
						}

						if(consumo != '')
						{
							var consumoImpreso = '{b}Consumo: {/b}' + consumo + '';
						}

						var fecha = $('#fecha').val();
						var hora = $('#hora').val();
						var idUsuario = $('#txtIdUsuarioLectura').val();
						var numeroMedidor = $("#txtMedidor").val();
						var nombreUsuario = $('#txtNombre').val();
						
						var concepto = $('#conceptoCritica').val();
						var operario = $('#nombreOperario').val();

						var textoSobra = "";

						//

						var texto = '{br}{left}' + '{b}Fecha: {/b}' + fecha + '{br}{b}Hora: {/b}' + hora + '{br}{b}Id Usuario: {/b}' + idUsuario  + '{br}{b}Nombre: {/b}' + nombreUsuario + '{br}{b}Medidor: {/b}' + numeroMedidor + '{br}{b}Lectura: {/b}' + lecturaMedidor + '{br}{br}' + consumoImpreso + '{br}{b}Concepto: {/b}' + concepto + '{br}{br}{b}Realizado por: {/b}' + operario + '{br}{br}{b}Generado por AQuaMóvil 1.5{/b}{br}'+textoSobra;

	            		window.DatecsPrinter.printText(texto,"ISO-8859-1",function ()
					    {
					    	window.DatecsPrinter.feedPaper(150, function()
				    		{
				    			window.DatecsPrinter.disconnect(function()
					    		{
					    			swal("impreso");
					    		},

					    		function()
					    		{
									//
					    		});
				    		}, 
				    		function (error)
						    { 
						        //
						    });
					    	
						},
					    function (error)
					    { 
					        //
					    });

					    /*cordova.plugins.bixolonPrint.addLine(nombreEmpresa + '\n\n' + 'Fecha: ' + fecha + '\n' + 'Hora: ' + hora + '\n' +'Id Usuario: ' + idUsuario  + '\n' +'Nombre: ' + nombreUsuario + '\n' + 'Medidor: ' + numeroMedidor + '\n' + 'Lectura: ' + lecturaMedidor + '\n\n' + consumoImpreso + '\n' + 'Concepto:' + concepto + '\n\n' + 'Realizado por: ' + operario + '\n\n' + 'Generado por AQuaMóvil 1.4');
					    cordova.plugins.bixolonPrint.printText(null, null);*/

						//
					});
				});
			},
        	function (error)
		    { 
		        //
		    });
        },
        function (error) {
        	swal(JSON.stringify(error));
        });
}

//Funciones para inhabilitar el boton de imprimir

function desactivarImpresion(){
	$("#imprimir i").addClass("disable");
	$("#imprimir").attr("onClick", "");
}

function permitirEditar()
{
	var siImpreso = document.getElementById("txtImpreso").value; 
	var campoLectura = document.getElementById('txtLectura');

	if(siImpreso == "si")
	{
		$('#btnValidar').attr('onClick', "");
		$('#btnValidar').addClass('disable');
		campoLectura.readOnly = true;
		$('#btnObs1').attr('href', "");
		$('#btnObs2').attr('href', "");
		$('#btnObs3').attr('href', "");
		$('#btnCRC').attr('onClick', "");
		$('#camara').attr('ng-click', "");
		$('#camara').addClass('disable');
		$('#camara i').addClass('disable');
	}

	else
	{
		$('#btnValidar').attr('onClick', "validarLectura()");
		$('#btnValidar').removeClass('disable');
		campoLectura.readOnly = false;
		$('#btnObs1').attr('href', "#/observacionunocargue");
		$('#btnObs2').attr('href', "#/observaciondoscargue");
		$('#btnObs3').attr('href', "#/observaciontrescargue");
		$('#btnCRC').attr('onClick', "confirmarNuevoCRC()");
		$('#camara').attr('ng-click', "Foto()");
		$('#camara').removeClass('disable');
		$('#camara i').removeClass('disable');
	}
}

// Funcion Para ir a Facturacion en Sitio

/*----------------------------------------------------------------------------------*/

function pasarAFacturacionEnSitio()
{
	var ciclo = document.getElementById("txtCiclo").value;
	var ruta = document.getElementById("txtRuta").value;
	var numero = document.getElementById('txtNumRegistro').value;
	var idbd = document.getElementById("idOperario").value;

	dbShell.transaction(function(tx) 
	{ 
		tx.executeSql("select * from PermisosAquamovil where IdUsuario=?",[idbd], 
		function(tx, result)
		{
			var Habilitado = result.rows.item(3)['Habilitado'];
			
			if(Habilitado == "TRUE" || Habilitado == "true" || Habilitado == "True" || Habilitado == "1" || Habilitado == "VERDADERO" || Habilitado == "verdadero" || Habilitado == "Verdadero" || Habilitado == "si" || Habilitado == "SI" || Habilitado == "Si")
			{
				pasarAFacturacion(ciclo,ruta,numero);
			}

			else
			{
				swal("Atencion!", "No se encuentra habilitado para ir a Facturación en Sitio", "error");
			}
		});
	});
}

function pasarAFacturacion(ciclo,ruta,a)
{
	window.location.href = "#/facturacionensitio";
	var dato = parseInt(a);
	//
	document.getElementById('txtNumRegistro').value = dato;
	document.getElementById('txtCiclo').value = parseInt(ciclo);
	document.getElementById('txtRuta').value = parseInt(ruta);
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
					document.getElementById('txtIdUsuarioLecturaAntFact').value = " ";
					$("#btnSigFact i").removeClass("disable");
					$("#btnSigFact span").removeClass("disable");
					$("#btnAntFact span").addClass("disable");
					$("#btnAntFact i").addClass("disable");
					$("#btnSigFact").attr("onClick", "ContarLecturasFact()");
					$("#btnAntFact").attr("onClick", " ");

					var ConsecSig = result.rows.item(RegSig)['Consecutivo'];
					document.getElementById('txtIdUsuarioLecturaSigFact').value = "Siguiente: " + result.rows.item(RegSig)['IdUsuario'] + "-" + ciclo + "-" + ruta + "-" + ConsecSig;
				}

				if(dato == result.rows.length-1)
				{
					document.getElementById('txtIdUsuarioLecturaSigFact').value = " ";
					$("#btnSigFact i").addClass("disable");
					$("#btnSigFact span").addClass("disable");
					$("#btnAntFact span").removeClass("disable");
					$("#btnAntFact i").removeClass("disable");
					$("#btnSigFact").attr("onClick", " ");
					$("#btnAntFact").attr("onClick", "validarLectAntFact()");

					var ConsecAnt = result.rows.item(RegAnt)['Consecutivo'];

					document.getElementById('txtIdUsuarioLecturaAntFact').value = "Anterior: " + result.rows.item(RegAnt)['IdUsuario'] + "-" + ciclo + "-" + ruta + "-" + ConsecAnt;
				}

				if(dato > 0 && dato <= result.rows.length-2)
				{
					var ConsecAnt = result.rows.item(RegAnt)['Consecutivo'];
					var ConsecSig = result.rows.item(RegSig)['Consecutivo'];

					$("#btnSigFact i").removeClass("disable");
					$("#btnSigFact span").removeClass("disable");
					$("#btnAntFact span").removeClass("disable");
					$("#btnAntFact i").removeClass("disable");
					$("#btnSigFact").attr("onClick", "ContarLecturasFact()");
					$("#btnAntFact").attr("onClick", "validarLectAntFact()");

					document.getElementById('txtIdUsuarioLecturaAntFact').value = "Anterior: " + result.rows.item(RegAnt)['IdUsuario'] + "-" + ciclo + "-" + ruta + "-" + ConsecAnt;

					document.getElementById('txtIdUsuarioLecturaSigFact').value = "Siguiente: " + result.rows.item(RegSig)['IdUsuario'] + "-" + ciclo + "-" + ruta + "-" + ConsecSig;			
				}

				var lecturaActual = result.rows.item(dato)['LecturaActual'];
				var causalActual = result.rows.item(dato)['CausalActual'];
				var impreso = result.rows.item(dato)['impreso'];

				var idUsuario = result.rows.item(dato)['IdUsuario'];
				document.getElementById('txtIdUsuarioLecturaFact').value = idUsuario;

				if(impreso == "si")
				{
					activarImpresionFact();
					$("#datos-entrada").attr('style', 'display:block;');
					$("#datosGenerales").attr('style', 'display:block;');
					$("#LecturaNoDiligenciada").attr('style', 'display:none;');

					document.getElementById('txtNumeroFact').value = result.rows.item(dato)['Numero'];
		
					document.getElementById('txtidUsuarioLecturaCtrl').value = idUsuario;

					var Ciclotx = result.rows.item(dato)['Ciclo'];	
					document.getElementById('txtCiclo2Fact').value = "Ciclo: " + Ciclotx;

					var Rutatx = result.rows.item(dato)['Ruta'];
					document.getElementById('txtRuta2Fact').value = "Ruta: " + Rutatx;
					
					document.getElementById("txtImpresoFact").value = impreso;


					var nombreUsuario = result.rows.item(dato)['Suscriptor'];
					document.getElementById("txtIdNombreUsuarioFact").innerHTML = "ID:" + "<b>" + idUsuario + " - " + nombreUsuario.toUpperCase() + "</b>";
					
					var direccionUsuario = result.rows.item(dato)['Direccion'];
					document.getElementById('txtDireccionFact').innerHTML = "Dirección: <b>" + direccionUsuario.toUpperCase() + "</b>";

					document.getElementById('txtMedidorFact').innerHTML = "MED.# <b>" + result.rows.item(dato)['NumeroMedidor'] + "</b>";

					document.getElementById('txtConsumoFact').innerHTML = "Consumo: <b>" + result.rows.item(dato)['Consumo'] + "</b>";


					var Uso;
					var IdUsotx = result.rows.item(dato)['IdUso'];
					document.getElementById('txtUsoFact').value=IdUsotx;

					if(IdUsotx == 1)
					{
						Uso = "Uso: <b>RESIDENCIAL</b>";
					}

					if(IdUsotx == 2)
					{
						Uso = "Uso: <b>COMERCIAL</b>";
					}

					if(IdUsotx == 3)
					{
						Uso = "Uso: <b>INDUSTRIAL</b>";
					}

					if(IdUsotx == 4)
					{
						Uso = "Uso: <b>OFICIAL</b>";
					}

					if(IdUsotx == 5)
					{
						Uso = "Uso: <b>ESPECIAL</b>";
					}

					if(IdUsotx == 6)
					{
						Uso = "Uso: <b>PROVISIONAL</b>";
					}

					var categoria = result.rows.item(dato)['IdCategoria'];

					document.getElementById("txtUsoCatFact").innerHTML = Uso + " Cat: <b>" + categoria + "</b>";

					var CtasAcR = parseInt(result.rows.item(dato)['CtasAcR']);
					var CtasAcNR = parseInt(result.rows.item(dato)['CtasAcNR']);
					var CtasAlR = parseInt(result.rows.item(dato)['CtasAlR']);
					var CtasAlNR = parseInt(result.rows.item(dato)['CtasAlNR']);
					var CtasAsR = parseInt(result.rows.item(dato)['CtasAsR']);
					var CtasAsNR = parseInt(result.rows.item(dato)['CtasAsNR']);

					var CuentasAcueducto;
					var CuentasAlcantarillado;
					var CuentasAseo;
					var NumeroCuentasAcueducto = CtasAcR+CtasAcNR;
					var NumeroCuentasAlcantarillado = CtasAlR+CtasAlNR;
					var NumeroCuentasAseo = CtasAsR+CtasAsNR;

					if (CtasAcR > 0) 
					{
						CuentasAcueducto = "# Ctas Acued.: <b>" + CtasAcR + " (R)</b>";
					}

					if (CtasAcNR > 0) 
					{
						CuentasAcueducto = "# Ctas Acued.: <b>" + CtasAcR + " (NR)</b>";
					}

					if (CtasAlR > 0) 
					{
						CuentasAlcantarillado = "# Ctas Alcant.: <b>" + CtasAlR + " (R)</b>";
					}

					if (CtasAlNR > 0) 
					{
						CuentasAlcantarillado = "# Ctas Alcant.: <b>" + CtasAlNR + " (NR)</b>";
					}

					if (CtasAsR > 0) 
					{
						CuentasAseo = "# Ctas Aseo: <b>" + CtasAsR + " (R)</b>";
					}

					if (CtasAsNR > 0) 
					{
						CuentasAseo = "# Ctas Aseo: <b>" + CtasAsNR + " (NR)</b>";
					}

					document.getElementById("txtNumCuentasAcueductoFact").innerHTML = CuentasAcueducto;
					document.getElementById("txtNumCuentasAlcantarilladoFact").innerHTML = CuentasAlcantarillado;
					document.getElementById("txtNumCuentasAseoFact").innerHTML = CuentasAseo;

					var VolumenAseo = result.rows.item(dato)['VolumenAseo'];

					document.getElementById("txtToneladasProducidasFact").innerHTML = "Ton. de Basura Prod: <b>" + VolumenAseo + "</b>";

					var LecturaAnteriortx = document.getElementById('txtLecturaAnteriorFact');

					LecturaAnteriortx.innerHTML = "Lectura Anterior: <b>" + result.rows.item(dato)['LecturaAnterior'] + "</b>";

					var ConsumoMediotx = document.getElementById('txtConsumoPromedioFact');

					ConsumoMediotx.innerHTML = "Consumo Promedio: <b>" + result.rows.item(dato)['ConsumoMedio'] + "</b>";

					if (causalActual == 0)
					{
						document.getElementById('txtCausalFact').innerHTML = "";
						document.getElementById('txtLecturaActualFact').innerHTML = "Lectura Actual: <b>" + lecturaActual + "</b>";
					}

					if(causalActual > 0)
					{
						asignarCausalFact(causalActual);	
					}

					var observacionActual = result.rows.item(dato)['ObservacionActual'];

					if(observacionActual == 0)
					{
						document.getElementById('txtObservacionFact').innerHTML = "";
					}

					if(observacionActual > 0)
					{
						asignarObsFact(observacionActual);
					}

					var fechaFactura = result.rows.item(dato)['fechaFactura'];
					var fechaLimiteDePago = result.rows.item(dato)['fechaLimiteDePago'];
					var numeroFactura = result.rows.item(dato)['numeroFactura'];

					if (fechaFactura == "") 
					{
						setFechaFactura();
						setNumeroFactura();
					}

					else
					{
						document.getElementById('txtFechaFact').innerHTML = "Fecha Facturación: <b>" + fechaFactura + "</b>";
						document.getElementById('txtFechaFactura').value = fechaFactura;

						document.getElementById('txtFechaLimiteFact').innerHTML = "Fecha Limite de Pago: <b>" + fechaLimiteDePago + "</b>";
						document.getElementById('txtFechaLimiteDePagoFactura').value = fechaLimiteDePago;

						document.getElementById('txtNumeroFactReal').value = numeroFactura;
						document.getElementById('txtNumFact').innerHTML = "Factura #: <b>" + numeroFactura + "</b>";
					}

					cargarDatosEmpresaFact();
					cargarDatosPeriodoFact();

					var ConsuMedio = result.rows.item(dato)['ConsumoMedio'];
					var ConsumoMes = result.rows.item(dato)['Consumo'];
					var EdadAcueducto = result.rows.item(dato)['EdadAcueducto'];
					document.getElementById('txtEdadAcueducto').value = EdadAcueducto;
					document.getElementById('txtEdadAcueductoFact').innerHTML = "Facturas Pendientes: <b>" + EdadAcueducto + "</b>";

					if (ConsumoMes > 0) 
					{
						liquidacionFactura(ConsumoMes,VolumenAseo,IdUsotx,categoria,idUsuario,NumeroCuentasAcueducto,NumeroCuentasAlcantarillado,NumeroCuentasAseo,EdadAcueducto);
					}

					else
					{
						liquidacionFactura(ConsuMedio,VolumenAseo,IdUsotx,categoria,idUsuario,NumeroCuentasAcueducto,NumeroCuentasAlcantarillado,NumeroCuentasAseo,EdadAcueducto);
					}

					var fechaLectura = result.rows.item(dato)['Fecha'];
					document.getElementById('txtFechaFinalFact').innerHTML = "Fecha de Lectura: <b>" + fechaLectura + "</b>";

					var fechaInicial = result.rows.item(dato)['UltimaFechaDeFacturacion'];

					document.getElementById('txtFechaInicialFact').innerHTML = "Fecha Inicial: <b>" + fechaInicial + "</b>";
				}

				else
				{
					desactivarImpresionFact();
					$("#datos-entradaFact").attr('style', 'display:none;');
					$("#datosGenerales").attr('style', 'display:none;');
					$("#LecturaNoDiligenciada").attr('style', 'display:block;');
				}
			}
		});
	});	
}