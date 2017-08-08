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
		core.post('/website/update.do', rule, {
			showLoading: false,
			onSuccess: function(result){
				console.log(result);
			}
		})
	}
	
	_this.delTask = function(id){
		core.confirm('确定删除该任务？', function(status){
			if(status){
				core.post('/website/delete.do', {id: id}, {
					showLoading: false,
					onSuccess: function(result){
						_this.loadData();
					}
				})
			}
		})
	}
	
	_this.init = function(){
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
  
  $('.editTask').on('click', function(){
	  var id = $(this).data('id');
	  var that = this; 
      //多窗口模式，层叠置顶
      layer.open({
        type: 1 //此处以iframe举例
        ,id: 'edit-'+id
        ,title: '编辑任务'
        ,area: ['390px', '260px']
        ,shade: 0
        ,maxmin: true
        ,offset: 'auto'
        ,content: '<div>'+id+'</div>'
        ,btn: ['提交', '关闭'] //只是为了演示
        ,yes: function(){
//          $(that).click(); 
        }
        ,btn2: function(){
          layer.closeAll();
        }
        
        ,zIndex: layer.zIndex //重点1
        ,success: function(layero){
          layer.setTop(layero); //重点2
        }
      });
  })
  
});