//Definición de las vistas de página
var app = angular.module('starter', ['ionic', 'ngCordova', 'starter.controladorcicloruta', 'starter.controladorestadolecturas', 'starter.controladorcausales', 'starter.controladorobservacionuno', 'starter.controladorobservaciondos', 'starter.controladorobservaciontres', 'starter.controladorobservacionunocargue', 'starter.controladorobservaciondoscargue', 'starter.controladorobservaciontrescargue', 'starter.controladorciclorutafacturacion', 'starter.controladorcargainicial', 'starter.controladordacturacionensitio', 'starter.controladorcatastrousuarios', 'starter.controladorcatastrousuariosnuevaencuesta', 'starter.controladormapa'])

.config(function($stateProvider, $urlRouterProvider)
{
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html'
    })

    .state('cargausuarios', {
      url: '/cargausuarios',
      templateUrl: 'templates/cargausuarios.html',
      controller: 'Cargainicial'
    })

    .state('menuprincipal', {
      url: '/menuprincipal',
      templateUrl: 'templates/menuprincipal.html'
    })

    .state('cargaarchivos', {
      url: '/cargaarchivos',
      templateUrl: 'templates/cargaarchivos.html',
      controller: 'Cargainicial'
    })

    .state('informacion', {
      url: '/informacion',
      templateUrl: 'templates/informacion.html'
    })

    .state('reporte', {
      url: '/reporte',
      templateUrl: 'templates/usuariosservicios/reporte.html'
    })

    .state('cicloruta', {
      url: '/cicloruta',
      templateUrl: 'templates/usuariosservicios/cicloruta.html',
      controller: 'Cicloruta'
    })

    .state('estadolecturas', {
      url: '/estadolecturas',
      templateUrl: 'templates/usuariosservicios/estadolecturas.html',
      controller: 'Estadolecturas'
    })

    .state('medidorlecturas', {
      url: '/medidorlecturas',
      templateUrl: 'templates/usuariosservicios/medidorlecturas.html',
      controller: 'Estadolecturas'
    })

    .state('causales', {
      url: '/causales',
      templateUrl: 'templates/usuariosservicios/causales.html',
      controller: 'Causales'
    })

    .state('observacionuno', {
      url: '/observacionuno',
      templateUrl: 'templates/usuariosservicios/observacionuno.html',
      controller: 'Observacionuno'
    })

    .state('observaciondos', {
      url: '/observaciondos',
      templateUrl: 'templates/usuariosservicios/observaciondos.html',
      controller: 'Observacionuno'
    })

    .state('observaciontres', {
      url: '/observaciontres',
      templateUrl: 'templates/usuariosservicios/observaciontres.html',
      controller: 'Observacionuno'
    })

    .state('observacionunocargue', {
      url: '/observacionunocargue',
      templateUrl: 'templates/usuariosservicios/observacionunocargue.html',
      controller: 'Observacionuno'
    })

    .state('observaciondoscargue', {
      url: '/observaciondoscargue',
      templateUrl: 'templates/usuariosservicios/observaciondoscargue.html',
      controller: 'Observacionuno'
    })

    .state('observaciontrescargue', {
      url: '/observaciontrescargue',
      templateUrl: 'templates/usuariosservicios/observaciontrescargue.html',
      controller: 'Observacionuno'
    })

    .state('Ciclorutafacturacion', {
      url: '/Ciclorutafacturacion',
      templateUrl: 'templates/facturacionensitio/ciclorutafacturacion.html',
      controller: 'Ciclorutafacturacion'
    })

    .state('facturacionensitio', {
      url: '/facturacionensitio',
      templateUrl: 'templates/facturacionensitio/facturacionensitio.html',
      controller: 'Facturacionensitio'
    })

    .state('mapa', {
      url: '/mapa',
      templateUrl: 'templates/mapa.html',
      controller: 'ControladorMapa'
    })
    
    .state('catastrousuarios', {
      url: '/catastrousuarios',
      templateUrl: 'templates/catastrousuarios/catastrousuarios.html',
      controller: 'CatastroUsuarios'
    })

    .state('empezarnuevaencuesta', {
      url: '/empezarnuevaencuesta',
      templateUrl: 'templates/catastrousuarios/empezarNuevaEncuesta.html',
      controller: 'CatastroUsuariosnuevaencuesta'
    });

  $urlRouterProvider.otherwise('/home');
})

.factory('factoryCausales', function(){
  var factoryCausales = {};
  factoryCausales.totalCausales = [];
  factoryCausales.causal = {};

  return factoryCausales;
})

.factory('factoryObservaciones', function(){
  var factoryObservaciones = {};
  factoryObservaciones.totalObservaciones = [];
  factoryObservaciones.observacion = {};

  return factoryObservaciones;
})

.factory('factoryEstadoLecturas', function(){
  var factoryEstadoLecturas = {};
  factoryEstadoLecturas.totalLecturas = [];
  factoryEstadoLecturas.lecturas = {};

  return factoryEstadoLecturas;
})

.run(function($ionicPlatform, $cordovaFile) 
{
  $ionicPlatform.ready(function() 
  {
    console.log('lanzado desde app.js');
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
      dbShell = window.openDatabase("AQUAMOVIL","1.1", "AQUAMOVIL BD", 2000000);

      dbShell.transaction(CrearTabla,dbErrorHandler);

    $cordovaFile.checkFile(cordova.file.externalRootDirectory, "AQuaMovil/Entradas/Logo.png")
    .then(function (archivo) {
      console.log(archivo);
      var ruta = archivo.nativeURL;
      console.log(ruta);
      $("#imglogoMisionVida").attr('src', ruta);
      $("#imglogoMisionVida").attr('width', "35%");
      }, function (error) {
      $("#imglogoMisionVida").attr('src', "img/logomisionvidaweb.png");
      $("#imglogoMisionVida").attr('width', "80%");
    });

    /*--------------------------------------------------------------------------------*/
    //Funciones para crear carpetas de la aplicación ("AQuaMóvil", "Entradas", "Salidas" y "Fotos")

    $cordovaFile.createDir(cordova.file.externalRootDirectory, "AQuaMovil", false)
    .then(function (success) {
      if (success) {
        console.log('Directorio Creado')
      }
      }, function (error) {
        console.log('Directorio Existente');
    });

    $cordovaFile.createDir(cordova.file.externalRootDirectory, "AQuaMovil/Entradas", false)
    .then(function (success) {
      if (success) {
        console.log('Directorio Creado')
      }
      }, function (error) {
        console.log('Directorio Existente');
    });

    $cordovaFile.createDir(cordova.file.externalRootDirectory, "AQuaMovil/Salidas", false)
    .then(function (success) {
      if (success) {
        console.log('Directorio Creado')
      }
      }, function (error) {
        console.log('Directorio Existente');
    });

    $cordovaFile.createDir(cordova.file.externalRootDirectory, "AQuaMovil/Salidas/Fotos", false)
    .then(function (success) {
      if (success) {
        console.log('Directorio Creado')
      }
      }, function (error) {
        console.log('Directorio Existente');
    });
  });

  // Disable BACK button on home
  $ionicPlatform.registerBackButtonAction(function (event) {
    if($state.current.name=="home"){
      swal({
      title: "Atención",
      text: "¿Desea Salir de la aplicación?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0088C4",
      confirmButtonText: "Salir",
      cancelButtonText: "Cancelar",
      closeOnConfirm: false }, 
      function(){
          navigator.app.exitApp();
      });
    }
    
    else 
    {
      swal({
      title: "Atención",
      text: "¿Desea Salir de la aplicación?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0088C4",
      confirmButtonText: "Salir",
      cancelButtonText: "Cancelar",
      closeOnConfirm: false }, 
      function(){
          navigator.app.exitApp();
      });
    }
  }, 100);     
})
