function cargarRespuestas(numero,entorno,tipo,ayuda,valtamano,tamanomin,tamanomax,valtipocaracter,tipocaracter,validaciontab,nombretab)
{
	var numeroPregunta = parseInt(numero);
	var tipoPregunta = parseInt(tipo);
	var idEntorno = parseInt(entorno);
	var textoAyuda = ayuda;
	var validacionTamano = valtamano;
	var tamanoMinimo = parseInt(tamanomin);
	var tamanoMaximo = parseInt(tamanomax);
	var validacionTipoCaracter = valtipocaracter;
	var tipoCaracter = tipocaracter;
	var validacionTabla = validaciontab;
	var nombreTabla = nombretab;

	dbShell.transaction(function(tx)
	{
		tx.executeSql("SELECT * FROM OpcionesCatastro WHERE idEntorno=?",[idEntorno],
		function(tx,result)
		{
			for (var i = 0; i < result.rows.length; i++) 
			{
				var idOpcion = result.rows.item(i)['IdOpcion'];
				var etiquetaOpcion = result.rows.item(i)['EtiquetaOpcion'];
				var textoOpcionBD = result.rows.item(i)['TextoOpcion'];
				var textoOpcion = "";

				if(textoOpcionBD != "Escriba la respuesta")
				{
					textoOpcion = "Escriba la respuesta";
				}

				else
				{
					textoOpcion = textoOpcionBD;
				}

				if(tipoPregunta == "2")
				{
					$("#respuestas"+numeroPregunta).append('<label class="item item-radio" style:"font-size:0.7em;><input type="radio" value="'+idOpcion+'" onchange="validarRespuestas()" name="opcionPregunta'+numeroPregunta+'"  style="border:1px solid black; font-size:0.7em;"><div class="item-content">'+etiquetaOpcion+'. '+textoOpcionBD+'</div><i class="radio-icon ion-checkmark"></i></label>');
				}

				if(tipoPregunta == "3")
				{
					$("#respuestas"+numeroPregunta).append('<li class="item item-checkbox"><label class="checkbox"><input id="respuesta'+numeroPregunta+'opcion'+idOpcion+'" type="checkbox" onchange="validarRespuestas()" value="'+idOpcion+'" name="opcionPregunta'+numeroPregunta+'" style="border:1px solid black; font-size:0.7em;"></label>'+etiquetaOpcion+'. '+textoOpcionBD+'</li>');
				}

				if(tipoPregunta == "4")
				{
					$("#respuestas"+numeroPregunta).append('<label class="item item-radio" style:"font-size:0.7em;><input type="radio" value="'+idOpcion+'" onchange="validarRespuestas()" name="opcionPregunta'+numeroPregunta+'"  style="border:1px solid black; font-size:0.7em;"><div class="item-content">'+etiquetaOpcion+'. '+textoOpcionBD+'</div><i class="radio-icon ion-checkmark"></i></label>');
				}

				if(tipoPregunta == "5")
				{
					$("#respuestas"+numeroPregunta).append('<li class="item item-checkbox"><label class="checkbox"><input id="respuesta'+numeroPregunta+'opcion'+idOpcion+'" type="checkbox" onchange="validarRespuestas()" value="'+idOpcion+'" name="opcionPregunta'+numeroPregunta+'" style="border:1px solid black; font-size:0.7em;"></label>'+etiquetaOpcion+'. '+textoOpcionBD+'</li>');
				}
			}

			if(tipoPregunta == "1")
			{
				if(tipocaracter == 	"n" || tipocaracter == 	"N")
				{
					if(validacionTamano == "TRUE" || validacionTamano == "true" || validacionTamano == "True" || validacionTamano == "1" || validacionTamano == "VERDADERO" || validacionTamano == "verdadero" || validacionTamano == "Verdadero" || validacionTamano == "si" || validacionTamano == "SI" || validacionTamano == "Si")
					{
						$("#respuestas"+numeroPregunta).append('<br><input id="respuestaAbierta'+numeroPregunta+'" type="number" onChange="validarRespuestas()" placeholder="'+textoOpcion+'" required style="width:100%; height: 6em; border-radius:10%; font-size:1em; padding:1em; font-weight:bold;">');
					}

					else
					{
						$("#respuestas"+numeroPregunta).append('<br><input id="respuestaAbierta'+numeroPregunta+'" type="number" onChange="validarRespuestas()" placeholder="'+textoOpcion+'" required style="width:100%; height: 6em; border-radius:10%; font-size:1em; padding:1em; font-weight:bold;">');
					}
				}

				else
				{
					if(validacionTamano == "TRUE" || validacionTamano == "true" || validacionTamano == "True" || validacionTamano == "1" || validacionTamano == "VERDADERO" || validacionTamano == "verdadero" || validacionTamano == "Verdadero" || validacionTamano == "si" || validacionTamano == "SI" || validacionTamano == "Si")
					{
						$("#respuestas"+numeroPregunta).append('<br><input id="respuestaAbierta'+numeroPregunta+'" type="text" placeholder="'+textoOpcion+'" onChange="validarRespuestas()" placeholder="'+textoOpcion+'" required style="width:100%; height: 6em; border-radius:10%; font-size:1em; padding:1em; font-weight:bold;">');
					}
					else
					{
						$("#respuestas"+numeroPregunta).append('<br><input id="respuestaAbierta'+numeroPregunta+'" type="text" placeholder="'+textoOpcion+'" onChange="validarRespuestas()" placeholder="'+textoOpcion+'" required style="width:100%; height: 6em; border-radius:10%; font-size:1em; padding:1em; font-weight:bold;">');
					}
				}
			}

			if(tipoPregunta == "4")
			{
				$("#respuestas"+numeroPregunta).append('<br><input id="respuestaAbierta'+numeroPregunta+'" type="text" placeholder="'+textoOpcion+'" required style="width:100%; height: 6em; border-radius:10%; font-size:1em; padding:1em; font-weight:bold;">');
			}

			if(tipoPregunta == "5")
			{
				$("#respuestas"+numeroPregunta).append('<br><input id="respuestaAbierta'+numeroPregunta+'" type="text" placeholder="'+textoOpcion+'" required style="width:100%; height: 6em; border-radius:10%; font-size:1em; padding:1em; font-weight:bold;">');
			}
		
			if(tipoPregunta == "6")
			{
				
				$("#respuestas"+numeroPregunta).append('<input id="nombreTabla'+numeroPregunta+'" type="text" style="display:none;"><br><select id="select'+numeroPregunta+'" onchange="validarRespuestas()" style="background:white; height:2em; width:100%; font-size:1.2em; font-weight:bold;"><option>Escoja una opción</option></select>');

				$("#nombreTabla"+numeroPregunta).val(nombreTabla);
			}
		});
	});
}

function cargarnumeroencuesta()
{
	var idbd = document.getElementById("idOperario").value;
	dbShell.transaction(function(tx) 
	{            
		tx.executeSql("SELECT * FROM InformacionEncuesta WHERE IdOperario=?", [idbd],                
		function(tx, result)
		{                
			var numeroAnterior = result.rows.length;
			console.log(numeroAnterior);

			var numeroEncuesta = numeroAnterior + 1;

			document.getElementById("numeroEncuesta").value=numeroEncuesta;
			$(".encuestaNumero").append("ENCUESTA No. "+numeroEncuesta);
		});
	});
}

function validarRespuestas()
{
	var numeroPregunta = document.getElementById("numeroPregunta").value;
	var numero = parseInt(numeroPregunta);
	var totalPreguntas = parseInt(document.getElementById("totalPreguntas").value);
	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM ProyectoCatastro WHERE IdPregunta=?",[numero],
		function(tx,result)
		{
			var tipoPregunta = result.rows.item(0)['TipoPregunta'];
			var idEntorno = result.rows.item(0)['IdEntorno'];
			var validacionTamano = result.rows.item(0)['ValidacionTamano'];
			var tamanoMinimo = result.rows.item(0)['TamanoMinimo'];
			var tamanoMaximo = result.rows.item(0)['TamanoMaximo'];
			var tipoCaracter = result.rows.item(0)['TipoCaracter'];
			var control = result.rows.item(0)['Control'];

			if(control == 1 || control == "1" || control == 2 || control == "2" || control == "")
			{
				if(tipoPregunta == 1 || tipoPregunta == "1")
				{
					var textoIngresado = $("#respuestaAbierta"+numero).val();
					console.log(textoIngresado);

					if(textoIngresado != "")
					{
						if(tipoCaracter == 	"n" || tipoCaracter == 	"N")
						{
							if(validacionTamano == "TRUE" || validacionTamano == "true" || validacionTamano == "True" || validacionTamano == "1" || validacionTamano == "VERDADERO" || validacionTamano == "verdadero" || validacionTamano == "Verdadero" || validacionTamano == "si" || validacionTamano == "SI" || validacionTamano == "Si")
							{
								if(textoIngresado.length < tamanoMinimo || textoIngresado.length > tamanoMaximo)
								{
									$("#btnSigCat").attr("disabled","disabled");

									if(tamanoMaximo == tamanoMinimo)
									{
										$("#mensajeError").text("La respuesta debe ser de "+tamanoMinimo+" caracteres");
									}

									if(tamanoMaximo != tamanoMinimo)
									{
										$("#mensajeError").text("La respuesta debe tener mínimo "+tamanoMinimo+" caracteres y máximo "+tamanoMaximo+" caracteres");
									}
								}

								else
								{
									$("#mensajeError").text("");
									if(numero == totalPreguntas)
									{
										$("#btnSigCat").attr("disabled","disabled");
										$("#btnGuardarCat").removeAttr('disabled');
									}

									else
									{
										$("#btnSigCat").removeAttr('disabled');
									}
								}
							}

							else
							{
								$("#mensajeError").text("");
								if(numero == totalPreguntas)
								{
									$("#btnSigCat").attr("disabled","disabled");
									$("#btnGuardarCat").removeAttr('disabled');
								}

								else
								{
									$("#btnSigCat").removeAttr('disabled');
								}
							}
						}

						else
						{
							if(validacionTamano == "TRUE" || validacionTamano == "true" || validacionTamano == "True" || validacionTamano == "1" || validacionTamano == "VERDADERO" || validacionTamano == "verdadero" || validacionTamano == "Verdadero" || validacionTamano == "si" || validacionTamano == "SI" || validacionTamano == "Si")
							{
								if(textoIngresado.length < tamanoMinimo || textoIngresado.length > tamanoMaximo)
								{
									$("#btnSigCat").attr("disabled","disabled");

									if(tamanoMaximo == tamanoMinimo)
									{
										$("#mensajeError").text("La respuesta debe ser de "+tamanoMinimo+" caracteres");
									}

									if(tamanoMaximo != tamanoMinimo)
									{
										$("#mensajeError").text("La respuesta debe tener mínimo "+tamanoMinimo+" caracteres y máximo "+tamanoMaximo+" caracteres");
									}
								}

								else
								{
									$("#mensajeError").text("");
									if(numero == totalPreguntas)
									{
										$("#btnSigCat").attr("disabled","disabled");
										$("#btnGuardarCat").removeAttr('disabled');
									}

									else
									{
										$("#btnSigCat").removeAttr('disabled');
									}
								}
							}

							else
							{
								$("#mensajeError").text("");
								if(numero == totalPreguntas)
								{
									$("#btnSigCat").attr("disabled","disabled");
									$("#btnGuardarCat").removeAttr('disabled');
								}

								else
								{
									$("#btnSigCat").removeAttr('disabled');
								}
							}
						}
					}


					if(textoIngresado == "")
					{
						$("#btnSigCat").attr("disabled","disabled");
						$("#mensajeError").text("Debe digitar la respuesta");
						$("#btnGuardarCat").attr("disabled","disabled");
					}
				}

				if(tipoPregunta == 2 || tipoPregunta == "2")
				{
					var valor = $("input[name=opcionPregunta"+numero+"]:checked").val();
					console.log(valor);

					if(valor)
					{
						if(numero == totalPreguntas)
						{
							$("#btnSigCat").attr("disabled","disabled");
							$("#btnGuardarCat").removeAttr('disabled');
						}

						else
						{
							$("#btnSigCat").removeAttr('disabled');
						}
					}
				}

				if(tipoPregunta == 3 || tipoPregunta == "3")
				{
					var valor = $("input[name=opcionPregunta"+numero+"]").length;
					var valor2 = "";
					for (var i = 1; i <= valor; i++) 
					{
						 if($("#respuesta"+numero+"opcion"+i).is(":checked"))
						 {
						 	valor2 += $("#respuesta"+numero+"opcion"+i).val();
						 	console.log(valor2);

							$("#mensajeError").text("");

							if(numero == totalPreguntas)
							{
								$("#btnSigCat").attr("disabled","disabled");
								$("#btnGuardarCat").removeAttr('disabled');
							}

							else
							{
								$("#btnSigCat").removeAttr('disabled');
							}
							
						 }

						 else if(valor2 == "")
						 {
						 	$("#btnSigCat").attr("disabled","disabled");
						 	$("#btnGuardarCat").attr("disabled","disabled");
						 	console.log("No hay selección");
						 }
					}
				}

				if(tipoPregunta == 4 || tipoPregunta == "4")
				{
					var valor = $("input[name=opcionPregunta"+numero+"]:checked").val();
					console.log(valor);

					if(valor)
					{
						if(numero == totalPreguntas)
						{
							$("#btnSigCat").attr("disabled","disabled");
							$("#btnGuardarCat").removeAttr('disabled');
						}

						else
						{
							$("#btnSigCat").removeAttr('disabled');
						}
					}

					else

					var textoIngresado2 = $("#respuestaAbierta"+numero).val();

				}

				if(tipoPregunta == 5 || tipoPregunta == "5")
				{
					var valor = $("input[name=opcionPregunta"+numero+"]").length;
					var valor2 = "";
					for (var i = 1; i <= valor; i++) 
					{
						 if($("#respuesta"+numero+"opcion"+i).is(":checked"))
						 {
						 	valor2 += $("#respuesta"+numero+"opcion"+i).val();
						 	console.log(valor2);

							$("#mensajeError").text("");

							if(numero == totalPreguntas)
							{
								$("#btnSigCat").attr("disabled","disabled");
								$("#btnGuardarCat").removeAttr('disabled');
							}

							else
							{
								$("#btnSigCat").removeAttr('disabled');
							}
							
						 }

						 else if(valor2 == "")
						 {
						 	$("#btnSigCat").attr("disabled","disabled");
						 	$("#btnGuardarCat").attr("disabled","disabled");
						 	console.log("No hay selección");
						 }
					}

					var textoIngresado3 = $("#respuestaAbierta"+numero).val();
				}

				if(tipoPregunta == 6 || tipoPregunta == "6")
				{
					var opcionSelect = $("#select"+numero).val();
					if(opcionSelect == "Escoja una opción")
					{
						$("#mensajeError").text("Escoja una opción en la lista desplegable");
						$("#btnGuardarCat").attr("disabled","disabled");
					}
					else
					{
						console.log(opcionSelect);						
						$("#mensajeError").text("");
						if(numero == totalPreguntas)
						{
							$("#btnSigCat").attr("disabled","disabled");
							$("#btnGuardarCat").removeAttr('disabled');
						}

						else
						{
							$("#btnSigCat").removeAttr('disabled');
						}
					}
				}
			}

			if(control == 0 || control == "0")
			{		
				$("#mensajeError").text("");

				if(numero == totalPreguntas)
				{
					$("#btnSigCat").attr("disabled","disabled");
					$("#btnGuardarCat").removeAttr('disabled');
				}

				else
				{
					$("#btnSigCat").removeAttr('disabled');
				}
			}
		});
	});
}

function EnviarRespuestas(idPregunta)
{
	console.log("Hola");
	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM ProyectoCatastro where IdPregunta=?",[idPregunta],
		function(tx,result)
		{		
			var numero = idPregunta;
			var tipoPregunta = result.rows.item(0)['TipoPregunta'];
			var idEntorno = result.rows.item(0)['IdEntorno'];
			var validacionTamano = result.rows.item(0)['ValidacionTamano'];
			var tamanoMinimo = result.rows.item(0)['TamanoMinimo'];
			var tamanoMaximo = result.rows.item(0)['TamanoMaximo'];
			var tipoCaracter = result.rows.item(0)['TipoCaracter'];

			if(tipoPregunta == 1 || tipoPregunta == "1")
			{
				var textoIngresado = $("#respuestaAbierta"+numero).val();
				guardarRespuestaTexto(numero,textoIngresado);
			}

			if(tipoPregunta == 2 || tipoPregunta == "2")
			{
				var valor = $("input[name=opcionPregunta"+numero+"]:checked").val();

				guardarRespuestaCerrada(numero,valor);
			}

			if(tipoPregunta == 3 || tipoPregunta == "3")
			{
				var valor = $("input[name=opcionPregunta"+numero+"]").length;
				var valor2;
				for (var a = 1; a <= valor; a++) 
				{
					 if($("#respuesta"+numero+"opcion"+a).is(":checked"))
					 {
					 	valor2 = $("#respuesta"+numero+"opcion"+a).val();
					 	guardarRespuestaCerrada(numero,valor2);
					 	console.log(valor2);
					 }
					 else
					 {
					 	valor2 = "";
					 	console.log(valor2);
					 }
				}
			}

			if(tipoPregunta == 4 || tipoPregunta == "4")
			{
				var valor = $("input[name=opcionPregunta"+numero+"]:checked").val();
				guardarRespuestaCerrada(numero,valor);
				var textoIngresado4 = $("#respuestaAbierta"+numero).val();
				if(textoIngresado4.length >= 1)
				{
					guardarRespuestaTexto(numero,textoIngresado4);
					console.log(textoIngresado4);
				}

				else
				{
					console.log(textoIngresado4);
				}
			}

			if(tipoPregunta == 5 || tipoPregunta == "5")
			{
				var valor = $("input[name=opcionPregunta"+numero+"]").length;
				var valor2;
				for (var b = 1; b <= valor; b++) 
				{
					 if($("#respuesta"+numero+"opcion"+b).is(":checked"))
					 {
					 	valor2 = $("#respuesta"+numero+"opcion"+b).val();
					 	guardarRespuestaCerrada(numero,valor2);
					 }
					 else
					 {
					 	valor2 = "";
					 }
				}

				var textoIngresado5 = $("#respuestaAbierta"+numero).val();
				if(textoIngresado5.length >= 1)
				{
					guardarRespuestaTexto(numero,textoIngresado);
					console.log(textoIngresado5);
				}

				else
				{
					console.log(textoIngresado5);
				}
			}

			if(tipoPregunta == 6 || tipoPregunta == "6")
			{
				var opcionSelect = $("#select"+numero).val();
				guardarRespuestaTexto(numero,opcionSelect);
			}
		});
	});
}

function guardarRespuestaTexto(numero,texto)
{
	var idOperario = document.getElementById("idOperario").value; 
	var idEncuesta = parseInt(document.getElementById("numeroEncuesta").value);
	var idPregunta = numero;
	var textoRespuesta = texto;
	var numeroControl = idEncuesta+""+numero+""+idOperario;

	if(textoRespuesta == "" || textoRespuesta=="Escoja una opción")
	{
		console.log('No hay texto para guardar');	
	}

	else
	{
		dbShell.transaction(function(tx) 
		{
			tx.executeSql("Select * FROM RespuestasAbiertas where Numero=?",[numeroControl],
			function(tx, result)
			{
				var total = result.rows.length;
				if(total == 1)
				{
					tx.executeSql("Delete from RespuestasAbiertas where Numero="+numeroControl);
					guardarRespuestaTextoEnBD(numeroControl,idOperario,idEncuesta,idPregunta,textoRespuesta);
				}

				if(total == 0)
				{
					guardarRespuestaTextoEnBD(numeroControl,idOperario,idEncuesta,idPregunta,textoRespuesta);
				}
			});
		});
	}	
}

function guardarRespuestaTextoEnBD(numeroControl,idOperario,idEncuesta,idPregunta,textoRespuesta)
{
	var numeroControl = numeroControl;
	var idOperario = idOperario;
	var idEncuesta = idEncuesta;
	var idPregunta = idPregunta;
	var textoRespuesta = textoRespuesta;

	dbShell.transaction(function(tx) 
	{
		tx.executeSql("Insert Into RespuestasAbiertas (Numero, idOperario, IdEncuesta, IdPregunta, TextoRespuesta) Values(?,?,?,?,?)",[numeroControl,idOperario,idEncuesta,idPregunta,textoRespuesta]);
	});
	console.log("RA"+numeroControl);
}

function guardarRespuestaCerrada(numero,texto)
{
	var idOperario = document.getElementById("idOperario").value; 
	var idEncuesta = parseInt(document.getElementById("numeroEncuesta").value);
	var idPregunta = numero;
	var textoRespuesta = texto;

	var numeroControl = idEncuesta+""+idPregunta+""+textoRespuesta+""+idOperario;

	if(textoRespuesta == "")
	{
		console.log('No hay texto para guardar');	
	}

	else
	{
		dbShell.transaction(function(tx) 
		{
			tx.executeSql("Select * FROM RespuestasCerradas where IdOperario="+idOperario+" AND IdEncuesta="+idEncuesta+" AND IdPregunta="+idPregunta,[],
			function(tx, result)
			{
				var total = result.rows.length;
				console.log(total);
				if(total >= 1)
				{
					tx.executeSql("Delete from RespuestasCerradas where IdOperario="+idOperario+" and IdEncuesta="+idEncuesta+" and IdPregunta="+idPregunta);
					guardarRespuestaCerradaEnBD(numeroControl,idOperario,idEncuesta,idPregunta,textoRespuesta);
				}

				if(total == 0)
				{
					guardarRespuestaCerradaEnBD(numeroControl,idOperario,idEncuesta,idPregunta,textoRespuesta);
				}
			});
		});
	}
}

function guardarRespuestaCerradaEnBD(numeroControl,idOperario,idEncuesta,idPregunta,textoRespuesta)
{
	var numeroControl = numeroControl;
	var idOperario = idOperario;
	var idEncuesta = idEncuesta;
	var idPregunta = idPregunta;
	var textoRespuesta = textoRespuesta;

	dbShell.transaction(function(tx) 
	{
		tx.executeSql("Insert Into RespuestasCerradas (Numero, idOperario, IdEncuesta, IdPregunta, idOpcion) Values(?,?,?,?,?)",[numeroControl,idOperario,idEncuesta,idPregunta,textoRespuesta]);
	});
	console.log("RC"+numeroControl);
}

function guardarEncuesta()
{
	var numeroPregunta = document.getElementById("numeroPregunta").value;
	var numeroControl = document.getElementById("numeroEncuesta").value;
	var idOperario = document.getElementById("idOperario").value; 
	var numeroEncuesta = numeroControl;
	var fechaCat = document.getElementById("fechaCat").value;
	var longitudCat = document.getElementById("longitudCat").value;
	var latitudCat = document.getElementById("latitudCat").value;
	var altitudCat = document.getElementById("altitudCat").value;
	var horaInicialCat = document.getElementById("horaInicialCat").value;
	var horaFinalCat = document.getElementById("horaCat").value;
	var numeroFotosCat = document.getElementById("numeroFotosCat").value;
	var mensaje = "Faltan los siguientes Requisitos:\n";

	if(numeroFotosCat == "" || numeroFotosCat == 0)
	{

		if(numeroFotosCat == "" || numeroFotosCat == 0)
		{
			mensaje = mensaje + "\nFotografía";
		}

		swal("Atención",mensaje,"warning");
	}

	else
	{
		EnviarRespuestas(numeroPregunta);
		dbShell.transaction(function(tx) 
		{
			tx.executeSql("Select * FROM InformacionEncuesta",[],
			function(tx, result)
			{
				numeroControl = result.rows.length;
			});

			tx.executeSql("Update InformacionEncuesta set HoraFinal=?, Latitud=?, Longitud=?, Altitud=?, Editado=?, FechaEdicion=?, HoraInicialEdicion=?, HoraFinalEdicion=?, CantidadFotos=? where NumeroEncuesta=?",[horaFinalCat,latitudCat,longitudCat,altitudCat,"No","","","",numeroFotosCat,numeroEncuesta],
				function(tx,result)
				{
					console.log("Encuesta"+numeroControl);;
					swal({
						title: "Correcto",
					text: "Encuesta Guardada",
						type: "success",
						showCancelButton: false,
						confirmButtonColor: "#0088C4",
						confirmButtonText: "Aceptar",
						closeOnConfirm: true }, function()
						{
							mostrarNuevaPregunta();					
						});
				}); 
		});
	}
}

function guardarEncuestaEmpezada()
{
	var numeroControl = document.getElementById("numeroEncuesta").value;;
	var idOperario = document.getElementById("idOperario").value; 
	var numeroEncuesta = numeroControl;
	var fechaCat = document.getElementById("fechaCat").value;
	var horaInicialCat = document.getElementById("horaInicialCat").value;
	
	dbShell.transaction(function(tx) 
	{
		tx.executeSql("Insert Into InformacionEncuesta (Numero,IdOperario,NumeroEncuesta,Fecha,HoraInicial,HoraFinal,Latitud,Longitud,Altitud,Editado,FechaEdicion,HoraInicialEdicion,HoraFinalEdicion,CantidadFotos) Values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[numeroControl,idOperario,numeroEncuesta,fechaCat,horaInicialCat,"","","","","","","","",""]); 

			console.log("Encuesta"+numeroControl);;
	});
}

function mostrarNuevaPregunta()
{
	$("#contenidoCat").hide();
	$("#contenidoNuevaEncuestaDiv").show();
}

function recargarCatastro()
{
	$("#contenidoCat #preguntas #listaPreguntas li").remove();
	document.getElementById("numeroFotosCat").value = 0;
	document.getElementById("longitudCat").value = "";
	document.getElementById("latitudCat").value = "";
	document.getElementById("altitudCat").value ="" ;
	document.getElementById("horaInicialCat").value = "";
	document.getElementById("numeroEncuesta").value = 0;
	document.getElementById("numeroPregunta").value = 0;
	document.getElementById("totalPreguntas").value = 0;
	
	funcionInicial();
}

function siguientePregunta()
{
	var numeroPregunta = document.getElementById("numeroPregunta").value;
	EnviarRespuestas(numeroPregunta);
	$("#btnAntCat").removeAttr("disabled");
	$("#btnSigCat").attr("disabled","disabled");

	var horaInicial = $("#horaInicialCat").val();
	var horaServidor = $("#horaCat").val();

	if(horaInicial == "")
	{
		$("#horaInicialCat").val(horaServidor);
	}

	if(numeroPregunta == 1 || numeroPregunta == "1")
	{
		guardarEncuestaEmpezada();
	}

	var numero = parseInt(numeroPregunta) + 1;
	var totalPreguntas = parseInt(document.getElementById("totalPreguntas").value);

	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM ProyectoCatastro WHERE IdPregunta=?",[numero],
		function(tx,result)
		{
			var control = result.rows.item(0)['Control'];
			var PreguntaDepende = result.rows.item(0)['PreguntaDepende'];
			var IdOpcionDepende = result.rows.item(0)['IdOpcionDepende'];
			if(control == 1 || control == "1" || control == 0 || control =="0")
			{
				$("#preguntas ul li").hide();
				$("#preguntas ul #pregunta"+numero).show();
				$("#preguntas ul #pregunta"+numero+" li").show();
				document.getElementById("numeroPregunta").value = numero;

				var largoSelect = $("#select"+numero+" option").length;

				if(largoSelect <= 2)
				{
					borrarAuxiliarCatastro();
				}

				validarRespuestas();
			}

			if(control == 2 || control == "2")
			{
				validarControlDosSig(PreguntaDepende,IdOpcionDepende,numero);
			}
		});
	});
}

function validarControlDosSig(PreguntaDepende,IdOpcionDepende,numero)
{
	var idop = $("#idOperario").val();
	var idEncuesta = $("#numeroEncuesta").val();
	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM RespuestasCerradas WHERE IdOperario=? and IdEncuesta=? and IdPregunta=? ",[idop,idEncuesta,PreguntaDepende],
		function(tx,result)
		{
			if(result.rows.length > 0)
			{
				var IdOpcion = result.rows.item(0)['IdOpcion'];
				if(IdOpcion == IdOpcionDepende)
				{
					$("#preguntas ul li").hide();
					$("#preguntas ul #pregunta"+numero).show();
					$("#preguntas ul #pregunta"+numero+" li").show();
					document.getElementById("numeroPregunta").value = numero;

					var largoSelect = $("#select"+numero+" option").length;

					if(largoSelect <= 2)
					{
						borrarAuxiliarCatastro();
					}

					validarRespuestas();
				}

				else
				{
					document.getElementById("numeroPregunta").value = numero+1;
					siguientePregunta();
				}
			}

			else
			{
				document.getElementById("numeroPregunta").value = numero+1;
				siguientePregunta();
			}
		});
	});
}

function anteriorPregunta()
{
	var numeroPregunta = document.getElementById("numeroPregunta").value;
	var numero = parseInt(numeroPregunta)-1;
	var totalPreguntas = parseInt(document.getElementById("totalPreguntas").value);

	if(numero == 1)
	{
		$("#btnAntCat").attr("disabled","disabled");
	}

	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM ProyectoCatastro WHERE IdPregunta=?",[numero],
		function(tx,result)
		{
			var control = result.rows.item(0)['Control'];
			var PreguntaDepende = result.rows.item(0)['PreguntaDepende'];
			var IdOpcionDepende = result.rows.item(0)['IdOpcionDepende'];
			if(control == 1 || control == "1" || control == 0 || control =="0")
			{
				$("#preguntas ul li").hide();
				$("#preguntas ul #pregunta"+numero).show();
				$("#preguntas ul #pregunta"+numero+" li").show();
				document.getElementById("numeroPregunta").value = numero;

				var largoSelect = $("#select"+numero+" option").length;

				if(largoSelect <= 2)
				{
					borrarAuxiliarCatastro();
				}

				validarRespuestas();
			}

			if(control == 2 || control == "2")
			{
				validarControlDosAnt(PreguntaDepende,IdOpcionDepende,numero);
			}
		});
	});
}

function validarControlDosAnt(PreguntaDepende,IdOpcionDepende,numero)
{
	var idop = $("#idOperario").val();
	var idEncuesta = $("#numeroEncuesta").val();
	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM RespuestasCerradas WHERE IdOperario=? and IdEncuesta=? and IdPregunta=? ",[idop,idEncuesta,PreguntaDepende],
		function(tx,result)
		{
			if(result.rows.length > 0)
			{
				var IdOpcion = result.rows.item(0)['IdOpcion'];
				if(IdOpcion == IdOpcionDepende)
				{
					$("#preguntas ul li").hide();
					$("#preguntas ul #pregunta"+numero).show();
					$("#preguntas ul #pregunta"+numero+" li").show();
					document.getElementById("numeroPregunta").value = numero;

					var largoSelect = $("#select"+numero+" option").length;

					if(largoSelect <= 2)
					{
						borrarAuxiliarCatastro();
					}

					validarRespuestas();
				}

				else
				{
					document.getElementById("numeroPregunta").value = numero-1;
					anteriorPregunta();
				}
			}

			else
			{
				document.getElementById("numeroPregunta").value = numero-1;
				anteriorPregunta();
			}
		});
	});
}

function cargarAuxiliarCatastro(entrada)
{	
	var reader=new FileReader();
	
	reader.onloadend=function(evento)
	{
		var AuxiliarCatastro=evento.target.result;
			
		dbShell.transaction(function(tx) 
		{   
			tx.executeSql("select Count(*) as Cantidad from Usuarios  ",[], 
			function(tx, result)
			{				
				var tipoArchivo = typeof result.rows.item(0)['Cantidad'];
				if(1 == 1)
				{
					var Control = AuxiliarCatastro.match(/\n/g);
					for(var i = 0; i < Control.length; i++)
					{						
						var UltimoDato = AuxiliarCatastro.indexOf('\n') // Se determina que ";" es salto de linea
						var Dato = AuxiliarCatastro.substring(0,UltimoDato);
						var SepararDato = Dato.split(","); // Se determina que cada dato a incluir en la BD se separa con ","
						
						tx.executeSql("Insert Into AuxiliarCatastro (Numero,Id, DescripcionId,Control) Values(?,?,?,?)",[
							i,
							SepararDato[0],
							SepararDato[1],
							0]);
						
						AuxiliarCatastro=AuxiliarCatastro.substring(UltimoDato+1,AuxiliarCatastro.length); 
						AuxiliarCatastroSubidos = i+1;
					}
					agruparRespuestas();
				}
			});
		});
	};
	reader.readAsText(entrada);
}

// device APIs are available
//
function AuxiliarCatastro() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSAuxiliarCatastro, fail);
}

function gotFSAuxiliarCatastro(fileSystem) {
	var numero = $("#numeroPregunta").val();
	var nombreTabla = $("#nombreTabla"+numero).val();
    fileSystem.root.getFile("AQuaMovil/Entradas/"+nombreTabla+".csv", null, gotFileEntryAuxiliarCatastro, fail);
}

function gotFileEntryAuxiliarCatastro(fileEntry) {
    fileEntry.file(gotFileAuxiliarCatastro, fail);
}

function gotFileAuxiliarCatastro(file){
    cargarAuxiliarCatastro(file);
}

/*----------------------------------------------------------------------------------*/

//Función para borrar las causales de la base de datos

function borrarAuxiliarCatastro()
{
	dbShell.transaction(function(tx)
	{
		tx.executeSql("Drop Table AuxiliarCatastro");
		CrearTablaAuxiliarCatastro();
		AuxiliarCatastro();
	});
}

function agruparRespuestas()
{
	var num = $("#numeroPregunta").val();
	var numeroPregunta = parseInt(num);
	var numeroEncuesta = $("#numeroEncuesta").val();
	var tipoPregunta = "6";
	dbShell.transaction(function(tx) 
	{            
		tx.executeSql("SELECT * FROM AuxiliarCatastro", [],                
		function(tx, result)
		{                
			for (var i = 0; i < result.rows.length; i++) 
			{
				var id = result.rows.item(i)['Id'];
				var descripcionId = result.rows.item(i)['DescripcionId'];

				$("#select"+numeroPregunta).append('<option value"'+id+'">'+id+' - '+descripcionId+'</option>');
			}
		});
	});
}

function DescargarArchivoCatastro() 
{
	$("#numeroPaquete").val(0);
	$("#minimoDescarga").val(0);
	$("#maximoDescarga").val(0);
	swal({
		title: "Bloqueo de Seguridad",
		text: "Ingrese la clave para descarga",
		type: "input",
		inputType: "password",
		showCancelButton: true,
		closeOnConfirm: false,
		animation: "slide-from-top",
		inputPlaceholder: "Password" }, 
		function(inputValue)
		{
			if (inputValue === false) return false;

			if (inputValue === "") 
			{
					swal.showInputError("Debe ingresar la clave de seguridad");
					return false;
			}

			if (inputValue != "soportemv") 
			{
					swal.showInputError("Clave Incorrecta");
					return false;
			}

			if (inputValue == "soportemv") 
			{
				numeroProceso();	
			}
		});
}

function numeroProceso()
{
	swal({
	title: "Ingrese el # de proceso",
	text: "1 - Info Encuestas\n2 - Respuestas Abiertas\n3 - Respuestas Cerradas",
	type: "input",
	inputType: "number",
	showCancelButton: true,
	closeOnConfirm: false,
	animation: "pop",
	inputPlaceholder: "1 - 2 - 3" }, 
	function(inputValue)
	{
		if (inputValue === false) return false;

		if (inputValue === "") 
		{
				swal.showInputError("Debe el número del proceso (1, 2 o 3");
				return false;
		}

		if (inputValue == 1) 
		{
			definirPaqueteDeDatos(1);
		}

		if (inputValue == 2)
		{
			definirPaqueteDeDatos(2); 
		}

		if (inputValue == 3)
		{
			definirPaqueteDeDatos(3);
		}

		else
		{
			swal.showInputError("El proceso ingresado no existe");
			return false;
		}
	}); 
}

function definirPaqueteDeDatos(numProceso)
{
	swal({
	title: "Descargar paquete de datos",
	text: "Ingrese el número de paquete que desea descargar",
	type: "input",
	inputType: "number",
	showCancelButton: true,
	closeOnConfirm: false,
	animation: "pop",
	inputPlaceholder: "Ej:1" }, 
	function(inputValue)
	{
		if (inputValue === false) return false;

		if (inputValue === "") 
		{
				swal.showInputError("Ingrese el numero del paquete");
				return false;
		}

		if (inputValue > 0) 
		{
			var numeroPaquete = inputValue;
			$("#numeroPaquete").val(numeroPaquete);
			definirTamanoPaqueteDeDatos(numProceso);
		}

		else
		{
			swal.showInputError("Número de paquete incorrecto");
			return false;
		}
	}); 
}

function definirTamanoPaqueteDeDatos(numProceso)
{
	swal({
	title: "Descargar paquete de datos",
	text: "Ingrese el tamaño del paquete de datos",
	type: "input",
	inputType: "number",
	showCancelButton: true,
	closeOnConfirm: false,
	animation: "pop",
	inputPlaceholder: "Ej:250" }, 
	function(inputValue)
	{
		if (inputValue === false) return false;

		if (inputValue === "") 
		{
				swal.showInputError("Ingrese el numero del paquete");
				return false;
		}

		if (inputValue > 0) 
		{
			var numeroPaquete = parseInt($("#numeroPaquete").val());
			var tamanoPaquete = inputValue;
			var minimoDescarga = (numeroPaquete-1)*tamanoPaquete;
			var maximoDescarga = numeroPaquete*tamanoPaquete;

			$("#tamanoPaquete").val(tamanoPaquete);
			$("#minimoDescarga").val(minimoDescarga);
			$("#maximoDescarga").val(maximoDescarga);

			if(numProceso == 1)
			{
				$("#idProcesoDescargaCatastro").val(numProceso);
				descargarIE();
			}

			if(numProceso == 2)
			{
				$("#idProcesoDescargaCatastro").val(numProceso);
				descargarRA();
			}

			if(numProceso == 3)
			{
				$("#idProcesoDescargaCatastro").val(numProceso);
				descargarRC();
			}
		}

		else
		{
			swal.showInputError("Tamaño de paquete invalido");
			return false;
		}
	}); 
}

function descargarSiguientePaquete()
{
	var numPaquete = parseInt($("#numeroPaquete").val());
	var minDescarga = parseInt($("#minimoDescarga").val());
	var maxDescarga = parseInt($("#maximoDescarga").val());
	var tamanoPaquete = parseInt($("#tamanoPaquete").val());
	var sigPaquete = numPaquete + 1;
	swal({
		title: "Descarga de paquete completa",
		text: "¿Desea descargar el paquete no." + sigPaquete + "?",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#0088C4",
		confirmButtonText: "Si",
		closeOnConfirm: false }, 
		function()
		{
			var minDescargaSig = minDescarga + tamanoPaquete;
			var maxDescargaSig = maxDescarga + tamanoPaquete;

			$("#numeroPaquete").val(sigPaquete);
			$("#minimoDescarga").val(minDescargaSig);
			$("#maximoDescarga").val(maxDescargaSig);
			var idProcesoDescarga = $("#idProcesoDescargaCatastro").val();

			if(idProcesoDescarga == 1 || idProcesoDescarga == "1")
			{
				descargarIE();
			}

			if(idProcesoDescarga == 2 || idProcesoDescarga == "2")
			{
				descargarRA();
			}

			if(idProcesoDescarga == 3 || idProcesoDescarga == "3")
			{
				descargarRC();
			}
		});
}

function descargarIE()
{
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSIE, fail);
}

function descargarRA()
{
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSRA, fail);
}

function descargarRC()
{
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSRC, fail);
}

function gotFSIE(fileSystem) 
{
    var idOperario = document.getElementById("idOperario").value;
    var numPKG = document.getElementById("numeroPaquete").value;

    var nombreArchivo = "C-IE" + "" + idOperario + "PKG" + numPKG + "";

    fileSystem.root.getFile("AQuaMovil/Salidas/" + nombreArchivo + ".csv", {create: true, exclusive: false}, gotFileEntryIE, fail);
}

function gotFSRA(fileSystem) 
{
    var idOperario = document.getElementById("idOperario").value;
    var numPKG = document.getElementById("numeroPaquete").value;
    console.log(numPKG);

    var nombreArchivo2 = "C-RA" + "" + idOperario + "PKG" + numPKG + "";

    fileSystem.root.getFile("AQuaMovil/Salidas/" + nombreArchivo2 + ".csv", {create: true, exclusive: false}, gotFileEntryRA, fail);
}

function gotFSRC(fileSystem) 
{
    var idOperario = document.getElementById("idOperario").value;
    var numPKG = document.getElementById("numeroPaquete").value;

    var nombreArchivo3 = "C-RC" + "" + idOperario + "PKG" + numPKG + "";

    fileSystem.root.getFile("AQuaMovil/Salidas/" + nombreArchivo3 + ".csv", {create: true, exclusive: false}, gotFileEntryRC, fail);
}

function gotFileEntryIE(fileEntry) 
{
    fileEntry.createWriter(gotFileWriterIE, fail);
}

function gotFileEntryRA(fileEntry) 
{
    fileEntry.createWriter(gotFileWriterRA, fail);
}

function gotFileEntryRC(fileEntry) 
{
    fileEntry.createWriter(gotFileWriterRC, fail);
}

function gotFileWriterIE(writer) 
{
	var numPaquete = $("#numeroPaquete").val();
	var minDescarga = $("#minimoDescarga").val();
	var maxDescarga = $("#maximoDescarga").val();
	var idOperario = document.getElementById("idOperario").value; 
    var contador = minDescarga-1;
    console.log(contador);
    var totalLineas = 0;
    writer.onwrite = function(evt) 
    {
        console.log("Se escribieron " + contador + "lineas");
    };

    writer.onwriteend = function(evt)
    {
        contador=contador+1;
        dbShell.transaction( function(tx) 
        {            
            tx.executeSql("SELECT * FROM InformacionEncuesta where IdOperario=? ORDER BY Numero ASC",[idOperario],                
            function(tx, result)
            {  
            	totalLineas = result.rows.length;

            	if(minDescarga <= totalLineas)
            	{
            		if (contador < result.rows.length && contador < maxDescarga) 
	                {   
	                    var IdOperario = result.rows.item(contador)['IdOperario'];
	                    var NumeroEncuesta = result.rows.item(contador)['NumeroEncuesta'];
	                    var Fecha = result.rows.item(contador)['Fecha'];
	                    var HoraInicial = result.rows.item(contador)['HoraInicial'];
	                    var HoraFinal = result.rows.item(contador)['HoraFinal'];
	                    var Latitud = result.rows.item(contador)['Latitud'];
	                    var Longitud = result.rows.item(contador)['Longitud'];
	                    var Altitud = result.rows.item(contador)['Altitud'];
						var Editado = result.rows.item(contador)['Editado'];
						var FechaEdicion = result.rows.item(contador)['FechaEdicion'];
						var HoraInicialEdicion = result.rows.item(contador)['HoraInicialEdicion'];
						var HoraFinalEdicion = result.rows.item(contador)['HoraFinalEdicion'];
	                    var CantidadFotos = result.rows.item(contador)['CantidadFotos'];

	                    var contenidoListaRegistros = IdOperario + ',' + NumeroEncuesta + ',' + Fecha + ',' + HoraInicial + ',' + HoraFinal + ',' + Latitud + ',' + Longitud + ',' + Altitud + ',' + Editado + ',' + FechaEdicion + ',' + HoraInicialEdicion + ',' + HoraFinalEdicion + ',' +  CantidadFotos + '\r\n';
	                    
	                    var largo = contenidoListaRegistros.length + 1;
	                    writer.write(contenidoListaRegistros);
	                    writer.seek(largo);
	                }

	                if(contador == maxDescarga)
	                {
	                	descargarSiguientePaquete();
	                }

	                if(contador == result.rows.length)
	                {
	                	swal("Descarga Finalizada", "El archivo se ha descargado por completo","success");
	                }
            	}

            	else
            	{
            		swal("Atención", "El paquete solicitado no existe","error");
            	}
            });    
        });
   	swal("Descargando", "Progreso: "+contador+"/"+totalLineas,"success");
    };
    var escribirTitulos = "IdOperario,NumeroEncuesta,Fecha,HoraInicial,HoraFinal,Latitud,Longitud,Altitud,Editado,FechaEdicion,HoraInicialEdicion,HoraFinalEdicion,CantidadFotos\r\n";
    var largoTitulos = escribirTitulos.length + 1
    writer.write(escribirTitulos);
    writer.seek(largoTitulos);
}

function gotFileWriterRA(writer) 
{
	var numPaquete = $("#numeroPaquete").val();
	var minDescarga = $("#minimoDescarga").val();
	var maxDescarga = $("#maximoDescarga").val();
	var idOperario = document.getElementById("idOperario").value; 
    var contador = minDescarga-1;
    console.log(contador);
    console.log(minDescarga);
    console.log(maxDescarga);
    var totalLineas = 0;
    writer.onwrite = function(evt) 
    {
        console.log("Se escribieron " + contador + "lineas");
    };

    writer.onwriteend = function(evt)
    {
        contador=contador+1;
        dbShell.transaction( function(tx) 
        {            
            tx.executeSql("SELECT * FROM RespuestasAbiertas where IdOperario=? ORDER BY IdEncuesta ASC, IdPregunta ASC",[idOperario],                
            function(tx, result)
            {  
                totalLineas = result.rows.length;

            	if(minDescarga <= totalLineas)
            	{
            		if (contador < result.rows.length && contador < maxDescarga) 
	                { 
	                    var IdOperario = result.rows.item(contador)['IdOperario'];
	                    var IdEncuesta = result.rows.item(contador)['IdEncuesta'];
	                    var IdPregunta = result.rows.item(contador)['IdPregunta'];
	                    var TextoRespuesta = result.rows.item(contador)['TextoRespuesta'];

	                    var contenidoListaRegistros = IdOperario + ',' + IdEncuesta + ',' + IdPregunta + ',' + TextoRespuesta + '\r\n';
	                    
	                    var largo = contenidoListaRegistros.length + 1;
	                    writer.write(contenidoListaRegistros);
	                    writer.seek(largo);
                	}

	               if(contador == maxDescarga)
	                {
	                	descargarSiguientePaquete();
	                }

	                if(contador == result.rows.length)
	                {
	                	swal("Descarga Finalizada", "El archivo se ha descargado por completo","success");
	                }
            	}

            	else
            	{
            		swal("Atención", "El paquete solicitado no existe","error");
            	}
            });    
        });
    swal("Descargando", "Progreso: "+contador+"/"+totalLineas,"success");
    };
    var escribirTitulos = "IdOperario,IdEncuesta,IdPregunta,TextoRespuesta\r\n";
    var largoTitulos = escribirTitulos.length + 1
    writer.write(escribirTitulos);
    writer.seek(largoTitulos);
}

function gotFileWriterRC(writer) 
{
	var numPaquete = $("#numeroPaquete").val();
	var minDescarga = $("#minimoDescarga").val();
	var maxDescarga = $("#maximoDescarga").val();
	var idOperario = document.getElementById("idOperario").value; 
    var contador = minDescarga-1;
    console.log(contador);
    console.log(minDescarga);
    console.log(maxDescarga);
    var totalLineas = 0;
    writer.onwrite = function(evt) 
    {
        console.log("Se escribieron " + contador + "lineas");
    };

    writer.onwriteend = function(evt)
    {
        contador=contador+1;
        dbShell.transaction( function(tx) 
        {            
            tx.executeSql("SELECT * FROM RespuestasCerradas where IdOperario=? ORDER BY IdEncuesta ASC, IdPregunta ASC",[idOperario],                
            function(tx, result)
            {  
                totalLineas = result.rows.length;

            	if(minDescarga <= totalLineas)
            	{
            		if (contador < result.rows.length && contador < maxDescarga) 
	                {   
	                    var IdOperario = result.rows.item(contador)['IdOperario'];
	                    var IdEncuesta = result.rows.item(contador)['IdEncuesta'];
	                    var IdPregunta = result.rows.item(contador)['IdPregunta'];
	                    var IdOpcion = result.rows.item(contador)['IdOpcion'];

	                    var contenidoListaRegistros = IdOperario + ',' + IdEncuesta + ',' + IdPregunta + ',' + IdOpcion + '\r\n';
	                    
	                    var largo = contenidoListaRegistros.length + 1;
	                    writer.write(contenidoListaRegistros);
	                    writer.seek(largo);
	            	}

            		if(contador == maxDescarga)
	                {
	                	descargarSiguientePaquete();
	                }

	                if(contador == result.rows.length)
	                {
	                	swal("Descarga Finalizada", "El archivo se ha descargado por completo","success");
	                }
            	}

            	else
            	{
            		swal("Atención", "El paquete solicitado no existe","error");
            	}
            });    
        });
    swal("Descargando", "Progreso: "+contador+"/"+totalLineas,"success");
    };
    var escribirTitulos = "IdOperario,IdEncuesta,IdPregunta,IdOpcion\r\n";
    var largoTitulos = escribirTitulos.length + 1
    writer.write(escribirTitulos);
    writer.seek(largoTitulos);
}

function VerificarEncuesta()
{
	swal({
		title: "Editar Encuesta",
		text: "Ingrese el número de encuesta a editar:",
		type: "input",
		showCancelButton: true,
		confirmButtonText: "Ok",
		cancelButtonText: "Cancelar",
		closeOnConfirm: false,
		animation: "pop",
		inputType: "number",
		inputPlaceholder: "Ej: 1" }, 
		function(inputValue)
		{   
			var numeroEncuestas;
			var HoraFinal;

			if (inputValue === false) 
				return false;      
			if (inputValue === "") 
			{
				swal.showInputError("Debe escribir el número de la encuesta");
				return false;
			}

			else
			{
				dbShell.transaction( function(tx) 
				{            
				    tx.executeSql("SELECT * FROM InformacionEncuesta where NumeroEncuesta=?",[inputValue],                
				    function(tx, result)
				    {  
				        numeroEncuestas = result.rows.length;
				        var HoraFinal = result.rows.item(0)['HoraFinal'];
				        if (numeroEncuestas == 0) 
						{
							swal.showInputError("La encuesta número " + inputValue + " aún no se ha diligenciado");
							return false;
						}

						if (HoraFinal == "") 
						{
							swal.showInputError("La encuesta número " + inputValue + " se encuentra incompleta, regrese a la opción 'Realizar Encuestas' para finalizarla");
							return false;
						}

						if (numeroEncuestas > 0 && HoraFinal != "")
						{
							swal("Correcto", "Edición de encuesta: " + inputValue, "success");
							var CantidadFotos = result.rows.item(0)['CantidadFotos']
							window.location.href = "#/empezarnuevaencuesta";
							funcionInicialEditar(inputValue,CantidadFotos);
						}	
				    });    
				});
			}	
		});
}

function cargarRespuestasSinTerminar(numero,entorno,tipo,ayuda,valtamano,tamanomin,tamanomax,valtipocaracter,tipocaracter,validaciontab,nombretab)
{
	var numeroPregunta = parseInt(numero);
	var tipoPregunta = parseInt(tipo);
	var idEntorno = parseInt(entorno);
	var textoAyuda = ayuda;
	var validacionTamano = valtamano;
	var tamanoMinimo = parseInt(tamanomin);
	var tamanoMaximo = parseInt(tamanomax);
	var validacionTipoCaracter = valtipocaracter;
	var tipoCaracter = tipocaracter;
	var validacionTabla = validaciontab;
	var nombreTabla = nombretab;
	var numeroEncuesta = document.getElementById("numeroEncuesta").value;

	dbShell.transaction(function(tx)
	{
		tx.executeSql("SELECT * FROM OpcionesCatastro WHERE idEntorno=?",[idEntorno],
		function(tx,result)
		{
			for (var i = 0; i < result.rows.length; i++) 
			{
				var idOpcion = result.rows.item(i)['IdOpcion'];
				var etiquetaOpcion = result.rows.item(i)['EtiquetaOpcion'];
				var textoOpcionBD = result.rows.item(i)['TextoOpcion'];
				var textoOpcion = "";

				if(textoOpcionBD != "Escriba la respuesta" || textoOpcionBD == "" || textoOpcionBD == "undefined")
				{
					textoOpcion = "Escriba la respuesta";
				}

				else
				{
					textoOpcion = textoOpcionBD;
				}

				if(tipoPregunta == "2")
				{
					$("#respuestas"+numeroPregunta).append('<label class="item item-radio" style:"font-size:0.7em;"><input type="radio" value="'+idOpcion+'" id="respuesta'+numeroPregunta+'opcion'+idOpcion+'" onchange="validarRespuestas()" name="opcionPregunta'+numeroPregunta+'"  style="border:1px solid black;"><div class="item-content">'+etiquetaOpcion+'. '+textoOpcionBD+'</div><i class="radio-icon ion-checkmark"></i></label>');

					mostrarRespuestaNumeroSinTerminar(numeroEncuesta,numeroPregunta,tipoPregunta,idOpcion);
				}

				if(tipoPregunta == "3")
				{
					$("#respuestas"+numeroPregunta).append('<li class="item item-checkbox"><label class="checkbox"><input id="respuesta'+numeroPregunta+'opcion'+idOpcion+'" type="checkbox" onchange="validarRespuestas()" value="'+idOpcion+'" name="opcionPregunta'+numeroPregunta+'" style="border:1px solid black;"></label>'+etiquetaOpcion+'. '+textoOpcionBD+'</li>');
					mostrarRespuestaNumeroSinTerminar(numeroEncuesta,numeroPregunta,tipoPregunta,idOpcion);
				}

				if(tipoPregunta == "4")
				{
					$("#respuestas"+numeroPregunta).append('<label class="item item-radio" style:"font-size:0.7em;"><input type="radio" value="'+idOpcion+'" id="respuesta'+numeroPregunta+'opcion'+idOpcion+'" onchange="validarRespuestas()" name="opcionPregunta'+numeroPregunta+'"  style="border:1px solid black;"><div class="item-content">'+etiquetaOpcion+'. '+textoOpcionBD+'</div><i class="radio-icon ion-checkmark"></i></label>');
					mostrarRespuestaNumeroSinTerminar(numeroEncuesta,numeroPregunta,tipoPregunta,idOpcion);
				}

				if(tipoPregunta == "5")
				{
					$("#respuestas"+numeroPregunta).append('<li class="item item-checkbox"><label class="checkbox"><input id="respuesta'+numeroPregunta+'opcion'+idOpcion+'" type="checkbox" onchange="validarRespuestas()" value="'+idOpcion+'" name="opcionPregunta'+numeroPregunta+'" style="border:1px solid black;"></label>'+etiquetaOpcion+'. '+textoOpcionBD+'</li>');
					mostrarRespuestaNumeroSinTerminar(numeroEncuesta,numeroPregunta,tipoPregunta,idOpcion);
				}
			}

			if(tipoPregunta == "1")
			{
				if(tipocaracter == 	"n" || tipocaracter == 	"N")
				{
					if(validacionTamano == "TRUE" || validacionTamano == "true" || validacionTamano == "True" || validacionTamano == "1" || validacionTamano == "VERDADERO" || validacionTamano == "verdadero" || validacionTamano == "Verdadero" || validacionTamano == "si" || validacionTamano == "SI" || validacionTamano == "Si")
					{
						$("#respuestas"+numeroPregunta).append('<br><input id="respuestaAbierta'+numeroPregunta+'" type="number" onChange="validarRespuestas()" placeholder="'+textoOpcion+'" required style="width:100%; height: 6em; border-radius:10%; font-size:1em; padding:1em; font-weight:bold;">');
					}

					else
					{
						$("#respuestas"+numeroPregunta).append('<br><input id="respuestaAbierta'+numeroPregunta+'" type="number" onChange="validarRespuestas()" placeholder="'+textoOpcion+'" required style="width:100%; height: 6em; border-radius:10%; font-size:1em; padding:1em; font-weight:bold;">');
					}
				}

				else
				{
					if(validacionTamano == "TRUE" || validacionTamano == "true" || validacionTamano == "True" || validacionTamano == "1" || validacionTamano == "VERDADERO" || validacionTamano == "verdadero" || validacionTamano == "Verdadero" || validacionTamano == "si" || validacionTamano == "SI" || validacionTamano == "Si")
					{
						$("#respuestas"+numeroPregunta).append('<br><input id="respuestaAbierta'+numeroPregunta+'" type="text" placeholder="'+textoOpcion+'" onChange="validarRespuestas()" placeholder="'+textoOpcion+'" required style="width:100%; height: 6em; border-radius:10%; font-size:1em; padding:1em; font-weight:bold;">');
					}
					else
					{
						$("#respuestas"+numeroPregunta).append('<br><input id="respuestaAbierta'+numeroPregunta+'" type="text" placeholder="'+textoOpcion+'" onChange="validarRespuestas()" placeholder="'+textoOpcion+'" required style="width:100%; height: 6em; border-radius:10%; font-size:1em; padding:1em; font-weight:bold;">');
					}
				}

				mostrarRespuestaTextoSinTerminar(numeroEncuesta,numeroPregunta,tipoPregunta);
			}

			if(tipoPregunta == "4")
			{
				$("#respuestas"+numeroPregunta).append('<br><input id="respuestaAbierta'+numeroPregunta+'" type="text" placeholder="'+textoOpcion+'" required style="width:100%; height: 6em; border-radius:10%; font-size:1em; padding:1em; font-weight:bold;">');
				mostrarRespuestaTextoSinTerminar(numeroEncuesta,numeroPregunta,tipoPregunta);
			}

			if(tipoPregunta == "5")
			{
				$("#respuestas"+numeroPregunta).append('<br><input id="respuestaAbierta'+numeroPregunta+'" type="text" placeholder="'+textoOpcion+'" required style="width:100%; height: 6em; border-radius:10%; font-size:1em; padding:1em; font-weight:bold;">');
				mostrarRespuestaTextoSinTerminar(numeroEncuesta,numeroPregunta,tipoPregunta);
			}

			if(tipoPregunta == "6")
			{
				
				$("#respuestas"+numeroPregunta).append('<input id="nombreTabla'+numeroPregunta+'" type="text" style="display:none;"><br><select id="select'+numeroPregunta+'" onchange="validarRespuestas()" style="background:white; height:2em; width:100%; font-size:1.2em; font-weight:bold;"><option>Escoja una opción</option></select>');

				$("#nombreTabla"+numeroPregunta).val(nombreTabla);
				mostrarRespuestaTextoSinTerminar(numeroEncuesta,numeroPregunta,tipoPregunta);
			}
		});
	});
}

function mostrarRespuestaTextoSinTerminar(numeroEncuesta,numeroPregunta,tipoPregunta)
{
	dbShell.transaction(function(tx)
	{
		tx.executeSql("SELECT * FROM RespuestasAbiertas WHERE IdEncuesta=? and IdPregunta=?",[numeroEncuesta,numeroPregunta],
		function(tx,result)
		{
			if(result.rows.length > 0)
			{
				document.getElementById("numeroPregunta").value=numeroPregunta;
				cargarNumeroPreguntaSinTerminar();	
				var texto = result.rows.item(0)['TextoRespuesta'];
				if(tipoPregunta == "1" || tipoPregunta == "4" || tipoPregunta == "5")
				{
					$("#respuestaAbierta"+numeroPregunta).val(texto);
					validarRespuestas();
				}

				if(tipoPregunta == "6")
				{
					$("#select"+numeroPregunta).append("<option selected>"+texto+"</option>");
					validarRespuestas();
				}
				
			}
			else
			{
				console.log("No hay respuesta para esta pregunta");
			}
			
		});
	});
}

function mostrarRespuestaNumeroSinTerminar(numeroEncuesta,numeroPregunta,tipoPregunta,idOpcion)
{
	dbShell.transaction(function(tx)
	{
		tx.executeSql("SELECT * FROM RespuestasCerradas WHERE IdEncuesta=? and IdPregunta=?",[numeroEncuesta,numeroPregunta],
		function(tx,result)
		{
			if(result.rows.length > 0)
			{
				document.getElementById("numeroPregunta").value=numeroPregunta;
				cargarNumeroPreguntaSinTerminar();
				for (var i = 0; i < result.rows.length; i++) 
				{
					var opcion = result.rows.item(i)['IdOpcion'];
					if(idOpcion == opcion)
					{
						if(tipoPregunta == "2" || tipoPregunta == "4")
						{
							$("#respuesta"+numeroPregunta+"opcion"+idOpcion).attr('checked', true);
							validarRespuestas();
						}

						if(tipoPregunta == "3" || tipoPregunta == "5")
						{
							$("#respuesta"+numeroPregunta+"opcion"+idOpcion).attr('checked', true);
							validarRespuestas();
						}
					}
				}
			}
			else
			{
				console.log('No hay opciones');
			}
		});
	});
}

function cargarNumeroPreguntaSinTerminar()
{
	var totalPreguntas = document.getElementById("totalPreguntas").value;
	var numeroPregunta = document.getElementById("numeroPregunta").value;
	var num = parseInt(numeroPregunta);
	document.getElementById("numeroPregunta").value = num;
	console.log(num);
	$("#preguntas ul li").hide();
	$("#preguntas ul #pregunta"+num).show();
	$("#preguntas ul #pregunta"+num+" li").show();

	$("#btnGuardarCat").attr("disabled","disabled");

	validarRespuestas();
}


/*--------------------------EDITAR ENCUESTA---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

function funcionInicialEditar(numero,numeroFotosEditar)
{
	console.log('lanzado desde CatastroUsuarios-Editar');
	var numeroEncuesta = parseInt(numero);
	document.getElementById("numeroEncuesta").value=numeroEncuesta;
	document.getElementById("numeroPregunta").value=1;
	document.getElementById("numeroFotosEditar").value=numeroFotosEditar;
	console.log(numeroFotosEditar);
	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM ProyectoCatastro ",[],                
		function(tx, result)
		{
			for (var i = 0; i < result.rows.length; i++) 
			{
				var totalPreguntasEditar = result.rows.length;
				var idPregunta = result.rows.item(i)['IdPregunta'];
				var tipoPregunta = result.rows.item(i)['TipoPregunta'];
				var textoPregunta = result.rows.item(i)['TextoPregunta'];
				var textoAyuda = result.rows.item(i)['TextoAyuda'];
				var idEntorno = result.rows.item(i)['IdEntorno'];
				var validacionTamano = result.rows.item(i)['ValidacionTamano'];
				var tamanoMinimo = result.rows.item(i)['TamanoMinimo'];
				var tamanoMaximo = result.rows.item(i)['TamanoMaximo'];
				var validacionTipoCaracter = result.rows.item(i)['ValidacionTipoCaracter'];
				var tipoCaracter = result.rows.item(i)['TipoCaracter'];
				var validacionTabla = result.rows.item(i)['ValidacionTabla'];
				var nombreTabla = result.rows.item(i)['NombreTabla'];
				var control = result.rows.item(i)['Control'];

				document.getElementById("totalPreguntasEditar").value = totalPreguntasEditar;

				if(textoAyuda != '')
				{
					$("#listaPreguntasEditar").append('<li id="pregunta'+idPregunta+'"><p class="encuestaNumero" style="font-size: 1.5em; text-align:center; color:#ef473a; font-weight:bold;"></p><br><br><p style="font-size:1em; color:#ef473a; font-weight:bold;">PREGUNTA '+ idPregunta +' de '+ totalPreguntasEditar +'</p><div style="border:1.5px solid black; padding:1.2em"><div class="row"><div class"col col-20"><i class="icon ion-help-circled" style="color:#ef473a; text-align:center; font-size:3em; vertical-align:bottom;"></i></div><div class="col col-80"><p style="font-size:1.2em; text-align:justify; color:black; font-weight:bold;">'+ textoPregunta +'</p></div></div><p style="font-size:0.8em; text-align:center;">(Ayuda: '+textoAyuda+')</p><div id="respuestas'+ idPregunta +'" class="list"></div></div></li>');
				}

				else
				{
					$("#listaPreguntasEditar").append('<li id="pregunta'+idPregunta+'"><p class="encuestaNumero" style="font-size: 1.5em; text-align:center; color:#ef473a; font-weight:bold;"></p><br><br><p style="font-size:1em; color:#ef473a; font-weight:bold;">PREGUNTA '+ idPregunta +' de '+ totalPreguntasEditar +'</p><div style="border:1.5px solid black; padding:1.2em"><div class="row"><div class"col col-20"><i class="icon ion-help-circled" style="color:#ef473a; text-align:center; font-size:3em; vertical-align:bottom;"></i></div><div class="col col-80"><p style="font-size:1.2em; text-align:justify; color:black; font-weight:bold;">'+ textoPregunta +'</p></div></div><div id="respuestas'+ idPregunta +'" class="list"></div></div></li>');
				}
				
				cargarRespuestasEditar(idPregunta,idEntorno,tipoPregunta,textoAyuda,validacionTamano,tamanoMinimo,tamanoMaximo,validacionTipoCaracter,tipoCaracter,validacionTabla,nombreTabla);
			}
			$(".encuestaNumero").append("ENCUESTA No. "+numeroEncuesta);
			$("#preguntasEditar ul li").hide();
			$("#preguntasEditar ul #pregunta1").show();
			$("#preguntasEditar ul #pregunta1"+" li").show();
			$("#btnSigEditar").attr("disabled","disabled");
			$("#btnGuardarEditar").attr("disabled","disabled");
			$("#btnAntEditar").attr("disabled","disabled");
		});
	});
	validarRespuestasEditar();
}

function cargarRespuestasEditar(numero,entorno,tipo,ayuda,valtamano,tamanomin,tamanomax,valtipocaracter,tipocaracter,validaciontab,nombretab)
{
	var numeroPregunta = parseInt(numero);
	var tipoPregunta = parseInt(tipo);
	var idEntorno = parseInt(entorno);
	var textoAyuda = ayuda;
	var validacionTamano = valtamano;
	var tamanoMinimo = parseInt(tamanomin);
	var tamanoMaximo = parseInt(tamanomax);
	var validacionTipoCaracter = valtipocaracter;
	var tipoCaracter = tipocaracter;
	var validacionTabla = validaciontab;
	var nombreTabla = nombretab;
	var numeroEncuesta = document.getElementById("numeroEncuesta").value;

	dbShell.transaction(function(tx)
	{
		tx.executeSql("SELECT * FROM OpcionesCatastro WHERE idEntorno=?",[idEntorno],
		function(tx,result)
		{
			for (var i = 0; i < result.rows.length; i++) 
			{
				var idOpcion = result.rows.item(i)['IdOpcion'];
				var etiquetaOpcion = result.rows.item(i)['EtiquetaOpcion'];
				var textoOpcionBD = result.rows.item(i)['TextoOpcion'];
				var textoOpcion = "";

				if(textoOpcionBD != "Escriba la respuesta")
				{
					textoOpcion = "Escriba la respuesta";
				}

				else
				{
					textoOpcion = textoOpcionBD;
				}

				if(tipoPregunta == "2")
				{
					$("#respuestas"+numeroPregunta).append('<label class="item item-radio" style:"font-size:0.7em;"><input type="radio" value="'+idOpcion+'" id="respuesta'+numeroPregunta+'opcion'+idOpcion+'" onchange="validarRespuestasEditar()" name="opcionPregunta'+numeroPregunta+'"  style="border:1px solid black;"><div class="item-content">'+etiquetaOpcion+'. '+textoOpcionBD+'</div><i class="radio-icon ion-checkmark"></i></label>');

					mostrarRespuestaNumeroEditar(numeroEncuesta,numeroPregunta,tipoPregunta,idOpcion);
				}

				if(tipoPregunta == "3")
				{
					$("#respuestas"+numeroPregunta).append('<li class="item item-checkbox"><label class="checkbox"><input id="respuesta'+numeroPregunta+'opcion'+idOpcion+'" type="checkbox" onchange="validarRespuestasEditar()" value="'+idOpcion+'" name="opcionPregunta'+numeroPregunta+'" style="border:1px solid black;"></label>'+etiquetaOpcion+'. '+textoOpcionBD+'</li>');
					mostrarRespuestaNumeroEditar(numeroEncuesta,numeroPregunta,tipoPregunta,idOpcion);
				}

				if(tipoPregunta == "4")
				{
					$("#respuestas"+numeroPregunta).append('<label class="item item-radio" style:"font-size:0.7em;"><input type="radio" value="'+idOpcion+'" id="respuesta'+numeroPregunta+'opcion'+idOpcion+'" onchange="validarRespuestasEditar()" name="opcionPregunta'+numeroPregunta+'"  style="border:1px solid black;"><div class="item-content">'+etiquetaOpcion+'. '+textoOpcionBD+'</div><i class="radio-icon ion-checkmark"></i></label>');
					mostrarRespuestaNumeroEditar(numeroEncuesta,numeroPregunta,tipoPregunta,idOpcion);
				}

				if(tipoPregunta == "5")
				{
					$("#respuestas"+numeroPregunta).append('<li class="item item-checkbox"><label class="checkbox"><input id="respuesta'+numeroPregunta+'opcion'+idOpcion+'" type="checkbox" onchange="validarRespuestasEditar()" value="'+idOpcion+'" name="opcionPregunta'+numeroPregunta+'" style="border:1px solid black;"></label>'+etiquetaOpcion+'. '+textoOpcionBD+'</li>');
					mostrarRespuestaNumeroEditar(numeroEncuesta,numeroPregunta,tipoPregunta,idOpcion);
				}

				if(tipoPregunta == "6")
				{
					
					$("#respuestas"+numeroPregunta).append('<input id="nombreTabla'+numeroPregunta+'" type="text" style="display:none;"><br><select id="select'+numeroPregunta+'" onchange="validarRespuestasEditar()" style="background:white; height:2em; width:100%; font-size:1.2em; font-weight:bold;"><option>Escoja una opción</option></select>');

					$("#nombreTabla"+numeroPregunta).val(nombreTabla);
					mostrarRespuestaTextoEditar(numeroEncuesta,numeroPregunta,tipoPregunta);
				}
			}

			if(tipoPregunta == "1")
			{
				if(tipocaracter == 	"n" || tipocaracter == 	"N")
				{
					if(validacionTamano == "TRUE" || validacionTamano == "true" || validacionTamano == "True" || validacionTamano == "1" || validacionTamano == "VERDADERO" || validacionTamano == "verdadero" || validacionTamano == "Verdadero" || validacionTamano == "si" || validacionTamano == "SI" || validacionTamano == "Si")
					{
						$("#respuestas"+numeroPregunta).append('<br><input id="respuestaAbierta'+numeroPregunta+'" type="number" onblur="validarRespuestasEditar()" placeholder="'+textoOpcion+'" style="width:100%; height: 6em; border-radius:10%; font-size:1em; padding:1em; font-weight:bold;">');
					}

					else
					{
						$("#respuestas"+numeroPregunta).append('<br><input id="respuestaAbierta'+numeroPregunta+'" type="number" onblur="validarRespuestasEditar()" placeholder="'+textoOpcion+'" style="width:100%; height: 6em; border-radius:10%; font-size:1em; padding:1em; font-weight:bold;">');
					}
				}

				else
				{
					if(validacionTamano == "TRUE" || validacionTamano == "true" || validacionTamano == "True" || validacionTamano == "1" || validacionTamano == "VERDADERO" || validacionTamano == "verdadero" || validacionTamano == "Verdadero" || validacionTamano == "si" || validacionTamano == "SI" || validacionTamano == "Si")
					{
						$("#respuestas"+numeroPregunta).append('<br><input id="respuestaAbierta'+numeroPregunta+'" type="text" placeholder="'+textoOpcion+'" onblur="validarRespuestasEditar()" placeholder="'+textoOpcion+'" style="width:100%; height: 6em; border-radius:10%; font-size:1em; padding:1em; font-weight:bold;">');
					}
					else
					{
						$("#respuestas"+numeroPregunta).append('<br><input id="respuestaAbierta'+numeroPregunta+'" type="text" placeholder="'+textoOpcion+'" onblur="validarRespuestasEditar()" placeholder="'+textoOpcion+'" style="width:100%; height: 6em; border-radius:10%; font-size:1em; padding:1em; font-weight:bold;">');
					}
				}
				mostrarRespuestaTextoEditar(numeroEncuesta,numeroPregunta,tipoPregunta);
			}

			if(tipoPregunta == "4")
			{
				$("#respuestas"+numeroPregunta).append('<br><input id="respuestaAbierta'+numeroPregunta+'" type="text" placeholder="'+textoOpcion+'" style="width:100%; height: 6em; border-radius:10%; font-size:1em; padding:1em; font-weight:bold;">');
				mostrarRespuestaTextoEditar(numeroEncuesta,numeroPregunta,tipoPregunta);
			}

			if(tipoPregunta == "5")
			{
				$("#respuestas"+numeroPregunta).append('<br><input id="respuestaAbierta'+numeroPregunta+'" type="text" placeholder="'+textoOpcion+'" style="width:100%; height: 6em; border-radius:10%; font-size:1em; padding:1em; font-weight:bold;">');
				mostrarRespuestaTextoEditar(numeroEncuesta,numeroPregunta,tipoPregunta);
			}
		});
	});
}

function validarRespuestasEditar()
{
	
	var numeroPregunta = document.getElementById("numeroPregunta").value;
	console.log(numeroPregunta);
	var numero = parseInt(numeroPregunta);
	var numeroEncuesta = document.getElementById("numeroEncuesta").value;
	var totalPreguntasEditar = parseInt(document.getElementById("totalPreguntasEditar").value);
	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM ProyectoCatastro WHERE IdPregunta=?",[numero],
		function(tx,result)
		{
			var tipoPregunta = result.rows.item(0)['TipoPregunta'];
			var idEntorno = result.rows.item(0)['IdEntorno'];
			var validacionTamano = result.rows.item(0)['ValidacionTamano'];
			var tamanoMinimo = result.rows.item(0)['TamanoMinimo'];
			var tamanoMaximo = result.rows.item(0)['TamanoMaximo'];
			var tipoCaracter = result.rows.item(0)['TipoCaracter'];
			var control = result.rows.item(0)['Control'];

			if(control == 1 || control == "1" || control == "2" || control == 2 || control == "")
			{
				if(tipoPregunta == 1 || tipoPregunta == "1")
				{
					var textoIngresado = $("#respuestaAbierta"+numero).val();
					console.log(textoIngresado);

					if(textoIngresado != "")
					{
						if(tipoCaracter == 	"n" || tipoCaracter == 	"N")
						{
							if(validacionTamano == "TRUE" || validacionTamano == "true" || validacionTamano == "True" || validacionTamano == "1" || validacionTamano == "VERDADERO" || validacionTamano == "verdadero" || validacionTamano == "Verdadero" || validacionTamano == "si" || validacionTamano == "SI" || validacionTamano == "Si")
							{
								if(textoIngresado.length < tamanoMinimo || textoIngresado.length > tamanoMaximo)
								{
									$("#btnSigEditar").attr("disabled","disabled");

									if(tamanoMaximo == tamanoMinimo)
									{
										$("#mensajeErrorEditar").text("La respuesta debe ser de "+tamanoMinimo+" caracteres");
									}

									if(tamanoMaximo != tamanoMinimo)
									{
										$("#mensajeErrorEditar").text("La respuesta debe tener mínimo "+tamanoMinimo+" caracteres y máximo "+tamanoMaximo+" caracteres");
									}
								}

								else
								{
									$("#mensajeErrorEditar").text("");
									if(numero == totalPreguntasEditar)
									{
										$("#btnSigEditar").attr("disabled","disabled");
										$("#btnGuardarEditar").removeAttr('disabled');
									}

									else
									{
										$("#btnSigEditar").removeAttr('disabled');
									}
								}
							}

							else
							{
								$("#mensajeErrorEditar").text("");
								if(numero == totalPreguntasEditar)
								{
									$("#btnSigEditar").attr("disabled","disabled");
									$("#btnGuardarEditar").removeAttr('disabled');
								}

								else
								{
									$("#btnSigEditar").removeAttr('disabled');
								}
							}
						}

						else
						{
							if(validacionTamano == "TRUE" || validacionTamano == "true" || validacionTamano == "True" || validacionTamano == "1" || validacionTamano == "VERDADERO" || validacionTamano == "verdadero" || validacionTamano == "Verdadero" || validacionTamano == "si" || validacionTamano == "SI" || validacionTamano == "Si")
							{
								if(textoIngresado.length < tamanoMinimo || textoIngresado.length > tamanoMaximo)
								{
									$("#btnSigEditar").attr("disabled","disabled");

									if(tamanoMaximo == tamanoMinimo)
									{
										$("#mensajeErrorEditar").text("La respuesta debe ser de "+tamanoMinimo+" caracteres");
									}

									if(tamanoMaximo != tamanoMinimo)
									{
										$("#mensajeErrorEditar").text("La respuesta debe tener mínimo "+tamanoMinimo+" caracteres y máximo "+tamanoMaximo+" caracteres");
									}
								}

								else
								{
									$("#mensajeErrorEditar").text("");
									if(numero == totalPreguntasEditar)
									{
										$("#btnSigEditar").attr("disabled","disabled");
										$("#btnGuardarEditar").removeAttr('disabled');
									}

									else
									{
										$("#btnSigEditar").removeAttr('disabled');
									}
								}
							}

							else
							{
								$("#mensajeErrorEditar").text("");
								if(numero == totalPreguntasEditar)
								{
									$("#btnSigEditar").attr("disabled","disabled");
									$("#btnGuardarEditar").removeAttr('disabled');
								}

								else
								{
									$("#btnSigEditar").removeAttr('disabled');
								}
							}
						}
					}


					if(textoIngresado == "")
					{
						$("#btnSigEditar").attr("disabled","disabled");
						$("#mensajeErrorEditar").text("Debe digitar la respuesta");
						$("#btnGuardarEditar").attr("disabled","disabled");
					}
				}

				if(tipoPregunta == 2 || tipoPregunta == "2")
				{
					var valor = $("input[name=opcionPregunta"+numero+"]:checked").val();
					console.log(valor);

					if(valor)
					{
						if(numero == totalPreguntasEditar)
						{
							$("#btnSigEditar").attr("disabled","disabled");
							$("#btnGuardarEditar").removeAttr('disabled');
						}

						else
						{
							$("#btnSigEditar").removeAttr('disabled');
						}
					}
				}

				if(tipoPregunta == 3 || tipoPregunta == "3")
				{
					var valor = $("input[name=opcionPregunta"+numero+"]").length;
					var valor2 = "";
					for (var i = 1; i <= valor; i++) 
					{
						 if($("#respuesta"+numero+"opcion"+i).is(":checked"))
						 {
						 	valor2 += $("#respuesta"+numero+"opcion"+i).val();
						 	console.log(valor2);

							$("#mensajeErrorEditar").text("");

							if(numero == totalPreguntasEditar)
							{
								$("#btnSigEditar").attr("disabled","disabled");
								$("#btnGuardarEditar").removeAttr('disabled');
							}

							else
							{
								$("#btnSigEditar").removeAttr('disabled');
							}
							
						 }

						 else if(valor2 == "")
						 {
						 	$("#btnSigEditar").attr("disabled","disabled");
						 	$("#btnGuardarEditar").attr("disabled","disabled");
						 	console.log("No hay selección");
						 }
					}
				}

				if(tipoPregunta == 4 || tipoPregunta == "4")
				{
					var valor = $("input[name=opcionPregunta"+numero+"]:checked").val();
					console.log(valor);

					if(valor)
					{
						if(numero == totalPreguntasEditar)
						{
							$("#btnSigEditar").attr("disabled","disabled");
							$("#btnGuardarEditar").removeAttr('disabled');
						}

						else
						{
							$("#btnSigEditar").removeAttr('disabled');
						}
					}

					else

					var textoIngresado2 = $("#respuestaAbierta"+numero).val();

				}

				if(tipoPregunta == 5 || tipoPregunta == "5")
				{
					var valor = $("input[name=opcionPregunta"+numero+"]").length;
					var valor2 = "";
					for (var i = 1; i <= valor; i++) 
					{
						 if($("#respuesta"+numero+"opcion"+i).is(":checked"))
						 {
						 	valor2 += $("#respuesta"+numero+"opcion"+i).val();
						 	console.log(valor2);

							$("#mensajeErrorEditar").text("");

							if(numero == totalPreguntasEditar)
							{
								$("#btnSigEditar").attr("disabled","disabled");
								$("#btnGuardarEditar").removeAttr('disabled');
							}

							else
							{
								$("#btnSigEditar").removeAttr('disabled');
							}
							
						 }

						 else if(valor2 == "")
						 {
						 	$("#btnSigEditar").attr("disabled","disabled");
						 	$("#btnGuardarEditar").attr("disabled","disabled");
						 	console.log("No hay selección");
						 }
					}

					var textoIngresado3 = $("#respuestaAbierta"+numero).val();
				}

				if(tipoPregunta == 6 || tipoPregunta == "6")
				{
					var opcionSelect = $("#select"+numero).val();
					if(opcionSelect == "Escoja una opción")
					{
						$("#mensajeErrorEditar").text("Escoja una opción en la lista desplegable");
						$("#btnGuardarEditar").attr("disabled","disabled");
					}
					else
					{
						console.log(opcionSelect);						
						$("#mensajeErrorEditar").text("");
						if(numero == totalPreguntasEditar)
						{
							$("#btnSigEditar").attr("disabled","disabled");
							$("#btnGuardarEditar").removeAttr('disabled');
						}

						else
						{
							$("#btnSigEditar").removeAttr('disabled');
						}
					}
				}
			}

			if(control == 0 || control == "0")
			{		
				$("#mensajeErrorEditar").text("");

				if(numero == totalPreguntasEditar)
				{
					$("#btnSigEditar").attr("disabled","disabled");
					$("#btnGuardarEditar").removeAttr('disabled');
				}

				else
				{
					$("#btnSigEditar").removeAttr('disabled');
				}
			}
		});
	});
}

function siguientePreguntaEditar()
{
	$("#btnAntEditar").removeAttr("disabled");
	$("#btnSigEditar").attr("disabled","disabled");

	var numeroPregunta = document.getElementById("numeroPregunta").value;

	var numero = parseInt(numeroPregunta) + 1;
	var totalPreguntasEditar = parseInt(document.getElementById("totalPreguntasEditar").value);

	var horaInicialEditar = document.getElementById("horaInicialEditar").value;
	var horaEditar = document.getElementById("horaEditar").value;

	if(horaInicialEditar == "")
	{
		document.getElementById("horaInicialEditar").value = horaEditar;
	}

	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM ProyectoCatastro WHERE IdPregunta=?",[numero],
		function(tx,result)
		{
			var control = result.rows.item(0)['Control'];
			var PreguntaDepende = result.rows.item(0)['PreguntaDepende'];
			var IdOpcionDepende = result.rows.item(0)['IdOpcionDepende'];
			if(control == 1 || control == "1" || control == 0 || control =="0")
			{
				$("#preguntasEditar ul li").hide();
				$("#preguntasEditar ul #pregunta"+numero).show();
				$("#preguntasEditar ul #pregunta"+numero+" li").show();
				document.getElementById("numeroPregunta").value = numero;

				var largoSelect = $("#select"+numero+" option").length;

				if(largoSelect <= 2)
				{
					borrarAuxiliarCatastroEditar();
				}

				validarRespuestasEditar();
			}

			if(control == 2 || control == "2")
			{
				validarControlDosSigEditar(PreguntaDepende,IdOpcionDepende,numero);
			}
		});
	});
}

function validarControlDosSigEditar(PreguntaDepende,IdOpcionDepende,numero)
{
	var idop = $("#idOperario").val();
	var idEncuesta = $("#numeroEncuesta").val();
	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM RespuestasCerradas WHERE IdOperario=? and IdEncuesta=? and IdPregunta=? ",[idop,idEncuesta,PreguntaDepende],
		function(tx,result)
		{
			if(result.rows.length > 0)
			{
				var IdOpcion = result.rows.item(0)['IdOpcion'];
				if(IdOpcion == IdOpcionDepende)
				{
					$("#preguntasEditar ul li").hide();
					$("#preguntasEditar ul #pregunta"+numero).show();
					$("#preguntasEditar ul #pregunta"+numero+" li").show();
					document.getElementById("numeroPregunta").value = numero;

					var largoSelect = $("#select"+numero+" option").length;

					if(largoSelect <= 2)
					{
						borrarAuxiliarCatastroEditar();
					}

					validarRespuestasEditar();
				}

				else
				{
					document.getElementById("numeroPregunta").value = numero+1;
					siguientePreguntaEditar();
				}
			}

			else
			{
				document.getElementById("numeroPregunta").value = numero+1;
				siguientePreguntaEditar();
			}
		});
	});
}

function anteriorPreguntaEditar()
{
	var numeroPregunta = document.getElementById("numeroPregunta").value;
	var numero = parseInt(numeroPregunta)-1;
	var totalPreguntasEditar = parseInt(document.getElementById("totalPreguntasEditar").value);
	$("#btnGuardarEditar").attr("disabled","disabled");

	if(numero == 1)
	{
		$("#btnAntEditar").attr("disabled","disabled");
	}

	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM ProyectoCatastro WHERE IdPregunta=?",[numero],
		function(tx,result)
		{
			var control = result.rows.item(0)['Control'];
			var PreguntaDepende = result.rows.item(0)['PreguntaDepende'];
			var IdOpcionDepende = result.rows.item(0)['IdOpcionDepende'];
			if(control == 1 || control == "1" || control == 0 || control =="0")
			{
				$("#preguntasEditar ul li").hide();
				$("#preguntasEditar ul #pregunta"+numero).show();
				$("#preguntasEditar ul #pregunta"+numero+" li").show();
				document.getElementById("numeroPregunta").value = numero;

				var largoSelect = $("#select"+numero+" option").length;

				if(largoSelect <= 2)
				{
					borrarAuxiliarCatastroEditar();
				}

				validarRespuestasEditar();
			}

			if(control == 2 || control == "2")
			{
				validarControlDosAntEditar(PreguntaDepende,IdOpcionDepende,numero);
			}
		});
	});
}

function validarControlDosAntEditar(PreguntaDepende,IdOpcionDepende,numero)
{
	var idop = $("#idOperario").val();
	var idEncuesta = $("#numeroEncuesta").val();
	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM RespuestasCerradas WHERE IdOperario=? and IdEncuesta=? and IdPregunta=? ",[idop,idEncuesta,PreguntaDepende],
		function(tx,result)
		{
			if(result.rows.length > 0)
			{
				var IdOpcion = result.rows.item(0)['IdOpcion'];
				if(IdOpcion == IdOpcionDepende)
				{
					$("#preguntasEditar ul li").hide();
					$("#preguntasEditar ul #pregunta"+numero).show();
					$("#preguntasEditar ul #pregunta"+numero+" li").show();
					document.getElementById("numeroPregunta").value = numero;

					var largoSelect = $("#select"+numero+" option").length;

					if(largoSelect <= 2)
					{
						borrarAuxiliarCatastroEditar();
					}

					validarRespuestasEditar();
				}

				else
				{
					document.getElementById("numeroPregunta").value = numero-1;
					anteriorPreguntaEditar();
				}
			}

			else
			{
				document.getElementById("numeroPregunta").value = numero-1;
				anteriorPreguntaEditar();
			}
		});
	});
}

function cargarAuxiliarCatastroEditar(entrada)
{	
	var reader=new FileReader();
	
	reader.onloadend=function(evento)
	{
		var AuxiliarCatastro=evento.target.result;
			
		dbShell.transaction(function(tx) 
		{   
			tx.executeSql("select Count(*) as Cantidad from Usuarios  ",[], 
			function(tx, result)
			{				
				var tipoArchivo = typeof result.rows.item(0)['Cantidad'];
				if(1 == 1)
				{
					var Control = AuxiliarCatastro.match(/\n/g);
					for(var i = 0; i < Control.length; i++)
					{						
						var UltimoDato = AuxiliarCatastro.indexOf('\n') // Se determina que ";" es salto de linea
						var Dato = AuxiliarCatastro.substring(0,UltimoDato);
						var SepararDato = Dato.split(","); // Se determina que cada dato a incluir en la BD se separa con ","
						
						tx.executeSql("Insert Into AuxiliarCatastro (Numero,Id, DescripcionId,Control) Values(?,?,?,?)",[
							i,
							SepararDato[0],
							SepararDato[1],
							0]);
						
						AuxiliarCatastro=AuxiliarCatastro.substring(UltimoDato+1,AuxiliarCatastro.length); 
						AuxiliarCatastroSubidos = i+1;
					}
					agruparRespuestasEditar();
				}
			});
		});
	};
	reader.readAsText(entrada);
}

// device APIs are available
//
function AuxiliarCatastroEditar() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSAuxiliarCatastroEditar, fail);
}

function gotFSAuxiliarCatastroEditar(fileSystem) {
	var numero = $("#numeroPregunta").val();
	var nombreTabla = $("#nombreTabla"+numero).val();
    fileSystem.root.getFile("AQuaMovil/Entradas/"+nombreTabla+".csv", null, gotFileEntryAuxiliarCatastroEditar, fail);
}

function gotFileEntryAuxiliarCatastroEditar(fileEntry) {
    fileEntry.file(gotFileAuxiliarCatastroEditar, fail);
}

function gotFileAuxiliarCatastroEditar(file){
    cargarAuxiliarCatastroEditar(file);
}

/*----------------------------------------------------------------------------------*/

//Función para borrar las causales de la base de datos

function borrarAuxiliarCatastroEditar()
{
	dbShell.transaction(function(tx)
	{
		tx.executeSql("Drop Table AuxiliarCatastro");
		CrearTablaAuxiliarCatastro();
		AuxiliarCatastroEditar();
	});
}

function agruparRespuestasEditar()
{
	var num = $("#numeroPregunta").val();
	var numeroPregunta = parseInt(num);
	var numeroEncuesta = document.getElementById("numeroEncuesta").value;
	var tipoPregunta = "6";
	dbShell.transaction(function(tx) 
	{            
		tx.executeSql("SELECT * FROM AuxiliarCatastro", [],                
		function(tx, result)
		{                
			for (var i = 0; i < result.rows.length; i++) 
			{
				var id = result.rows.item(i)['Id'];
				var descripcionId = result.rows.item(i)['DescripcionId'];

				$("#select"+numeroPregunta).append('<option value"'+id+'">'+id+' - '+descripcionId+'</option>');
			};
		});
	});
}

function mostrarRespuestaTextoEditar(numeroEncuesta,numeroPregunta,tipoPregunta)
{
	dbShell.transaction(function(tx)
	{
		tx.executeSql("SELECT * FROM RespuestasAbiertas WHERE IdEncuesta=? and IdPregunta=?",[numeroEncuesta,numeroPregunta],
		function(tx,result)
		{
			if(result.rows.length > 0)
			{
				var texto = result.rows.item(0)['TextoRespuesta'];
				if(tipoPregunta == "1" || tipoPregunta == "4" || tipoPregunta == "5")
				{
					$("#respuestaAbierta"+numeroPregunta).val(texto);
				}

				if(tipoPregunta == "6")
				{
					$("#select"+numeroPregunta).append("<option selected>"+texto+"</option>");
					validarRespuestasEditar();
				}
				
			}
			else
			{
				console.log("No hay respuesta para esta pregunta");
			}
			
		});
	});
}

function mostrarRespuestaNumeroEditar(numeroEncuesta,numeroPregunta,tipoPregunta,idOpcion)
{
	dbShell.transaction(function(tx)
	{
		tx.executeSql("SELECT * FROM RespuestasCerradas WHERE IdEncuesta=? and IdPregunta=?",[numeroEncuesta,numeroPregunta],
		function(tx,result)
		{
			if(result.rows.length > 0)
			{
				for (var i = 0; i < result.rows.length; i++) 
				{
					var opcion = result.rows.item(i)['IdOpcion'];
					if(idOpcion == opcion)
					{
						if(tipoPregunta == "2" || tipoPregunta == "4")
						{
							$("#respuesta"+numeroPregunta+"opcion"+idOpcion).attr('checked', true);
						}

						if(tipoPregunta == "3" || tipoPregunta == "5")
						{
							$("#respuesta"+numeroPregunta+"opcion"+idOpcion).attr('checked', true);
						}
					}
				}
			}
			else
			{
				console.log('No hay opciones');
			}
		});
	});
}

function guardarEncuestaEditada()
{	
	var idOperario = document.getElementById("idOperario").value; 
	var editado = "Si";
	var fechaEditar = document.getElementById("fechaEditar").value;
	var horaInicialEditar = document.getElementById("horaInicialEditar").value;
	var horaFinalEditar = document.getElementById("horaEditar").value;
	var numeroFotosEditar = document.getElementById("numeroFotosEditar").value;
	var numeroEncuesta = document.getElementById("numeroEncuesta").value;

	dbShell.transaction(function(tx) 
	{
		tx.executeSql("Update InformacionEncuesta set Editado=?,FechaEdicion=?,HoraInicialEdicion=?,HoraFinalEdicion=?,CantidadFotos=? where NumeroEncuesta=?",[editado,fechaEditar,horaInicialEditar,horaFinalEditar,numeroFotosEditar,numeroEncuesta],	
		function(tx, result)
		{
			console.log('encuesta editada guardada');				
		});

		tx.executeSql("Delete from RespuestasCerradas where IdOperario="+idOperario+" and IdEncuesta="+numeroEncuesta);
		tx.executeSql("Delete from RespuestasAbiertas where IdOperario="+idOperario+" and IdEncuesta="+numeroEncuesta);

		EnviarRespuestasEditadas();
		editarOtraEncuesta();
	});	
}

function editarOtraEncuesta()
{
	regresarAlMenuDesdeCatastroEditar();
	swal(
	{
		title: "Edición de Encuesta Finalizada",
		text: "¿Desea editar otra encuesta?",
		type: "info",
		showCancelButton: true,
		confirmButtonColor: "#0088C4",
		confirmButtonText: "Si",
		cancelButtonText: "No",
		closeOnConfirm: false,
		closeOnCancel: false
	},
		function(isConfirm)
		{
			if (isConfirm) 
			{
				swal({
					title: "Editar Encuesta",
					text: "Ingrese el número de encuesta a editar:",
					type: "input",
					showCancelButton: true,
					closeOnConfirm: false,
					animation: "pop",
					inputType: "number",
					inputPlaceholder: "Ej: 1" }, 
					function(inputValue)
					{   
						var numeroEncuestas;
						dbShell.transaction( function(tx) 
						{            
						    tx.executeSql("SELECT * FROM InformacionEncuesta where NumeroEncuesta=?",[inputValue],                
						    function(tx, result)
						    {  
						        numeroEncuestas = result.rows.length;
						        if (numeroEncuestas == 0) 
								{
									swal.showInputError("La encuesta número " + inputValue + " aún no se ha diligenciado");
									return false;
								}

								else
								{
									swal("Correcto", "Edición de encuesta: " + inputValue, "success");
									var CantidadFotos = result.rows.item(0)['CantidadFotos']
									window.location.href = "#/empezarnuevaencuesta";
									funcionInicialEditar(inputValue,CantidadFotos);
								}	
						    });    
						});

						if (inputValue === false) 
							return false;      
						if (inputValue === "") 
						{
							swal.showInputError("Debe escribir el número de la encuesta");
							return false;
						}
					});				
			}

			else 
			{
				swal({
				title: "Edición de Encuesta Finalizada",
				text: "Regresando al menú principal",
				type: "success",
				timer: 2000,
				showConfirmButton: false
				});
			} 
		});
}

function EnviarRespuestasEditadas()
{
	console.log("Hola");
	dbShell.transaction( function(tx) 
	{            
		tx.executeSql("SELECT * FROM ProyectoCatastro",[],
		function(tx,result)
		{
			for (var i = 0; i < result.rows.length; i++) 
			{
				var numero = i+1;
				var tipoPregunta = result.rows.item(i)['TipoPregunta'];
				var idEntorno = result.rows.item(i)['IdEntorno'];
				var validacionTamano = result.rows.item(i)['ValidacionTamano'];
				var tamanoMinimo = result.rows.item(i)['TamanoMinimo'];
				var tamanoMaximo = result.rows.item(i)['TamanoMaximo'];
				var tipoCaracter = result.rows.item(i)['TipoCaracter'];

				if(tipoPregunta == 1 || tipoPregunta == "1")
				{
					var textoIngresado = $("#respuestaAbierta"+numero).val();
					guardarRespuestaTextoEditado(numero,textoIngresado);
				}

				if(tipoPregunta == 2 || tipoPregunta == "2")
				{
					var valor = $("input[name=opcionPregunta"+numero+"]:checked").val();

					guardarRespuestaCerradaEditada(numero,valor);
				}

				if(tipoPregunta == 3 || tipoPregunta == "3")
				{
					var valor = $("input[name=opcionPregunta"+numero+"]").length;
					var valor2;
					for (var a = 1; a <= valor; a++) 
					{
						 if($("#respuesta"+numero+"opcion"+a).is(":checked"))
						 {
						 	valor2 = $("#respuesta"+numero+"opcion"+a).val();
						 	guardarRespuestaCerradaEditada(numero,valor2);
						 	console.log(valor2);
						 }
						 else
						 {
						 	valor2 = "";
						 	console.log(valor2);
						 }
					}
				}

				if(tipoPregunta == 4 || tipoPregunta == "4")
				{
					var valor = $("input[name=opcionPregunta"+numero+"]:checked").val();
					guardarRespuestaCerradaEditada(numero,valor);
					var textoIngresado4 = $("#respuestaAbierta"+numero).val();
					if(textoIngresado4.length >= 1)
					{
						guardarRespuestaTextoEditado(numero,textoIngresado4);
						console.log(textoIngresado4);
					}

					else
					{
						console.log(textoIngresado4);
					}
				}

				if(tipoPregunta == 5 || tipoPregunta == "5")
				{
					var valor = $("input[name=opcionPregunta"+numero+"]").length;
					var valor2;
					for (var b = 1; b <= valor; b++) 
					{
						 if($("#respuesta"+numero+"opcion"+b).is(":checked"))
						 {
						 	valor2 = $("#respuesta"+numero+"opcion"+b).val();
						 	guardarRespuestaCerradaEditada(numero,valor2);
						 }
						 else
						 {
						 	valor2 = "";
						 }
					}

					var textoIngresado5 = $("#respuestaAbierta"+numero).val();
					if(textoIngresado5.length >= 1)
					{
						guardarRespuestaTextoEditado(numero,textoIngresado);
						console.log(textoIngresado5);
					}

					else
					{
						console.log(textoIngresado5);
					}
				}

				if(tipoPregunta == 6 || tipoPregunta == "6")
				{
					var opcionSelect = $("#select"+numero).val();
					guardarRespuestaTextoEditado(numero,opcionSelect);
				}
			}	
		});
	});
}

function guardarRespuestaTextoEditado(numero,texto)
{
	var idOperario = document.getElementById("idOperario").value; 
	var idEncuesta = parseInt(document.getElementById("numeroEncuesta").value);
	var idPregunta = numero;
	var textoRespuesta = texto;
	var numeroControl = idEncuesta+""+numero;

	guardarRespuestaTextoEditadoEnBD(numeroControl,idOperario,idEncuesta,idPregunta,textoRespuesta);
}

function guardarRespuestaTextoEditadoEnBD(numeroControl,idOperario,idEncuesta,idPregunta,textoRespuesta)
{
	var numeroControl = parseInt(numeroControl);
	var idOperario = idOperario;
	var idEncuesta = idEncuesta;
	var idPregunta = idPregunta;
	var textoRespuesta = textoRespuesta;

	dbShell.transaction(function(tx) 
	{
		tx.executeSql("Insert Into RespuestasAbiertas (Numero, idOperario, IdEncuesta, IdPregunta, TextoRespuesta) Values(?,?,?,?,?)",[numeroControl,idOperario,idEncuesta,idPregunta,textoRespuesta]);
	});
	console.log("RA"+numeroControl);
}

function guardarRespuestaCerradaEditada(numero,texto)
{
	var idOperario = document.getElementById("idOperario").value; 
	var idEncuesta = parseInt(document.getElementById("numeroEncuesta").value);
	var idPregunta = numero;
	var textoRespuesta = texto;

	var numeroControl = idEncuesta+""+idPregunta+""+textoRespuesta;

	guardarRespuestaCerradaEditadaEnBD(numeroControl,idOperario,idEncuesta,idPregunta,textoRespuesta);
}

function guardarRespuestaCerradaEditadaEnBD(numeroControl,idOperario,idEncuesta,idPregunta,textoRespuesta)
{
	var numeroControl = numeroControl;
	var idOperario = idOperario;
	var idEncuesta = idEncuesta;
	var idPregunta = idPregunta;
	var textoRespuesta = textoRespuesta;

	dbShell.transaction(function(tx) 
	{
		tx.executeSql("Insert Into RespuestasCerradas (Numero, idOperario, IdEncuesta, IdPregunta, idOpcion) Values(?,?,?,?,?)",[numeroControl,idOperario,idEncuesta,idPregunta,textoRespuesta]);
	});
	console.log("RC"+numeroControl);
}


function regresarAlMenuDesdeCatastroEditar()
{
	window.location.href = "#/menuprincipal";
}
