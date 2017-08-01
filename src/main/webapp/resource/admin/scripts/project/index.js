var app = angular.module('indexApp', []);
app.controller('indexCtrl', function($scope) {
	var _this = $scope;
	_this.data = {
		newTaskUrl: '/website/addTask.do',
		taskListUrl: '/website/taskList.do',
		newRuleUrl: '/rule/addRule.do',
		ruleListUrl: '/rule/ruleList.do'
	}
	var data = _this.data;
	
	_this.redirect = function(action){
		var url = '';
		switch(action){
		case 'newTask':
			url = data.newTaskUrl;break;
		case 'taskList':
			url = data.taskListUrl;break;
		case 'newRule':
			url = data.newRuleUrl;break;
		case 'ruleList':
			url = data.ruleListUrl;break;
		}
		window.location.href = core.baseUrl + url;
	}
});