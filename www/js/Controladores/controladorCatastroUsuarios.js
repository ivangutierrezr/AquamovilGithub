angular.module('starter.controladorcatastrousuarios', [])

.controller('CatastroUsuarios', function($scope, $ionicLoading, $cordovaFile, $cordovaCamera)
{
  validarEncuestasIncompletas();
  angular.element(document).ready(function () 
  {
      console.log("Logo");
      $cordovaFile.checkFile(cordova.file.externalRootDirectory, "AQuaMovil/Entradas/LogoImpresion.png")
      .then(function (archivo) {
        console.log(archivo);
        var ruta = archivo.nativeURL;
        $("#logoEmpresaESPCatastro").attr('src', ruta);
        $("#logoEmpresaESPCatastro").attr('width', "100%");
      }, function (error) {
      });
  });

  $scope.salirDeCatastro = function()
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
        $("#contenidoCat #preguntas #listaPreguntas li").remove();
        document.getElementById("numeroFotosCat").value = 0;
        document.getElementById("longitudCat").value = "";
        document.getElementById("latitudCat").value = "";
        document.getElementById("altitudCat").value ="" ;
        document.getElementById("numeroEncuesta").value = 0;
        document.getElementById("numeroPregunta").value = 0;
        document.getElementById("totalPreguntas").value = 0;
        swal({
        title: "Correcto",
        text: "Regresando al menu principal",
        type: "success",
        timer: 2000,
        showConfirmButton: false
        });
        $scope.regresarAlMenuDesdeCatastro();
        
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

  function validarEncuestasIncompletas()
  {
    var idbd = document.getElementById("idOperario").value;
    dbShell.transaction(function(tx) 
    {            
      tx.executeSql("SELECT * FROM InformacionEncuesta WHERE IdOperario=?", [idbd],                
      function(tx, result)
      {
        if(result.rows.length > 0)
        {
          for (var i = 0; i < result.rows.length; i++) 
          {
            var HoraFinal = result.rows.item(i)['HoraFinal'];
            if(HoraFinal == "")
            {
              var numeroEncuesta = i+1;
              swal({
                title: "Atención",
                text: "La encuesta #"+numeroEncuesta+" no se ha terminado aún, ¿desea continuarla o descartarla?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#0088C4",
                confirmButtonText: "Descartar",
                cancelButtonText: "Continuar",
                closeOnConfirm: false,
                closeOnCancel: false 
              }, function(isConfirm){
                if (isConfirm) 
                {
                  $scope.eliminarEncuestaIncompleta(idbd,numeroEncuesta);
                } 
                else 
                {
                  var CantidadFotos = result.rows.item(0)['CantidadFotos'];
                  if(CantidadFotos == 0 || CantidadFotos == "")
                  {
                    CantidadFotos = 0;
                  }
                  console.log('Continuar encuesta');
                  swal("Correcto", "Continuar realización de encuesta #"+numeroEncuesta , "success");
                  $scope.funcionInicialEncuestaEmpezada(numeroEncuesta,CantidadFotos);
                } 
              });
            }

            if(i+1 == result.rows.length && HoraFinal != "")
            {
              console.log('Hizo esto');
              $scope.funcionInicial();
            }
            }
        }

        else
        {
          $scope.funcionInicial();
        }
      });
    });
  }

  $scope.eliminarEncuestaIncompleta = function(idbd,numeroEncuesta)
  {
    dbShell.transaction(function(tx) 
    {  
      tx.executeSql("Delete from InformacionEncuesta where IdOperario="+idbd+" and NumeroEncuesta="+numeroEncuesta);
      tx.executeSql("Delete from RespuestasCerradas where IdOperario="+idbd+" and IdEncuesta="+numeroEncuesta);
      tx.executeSql("Delete from RespuestasAbiertas where IdOperario="+idbd+" and IdEncuesta="+numeroEncuesta);

      swal("Correcto", "Encuesta #"+numeroEncuesta+" eliminada","success");

      $scope.funcionInicial();
    });
  }

  $scope.funcionInicial = function()
  {
    console.log("Entro a Catastro");
    $("#contenidoNuevaEncuestaDiv").hide();
    $("#contenidoCat").show();
    
    dbShell.transaction( function(tx) 
    {            
      tx.executeSql("SELECT * FROM ProyectoCatastro",[],                
      function(tx, result)
      {
        for (var i = 0; i < result.rows.length; i++) 
        {
          var totalPreguntas = result.rows.length;
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

          document.getElementById("totalPreguntas").value = totalPreguntas;

          if(textoAyuda != '')
          {
            $("#listaPreguntas").append('<li id="pregunta'+idPregunta+'"><p class="encuestaNumero" style="font-size: 1.5em; text-align:center; color:#ef473a; font-weight:bold;"></p><br><br><p style="font-size:1em; color:#ef473a; font-weight:bold;">PREGUNTA '+ idPregunta +' de '+ totalPreguntas +'</p><div style="border:1.5px solid black; padding:1.2em"><div class="row"><div class"col col-20"><i class="icon ion-help-circled" style="color:#ef473a; text-align:center; font-size:3em; vertical-align:bottom;"></i></div><div class="col col-80"><p style="font-size:1.2em; text-align:justify; color:black; font-weight:bold;">'+ textoPregunta +'</p></div></div><p style="font-size:0.8em; text-align:center;">(Ayuda: '+textoAyuda+')</p><div id="respuestas'+ idPregunta +'" class="list"></div></div></li>');
          }

          else
          {
            $("#listaPreguntas").append('<li id="pregunta'+idPregunta+'"><p class="encuestaNumero" style="font-size: 1.5em; text-align:center; color:#ef473a; font-weight:bold;"></p><br><br><p style="font-size:1em; color:#ef473a; font-weight:bold;">PREGUNTA '+ idPregunta +' de '+ totalPreguntas +'</p><div style="border:1.5px solid black; padding:1.2em"><div class="row"><div class"col col-20"><i class="icon ion-help-circled" style="color:#ef473a; text-align:center; font-size:3em; vertical-align:bottom;"></i></div><div class="col col-80"><p style="font-size:1.2em; text-align:justify; color:black; font-weight:bold;">'+ textoPregunta +'</p></div></div><div id="respuestas'+ idPregunta +'" class="list"></div></div></li>');
          }
          
          $scope.cargarRespuestas(idPregunta,idEntorno,tipoPregunta,textoAyuda,validacionTamano,tamanoMinimo,tamanoMaximo,validacionTipoCaracter,tipoCaracter,validacionTabla,nombreTabla);
        }
        
        document.getElementById("numeroPregunta").value = 1;
        document.getElementById("numeroFotosCat").value = 0;
        $("#preguntas ul li").hide();
        $("#preguntas ul #pregunta1").show();
        $("#preguntas ul #pregunta1"+" li").show();
        $("#btnSigCat").attr("disabled","disabled");
        $("#btnGuardarCat").attr("disabled","disabled");
        $("#btnAntCat").attr("disabled","disabled");
        $scope.cargarnumeroencuesta();
      });
    });
  }

  $scope.funcionInicialEncuestaEmpezada = function(numeroEncuesta,CantidadFotos)
  {
    console.log("Entro a Catastro Sin Terminar");
    $("#contenidoNuevaEncuestaDiv").hide();
    $("#contenidoCat").show();

    var numeroEncuesta = parseInt(numeroEncuesta);
    document.getElementById("numeroEncuesta").value=numeroEncuesta;
    document.getElementById("numeroFotosCat").value=CantidadFotos;
    console.log(CantidadFotos);
    
    dbShell.transaction( function(tx) 
    {            
      tx.executeSql("SELECT * FROM ProyectoCatastro",[],                
      function(tx, result)
      {
        for (var i = 0; i < result.rows.length; i++) 
        {
          var totalPreguntas = result.rows.length;
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

          document.getElementById("totalPreguntas").value = totalPreguntas;

          if(textoAyuda != '')
          {
            $("#listaPreguntas").append('<li id="pregunta'+idPregunta+'"><p class="encuestaNumero" style="font-size: 1.5em; text-align:center; color:#ef473a; font-weight:bold;"></p><br><br><p style="font-size:1em; color:#ef473a; font-weight:bold;">PREGUNTA '+ idPregunta +' de '+ totalPreguntas +'</p><div style="border:1.5px solid black; padding:1.2em"><div class="row"><div class"col col-20"><i class="icon ion-help-circled" style="color:#ef473a; text-align:center; font-size:3em; vertical-align:bottom;"></i></div><div class="col col-80"><p style="font-size:1.2em; text-align:justify; color:black; font-weight:bold;">'+ textoPregunta +'</p></div></div><p style="font-size:0.8em; text-align:center;">(Ayuda: '+textoAyuda+')</p><div id="respuestas'+ idPregunta +'" class="list"></div></div></li>');
          }

          else
          {
            $("#listaPreguntas").append('<li id="pregunta'+idPregunta+'"><p class="encuestaNumero" style="font-size: 1.5em; text-align:center; color:#ef473a; font-weight:bold;"></p><br><p style="font-size:1em; color:#ef473a; font-weight:bold;">PREGUNTA '+ idPregunta +' de '+ totalPreguntas +'</p><div style="border:1.5px solid black; padding:1.2em"><div class="row"><div class"col col-20"><i class="icon ion-help-circled" style="color:#ef473a; text-align:center; font-size:3em; vertical-align:bottom;"></i></div><div class="col col-80"><p style="font-size:1.2em; text-align:justify; color:black; font-weight:bold;">'+ textoPregunta +'</p></div></div><div id="respuestas'+ idPregunta +'" class="list"></div></div></li>');
          }
          
          $scope.cargarRespuestasSinTerminar(idPregunta,idEntorno,tipoPregunta,textoAyuda,validacionTamano,tamanoMinimo,tamanoMaximo,validacionTipoCaracter,tipoCaracter,validacionTabla,nombreTabla);
        }
        $(".encuestaNumero").append("ENCUESTA No. "+numeroEncuesta);
      });
    });
  }

  $scope.regresarAlMenuDesdeCatastro = function()
  {
    window.location.href = "#/menuprincipal";
  }

  $scope.cargarRespuestas = function(numero,entorno,tipo,ayuda,valtamano,tamanomin,tamanomax,valtipocaracter,tipocaracter,validaciontab,nombretab)
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
          if(tipocaracter ==  "n" || tipocaracter ==  "N")
          {
            if(validacionTamano == "TRUE" || validacionTamano == "true" || validacionTamano == "True" || validacionTamano == "1" || validacionTamano == "VERDADERO" || validacionTamano == "verdadero" || validacionTamano == "Verdadero" || validacionTamano == "si" || validacionTamano == "SI" || validacionTamano == "Si")
            {
              $("#respuestas"+numeroPregunta).append('<br><input id="respuestaAbierta'+numeroPregunta+'" type="number" onblur="validarRespuestas()" placeholder="'+textoOpcion+'" required style="width:100%; height: 6em; border-radius:10%; font-size:1em; padding:1em; font-weight:bold;">');
            }

            else
            {
              $("#respuestas"+numeroPregunta).append('<br><input id="respuestaAbierta'+numeroPregunta+'" type="number" onblur="validarRespuestas()" placeholder="'+textoOpcion+'" required style="width:100%; height: 6em; border-radius:10%; font-size:1em; padding:1em; font-weight:bold;">');
            }
          }

          else
          {
            if(validacionTamano == "TRUE" || validacionTamano == "true" || validacionTamano == "True" || validacionTamano == "1" || validacionTamano == "VERDADERO" || validacionTamano == "verdadero" || validacionTamano == "Verdadero" || validacionTamano == "si" || validacionTamano == "SI" || validacionTamano == "Si")
            {
              $("#respuestas"+numeroPregunta).append('<br><input id="respuestaAbierta'+numeroPregunta+'" type="text" placeholder="'+textoOpcion+'" onblur="validarRespuestas()" placeholder="'+textoOpcion+'" required style="width:100%; height: 6em; border-radius:10%; font-size:1em; padding:1em; font-weight:bold;">');
            }
            else
            {
              $("#respuestas"+numeroPregunta).append('<br><input id="respuestaAbierta'+numeroPregunta+'" type="text" placeholder="'+textoOpcion+'" onblur="validarRespuestas()" placeholder="'+textoOpcion+'" required style="width:100%; height: 6em; border-radius:10%; font-size:1em; padding:1em; font-weight:bold;">');
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

  $scope.cargarnumeroencuesta = function()
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

  $scope.EnviarRespuestas = function(idPregunta)
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
          $scope.guardarRespuestaTexto(numero,textoIngresado);
        }

        if(tipoPregunta == 2 || tipoPregunta == "2")
        {
          var valor = $("input[name=opcionPregunta"+numero+"]:checked").val();

          $scope.guardarRespuestaCerrada(numero,valor);
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
              $scope.guardarRespuestaCerrada(numero,valor2);
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
          $scope.guardarRespuestaCerrada(numero,valor);
          var textoIngresado4 = $("#respuestaAbierta"+numero).val();
          if(textoIngresado4.length >= 1)
          {
            $scope.guardarRespuestaTexto(numero,textoIngresado4);
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
              $scope.guardarRespuestaCerrada(numero,valor2);
             }
             else
             {
              valor2 = "";
             }
          }

          var textoIngresado5 = $("#respuestaAbierta"+numero).val();
          if(textoIngresado5.length >= 1)
          {
            $scope.guardarRespuestaTexto(numero,textoIngresado);
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
          $scope.guardarRespuestaTexto(numero,opcionSelect);
        }
      });
    });
  }

  $scope.guardarRespuestaTexto = function(numero,texto)
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
            $scope.guardarRespuestaTextoEnBD(numeroControl,idOperario,idEncuesta,idPregunta,textoRespuesta);
          }

          if(total == 0)
          {
            $scope.guardarRespuestaTextoEnBD(numeroControl,idOperario,idEncuesta,idPregunta,textoRespuesta);
          }
        });
      });
    } 
  }

  $scope.guardarRespuestaTextoEnBD = function(numeroControl,idOperario,idEncuesta,idPregunta,textoRespuesta)
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

  $scope.guardarRespuestaCerrada = function(numero,texto)
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
            $scope.guardarRespuestaCerradaEnBD(numeroControl,idOperario,idEncuesta,idPregunta,textoRespuesta);
          }

          if(total == 0)
          {
            $scope.guardarRespuestaCerradaEnBD(numeroControl,idOperario,idEncuesta,idPregunta,textoRespuesta);
          }
        });
      });
    }
  }

  $scope.guardarRespuestaCerradaEnBD = function(numeroControl,idOperario,idEncuesta,idPregunta,textoRespuesta)
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

  $scope.guardarEncuesta = function()
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
      $scope.EnviarRespuestas(numeroPregunta);
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
                $scope.mostrarNuevaPregunta();         
              });
          }); 
      });
    }
  }

  $scope.guardarEncuestaEmpezada = function()
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

  $scope.mostrarNuevaPregunta = function()
  {
    $("#contenidoCat").hide();
    $("#contenidoNuevaEncuestaDiv").show();
  }

  $scope.recargarCatastro = function()
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
    
    $scope.funcionInicial();
  }

  $scope.siguientePregunta = function()
  {
    var numeroPregunta = document.getElementById("numeroPregunta").value;
    $scope.EnviarRespuestas(numeroPregunta);
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
      $scope.guardarEncuestaEmpezada();
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
            $scope.borrarAuxiliarCatastro();
          }

          validarRespuestas();
        }

        if(control == 2 || control == "2")
        {
          $scope.validarControlDosSig(PreguntaDepende,IdOpcionDepende,numero);
        }
      });
    });
  }

  $scope.validarControlDosSig = function(PreguntaDepende,IdOpcionDepende,numero)
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
              $scope.borrarAuxiliarCatastro();
            }

            validarRespuestas();
          }

          else
          {
            document.getElementById("numeroPregunta").value = numero+1;
            $scope.siguientePregunta();
          }
        }

        else
        {
          document.getElementById("numeroPregunta").value = numero+1;
          $scope.siguientePregunta();
        }
      });
    });
  }

  $scope.anteriorPregunta = function()
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
            $scope.borrarAuxiliarCatastro();
          }

          validarRespuestas();
        }

        if(control == 2 || control == "2")
        {
          $scope.validarControlDosAnt(PreguntaDepende,IdOpcionDepende,numero);
        }
      });
    });
  }

  $scope.validarControlDosAnt = function(PreguntaDepende,IdOpcionDepende,numero)
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
              $scope.borrarAuxiliarCatastro();
            }

            validarRespuestas();
          }

          else
          {
            document.getElementById("numeroPregunta").value = numero-1;
            $scope.anteriorPregunta();
          }
        }

        else
        {
          document.getElementById("numeroPregunta").value = numero-1;
          $scope.anteriorPregunta();
        }
      });
    });
  }

  /*----------------------------------------------------------------------------------*/

  //Función para borrar las causales de la base de datos

  $scope.borrarAuxiliarCatastro = function()
  {
    dbShell.transaction(function(tx)
    {
      tx.executeSql("Drop Table AuxiliarCatastro");
      CrearTablaAuxiliarCatastro();
      AuxiliarCatastro();
    });
  }

  // device APIs are available
  //
  function AuxiliarCatastro() 
  {
    var numero = $("#numeroPregunta").val();
    var nombreTabla = $("#nombreTabla"+numero).val();
    $cordovaFile.checkFile(cordova.file.externalRootDirectory, "AQuaMovil/Entradas/"+nombreTabla+".csv")
      .then(function (archivo) {
        console.log(archivo);
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
                $scope.agruparRespuestas();
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

  $scope.agruparRespuestas = function()
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

  

  $scope.cargarRespuestasSinTerminar = function(numero,entorno,tipo,ayuda,valtamano,tamanomin,tamanomax,valtipocaracter,tipocaracter,validaciontab,nombretab)
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

            $scope.mostrarRespuestaNumeroSinTerminar(numeroEncuesta,numeroPregunta,tipoPregunta,idOpcion);
          }

          if(tipoPregunta == "3")
          {
            $("#respuestas"+numeroPregunta).append('<li class="item item-checkbox"><label class="checkbox"><input id="respuesta'+numeroPregunta+'opcion'+idOpcion+'" type="checkbox" onchange="validarRespuestas()" value="'+idOpcion+'" name="opcionPregunta'+numeroPregunta+'" style="border:1px solid black;"></label>'+etiquetaOpcion+'. '+textoOpcionBD+'</li>');
            $scope.mostrarRespuestaNumeroSinTerminar(numeroEncuesta,numeroPregunta,tipoPregunta,idOpcion);
          }

          if(tipoPregunta == "4")
          {
            $("#respuestas"+numeroPregunta).append('<label class="item item-radio" style:"font-size:0.7em;"><input type="radio" value="'+idOpcion+'" id="respuesta'+numeroPregunta+'opcion'+idOpcion+'" onchange="validarRespuestas()" name="opcionPregunta'+numeroPregunta+'"  style="border:1px solid black;"><div class="item-content">'+etiquetaOpcion+'. '+textoOpcionBD+'</div><i class="radio-icon ion-checkmark"></i></label>');
            $scope.mostrarRespuestaNumeroSinTerminar(numeroEncuesta,numeroPregunta,tipoPregunta,idOpcion);
          }

          if(tipoPregunta == "5")
          {
            $("#respuestas"+numeroPregunta).append('<li class="item item-checkbox"><label class="checkbox"><input id="respuesta'+numeroPregunta+'opcion'+idOpcion+'" type="checkbox" onchange="validarRespuestas()" value="'+idOpcion+'" name="opcionPregunta'+numeroPregunta+'" style="border:1px solid black;"></label>'+etiquetaOpcion+'. '+textoOpcionBD+'</li>');
            $scope.mostrarRespuestaNumeroSinTerminar(numeroEncuesta,numeroPregunta,tipoPregunta,idOpcion);
          }
        }

        if(tipoPregunta == "1")
        {
          if(tipocaracter ==  "n" || tipocaracter ==  "N")
          {
            if(validacionTamano == "TRUE" || validacionTamano == "true" || validacionTamano == "True" || validacionTamano == "1" || validacionTamano == "VERDADERO" || validacionTamano == "verdadero" || validacionTamano == "Verdadero" || validacionTamano == "si" || validacionTamano == "SI" || validacionTamano == "Si")
            {
              $("#respuestas"+numeroPregunta).append('<br><input id="respuestaAbierta'+numeroPregunta+'" type="number" onblur="validarRespuestas()" placeholder="'+textoOpcion+'" required style="width:100%; height: 6em; border-radius:10%; font-size:1em; padding:1em; font-weight:bold;">');
            }

            else
            {
              $("#respuestas"+numeroPregunta).append('<br><input id="respuestaAbierta'+numeroPregunta+'" type="number" onblur="validarRespuestas()" placeholder="'+textoOpcion+'" required style="width:100%; height: 6em; border-radius:10%; font-size:1em; padding:1em; font-weight:bold;">');
            }
          }

          else
          {
            if(validacionTamano == "TRUE" || validacionTamano == "true" || validacionTamano == "True" || validacionTamano == "1" || validacionTamano == "VERDADERO" || validacionTamano == "verdadero" || validacionTamano == "Verdadero" || validacionTamano == "si" || validacionTamano == "SI" || validacionTamano == "Si")
            {
              $("#respuestas"+numeroPregunta).append('<br><input id="respuestaAbierta'+numeroPregunta+'" type="text" placeholder="'+textoOpcion+'" onblur="validarRespuestas()" placeholder="'+textoOpcion+'" required style="width:100%; height: 6em; border-radius:10%; font-size:1em; padding:1em; font-weight:bold;">');
            }
            else
            {
              $("#respuestas"+numeroPregunta).append('<br><input id="respuestaAbierta'+numeroPregunta+'" type="text" placeholder="'+textoOpcion+'" onblur="validarRespuestas()" placeholder="'+textoOpcion+'" required style="width:100%; height: 6em; border-radius:10%; font-size:1em; padding:1em; font-weight:bold;">');
            }
          }

          $scope.mostrarRespuestaTextoSinTerminar(numeroEncuesta,numeroPregunta,tipoPregunta);
        }

        if(tipoPregunta == "4")
        {
          $("#respuestas"+numeroPregunta).append('<br><input id="respuestaAbierta'+numeroPregunta+'" type="text" placeholder="'+textoOpcion+'" required style="width:100%; height: 6em; border-radius:10%; font-size:1em; padding:1em; font-weight:bold;">');
          $scope.mostrarRespuestaTextoSinTerminar(numeroEncuesta,numeroPregunta,tipoPregunta);
        }

        if(tipoPregunta == "5")
        {
          $("#respuestas"+numeroPregunta).append('<br><input id="respuestaAbierta'+numeroPregunta+'" type="text" placeholder="'+textoOpcion+'" required style="width:100%; height: 6em; border-radius:10%; font-size:1em; padding:1em; font-weight:bold;">');
          $scope.mostrarRespuestaTextoSinTerminar(numeroEncuesta,numeroPregunta,tipoPregunta);
        }

        if(tipoPregunta == "6")
        {
          
          $("#respuestas"+numeroPregunta).append('<input id="nombreTabla'+numeroPregunta+'" type="text" style="display:none;"><br><select id="select'+numeroPregunta+'" onchange="validarRespuestas()" style="background:white; height:2em; width:100%; font-size:1.2em; font-weight:bold;"><option>Escoja una opción</option></select>');

          $("#nombreTabla"+numeroPregunta).val(nombreTabla);
          $scope.mostrarRespuestaTextoSinTerminar(numeroEncuesta,numeroPregunta,tipoPregunta);
        }
      });
    });
  }

  $scope.mostrarRespuestaTextoSinTerminar = function(numeroEncuesta,numeroPregunta,tipoPregunta)
  {
    dbShell.transaction(function(tx)
    {
      tx.executeSql("SELECT * FROM RespuestasAbiertas WHERE IdEncuesta=? and IdPregunta=?",[numeroEncuesta,numeroPregunta],
      function(tx,result)
      {
        if(result.rows.length > 0)
        {
          document.getElementById("numeroPregunta").value=numeroPregunta;
          $scope.cargarNumeroPreguntaSinTerminar();  
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

  $scope.mostrarRespuestaNumeroSinTerminar = function(numeroEncuesta,numeroPregunta,tipoPregunta,idOpcion)
  {
    dbShell.transaction(function(tx)
    {
      tx.executeSql("SELECT * FROM RespuestasCerradas WHERE IdEncuesta=? and IdPregunta=?",[numeroEncuesta,numeroPregunta],
      function(tx,result)
      {
        if(result.rows.length > 0)
        {
          document.getElementById("numeroPregunta").value=numeroPregunta;
          $scope.cargarNumeroPreguntaSinTerminar();
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

  $scope.cargarNumeroPreguntaSinTerminar = function()
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

 /*--------------------------------------------------------------------------------*/
  //Función para tomar foto de Catastro

  $scope.FotoCatastro = function()
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

        var numeroEncuesta = parseInt(document.getElementById("numeroEncuesta").value) + "";

        var numeroFoto = (parseInt(document.getElementById("numeroFotosCat").value) + 1);

        var consecutivoFoto = (parseInt(document.getElementById("numeroFotosCat").value) + 1) + "";

        document.getElementById("numeroFotosCat").value = numeroFoto;

        while(consecutivoFoto.length < 2)
        {
          consecutivoFoto = "0" + consecutivoFoto;
        }

        //new file name
        var newFileName = "FC" + numeroEncuesta + "" + idOperador + "" + consecutivoFoto + ".jpg";

      $cordovaFile.moveFile(sourceDirectory, sourceFileName, ruta, newFileName)
      .then(function(success) 
      {
        console.log("Imagen Guardada");
      }, 
      function(error) 
      {
        console.log(error);
      });

    }, 
    function(err) 
    {
      console.log(err);
    });
  }
});