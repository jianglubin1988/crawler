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

layui.use(['form','layer'], function(){
  var form = layui.form();
  var layer = layui.layer;
  
  //外部调用angular js 内容
  var appElement = document.querySelector('[ng-controller="addTaskCtrl"]');
  var scope = angular.element(appElement).scope();
  
  form.on('select(rule)', function(data){
	  scope.data.webBean.ruleId = data.value;
	  console.log(scope.data.webBean);
  });
});