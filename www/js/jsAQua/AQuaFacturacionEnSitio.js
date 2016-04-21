function mostrarPeriodos()
{
	dbShell.transaction(function(tx) 
	{   
		tx.executeSql("select * from Periodos ",[], 
		function(tx, result)
		{
			document.getElementById("periodoActual").value = result.rows.item(0)['IdPeriodo'];
		});
	});
}

/*----------------------------------------------------------------------------------*/

//RETORNO A LA PAGINA CICLO-RUTA FACTURACIÓN

function regresarFact()
{
	window.location.href = "#/Ciclorutafacturacion";

	var cicloColor = document.getElementById("txtCiclo").value;
	var rutaColor = document.getElementById("txtRuta").value;
	var id = "CicloFact"+cicloColor+"rutaFact"+rutaColor;

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
				$("#divCRFact a").removeClass('pintarLR');
				$("#"+id).addClass('pintarLR');
			}
		});    
	});
}

/*----------------------------------------------------------------------------------*/

//Funciones para contar lecturas

function ContarLecturasFact()
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
			AdelanteFact(CantidadLecturas,ciclo,ruta,numero);
		});
	});
}

/*----------------------------------------------------------------------------------*/

//Mostrar el registro siguiente

function AdelanteFact(dato,ciclo,ruta,num)
{
	$("#btnAntFact").attr("onClick", "validarLectAntFact()");
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

	else
	{
		document.getElementById('txtNumRegistro').value=numero;
	}

   	dbShell.transaction(function(tx) 
	{    		
		tx.executeSql("select * from UsuariosServicios where Ciclo=? and Ruta=?",[cic,rut], 
		function(tx, result)
		{
			$("#btnAntFact span").removeClass("disable");
			$("#btnAntFact i").removeClass("disable");

			if(RegSig == cantidad-1)
			{
				document.getElementById('txtIdUsuarioLecturaSigFact').value = " ";
				$("#btnSigFact i").addClass("disable");
				$("#btnSigFact span").addClass("disable");
				$("#btnSigFact").attr("onClick", " ");
			}

			if(RegSig > 0 && RegSig <= cantidad-2)
			{
				$("#btnSigFact i").removeClass("disable");
				$("#btnSigFact span").removeClass("disable");
	
				var ConsecSig = result.rows.item(RegSigSig)['Consecutivo'];

				document.getElementById('txtIdUsuarioLecturaSigFact').value = "Sig.: " + result.rows.item(RegSigSig)['IdUsuario'] + "-" + ciclo + "-" + ruta + "-" + ConsecSig;
			}

			var ConsecAnt = result.rows.item(RegAnt)['Consecutivo'];

			document.getElementById('txtIdUsuarioLecturaAntFact').value = "Ant.: " + result.rows.item(RegAnt)['IdUsuario'] + "-" + ciclo + "-" + ruta + "-" + ConsecAnt;


			var lecturaActual = result.rows.item(RegSig)['LecturaActual'];
			var causalActual = result.rows.item(RegSig)['CausalActual'];
			var impreso = result.rows.item(RegSig)['impreso'];

			var idUsuario = result.rows.item(RegSig)['IdUsuario'];
			document.getElementById('txtIdUsuarioLecturaFact').value = idUsuario;

			if(impreso == "si")
			{
				activarImpresionFact();
				$("#datos-entradaFact").show();
				$("#datosGenerales").show();
				$("#LecturaNoDiligenciada").hide();
				document.getElementById('txtNumeroFact').value = result.rows.item(RegSig)['Numero'];
				
				document.getElementById('txtidUsuarioLecturaCtrl').value = idUsuario;

				var Ciclotx = result.rows.item(RegSig)['Ciclo'];
				document.getElementById('txtCiclo2Fact').value = "Ciclo: " + Ciclotx;

				var Rutatx = result.rows.item(RegSig)['Ruta'];
				document.getElementById('txtRuta2Fact').value = "Ruta: " + Rutatx;
				
				document.getElementById("txtImpresoFact").value = impreso;


				var nombreUsuario = result.rows.item(RegSig)['Suscriptor'];
				document.getElementById("txtIdNombreUsuarioFact").innerHTML = "ID:" + "<b>" + idUsuario + " - " + nombreUsuario.toUpperCase() + "</b>";
				
				var direccionUsuario = result.rows.item(RegSig)['Direccion'];
				document.getElementById('txtDireccionFact').innerHTML = "Dirección: <b>" + direccionUsuario.toUpperCase() + "</b>";

				document.getElementById('txtMedidorFact').innerHTML = "MED.# <b>" + result.rows.item(RegSig)['NumeroMedidor'] + "</b>";

				document.getElementById('txtConsumoFact').innerHTML = "Consumo: <b>" + result.rows.item(RegSig)['Consumo'] + "</b>";


				var Uso;
				var IdUsotx = result.rows.item(RegSig)['IdUso'];

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

				var categoria = result.rows.item(RegSig)['IdCategoria'];

				document.getElementById("txtUsoCatFact").innerHTML = Uso + " Cat: <b>" + categoria + "</b>";

				var CtasAcR = parseInt(result.rows.item(RegSig)['CtasAcR']);
				var CtasAcNR = parseInt(result.rows.item(RegSig)['CtasAcNR']);
				var CtasAlR = parseInt(result.rows.item(RegSig)['CtasAlR']);
				var CtasAlNR = parseInt(result.rows.item(RegSig)['CtasAlNR']);
				var CtasAsR = parseInt(result.rows.item(RegSig)['CtasAsR']);
				var CtasAsNR = parseInt(result.rows.item(RegSig)['CtasAsNR']);

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

				var VolumenAseo = result.rows.item(RegSig)['VolumenAseo'];

				document.getElementById("txtToneladasProducidasFact").innerHTML = "Ton. de Basura Prod: <b>" + VolumenAseo + "</b>";

				var LecturaAnteriortx = document.getElementById('txtLecturaAnteriorFact');

				LecturaAnteriortx.innerHTML = "Lectura Anterior: <b>" + result.rows.item(RegSig)['LecturaAnterior'] + "</b>";

				var ConsumoMediotx = document.getElementById('txtConsumoPromedioFact');

				ConsumoMediotx.innerHTML = "Consumo Promedio: <b>" + result.rows.item(RegSig)['ConsumoMedio'] + "</b>";

				if (causalActual == 0)
				{
					document.getElementById('txtCausalFact').innerHTML = "Sin Causal";
					document.getElementById('txtLecturaActualFact').innerHTML = "Lectura Actual: <b>" + lecturaActual + "</b>";
				}

				if(causalActual > 0)
				{
					asignarCausalFact(causalActual);	
				}

				var observacionActual = result.rows.item(RegSig)['ObservacionActual'];

				if(observacionActual == 0)
				{
					document.getElementById('txtObservacionFact').innerHTML = "Sin Observación";
				}

				if(observacionActual > 0)
				{
					asignarObsFact(observacionActual);
				}

				var fechaFactura = result.rows.item(RegSig)['fechaFactura'];
				var fechaLimiteDePago = result.rows.item(RegSig)['fechaLimiteDePago'];
				var numeroFactura = result.rows.item(RegSig)['numeroFactura'];

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

				var ConsuMedio = result.rows.item(RegSig)['ConsumoMedio'];
				var ConsumoMes = result.rows.item(RegSig)['Consumo'];
				var EdadAcueducto = result.rows.item(RegSig)['EdadAcueducto'];
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

				var fechaLectura = result.rows.item(RegSig)['Fecha'];
				document.getElementById('txtFechaFinalFact').innerHTML = "Fecha de Lectura: <b>" + fechaLectura + "</b>";

				var fechaInicial = result.rows.item(RegSig)['UltimaFechaDeFacturacion'];

				document.getElementById('txtFechaInicialFact').innerHTML = "Fecha Inicial: <b>" + fechaInicial + "</b>";
			}

			else
			{
				desactivarImpresionFact();
				$("#datos-entradaFact").hide();
				$("#datosGenerales").hide();
				$("#LecturaNoDiligenciada").show();
			}
		});
	});
}

/*----------------------------------------------------------------------------------*/

//Mostrar el registro anterior

function validarLectAntFact()
{
	var ciclo = document.getElementById("txtCiclo").value;
	var ruta = document.getElementById("txtRuta").value;
	var numero = document.getElementById('txtNumRegistro').value;
	AtrasFact(ciclo,ruta,numero);
}

function AtrasFact(ciclo,ruta,num) 
{
	$("#btnSigFact").attr("onClick", "ContarLecturasFact()");

	var numero = parseInt(num);

	if(numero != 0)
	{
		var RegAnt = numero - 2;
		var Reg = numero -1;
		document.getElementById('txtNumRegistro').value = Reg;
		var RegSig = numero;
	}

	else
	{
		document.getElementById('txtNumRegistro').value = numero;
	}

   	dbShell.transaction(function(tx) 
	{    		
		tx.executeSql("select * from UsuariosServicios where Ciclo=? and Ruta=?",[ciclo,ruta], function(tx, result)
		{
			$("#btnSigFact i").removeClass("disable");
			$("#btnSigFact span").removeClass("disable");

			if(Reg == 0)
			{
				document.getElementById('txtIdUsuarioLecturaAntFact').value = " ";
				$("#btnAntFact span").addClass("disable");
				$("#btnAntFact i").addClass("disable");
				$("#btnAntFact").attr("onClick", " ");
			}

			if(Reg > 0 && Reg < result.rows.length-1)
			{
				$("#btnSigFact i").removeClass("disable");
				$("#btnAntFact i").removeClass("disable");

				var ConsecAnt = result.rows.item(RegAnt)['Consecutivo'];
				
				document.getElementById('txtIdUsuarioLecturaAntFact').value = "Ant.: " + result.rows.item(RegAnt)['IdUsuario'] + ": " + ciclo + "-" + ruta + "-" + ConsecAnt;
			}

			var ConsecSig = result.rows.item(RegSig)['Consecutivo'];
			document.getElementById('txtIdUsuarioLecturaSigFact').value = "Sig.: " + result.rows.item(RegSig)['IdUsuario'] + ": " + ciclo + "-" + ruta + "-" + ConsecSig;
			  
			var lecturaActual = result.rows.item(Reg)['LecturaActual'];
			var causalActual = result.rows.item(Reg)['CausalActual'];
			var impreso = result.rows.item(Reg)['impreso'];
			var idUsuario = result.rows.item(Reg)['IdUsuario'];
			document.getElementById('txtIdUsuarioLecturaFact').value = idUsuario;

			if(impreso == "si")
			{
				activarImpresionFact();
				$("#datos-entradaFact").show();
				$("#datosGenerales").show();
				$("#LecturaNoDiligenciada").hide();
				document.getElementById('txtNumeroFact').value = result.rows.item(Reg)['Numero'];
			
				document.getElementById('txtidUsuarioLecturaCtrl').value = idUsuario;

				var Ciclotx = result.rows.item(Reg)['Ciclo'];
				document.getElementById('txtCiclo2Fact').value = "Ciclo: " + Ciclotx;

				var Rutatx = result.rows.item(Reg)['Ruta'];
				document.getElementById('txtRuta2Fact').value = "Ruta: " + Rutatx;
				
				document.getElementById("txtImpresoFact").value = impreso;


				var nombreUsuario = result.rows.item(Reg)['Suscriptor'];
				document.getElementById("txtIdNombreUsuarioFact").innerHTML = "ID:" + "<b>" + idUsuario + " - " + nombreUsuario.toUpperCase() + "</b>";
				
				var direccionUsuario = result.rows.item(Reg)['Direccion'];
				document.getElementById('txtDireccionFact').innerHTML = "Dirección: <b>" + direccionUsuario.toUpperCase() + "</b>";

				document.getElementById('txtMedidorFact').innerHTML = "MED.# <b>" + result.rows.item(Reg)['NumeroMedidor'] + "</b>";

				document.getElementById('txtConsumoFact').innerHTML = "Consumo: <b>" + result.rows.item(Reg)['Consumo'] + "</b>";


				var Uso;
				var IdUsotx = result.rows.item(Reg)['IdUso'];

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

				var categoria = result.rows.item(Reg)['IdCategoria'];

				document.getElementById("txtUsoCatFact").innerHTML = Uso + " Cat: <b>" + categoria + "</b>";

				var CtasAcR = parseInt(result.rows.item(Reg)['CtasAcR']);
				var CtasAcNR = parseInt(result.rows.item(Reg)['CtasAcNR']);
				var CtasAlR = parseInt(result.rows.item(Reg)['CtasAlR']);
				var CtasAlNR = parseInt(result.rows.item(Reg)['CtasAlNR']);
				var CtasAsR = parseInt(result.rows.item(Reg)['CtasAsR']);
				var CtasAsNR = parseInt(result.rows.item(Reg)['CtasAsNR']);

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

				var VolumenAseo = result.rows.item(Reg)['VolumenAseo'];

				document.getElementById("txtToneladasProducidasFact").innerHTML = "Ton. de Basura Prod: <b>" + VolumenAseo + "</b>";

				var LecturaAnteriortx = document.getElementById('txtLecturaAnteriorFact');

				LecturaAnteriortx.innerHTML = "Lectura Anterior: <b>" + result.rows.item(Reg)['LecturaAnterior'] + "</b>";

				var ConsumoMediotx = document.getElementById('txtConsumoPromedioFact');

				ConsumoMediotx.innerHTML = "Consumo Promedio: <b>" + result.rows.item(Reg)['ConsumoMedio'] + "</b>";

				if (causalActual == 0)
				{
					document.getElementById('txtCausalFact').innerHTML = "Sin Causal";
					document.getElementById('txtLecturaActualFact').innerHTML = "Lectura Actual: <b>" + lecturaActual + "</b>";
				}

				if(causalActual > 0)
				{
					asignarCausalFact(causalActual);	
				}

				var observacionActual = result.rows.item(Reg)['ObservacionActual'];

				if(observacionActual == 0)
				{
					document.getElementById('txtObservacionFact').innerHTML = "Sin Observación";
				}

				if(observacionActual > 0)
				{
					asignarObsFact(observacionActual);
				}

				var fechaFactura = result.rows.item(Reg)['fechaFactura'];
				var fechaLimiteDePago = result.rows.item(Reg)['fechaLimiteDePago'];
				var numeroFactura = result.rows.item(Reg)['numeroFactura'];

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
				
				var ConsuMedio = result.rows.item(Reg)['ConsumoMedio'];
				var ConsumoMes = result.rows.item(Reg)['Consumo'];
				var EdadAcueducto = result.rows.item(Reg)['EdadAcueducto'];
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

				var fechaLectura = result.rows.item(Reg)['Fecha'];
				document.getElementById('txtFechaFinalFact').innerHTML = "Fecha de Lectura: <b>" + fechaLectura + "</b>";

				var fechaInicial = result.rows.item(Reg)['UltimaFechaDeFacturacion'];

				document.getElementById('txtFechaInicialFact').innerHTML = "Fecha Inicial: <b>" + fechaInicial + "</b>";
			}

			else
			{
				desactivarImpresionFact();
				$("#datos-entradaFact").hide();
				$("#datosGenerales").hide();
				$("#LecturaNoDiligenciada").show();
			}
		});
	});	
}

function liquidacionFactura(Consumo,Aseo,Uso,Categoria,IdUsuario,NumeroCuentasAcueducto,NumeroCuentasAlcantarillado,NumeroCuentasAseo,Edad)
{
	var consumo = parseInt(Consumo);
	var consumoBasico;
	var consumoComplementario;
	var consumoSuntuario;
	var cargoVariableAseo;
	var valorConsumoBasico;
	var valorConsumoComplementario;
	var valorConsumoSuntuario;
	var valorVertimientoBasico;
	var valorVertimientoComplementario;
	var valorVertimientoSuntuario;
	var valorCargoFijoAcueducto;
	var valorCargoFijoAlcantarillado;
	var valorCargoFijoAseo;
	var valorCargoVariableAseo;
	var aseo = parseFloat(Aseo);
	var uso = Uso;
	var categoria = Categoria;
	var idUsuario = IdUsuario;
	var numeroCuentasAcueducto = parseInt(NumeroCuentasAcueducto);
	var numeroCuentasAlcantarillado = parseInt(NumeroCuentasAlcantarillado);
	var numeroCuentasAseo = parseInt(NumeroCuentasAseo);
	var textoDescripcionCargos = document.getElementById("descripcionCargos");
	textoDescripcionCargos.innerHTML = "<li><b>DESCRIPCIÓN CARGOS:</li><br><li> </li><li>Id - Descripcion</b></li>";

	var textoLiquidacion = document.getElementById("detalleLiquidacionFactura");
	textoLiquidacion.innerHTML = "<li id='detalleFactura1'><b><div class='row' style='font-size:1em;'>DETALLE:</div></b></li><li id='detalleFactura2'><b><iv class='row'><div align='center' class='col col-center col-10'>Id</div><div align='center' class='col col-center col-20 liquidacion'>Cant.</div><div align='center' class='col col-center liquidacion'>Vr. Unit.</div><div align='center' class='col col-center liquidacion'>Vr. Cons.</div><div align='center' class='col col-center liquidacion'>Vr. Acum.</div></div></b></li>";

	document.getElementById('totalAcueducto').value = 0;
	document.getElementById('totalAlcantarillado').value = 0;
	document.getElementById('totalAseo').value = 0;
	document.getElementById('totalSubsidiosAportes').value = 0;
	document.getElementById('subTotalPresente').value = 0;
	document.getElementById('subTotalAcumuladosAnteriores').value = 0;

	var EdadAcueducto = Edad;

	if (consumo <= 20) 
	{
		consumoBasico = consumo;
		consumoComplementario = 0;
		consumoSuntuario = 0;
	}

	if (consumo > 20 && consumo <= 40) 
	{
		consumoBasico = 20;
		consumoComplementario = parseInt(consumo) - 20;
		consumoSuntuario = 0;
	}

	if (consumo > 40) 
	{
		consumoBasico = 20;
		consumoComplementario = 20;
		consumoSuntuario = parseInt(consumo) - 40;
	}

	dbShell.transaction(function(tx) 
	{ 	
		tx.executeSql("select * FROM CargosFacturacion",[], 
		function(tx,result)
		{
			for (var i = 0; i < result.rows.length; i++) 
			{
				var numeroId = i;
				var IdCargo = result.rows.item(i)['IdCargo'];
				var IdServicio = result.rows.item(i)['IdServicio'];
				var NombreCargo = result.rows.item(i)['NombreCargo'];
				var Tarifa = parseFloat(result.rows.item(i)['Tarifa']);
				var Tarifa2 = Tarifa.toFixed(2);
				var NombreCargo2 = NombreCargo.substr(0,13);
				var BuscarPalabraCargo = NombreCargo.lastIndexOf("CARGO", 0);
				var BuscarPalabraConsumo = NombreCargo.lastIndexOf("CONSUMO", 0);
				var BuscarPalabraVertimiento = NombreCargo.lastIndexOf("VERTIMIENTO", 0);
				var BuscarPalabraSubsidio = NombreCargo.lastIndexOf("SUBSIDIO", 0);
				var BuscarPalabraAporte = NombreCargo.lastIndexOf("APORTE", 0);
				var BuscarPalabraFijo = NombreCargo.indexOf("FIJO");
				var BuscarPalabraAcueducto = NombreCargo.indexOf("ACUEDUCTO");
				var BuscarPalabraAlcantarillado = NombreCargo.indexOf("ALCANTARILLADO");
				var BuscarPalabraAseo = NombreCargo.indexOf("ASEO");
				var BuscarPalabraVariable = NombreCargo.indexOf("VARIABLE");
				var BuscarPalabraBasico = NombreCargo.indexOf("BASICO");
				var BuscarPalabraComplemetario = NombreCargo.indexOf("COMPLEMENTARIO");
				var BuscarPalabraSuntuario = NombreCargo.indexOf("SUNTUARIO");
				var BuscarPalabraCargoResto = NombreCargo.indexOf("CARGO");
				var BuscarPalabraConsumoResto = NombreCargo.indexOf("CONSUMO");
				var BuscarPalabraVertimientoResto = NombreCargo.indexOf("VERTIMIENTO");

				if (IdCargo == 1) 
				{
					if (numeroCuentasAcueducto > 0) 
					{
						var valor = Tarifa * numeroCuentasAcueducto;
						var valorConsumo = valor.toFixed(2);
						valorCargoFijoAcueducto = valor;

						mostrarValoresConsumo(IdCargo,idUsuario,numeroId,NombreCargo,numeroCuentasAcueducto,Tarifa2,valorConsumo);

						sumarAcueducto(valor);
					}

					else
					{
						mostrarOtrosAcumuladosAnteriores(numeroId,IdCargo,idUsuario,NombreCargo2);
					}
				}

				else if (IdCargo == 2) 
				{
					if (numeroCuentasAcueducto > 0) 
					{
						var valor = Tarifa * consumoBasico;
						var valorConsumo = valor.toFixed(2);
						valorConsumoBasico = valor;
						var cantidadConsumo = consumoBasico;
						
						mostrarValoresConsumo(IdCargo,idUsuario,numeroId,NombreCargo,cantidadConsumo,Tarifa2,valorConsumo);

						sumarAcueducto(valor);
					}

					else
					{
						mostrarOtrosAcumuladosAnteriores(numeroId,IdCargo,idUsuario,NombreCargo2);
					}
				}

				else if (IdCargo == 3) 
				{
					if (consumoComplementario > 0 && numeroCuentasAcueducto > 0) 
					{
						var valor = Tarifa * consumoComplementario;
						var valorConsumo = valor.toFixed(2);
						valorConsumoComplementario = valor;
						var cantidadConsumo = consumoComplementario;
						
						mostrarValoresConsumo(IdCargo,idUsuario,numeroId,NombreCargo,cantidadConsumo,Tarifa2,valorConsumo);

						sumarAcueducto(valor);
					}

					else
					{
						mostrarOtrosAcumuladosAnteriores(numeroId,IdCargo,idUsuario,NombreCargo2);
					}	
				}

				else if (IdCargo == 4) 
				{
					if (consumoSuntuario > 0 && numeroCuentasAcueducto > 0) 
					{
						var valor = Tarifa * consumoSuntuario;
						var valorConsumo = valor.toFixed(2);
						valorConsumoSuntuario = valor;
						var cantidadConsumo = consumoSuntuario;
						
						mostrarValoresConsumo(IdCargo,idUsuario,numeroId,NombreCargo,cantidadConsumo,Tarifa2,valorConsumo);

						sumarAcueducto(valor);
					}

					else
					{
						mostrarOtrosAcumuladosAnteriores(numeroId,IdCargo,idUsuario,NombreCargo2);
					}
				}

				else if (IdCargo == 5) 
				{
					if (numeroCuentasAlcantarillado > 0) 
					{
						var valor = Tarifa * numeroCuentasAlcantarillado;
						var valorConsumo = valor.toFixed(2);
						valorCargoFijoAlcantarillado = valor;

						mostrarValoresConsumo(IdCargo,idUsuario,numeroId,NombreCargo,numeroCuentasAlcantarillado,Tarifa2,valorConsumo);

						sumarAlcantarillado(valor);
					}

					else
					{
						mostrarOtrosAcumuladosAnteriores(numeroId,IdCargo,idUsuario,NombreCargo2);
					}				
				}

				else if (IdCargo == 6) 
				{
					if (numeroCuentasAlcantarillado > 0) 
					{
						var valor = Tarifa * consumoBasico;
						var valorConsumo = valor.toFixed(2);
						valorVertimientoBasico = valor;
						var cantidadConsumo = consumoBasico;
						
						mostrarValoresConsumo(IdCargo,idUsuario,numeroId,NombreCargo,cantidadConsumo,Tarifa2,valorConsumo);

						sumarAlcantarillado(valor);
					}

					else
					{
						mostrarOtrosAcumuladosAnteriores(numeroId,IdCargo,idUsuario,NombreCargo2);
					}	
				}

				else if (IdCargo == 7) 
				{
					if (numeroCuentasAlcantarillado > 0 && consumoComplementario > 0) 
					{
						var valor = Tarifa * consumoComplementario;
						var valorConsumo = valor.toFixed(2);
						valorVertimientoComplementario = valor;
						var cantidadConsumo = consumoComplementario;
						
						mostrarValoresConsumo(IdCargo,idUsuario,numeroId,NombreCargo,cantidadConsumo,Tarifa2,valorConsumo);

						sumarAlcantarillado(valor);
					}

					else
					{
						mostrarOtrosAcumuladosAnteriores(numeroId,IdCargo,idUsuario,NombreCargo2);
					}	
				}

				else if (IdCargo == 8) 
				{
					if (numeroCuentasAlcantarillado > 0 && consumoSuntuario > 0) 
					{
						var valor = Tarifa * consumoSuntuario;
						var valorConsumo = valor.toFixed(2);
						valorVertimientoSuntuario = valor;
						var cantidadConsumo = consumoSuntuario;
						
						mostrarValoresConsumo(IdCargo,idUsuario,numeroId,NombreCargo,cantidadConsumo,Tarifa2,valorConsumo);

						sumarAlcantarillado(valor);
					}

					else
					{
						mostrarOtrosAcumuladosAnteriores(numeroId,IdCargo,idUsuario,NombreCargo2);
					}	
				}

				else if (IdCargo == 9) 
				{
					if (numeroCuentasAseo > 0) 
					{
						var valor = Tarifa * numeroCuentasAseo;
						var valorConsumo = valor.toFixed(2);
						valorCargoFijoAseo = valor;

						mostrarValoresConsumo(IdCargo,idUsuario,numeroId,NombreCargo,numeroCuentasAseo,Tarifa2,valorConsumo);

						sumarAseo(valor);
					}

					else
					{
						mostrarOtrosAcumuladosAnteriores(numeroId,IdCargo,idUsuario,NombreCargo2);
					}	
				}

				else if (IdCargo == 10) 
				{
					if (numeroCuentasAseo > 0) 
					{
						var valor = Tarifa * aseo;
						var valorConsumo = valor.toFixed(2);
						valorCargoVariableAseo = valor;
						var aseo2 = aseo.toFixed(2);
						
						mostrarValoresConsumo(IdCargo,idUsuario,numeroId,NombreCargo,aseo2,Tarifa2,valorConsumo);

						sumarAseo(valor);
					}

					else
					{
						mostrarOtrosAcumuladosAnteriores(numeroId,IdCargo,idUsuario,NombreCargo2);
					}						
				}

				else if (BuscarPalabraSubsidio >= 0) 
				{
					if (BuscarPalabraCargoResto >= 0) 
					{
						if (BuscarPalabraAcueducto >= 0) 
						{
							var valor = valorCargoFijoAcueducto;
											
							mostrarIndicesSubsidiosAportesConsumo(numeroId,IdCargo,uso,categoria,idUsuario,NombreCargo,valor);
						}

						if (BuscarPalabraAlcantarillado >= 0) 
						{
							var valor = valorCargoFijoAlcantarillado;
											
							mostrarIndicesSubsidiosAportesConsumo(numeroId,IdCargo,uso,categoria,idUsuario,NombreCargo,valor);
						}

						if (BuscarPalabraAseo >= 0) 
						{
							if (BuscarPalabraFijo >= 0) 
							{
								var valor = valorCargoFijoAseo;

																
								mostrarIndicesSubsidiosAportesConsumo(numeroId,IdCargo,uso,categoria,idUsuario,NombreCargo,valor);
							}

							if (BuscarPalabraVariable >= 0) 
							{
								var valor = valorCargoVariableAseo;

																
								mostrarIndicesSubsidiosAportesConsumo(numeroId,IdCargo,uso,categoria,idUsuario,NombreCargo,valor);
							}
						}
					}

					if (BuscarPalabraConsumoResto >= 0) 
					{
						if (BuscarPalabraBasico >= 0) 
						{
							var valor = valorConsumoBasico;
											
							mostrarIndicesSubsidiosAportesConsumo(numeroId,IdCargo,uso,categoria,idUsuario,NombreCargo,valor);
						}

						if (BuscarPalabraComplemetario >= 0) 
						{
							var valor = valorConsumoComplementario;
											
							mostrarIndicesSubsidiosAportesConsumo(numeroId,IdCargo,uso,categoria,idUsuario,NombreCargo,valor);
						}

						if (BuscarPalabraSuntuario >= 0) 
						{
							var valor = valorConsumoSuntuario;
											
							mostrarIndicesSubsidiosAportesConsumo(numeroId,IdCargo,uso,categoria,idUsuario,NombreCargo,valor);
						}
					}

					if (BuscarPalabraVertimientoResto >= 0) 
					{
						if (BuscarPalabraBasico >= 0) 
						{
							var valor = valorVertimientoBasico;
											
							mostrarIndicesSubsidiosAportesConsumo(numeroId,IdCargo,uso,categoria,idUsuario,NombreCargo,valor);
						}

						if (BuscarPalabraComplemetario >= 0) 
						{
							var valor = valorVertimientoComplementario;
											
							mostrarIndicesSubsidiosAportesConsumo(numeroId,IdCargo,uso,categoria,idUsuario,NombreCargo,valor);
						}

						if (BuscarPalabraSuntuario >= 0) 
						{
							var valor = valorVertimientoSuntuario;
											
							mostrarIndicesSubsidiosAportesConsumo(numeroId,IdCargo,uso,categoria,idUsuario,NombreCargo,valor);
						}
					}
				}

				else if (BuscarPalabraAporte >= 0) 
				{
					if (BuscarPalabraAcueducto >= 0) 
					{
						var valor = document.getElementById("totalAcueducto").value;
									
						mostrarIndicesSubsidiosAportesConsumo(numeroId,IdCargo,uso,categoria,idUsuario,NombreCargo,valor);
					}

					if (BuscarPalabraAlcantarillado >= 0) 
					{
						var valor = document.getElementById("totalAlcantarillado").value;
									
						mostrarIndicesSubsidiosAportesConsumo(numeroId,IdCargo,uso,categoria,idUsuario,NombreCargo,valor);
					}

					if (BuscarPalabraAseo >= 0) 
					{
						var valor = document.getElementById("totalAseo").value;
									
						mostrarIndicesSubsidiosAportesConsumo(numeroId,IdCargo,uso,categoria,idUsuario,NombreCargo,valor);
					}
				}

				else
				{
					mostrarOtrosAcumuladosAnteriores(numeroId,IdCargo,idUsuario,NombreCargo);
				}
			}
				
			sumarAcumuladosAnteriores(idUsuario);
			sumarSubToTalPresente();
		});
	});
}

function sumarAcueducto(valor)
{
	var num = valor;
	var acumulado = parseFloat(document.getElementById('totalAcueducto').value);
	var suma = num + acumulado;
	document.getElementById('totalAcueducto').value = suma;
}

function sumarAlcantarillado(valor)
{
	var num = valor;
	var acumulado = parseFloat(document.getElementById('totalAlcantarillado').value);
	var suma = num + acumulado;
	document.getElementById('totalAlcantarillado').value = suma;
}

function sumarAseo(valor)
{
	var num = valor;
	var acumulado = parseFloat(document.getElementById('totalAseo').value);
	var suma = num + acumulado;
	document.getElementById('totalAseo').value = suma;
}

function sumarSubToTalPresente()
{
	var totalAcueducto = parseFloat(document.getElementById('totalAcueducto').value);
	var totalAlcantarillado = parseFloat(document.getElementById('totalAlcantarillado').value);
	var totalAseo = parseFloat(document.getElementById('totalAseo').value);

	var suma = totalAcueducto + totalAlcantarillado + totalAseo;
	document.getElementById('subTotalPresente').value = suma;
}

function mostrarValoresConsumo(IdCargo,idUsuario,Id,NombreCargo,cantidad,Tarifa,valorConsumo)
{
	var textoDescripcionCargos = document.getElementById("descripcionCargos");
	textoDescripcionCargos.innerHTML += "<li>"+IdCargo+" - "+NombreCargo+"</li>";

	var mensaje = "<li id='listaFact"+Id+"'><div class='row'><div class='col col-10' align='center'>"+IdCargo+"</div><div class='liquidacion col col-20' align='center'>"+cantidad+"</div><div class='liquidacion col' align='right'>"+Tarifa+"</div><div class='liquidacion col' align='right'>"+valorConsumo+"</div>";

	var acumulado = parseFloat(document.getElementById('subTotalPresente').value);
	var suma = valorConsumo + acumulado;
	document.getElementById('subTotalPresente').value = suma;

	mostrarAcumuladosAnteriores(IdCargo,idUsuario,mensaje);
}

function mostrarAcumuladosAnteriores(IdCargo,IdUsuario,Mensaje)
{
	var idCargo = IdCargo;
	var idUsuario = IdUsuario;
	var mensaje = Mensaje;
	var textoLiquidacion = document.getElementById("detalleLiquidacionFactura");
	dbShell.transaction(function(tx) 
	{ 	
		tx.executeSql("select * FROM AcumuladosAnteriores where IdCargo=? and IdUsuario=?",[idCargo,idUsuario], 
		function(tx,result)
		{
			if (result.rows.length > 0) 
			{
				var ValorAnterior = result.rows.item(0)['ValorAnterior'];
				var valorAcumulado = parseFloat(ValorAnterior);
				var valorAcumulado2 = valorAcumulado.toFixed(2);
				var mensajeFinal = mensaje + "<div class='liquidacion col' align='right'>"+valorAcumulado2+"</div></div></li>";
				textoLiquidacion.innerHTML += mensajeFinal;
			}

			else
			{
				var mensajeFinal = mensaje + "<div class='liquidacion col' align='right'></div></div></li>";
				textoLiquidacion.innerHTML += mensajeFinal;
			}
		});
	});
}

function sumarAcumuladosAnteriores(IdUsuario)
{
	var idUsuario = IdUsuario;
	var sumarAcumulado = 0;
	var textoPieDePagina = document.getElementById("pieDePaginaFactura");
	dbShell.transaction(function(tx) 
	{ 	
		tx.executeSql("select * FROM AcumuladosAnteriores where IdUsuario=?",[idUsuario], 
		function(tx,result)
		{
			if (result.rows.length > 0) 
			{
				for (var i = 0; i < result.rows.length; i++) 
				{
					var ValorAnterior = result.rows.item(i)['ValorAnterior'];
					var valorAcumulado = parseFloat(ValorAnterior);
					sumarAcumulado = sumarAcumulado + valorAcumulado;
				}

				document.getElementById('subTotalAcumuladosAnteriores').value = sumarAcumulado;
				var sumarAcumulado2 = parseInt(sumarAcumulado);
				var mensajeSubTotalAcumuladosAnteriores = "<li><div class='row'><div class='col col-50'>Sub Acum. Anterior:</div><div class='col' align='right'><b>$ "+sumarAcumulado2+"</b></div></div></li>";
				textoPieDePagina.innerHTML = mensajeSubTotalAcumuladosAnteriores;
				cargarPieDePagina(sumarAcumulado);
			}

			else
			{
				textoPieDePagina.innerHTML = "";
				cargarPieDePagina(0);
			}
		});
	});
}

function mostrarIndicesSubsidiosAportesConsumo(Id,IdCargo,Uso,Categoria,IdUsuario,NombreCargo,Consumo)
{
	var idLi = Id;
	var idCargo = IdCargo;
	var idUsuario = IdUsuario;
	var nombreCargo = NombreCargo.substr(0,13);
	var uso = Uso;
	var categoria = Categoria;
	var consumo = parseFloat(Consumo);
	dbShell.transaction(function(tx) 
	{ 	
		tx.executeSql("select * FROM IndicesSubsidiosAportes where IdCargo=? and IdUso=? and IdCategoria=?",[idCargo,uso,categoria], 
		function(tx,result)
		{
			if (result.rows.length > 0)
			{
				var indice = parseFloat(result.rows.item(0)['Indice']);
				var indice2 = indice.toFixed(2);
				var subsidio = consumo * indice;
				var subsidio2 = subsidio.toFixed(2);
				var consumo2 = consumo.toFixed(2);

				var textoDescripcionCargos = document.getElementById("descripcionCargos");
				textoDescripcionCargos.innerHTML += "<li>"+idCargo+" - "+NombreCargo+"</li>";

				if (subsidio2 < 0) 
				{
					var subsidio3 = subsidio2 * (-1);
					var subsidio3Fixed = subsidio3.toFixed(2);
					var subsidio4 = "("+subsidio3Fixed+")";

					var mensajeSubsidio = "<li id='listaFact"+idLi+"'><div class='row'><div class='col col-10' align='center'>"+idCargo+"</div><div class='liquidacion col col-20' align='center'>"+indice2+"</div><div class='liquidacion col' align='right'>"+consumo2+"</div><div class='liquidacion col' align='right'>"+subsidio4+"</div>";
				}
				else

				{
					var mensajeSubsidio = "<li id='listaFact"+idLi+"'><div class='row'><div class='col col-10' align='center'>"+idCargo+"</div><div class='liquidacion col col-20' align='center'>"+indice2+"</div><div class='liquidacion col' align='right'>"+consumo2+"</div><div class='liquidacion col' align='right'>"+subsidio2+"</div>";
				}

				mostrarAcumuladosAnteriores(idCargo,idUsuario,mensajeSubsidio);
				sumarSubsidios(subsidio);
			}

			else
			{
				mostrarOtrosAcumuladosAnteriores(idLi,idCargo,idUsuario,nombreCargo);
			}
		});
	});
}

function sumarSubsidios(valor)
{
	var subsidio = valor;
	var acumulado = parseFloat(document.getElementById('totalSubsidiosAportes').value);
	var suma = subsidio + acumulado;
	document.getElementById('totalSubsidiosAportes').value = suma;
}

function mostrarOtrosAcumuladosAnteriores(Id,IdCargo,IdUsuario,NombreCargo)
{
	var idLi = Id;
	var idCargo = IdCargo;
	var idUsuario = IdUsuario;
	var nombreCargo = NombreCargo;
	var textoLiquidacion = document.getElementById("detalleLiquidacionFactura");
	var textoDescripcionCargos = document.getElementById("descripcionCargos");
	dbShell.transaction(function(tx) 
	{ 	
		tx.executeSql("select * FROM AcumuladosAnteriores where IdCargo=? and IdUsuario=?",[idCargo,idUsuario], 
		function(tx,result)
		{
			if (result.rows.length > 0)
			{
				textoDescripcionCargos.innerHTML += "<li>"+idCargo+" - "+NombreCargo+"</li>";
				var ValorAnterior = result.rows.item(0)['ValorAnterior'];
				var valorAcumulado = parseFloat(ValorAnterior);
				var valorAcumulado2 = valorAcumulado.toFixed(2);
				var mensajeFinal = "<li id='listaFact"+idLi+"'><div class='row'><div class='col col-10' align='center'>"+idCargo+"</div><div class='liquidacion col col-20' align='center'></div><div class='liquidacion col' align='right'></div><div class='liquidacion col' align='right'></div><div class='liquidacion col' align='right'>"+valorAcumulado2+"</div></div></li>";
				textoLiquidacion.innerHTML += mensajeFinal;
			}
		});
	});
}

function cargarPieDePagina(AcumuladosAnteriores)
{
	var AsubTotalPresente = parseFloat(document.getElementById('subTotalPresente').value);
	var AtotalSubsidiosAporte = document.getElementById('totalSubsidiosAportes').value;
	var AtotalSubsidiosAportes = parseFloat(AtotalSubsidiosAporte);
	var subTotalAcumuladosAnteriores = parseFloat(AcumuladosAnteriores);

	var totalAPagarPresente = AsubTotalPresente + AtotalSubsidiosAportes;
	var AtotalAPagar = totalAPagarPresente + subTotalAcumuladosAnteriores;
	var AtotalAPagar2 = parseInt(AtotalAPagar);

	var textoLiquidacion = document.getElementById("detalleLiquidacionFactura");
	var textoDescripcionCargos = document.getElementById("descripcionCargos");

	var largo = AtotalAPagar2.length;
	var trozo1 = AtotalAPagar2.substr(-2,2);
	var largo1 = largo-2;
	var trozo2 = AtotalAPagar2.substr(0,largo1);
	var nuevoNumeroParte2 = parseInt(trozo2);
	var nuevoNumero = parseInt(trozo1);
	var primerNumero;
	var primeraParte;
	var segundaParte;
	var parteCompleta;
	var nuevoNumero;

	if(nuevoNumero >= 50)
	{
	  primerNumero = nuevoNumeroParte2+1;
	  primeraParte = primerNumero+"";
	  segundaParte = "00"
	  parteCompleta = primeraParte + segundaParte;
	  nuevoNumero = parseInt(parteCompleta);
	}

	else
	{
	  primerNumero = nuevoNumeroParte2
	  primeraParte = primerNumero+"";
	  segundaParte = "00"
	  parteCompleta = primeraParte + segundaParte;
	  nuevoNumero = parseInt(parteCompleta);
	}

	var diferencia = nuevoNumero - AtotalAPagar2;
	var nuevaDiferencia;
	var textoNuevaDiferencia;

	if (diferencia < 0) 
	{
		nuevaDiferencia = diferencia * (-1);
		textoNuevaDiferencia = "(" + nuevaDiferencia + ")";
	}

	else
	{
		textoNuevaDiferencia = diferencia;
	}

	console.log(nuevoNumero);

	var subTotalPresente = AsubTotalPresente + AtotalSubsidiosAportes + diferencia;
	var subTotalPresente2 = parseInt(subTotalPresente);

	textoDescripcionCargos.innerHTML += "<li>500 - AJUSTE A LA CENTENA</li>";
	var mensajeAjuste = "<li><div class='row'><div class='col col-10' align='center'>500</div><div class='liquidacion col col-20' align='center'></div><div class='liquidacion col' align='right'></div><div class='liquidacion col' align='right'>"+textoNuevaDiferencia+"</div><div class='liquidacion col' align='right'></div></div></li>";
	textoLiquidacion.innerHTML += mensajeAjuste;

	document.getElementById('totalAPagar').value = nuevoNumero;

	var textoPieDePagina = document.getElementById("pieDePaginaFactura");
	var mensajeSubTotalPeriodo = "<li><div class='row'><div class='col col-50'>Sub Total Periodo: </div><div class='col' align='right'><b>$ "+subTotalPresente2+"</b></div></div></li>";
	textoPieDePagina.innerHTML += mensajeSubTotalPeriodo;

	textoPieDePagina.innerHTML += "<li><b><div class='row'><div class='col col-50'></div><div class='col' align='right'></div></div></b></li>";

	var mensajeTotalAPagar = "<li><b><div class='row totalAPagar'><div class='col col-50'>TOTAL A PAGAR:</div><div class='col' align='right'>$ "+nuevoNumero+"</div></div></b></li>";
	textoPieDePagina.innerHTML += mensajeTotalAPagar;

	textoPieDePagina.innerHTML += "<li><b><div class='row'><div class='col col-50'></div><div class='col' align='right'></div></div></b></li>";

	mostrarCodigoDeBarrasFactura();
}

function mostrarCodigoDeBarrasFactura()
{
	var numeroFactura = document.getElementById('txtNumeroFactReal').value;
	$("#codigoDeBarrasFactura").JsBarcode(numeroFactura,{format:"CODE128",fontSize:24,displayValue:true,height:100});
}

function asignarCausalFact(codCausal)
{
	dbShell.transaction(function(tx) 
	{ 	
		tx.executeSql("select * FROM Causales where IdCausal=?",[codCausal], 
		function(tx,result)
		{
			var nombreCausal = result.rows.item(0)['NombreCausal'];
			document.getElementById('txtCausalFact').innerHTML = "Causal: <b>" + nombreCausal.toUpperCase() + "</b>";
			document.getElementById('txtLecturaActualFact').innerHTML = "<b>NO SE PUDO REALIZAR LECTURA</b>";
		});
	});
}

function asignarObsFact(codObs)
{
	dbShell.transaction(function(tx) 
	{ 	
		tx.executeSql("select * FROM Observaciones where IdObservacion=?",[codObs], 
		function(tx,result)
		{
			var nombreObservacion = result.rows.item(0)['NombreObservacion'];
			document.getElementById('txtObservacionFact').innerHTML = "Observación: <b>" + nombreObservacion.toUpperCase() + "</b>";
		});
	});
}

function cargarDatosEmpresaFact()
{
	dbShell.transaction(function(tx) 
	{ 	
		tx.executeSql("select * FROM Parametros",[], 
		function(tx,result)
		{
			var nombreEmpresa = result.rows.item(3)['ValorParametro'];
			var nitEmpresa = result.rows.item(4)['ValorParametro'];

			document.getElementById('txtNombreEmpresaFact').innerHTML = "<b>" + nombreEmpresa.toUpperCase() + "</b>";
			document.getElementById('txtNitEmpresaFact').innerHTML = "NIT: <b>" + nitEmpresa + "</b>";
		});
	});
}

function cargarDatosPeriodoFact()
{
	dbShell.transaction(function(tx) 
	{ 	
		tx.executeSql("select * FROM Periodos",[], 
		function(tx,result)
		{
			var idPeriodo = result.rows.item(0)['IdPeriodo'];
			var nombrePeriodo = result.rows.item(0)['NombrePeriodo'];

			document.getElementById('txtNomprePeriodoFact').innerHTML = "Periodo: <b>" + idPeriodo + " " + nombrePeriodo.toUpperCase() + "</b>";
		});
	});
}

function setFechaFactura()
{
	var date = new Date();
	var d  = date.getDate();
	var day = (d < 10) ? '0' + d : d;
	var w = date.getMonth() + 1;
	var month = (w < 10) ? '0' + w : w;
	var yy = date.getYear();
	var year = (yy < 1000) ? yy + 1900 : yy;

	var fecha = day + "/" + month + "/" + year;

	document.getElementById('txtFechaFact').innerHTML = "Fecha Facturación: <b>" + fecha + "</b>";
	document.getElementById('txtFechaFactura').value = fecha;

	mostrarFechaLimitedePago(15,fecha);
}

function mostrarFechaLimitedePago(d,fecha)
{
	var Fecha = new Date();
	var sFecha = fecha || (Fecha.getDate() + "/" + (Fecha.getMonth() +1) + "/" + Fecha.getFullYear());
	var sep = sFecha.indexOf('/') != -1 ? '/' : '-'; 
	var aFecha = sFecha.split(sep);
	var fecha = aFecha[2]+'/'+aFecha[1]+'/'+aFecha[0];
	fecha= new Date(fecha);
	fecha.setDate(fecha.getDate()+parseInt(d));
	var anno=fecha.getFullYear();
	var mes= fecha.getMonth()+1;
	var dia= fecha.getDate();
	mes = (mes < 10) ? ("0" + mes) : mes;
	dia = (dia < 10) ? ("0" + dia) : dia;
	var fechaFinal = dia+sep+mes+sep+anno;
	document.getElementById('txtFechaLimiteFact').innerHTML = "Fecha Limite de Pago: <b>" + fechaFinal + "</b>";
	document.getElementById('txtFechaLimiteDePagoFactura').value = fechaFinal;
}

function setNumeroFactura()
{
	var idbd = document.getElementById("idOperario").value;
	var noFactura;
	dbShell.transaction(function(tx) 
	{ 	
		tx.executeSql("select * FROM Usuarios where Id=?",[idbd], 
		function(tx,result)
		{
			noFactura = result.rows.item(0)['UltimoNoFactura'];

			var largo = noFactura.length;
			var trozo1 = noFactura.substr(-7,7);
			var largo1 = largo-7;
			var trozo2 = noFactura.substr(0,largo1);
			var nuevoNumero = parseInt(trozo1)+1;
			var nuevoNumeroString = nuevoNumero+"";

			while (nuevoNumeroString.length < 7)
			{
				nuevoNumeroString = "0"+nuevoNumeroString;
			}

			var nuevoNumFactura = trozo2+nuevoNumeroString;

			document.getElementById('txtNumeroFactReal').value = nuevoNumFactura;
			document.getElementById('txtNumFact').innerHTML = "Factura #: <b>" + nuevoNumFactura + "</b>";
		});
	});
}

function activarImpresionFact()
{
	$("#imprimirFact i").removeClass("disable");
	$("#imprimirFact").attr('onClick', 'imprimirFactura()');
}

function desactivarImpresionFact(){
	$("#imprimirFact i").addClass("disable");
	$("#imprimirFact").attr("onClick", "");
}

function imprimirFactura()
{
	guardarDatosFacturaUsuariosServicios(); 

  	window.DatecsPrinter.listBluetoothDevices(
        function (devices) {
            window.DatecsPrinter.connect(devices[0].address, imprimirLogoFactura);
        },
        function (error) {
        	swal(JSON.stringify(error)); 
        }
    );
}

function imprimirLogoFactura() 
{
  	var ruta = document.getElementById("rutaImagenFactura").value;
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
    		imprimirEncabezado();
        },
        function (error) {
            swal(JSON.stringify(error)); 
        });
    }
}

function imprimirEncabezado() 
{
	var txtNombreEmpresaFact = $("#txtNombreEmpresaFact").text();
	var txtNitEmpresaFact = $("#txtNitEmpresaFact").text();
	var txtFechaFact = $("#txtFechaFact").text();
	var txtNumFact = $("#txtNumFact").text();
	var txtFechaInicialFact = $("#txtFechaInicialFact").text();
	var txtFechaFinalFact = $("#txtFechaFinalFact").text();
	var txtNomprePeriodoFact = $("#txtNomprePeriodoFact").text();
	var txtFechaLimiteFact = $("#txtFechaLimiteFact").text();
	var datosUsuario = "DATOS DEL USUARIO:";
	var txtIdNombreUsuarioFact = $("#txtIdNombreUsuarioFact").text();
	var txtDireccionFact = $("#txtDireccionFact").text();
	var txtMedidorFact = $("#txtMedidorFact").text();
	var txtUsoCatFact = $("#txtUsoCatFact").text();
	var txtNumCuentasAcueductoFact = $("#txtNumCuentasAcueductoFact").text();
	var txtNumCuentasAlcantarilladoFact = $("#txtNumCuentasAlcantarilladoFact").text();
	var txtNumCuentasAseoFact = $("#txtNumCuentasAseoFact").text();
	var datosConsumo = "DATOS SOBRE EL CONSUMO DEL SERVICIO:";
	var txtLecturaAnteriorFact = $("#txtLecturaAnteriorFact").text();
	var txtLecturaActualFact = $("#txtLecturaActualFact").text();
	var txtConsumoFact = $("#txtConsumoFact").text();
	var txtCausalFact = $("#txtCausalFact").text();
	var txtObservacionFact = $("#txtObservacionFact").text();
	var txtConsumoPromedioFact = $("#txtConsumoPromedioFact").text();
	var txtToneladasProducidasFact = $("#txtToneladasProducidasFact").text();
	var otroTexto = "";

	var texto = "{br}{s}{b}{center}" + txtNombreEmpresaFact + "{br}" + txtNitEmpresaFact + "{/b}{br}{br}{left}" + txtFechaFact + "{br}" +  txtNumFact + "{br}" +  txtFechaInicialFact + "{br}" +  txtFechaFinalFact + "{br}" +  txtNomprePeriodoFact + "{br}" +  txtFechaLimiteFact + "{br}{br}{b}{u}" +  datosUsuario + "{/u}{/b}{br}" + txtIdNombreUsuarioFact + "{br}" + txtDireccionFact + "{br}" + txtMedidorFact + "{br}" + txtUsoCatFact + "{br}" + txtNumCuentasAcueductoFact + "{br}" + txtNumCuentasAlcantarilladoFact + "{br}" + txtNumCuentasAseoFact + "{br}{br}{b}{u}" + datosConsumo + "{/u}{/b}{br}" + txtLecturaAnteriorFact + "{br}" + txtLecturaActualFact + "{br}" + txtConsumoFact + "{br}" + txtCausalFact + "{br}" + txtObservacionFact + "{br}" + txtConsumoPromedioFact + "{br}" + txtToneladasProducidasFact + "{/s}{br}" + otroTexto;

	window.DatecsPrinter.printText(texto,"ISO-8859-1",function ()
	{
		imprimirCuerpoFactura();
	},
	function (error){ 
	    swal(JSON.stringify(error)); 
	});
}

function imprimirCuerpoFactura() 
{
	var otroTexto = "";

	var largolistaLiquidacion = $("#detalleLiquidacionFactura li").size();
	var listaLiquidacion = $("#detalleLiquidacionFactura");
	
	//console.log(largolistaLiquidacion);

	var titulo = $("#detalleLiquidacionFactura li:nth-child(1)").text();

	var titulo1 = "{br}{s}{b}{u}" + titulo + "{/u}{/b}{/s}{br}{br}" + otroTexto;

	window.DatecsPrinter.printText(titulo1,"ISO-8859-1",function ()
	{
		console.log('imprimiendo');			
	},
	function (error){ 
	    swal(JSON.stringify(error)); 
	});

	for (var i = 2; i <= largolistaLiquidacion; i++) 
	{
		var linea = $("#detalleLiquidacionFactura li:nth-child("+i+") .row .col ").size();

		var linea1 = $("#detalleLiquidacionFactura li:nth-child("+i+") .row .col:nth-child(1)").text();
		var linea2 = $("#detalleLiquidacionFactura li:nth-child("+i+") .row .col:nth-child(2)").text();
		var linea3 = $("#detalleLiquidacionFactura li:nth-child("+i+") .row .col:nth-child(3)").text();
		var linea4 = $("#detalleLiquidacionFactura li:nth-child("+i+") .row .col:nth-child(4)").text();
		var linea5 = $("#detalleLiquidacionFactura li:nth-child("+i+") .row .col:nth-child(5)").text();

		var columna1 = linea1;

		while (columna1.length < 4) 
		{
			columna1 = " " + columna1;
		}

		var columna2 = linea2;

		while (columna2.length < 5) 
		{
			columna2 = " " + columna2;
		}

		var columna3 = linea3;

		while (columna3.length < 9) 
		{
			columna3 = " " + columna3;
		}

		var columna4 = linea4;

		while (columna4.length < 10) 
		{
			columna4 = " " + columna4;
		}

		var columna5 = linea5;

		while (columna5.length < 9) 
		{
			columna5 = " " + columna5;
		}


		console.log(columna1 + "|" + columna2 + "|" + columna2 + "|");

		var texto = "{s}" + columna1 + "|" + columna2 + "|" + columna3 + "|" + columna4 + "|" + columna5 + "|{/s}{br}" + otroTexto; 

		window.DatecsPrinter.printText(texto,"ISO-8859-1",function ()
		{
			console.log('imprimiendo');
		},
		function (error){ 
		    swal(JSON.stringify(error)); 
		});
	}

	imprimirPieDePagina();
}

function imprimirPieDePagina()
{
	var otroTexto = "";
	var pieDePaginaFactura = $("#pieDePaginaFactura li").size();

	for (var a = 1; a <= pieDePaginaFactura-2; a++) 
	{
		var linea = $("#pieDePaginaFactura li:nth-child("+a+") .row .col ").size();

		var linea1 = $("#pieDePaginaFactura li:nth-child("+a+") .row .col:nth-child(1)").text();
		var linea2 = $("#pieDePaginaFactura li:nth-child("+a+") .row .col:nth-child(2)").text();

		var columna1 = linea1;

		while (columna1.length < 20) 
		{
			columna1 = columna1 + " ";
		}

		var columna2 = linea2;

		while (columna2.length < 20) 
		{
			columna2 = " " + columna2;
		}

		var texto = "{s}" + columna1 + columna2 + "{/s}{br}" + otroTexto; 

		window.DatecsPrinter.printText(texto,"ISO-8859-1",function ()
		{
			console.log('imprimiendo');		
		},
		function (error){ 
		    swal(JSON.stringify(error)); 
		});
	}

	var posicionTotal = pieDePaginaFactura - 1;

	for (var b = posicionTotal; b <= pieDePaginaFactura; b++) 
	{
		var lineaTotal = $("#pieDePaginaFactura li:nth-child("+b+") .row .col ").size();

		var lineaTotal1 = $("#pieDePaginaFactura li:nth-child("+b+") .row .col:nth-child(1)").text();
		var lineaTotal2 = $("#pieDePaginaFactura li:nth-child("+b+") .row .col:nth-child(2)").text();

		var columnaTotal1 = lineaTotal1;

		while (columnaTotal1.length < 15) 
		{
			columnaTotal1 = columnaTotal1 + " ";
		}

		var columnaTotal2 = lineaTotal2;

		while (columnaTotal2.length < 15) 
		{
			columnaTotal2 = " " + columnaTotal2;
		}

		var textoTotal = "{br}{b}" + columnaTotal1 + columnaTotal2 + "{/b}{br}" + otroTexto; 

		window.DatecsPrinter.printText(textoTotal,"ISO-8859-1",function ()
		{
			console.log('imprimiendo');	
		},
		function (error){ 
		    swal(JSON.stringify(error)); 
		});
	}

	imprimirCodigodeBarrasFact();
}

function imprimirCodigodeBarrasFact()
{
	var textoCodigo = document.getElementById("txtNumeroFactReal").value;

	window.DatecsPrinter.setBarcode(1, true, 2, 2, 100, function()
	{
		window.DatecsPrinter.printBarcode(
		73, //here goes the barcode type code
		textoCodigo, //your barcode data
		function() 
		{
			imprimirDescripcionCargos();
		},
		function() 
		{
			swal(JSON.stringify(error));
		});
	}, 
	function() 
	{
		swal(JSON.stringify(error));
	});
}

function imprimirDescripcionCargos()
{
	var otroTexto = "";
	var descripcionCargos = $("#descripcionCargos li").size();

	var tituloDescripcion = $("#descripcionCargos li:nth-child(1)").text();
	var subTituloDescripcion = $("#descripcionCargos li:nth-child(3)").text();

	var textoTituloDescripcion = "{br}{left}{s}{b}{u}" + tituloDescripcion + "{br}{br}" + subTituloDescripcion + "{/u}{/b}{/s}{br}{br}" + otroTexto;

	window.DatecsPrinter.printText(textoTituloDescripcion,"ISO-8859-1",function ()
	{
		console.log('imprimiendo');			
	},
	function (error){ 
	    swal(JSON.stringify(error)); 
	});

	for (var a = 4; a <= descripcionCargos; a++) 
	{
		var descripcion = $("#descripcionCargos li:nth-child("+a+")").text();

		var textoDescripcion = "{s}{left}" + descripcion + "{/s}{br}" + otroTexto; 

		window.DatecsPrinter.printText(textoDescripcion,"ISO-8859-1",function ()
		{
			console.log('imprimiendo');	
		},
		function (error){ 
		    swal(JSON.stringify(error)); 
		});
	}

	window.DatecsPrinter.feedPaper(100, function()
	{
		window.DatecsPrinter.disconnect(function()
		{
			swal("Factura Impresa con Éxito");
		},

		function (error)
		{
			swal(JSON.stringify(error)); 
		});
	}, 
	function (error)
	{
		swal(JSON.stringify(error)); 
	});	
}

function guardarDatosFacturaUsuariosServicios()
{
	var txtNumeroFactReal = $("#txtNumeroFactReal").val();
	var txtFechaFactura = $("#txtFechaFactura").val();
	var txtFechaLimiteDePagoFactura = $("#txtFechaLimiteDePagoFactura").val();
	var numero = $("#txtNumRegistro").val();

	dbShell.transaction(function(tx) 
	{  
		tx.executeSql("Update UsuariosServicios set numeroFactura=?, fechaFactura=?, fechaLimiteDePago=? where Numero=?",[txtNumeroFactReal,txtFechaFactura,txtFechaLimiteDePagoFactura,numero], 
		function(tx, result)
		{
			guardarNumeroFacturaUsuarios();
		});
	});
}

function guardarNumeroFacturaUsuarios()
{
	var txtNumeroFactReal = $("#txtNumeroFactReal").val();
	var idOperario = $("#idOperario").val();
	dbShell.transaction(function(tx) 
	{  
		tx.executeSql("Update Usuarios set UltimoNoFactura=? where Id=?",[txtNumeroFactReal,idOperario], 
		function(tx, result)
		{
			console.log("guardado");
		});
	});
}

// Función Para ir a Lectura Medidores

/*----------------------------------------------------------------------------------*/

function pasarALecturaMedidores()
{
	window.location.href = "#/medidorlecturas";
	var ciclo = document.getElementById("txtCiclo").value;
	var ruta = document.getElementById("txtRuta").value;
	var numero = document.getElementById('txtNumRegistro').value;
	var idUsuario = document.getElementById("idOperario").value;
	pasarALectura(numero,idUsuario,ciclo,ruta);
}

function pasarALectura(a,b,ciclo,ruta) 
{	
	dbShell.transaction(function(tx) 
	{  
		var a1 = a;
		var a2 = b;
		var ciclo1 = ciclo;
		var ruta1 = ruta;

		tx.executeSql("SELECT * FROM UsuariosServicios where Ciclo=? and Ruta=?",[ciclo1,ruta1], 
		function(tx, result)
		{
			var idUsu = a2;
			var dato = parseInt(a1);
			var RegAnt = dato - 1;
			var RegSig = dato + 1;

			var LectActual = parseInt(result.rows.item(dato)['LecturaActual']);

			var CauActual = parseInt(result.rows.item(dato)['CausalActual']);

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
				document.getElementById('txtIdUsuarioLecturaSig').value = "Siguiente: " + result.rows.item(RegSig)['IdUsuario'] + ": " + ciclo1 + "-" + ruta1 + "-" + ConsecSig;
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

				document.getElementById('txtIdUsuarioLecturaAnt').value = "Anterior: " + result.rows.item(RegAnt)['IdUsuario'] + ": " + ciclo1 + "-" + ruta1 + "-" + ConsecAnt;
			}

			if(dato > 0 && dato <= result.rows.length-2)
			{
				$("#btnSig i").removeClass("disable");
				$("#btnSig span").removeClass("disable");
				$("#btnAnt span").removeClass("disable");
				$("#btnAnt i").removeClass("disable");
				$("#btnSig").attr("onClick", "ContarLecturas()");
				$("#btnAnt").attr("onClick", "validarLectAnt()");

				var ConsecAnt = result.rows.item(RegAnt)['Consecutivo'];
				var ConsecSig = result.rows.item(RegSig)['Consecutivo'];

				document.getElementById('txtIdUsuarioLecturaAnt').value = "Anterior: " + result.rows.item(RegAnt)['IdUsuario'] + ": " + ciclo1 + "-" + ruta1 + "-" + ConsecAnt;

				document.getElementById('txtIdUsuarioLecturaSig').value = "Siguiente: " + result.rows.item(RegSig)['IdUsuario'] + ": " + ciclo1 + "-" + ruta1 + "-" + ConsecSig;				
			}

			ContarRegistros(ciclo1,ruta1);
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

			if(LectActual >= 0 || CauActual >= 1)
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
