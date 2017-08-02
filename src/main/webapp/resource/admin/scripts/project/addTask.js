var app = angular.module('addTaskApp', []);
app.controller('addTaskCtrl', ['$scope', '$http', function($scope, $http) {
	var _this = $scope;
	_this.data = {
		ruleList: [],
		webBean: {
			targetUrl: '',
			helpUrl: '',
			ruleId: ''
		}
	}
	var data = _this.data;
	
	_this.formSubmit = function(){
		console.log(data.webBean);
		
		return false;
	}
	
	_this.ruleChange = function(ruleId){
		console.log('rule change');
		console.log(ruleId);
		console.log(data.webBean);
	}
	
	_this.getAllRules = function(){
		$http.get('/crawler/rule/selectAll.do').success(function (result) {
	         data.ruleList = result.data;
	    });
	}
	
	_this.init = function(){
		console.log('load add task jsp');
		_this.getAllRules();
	}
	
	_this.init();
}]);

//layui.use(['form','layer'], function(){
//  var form = layui.form();
//  var layer = layui.layer;
//  
//  //各种基于事件的操作，下面会有进一步介绍
//});