$(function(){
	
//	$('.form-tips>span').on('click', function(){
//		$('.form-tips').hide();
//	})
//
//	$('.tabs>p:nth-child(1)').on('click', function(){
//		console.log('用户登录');
//		$('.login-form').show();
//		$('.register-form').hide();
//		$('.password-form').hide();
//	})
//	
//	$('.tabs>p:nth-child(2)').on('click', function(){
//		console.log('注册');
//		$('.login-form').hide();
//		$('.register-form').show();
//		$('.password-form').hide();
//	})
//	
//	$('.tabs>p:nth-child(3)').on('click', function(){
//		console.log('忘记密码');
//		$('.login-form').hide();
//		$('.register-form').hide();
//		$('.password-form').show();
//	})
//	
//	$('.form-submit').on('click', function(){
//		var obj = $('.form-content').serialize();
//		var url = utils.baseUrl + '/login/signIn.do';
//		core.post(url, obj, {
//			onSuccess: function(result){
//				console.log(result.data.username);
//				var redirect = utils.baseUrl + '/login/redirect.do';
//				window.location.href = redirect;
//			},
//			onError: function(result){
//				console.log(result.data);
//			}
//		})
//		
//	})

})

var app = angular.module('myApp', []);
app.controller('formCtrl', function($scope) {
	var _this = $scope;
	_this.data = {
			user: {
				id: '',
				username: '',
	    			password: ''
			},
			loginFail: false,
			tabIndex: 1
	}
	var data = _this.data;
	_this.init = function(){
		console.log('init')
		$('.hide').removeClass('hide');
	}
	_this.init();
    _this.tab = function(index){
    		data.tabIndex = index;
    }
    _this.formSubmit = function(){
    		console.log(data.user.username);
    		var url = utils.baseUrl + '/login/signIn.do';
    		core.post(url, data.user, {
    			onSuccess: function(result){
    				window.location.href = utils.baseUrl + '/login/redirect.do';
    			},
    			onError: function(result){
    				console.log(result.data);
    			}
    		})
    }
});