var app = angular.module('ruleListApp', []);
app.controller('ruleListCtrl', function($scope) {
	var _this = $scope;
	_this.data = {
		
	}
	var data = _this.data;
	
	_this.init = function(){
		console.log('load task list jsp');
	}
	
	_this.init();
});