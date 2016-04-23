function validarRespuestas()
{
	//
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
	        //

	        if(textoIngresado != "")
	        {
	          if(tipoCaracter ==  "n" || tipoCaracter ==  "N")
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
	        //

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
	            //

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
	            //
	           }
	        }
	      }

	      if(tipoPregunta == 4 || tipoPregunta == "4")
	      {
	        var valor = $("input[name=opcionPregunta"+numero+"]:checked").val();
	        //

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
	            //

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
	            //
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
	          //
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

function validarRespuestasEditar()
  {
    var numeroPregunta = document.getElementById("numeroPregunta").value;
    //
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
            //

            if(textoIngresado != "")
            {
              if(tipoCaracter ==  "n" || tipoCaracter ==  "N")
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
            //

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
                //

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
                //
               }
            }
          }

          if(tipoPregunta == 4 || tipoPregunta == "4")
          {
            var valor = $("input[name=opcionPregunta"+numero+"]:checked").val();
            //

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
                //

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
                //
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
              //
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
                	
                var CantidadFotos = result.rows.item(0)['CantidadFotos'];
                document.getElementById("numeroEncuestaParaEditar").value = inputValue;
                document.getElementById("cantidadFotosParaEditar").value = CantidadFotos;
                window.location.href = "#/empezarnuevaencuesta";
              } 
          });    
      });
    } 
  });
}