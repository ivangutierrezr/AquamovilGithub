angular.module('starter.controladormapa', [])

.controller('ControladorMapa', function($scope,$ionicLoading,$ionicHistory)
{
	
	angular.element(document).ready(function () 
    {
    	navigator.geolocation.getCurrentPosition(function(pos)
		{
			var miUbicacion = {
				lat:pos.coords.latitude,
				lng:pos.coords.longitude
			}

			var mapDiv = document.getElementById('map');
			var mapOptions = {
				center:miUbicacion,
				zoom:17
			}

			var mapa = new google.maps.Map(mapDiv, mapOptions);

			var marker = new google.maps.Marker({
				map:mapa,
				position:miUbicacion
			})
		},	
		function(err)
		{
			//
		});
    });

	$scope.myGoBack = function() {
	    $ionicHistory.goBack();
	  };
	

	/*if (document.ready === 'completeState') {
		$scope.initMap();
	}
	else {
		google.maps.event.addDomListener(window, 'load', $scope.initMap);
	}*/

});