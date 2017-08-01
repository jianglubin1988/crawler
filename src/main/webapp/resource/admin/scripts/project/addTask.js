var app = angular.module('addTaskApp', []);
app.controller('addTaskCtrl', function($scope) {
	var _this = $scope;
	_this.data = {
		
	}
	var data = _this.data;
	
	_this.init = function(){
		console.log('load add task jsp');
	}
	
	_this.init();
});