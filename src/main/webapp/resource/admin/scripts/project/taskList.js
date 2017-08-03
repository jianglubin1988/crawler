var app = angular.module('taskListApp', []);
app.controller('taskListCtrl', ['$scope', '$http', function($scope, $http)  {
	var _this = $scope;
	_this.data = {
		taskList: []
	}
	var data = _this.data;
	
	_this.loadData = function(){
		$http.get(core.baseUrl + '/website/selectByUser.do').success(function (result) {
	        data.taskList = result.data;
	        console.log(data.taskList);
	    });
	}
	
	_this.doUpdate = function(rule){
		console.log('do update');
		console.log(rule);
		core.post('/website/update.do', rule, {
			onSuccess: function(result){
				console.log(result);
			}
		})
	}
	
	_this.init = function(){
		console.log('load task list jsp');
		setTimeout(_this.loadData(), 500);
	}
	
	_this.init();
}]);

layui.use(['form','layer'], function(){
  var form = layui.form();
  var layer = layui.layer;
  
//外部调用angular js 内容
  var appElement = document.querySelector('[ng-controller="taskListCtrl"]');
  var scope = angular.element(appElement).scope();
  
  form.on('switch(switchStatus)', function(data){
	  var $input = $(data.elem);
	  var rule = {
		  id: $input.data('id'),
		  status: this.checked ? 1: 0
	  }
	  scope.doUpdate(rule);
  })
  
});