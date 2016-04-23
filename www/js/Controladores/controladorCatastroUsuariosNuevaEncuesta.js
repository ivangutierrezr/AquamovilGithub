angular.module('starter.controladorcatastrousuariosnuevaencuesta', [])

.controller('CatastroUsuariosnuevaencuesta', function($scope, $ionicLoading, $cordovaFile, $cordovaCamera)
{
  funcionInicialEditar();
  angular.element(document).ready(function () 
  {
      //
      $cordovaFile.checkFile(cordova.file.externalRootDirectory, "AQuaMovil/Entradas/LogoImpresion.png")
      .then(function (archivo) {
        //
        var ruta = archivo.nativeURL;
        $("#logoEmpresaESPNuevaEncuesta").attr('src', ruta);
        $("#logoEmpresaESPNuevaEncuesta").attr('width', "100%");
      }, function (error) {
      });
  });

  function funcionInicialEditar()
  {
    var numero = document.getElementById("numeroEncuestaParaEditar").value;
    var numeroFotosEditar = document.getElementById("cantidadFotosParaEditar").value ;
    //
    var numeroEncuesta = parseInt(numero);
    document.getElementById("numeroEncuesta").value=numeroEncuesta;
    document.getElementById("numeroPregunta").value=1;
    document.getElementById("numeroFotosEditar").value=numeroFotosEditar;
    //
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
          
          $scope.cargarRespuestasEditar(idPregunta,idEntorno,tipoPregunta,textoAyuda,validacionTamano,tamanoMinimo,tamanoMaximo,validacionTipoCaracter,tipoCaracter,validacionTabla,nombreTabla);
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

  $scope.cargarRespuestasEditar = function(numero,entorno,tipo,ayuda,valtamano,tamanomin,tamanomax,valtipocaracter,tipocaracter,validaciontab,nombretab)
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
            $("#respuestas"+numeroPregunta).append('<label class="item item-radio" style:"font-size:0.7em;"><input type="radio" value="'+idOpcion+'" id="respuesta'+numeroPregunta+'opcion'+idOpcion+'" onChange="validarRespuestasEditar()" name="opcionPregunta'+numeroPregunta+'"  style="border:1px solid black;"><div class="item-content">'+etiquetaOpcion+'. '+textoOpcionBD+'</div><i class="radio-icon ion-checkmark"></i></label>');

            $scope.mostrarRespuestaNumeroEditar(numeroEncuesta,numeroPregunta,tipoPregunta,idOpcion);
          }

          if(tipoPregunta == "3")
          {
            $("#respuestas"+numeroPregunta).append('<li class="item item-checkbox"><label class="checkbox"><input id="respuesta'+numeroPregunta+'opcion'+idOpcion+'" type="checkbox" onChange="validarRespuestasEditar()" value="'+idOpcion+'" name="opcionPregunta'+numeroPregunta+'" style="border:1px solid black;"></label>'+etiquetaOpcion+'. '+textoOpcionBD+'</li>');
            $scope.mostrarRespuestaNumeroEditar(numeroEncuesta,numeroPregunta,tipoPregunta,idOpcion);
          }

          if(tipoPregunta == "4")
          {
            $("#respuestas"+numeroPregunta).append('<label class="item item-radio" style:"font-size:0.7em;"><input type="radio" value="'+idOpcion+'" id="respuesta'+numeroPregunta+'opcion'+idOpcion+'" onChange="validarRespuestasEditar()" name="opcionPregunta'+numeroPregunta+'"  style="border:1px solid black;"><div class="item-content">'+etiquetaOpcion+'. '+textoOpcionBD+'</div><i class="radio-icon ion-checkmark"></i></label>');
            $scope.mostrarRespuestaNumeroEditar(numeroEncuesta,numeroPregunta,tipoPregunta,idOpcion);
          }

          if(tipoPregunta == "5")
          {
            $("#respuestas"+numeroPregunta).append('<li class="item item-checkbox"><label class="checkbox"><input id="respuesta'+numeroPregunta+'opcion'+idOpcion+'" type="checkbox" onChange="validarRespuestasEditar()" value="'+idOpcion+'" name="opcionPregunta'+numeroPregunta+'" style="border:1px solid black;"></label>'+etiquetaOpcion+'. '+textoOpcionBD+'</li>');
            $scope.mostrarRespuestaNumeroEditar(numeroEncuesta,numeroPregunta,tipoPregunta,idOpcion);
          }

          if(tipoPregunta == "6")
          {
            
            $("#respuestas"+numeroPregunta).append('<input id="nombreTabla'+numeroPregunta+'" type="text" style="display:none;"><br><select id="select'+numeroPregunta+'" onChange="validarRespuestasEditar()" style="background:white; height:2em; width:100%; font-size:1.2em; font-weight:bold;"><option>Escoja una opción</option></select>');

            $("#nombreTabla"+numeroPregunta).val(nombreTabla);
            $scope.mostrarRespuestaTextoEditar(numeroEncuesta,numeroPregunta,tipoPregunta);
          }
        }

        if(tipoPregunta == "1")
        {
          if(tipocaracter ==  "n" || tipocaracter ==  "N")
          {
            if(validacionTamano == "TRUE" || validacionTamano == "true" || validacionTamano == "True" || validacionTamano == "1" || validacionTamano == "VERDADERO" || validacionTamano == "verdadero" || validacionTamano == "Verdadero" || validacionTamano == "si" || validacionTamano == "SI" || validacionTamano == "Si")
            {
              $("#respuestas"+numeroPregunta).append('<br><input id="respuestaAbierta'+numeroPregunta+'" type="number" onChange="validarRespuestasEditar()" placeholder="'+textoOpcion+'" style="width:100%; height: 6em; border-radius:10%; font-size:1em; padding:1em; font-weight:bold;">');
            }

            else
            {
              $("#respuestas"+numeroPregunta).append('<br><input id="respuestaAbierta'+numeroPregunta+'" type="number" onChange="validarRespuestasEditar()" placeholder="'+textoOpcion+'" style="width:100%; height: 6em; border-radius:10%; font-size:1em; padding:1em; font-weight:bold;">');
            }
          }

          else
          {
            if(validacionTamano == "TRUE" || validacionTamano == "true" || validacionTamano == "True" || validacionTamano == "1" || validacionTamano == "VERDADERO" || validacionTamano == "verdadero" || validacionTamano == "Verdadero" || validacionTamano == "si" || validacionTamano == "SI" || validacionTamano == "Si")
            {
              $("#respuestas"+numeroPregunta).append('<br><input id="respuestaAbierta'+numeroPregunta+'" type="text" placeholder="'+textoOpcion+'" onChange="validarRespuestasEditar()" placeholder="'+textoOpcion+'" style="width:100%; height: 6em; border-radius:10%; font-size:1em; padding:1em; font-weight:bold;">');
            }
            else
            {
              $("#respuestas"+numeroPregunta).append('<br><input id="respuestaAbierta'+numeroPregunta+'" type="text" placeholder="'+textoOpcion+'" onChange="validarRespuestasEditar()" placeholder="'+textoOpcion+'" style="width:100%; height: 6em; border-radius:10%; font-size:1em; padding:1em; font-weight:bold;">');
            }
          }
          $scope.mostrarRespuestaTextoEditar(numeroEncuesta,numeroPregunta,tipoPregunta);
        }

        if(tipoPregunta == "4")
        {
          $("#respuestas"+numeroPregunta).append('<br><input id="respuestaAbierta'+numeroPregunta+'" type="text" placeholder="'+textoOpcion+'" style="width:100%; height: 6em; border-radius:10%; font-size:1em; padding:1em; font-weight:bold;">');
          $scope.mostrarRespuestaTextoEditar(numeroEncuesta,numeroPregunta,tipoPregunta);
        }

        if(tipoPregunta == "5")
        {
          $("#respuestas"+numeroPregunta).append('<br><input id="respuestaAbierta'+numeroPregunta+'" type="text" placeholder="'+textoOpcion+'" style="width:100%; height: 6em; border-radius:10%; font-size:1em; padding:1em; font-weight:bold;">');
          $scope.mostrarRespuestaTextoEditar(numeroEncuesta,numeroPregunta,tipoPregunta);
        }
      });
    });
  }

  $scope.siguientePreguntaEditar = function()
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
            $scope.borrarAuxiliarCatastroEditar();
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
              $scope.borrarAuxiliarCatastroEditar();
            }

            validarRespuestasEditar();
          }

          else
          {
            document.getElementById("numeroPregunta").value = numero+1;
            $scope.siguientePreguntaEditar();
          }
        }

        else
        {
          document.getElementById("numeroPregunta").value = numero+1;
          $scope.siguientePreguntaEditar();
        }
      });
    });
  }

  $scope.anteriorPreguntaEditar = function()
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
            $scope.borrarAuxiliarCatastroEditar();
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
              $scope.borrarAuxiliarCatastroEditar();
            }

            validarRespuestasEditar();
          }

          else
          {
            document.getElementById("numeroPregunta").value = numero-1;
            $scope.anteriorPreguntaEditar();
          }
        }

        else
        {
          document.getElementById("numeroPregunta").value = numero-1;
          $scope.anteriorPreguntaEditar();
        }
      });
    });
  }

  /*----------------------------------------------------------------------------------*/

  //Función para borrar las causales de la base de datos

  $scope.borrarAuxiliarCatastroEditar = function()
  {
    dbShell.transaction(function(tx)
    {
      tx.executeSql("Drop Table AuxiliarCatastro");
      CrearTablaAuxiliarCatastro();
      $scope.AuxiliarCatastroEditar();
    });
  }

  $scope.AuxiliarCatastroEditar =  function() 
  {
    var numero = $("#numeroPregunta").val();
    var nombreTabla = $("#nombreTabla"+numero).val();
    $cordovaFile.checkFile(cordova.file.externalRootDirectory, "AQuaMovil/Entradas/"+nombreTabla+".csv")
      .then(function (archivo) {
        //
        $cordovaFile.readAsText(cordova.file.externalRootDirectory, "AQuaMovil/Entradas/"+nombreTabla+".csv")
        .then(function (archivo) {
          var AuxiliarCatastro = archivo;
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
                $scope.agruparRespuestasEditar();
              }
            });
          });
        }, function (error) {
          //
        });

      }, function (error) {
        //
      });
  }  

  $scope.agruparRespuestasEditar = function()
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

  $scope.mostrarRespuestaTextoEditar = function(numeroEncuesta,numeroPregunta,tipoPregunta)
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
          //
        }
        
      });
    });
  }

  $scope.mostrarRespuestaNumeroEditar = function(numeroEncuesta,numeroPregunta,tipoPregunta,idOpcion)
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
          //
        }
      });
    });
  }

  $scope.guardarEncuestaEditada = function()
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
        //
      });

      tx.executeSql("Delete from RespuestasCerradas where IdOperario="+idOperario+" and IdEncuesta="+numeroEncuesta);
      tx.executeSql("Delete from RespuestasAbiertas where IdOperario="+idOperario+" and IdEncuesta="+numeroEncuesta);

      $scope.EnviarRespuestasEditadas();
      $scope.editarOtraEncuesta();
    }); 
  }

  $scope.editarOtraEncuesta = function()
  {
    $scope.regresarAlMenuDesdeCatastroEditar();
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
                    document.getElementById("numeroEncuestaParaEditar").value = inputValue;
                    document.getElementById("cantidadFotosParaEditar").value = CantidadFotos;
                    window.location.href = "#/empezarnuevaencuesta";
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

  $scope.EnviarRespuestasEditadas = function()
  {
    //
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
            $scope.guardarRespuestaTextoEditado(numero,textoIngresado);
          }

          if(tipoPregunta == 2 || tipoPregunta == "2")
          {
            var valor = $("input[name=opcionPregunta"+numero+"]:checked").val();

            $scope.guardarRespuestaCerradaEditada(numero,valor);
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
                $scope.guardarRespuestaCerradaEditada(numero,valor2);
                //
               }
               else
               {
                valor2 = "";
                //
               }
            }
          }

          if(tipoPregunta == 4 || tipoPregunta == "4")
          {
            var valor = $("input[name=opcionPregunta"+numero+"]:checked").val();
            $scope.guardarRespuestaCerradaEditada(numero,valor);
            var textoIngresado4 = $("#respuestaAbierta"+numero).val();
            if(textoIngresado4.length >= 1)
            {
              $scope.guardarRespuestaTextoEditado(numero,textoIngresado4);
              //
            }

            else
            {
              //
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
                $scope.guardarRespuestaCerradaEditada(numero,valor2);
               }
               else
               {
                valor2 = "";
               }
            }

            var textoIngresado5 = $("#respuestaAbierta"+numero).val();
            if(textoIngresado5.length >= 1)
            {
              $scope.guardarRespuestaTextoEditado(numero,textoIngresado);
              //
            }

            else
            {
              //
            }
          }

          if(tipoPregunta == 6 || tipoPregunta == "6")
          {
            var opcionSelect = $("#select"+numero).val();
            $scope.guardarRespuestaTextoEditado(numero,opcionSelect);
          }
        } 
      });
    });
  }

  $scope.guardarRespuestaTextoEditado = function(numero,texto)
  {
    var idOperario = document.getElementById("idOperario").value; 
    var idEncuesta = parseInt(document.getElementById("numeroEncuesta").value);
    var idPregunta = numero;
    var textoRespuesta = texto;
    var numeroControl = idEncuesta+""+numero;

    $scope.guardarRespuestaTextoEditadoEnBD(numeroControl,idOperario,idEncuesta,idPregunta,textoRespuesta);
  }

  $scope.guardarRespuestaTextoEditadoEnBD = function(numeroControl,idOperario,idEncuesta,idPregunta,textoRespuesta)
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
    //
  }

  $scope.guardarRespuestaCerradaEditada = function(numero,texto)
  {
    var idOperario = document.getElementById("idOperario").value; 
    var idEncuesta = parseInt(document.getElementById("numeroEncuesta").value);
    var idPregunta = numero;
    var textoRespuesta = texto;

    var numeroControl = idEncuesta+""+idPregunta+""+textoRespuesta;

    $scope.guardarRespuestaCerradaEditadaEnBD(numeroControl,idOperario,idEncuesta,idPregunta,textoRespuesta);
  }

  $scope.guardarRespuestaCerradaEditadaEnBD = function(numeroControl,idOperario,idEncuesta,idPregunta,textoRespuesta)
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
    //
  }

  $scope.regresarAlMenuDesdeCatastroEditar = function()
  {
    window.location.href = "#/menuprincipal";
  }


    /*--------------------------------------------------------------------------------*/

  //Función para tomar foto de Catastro

  $scope.FotoCatastroEditar = function()
  {
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.JPEG,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    $cordovaCamera.getPicture(options).then(function(sourcePath)
    {
      var sourceDirectory = sourcePath.substring(0, sourcePath.lastIndexOf('/') + 1);
      var sourceFileName = sourcePath.substring(sourcePath.lastIndexOf('/') + 1, sourcePath.length);

      var ruta = cordova.file.externalRootDirectory + 'AQuaMovil/Salidas/Fotos';

      var idOperador = document.getElementById("idOperario").value;

        while (idOperador.length < 10)
        {
          idOperador = "0" + idOperador;
        }

        var numeroEncuesta = parseInt(document.getElementById("numeroEncuestaEditar").value) + "";

        var numeroFoto = (parseInt(document.getElementById("numeroFotosEditar").value) + 1);

        var consecutivoFoto = (parseInt(document.getElementById("numeroFotosEditar").value) + 1) + "";

        document.getElementById("numeroFotosEditar").value = numeroFoto;

        while(consecutivoFoto.length < 2)
        {
          consecutivoFoto = "0" + consecutivoFoto;
        }

        //new file name
        var newFileName = "FC-E" + numeroEncuesta + "" + idOperador + "" + consecutivoFoto + ".jpg";

      $cordovaFile.moveFile(sourceDirectory, sourceFileName, ruta, newFileName)
      .then(function(success) 
      {
        //
      }, 
      function(error) 
      {
        //
      });

    }, 
    function(err) 
    {
      //
    });
  }

  $scope.salirDeCatastroEditar = function()
  {
    swal(
    {
      title: "Atención",
      text: "¿Desea salir al menu principal?",
      type: "warning",
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
        $("#contenidoEditar #preguntasEditar #listaPreguntasEditar li").remove();
        document.getElementById("numeroFotosEditar").value = 0;
        document.getElementById("numeroEncuestaEditar").value = 0;
        document.getElementById("numeroPreguntaEditar").value = 0;
        document.getElementById("totalPreguntasEditar").value = 0;
        swal({
        title: "Correcto",
        text: "Regresando al menu principal",
        type: "success",
        timer: 2000,
        showConfirmButton: false
        });
        $scope.regresarAlMenuDesdeCatastroEditar();      
      }

      else 
      {
        swal({
        title: "Correcto",
        text: "Regresando a la encuesta",
        type: "success",
        timer: 2000,
        showConfirmButton: false
        });   
      } 
    });
  }
});