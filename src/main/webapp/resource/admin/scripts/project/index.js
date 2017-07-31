var app = angular.module('indexApp', []);
app.controller('indexCtrl', function($scope) {
	var _this = $scope;
	_this.data = {
		user: {
			id: '',
			username: '',
    			password: ''
		},
		errMsg: ''
	}
	var data = _this.data;
	
	/**
	 * 初始化
	 */
	_this.init = function(){
		console.log('init');
		$('.hide').removeClass('hide');
	}

	
	
    
	_this.init();
});