angular.module('starter.controladorciclorutafacturacion', [])

.controller('Ciclorutafacturacion', function($scope, $ionicLoading)
{
	console.log('lanzado desde ciclo ruta Fact');
	$scope.listaciclorutafact = [];
    angular.element(document).ready(function () 
    {
    	var idbd = document.getElementById("idOperario").value;
    	dbShell.transaction( function(tx) 
		{            
			tx.executeSql("SELECT * FROM AsignacionRutas where Oper=?", [idbd],                
			function(tx, result)
			{                  
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

						$scope.listaciclorutafact.push($scope.newCR);
						$("#inputControlCRFact").val($scope.listaciclorutafact.length);
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

	$scope.primeraFactura = function(ciclo,ruta,a)
	{
		document.getElementById('txtCiclo').value = parseInt(ciclo);
		document.getElementById('txtRuta').value = parseInt(ruta);
		var dato = parseInt(a);
		console.log(dato);
		document.getElementById('txtNumRegistro').value = dato;
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

					var Ciclotx = result.rows.item(dato)['Ciclo'];	
						document.getElementById('txtCiclo2Fact').value = "Ciclo: " + Ciclotx;

					var Rutatx = result.rows.item(dato)['Ruta'];
					document.getElementById('txtRuta2Fact').value = "Ruta: " + Rutatx;

					if(impreso == "si")
					{
						activarImpresionFact();
						$("#datos-entrada").attr('style', 'display:block;');
						$("#datosGenerales").attr('style', 'display:block;');
						$("#LecturaNoDiligenciada").attr('style', 'display:none;');

						document.getElementById('txtNumeroFact').value = result.rows.item(dato)['Numero'];
			
						document.getElementById('txtidUsuarioLecturaCtrl').value = idUsuario;
						
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
							document.getElementById('txtCausalFact').innerHTML = "Sin Causal";
							document.getElementById('txtLecturaActualFact').innerHTML = "Lectura Actual: <b>" + lecturaActual + "</b>";
						}

						if(causalActual > 0)
						{
							asignarCausalFact(causalActual);	
						}

						var observacionActual = result.rows.item(dato)['ObservacionActual'];

						if(observacionActual == 0)
						{
							document.getElementById('txtObservacionFact').innerHTML = "Sin Observacion";
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
});

