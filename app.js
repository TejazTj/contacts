var app = angular.module('main', []);


app.controller('ContactCtrl', function ($scope, $http) {
	$scope.getName = function() {
		const name = $scope.name;
		console.log('nameeeeeee', name);

		if (name) {
		    $http.get(`/contacts?name=${name}`).then(res => {
		    	console.log('contact found', res);
		    	if (res.status === 200) {
		        $scope.contact = res.data;
		    	}
		    }).catch(err => console.log('err fetching contatc', err));
		}
		
	} 

});