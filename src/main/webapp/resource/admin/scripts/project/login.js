var app = angular.module('myApp', []);
app.controller('formCtrl', function($scope) {
	var _this = $scope;
	_this.data = {
		user: {
			id: '',
			username: '',
    			password: ''
		},
		msgStatus: false,
		tabIndex: 1,
		errMsg: ''
	}
	var data = _this.data;
	
	/**
	 * 初始化
	 */
	_this.init = function(){
		console.log('init');
		$('.hide').removeClass('hide');
//		core.confirm('aaa', function(status){
//			if(status){
//				console.log("true");
//			}else{
//				console.log("false");
//			}
//		})
	}

	
	/**
	 * tab切换
	 */
    _this.tab = function(index){
    	data.tabIndex = index;
    }
    
    /**
     * 登录
     */
    _this.formSubmit = function(){
		console.log('======login');
		console.log(data.user);
		var url = utils.baseUrl + '/login/signIn.do';
		core.post(url, data.user, {
			showLoading: false,
			onSuccess: function(result){
				window.location.href = utils.baseUrl + '/login/redirect.do';
			},
			onError: function(result){
				console.log('login faile');
				data.errMsg = result.data;
				data.msgStatus = true;
				console.log(result.data);
				return false;
			}
		})
    }
    
    /**
     * 注册
     */
    _this.formRegister = function(){
		console.log('======register');
		console.log(data.user);
		var url = utils.baseUrl + '/register/signUp.do';
		core.post(url, data.user, {
			onSuccess: function(result){
//				console.log(result.msg);
				window.location.href = utils.baseUrl + '/login/index.do';
			},
			onError: function(result){
//				core.error(result.data);
				data.errMsg = result.data;
				data.msgStatus = true;
				console.log(result.data);
			}
		})
    }
    
    /**
     * 忘记密码
     */
    _this.formPassword = function(){
		console.log('======password');
		console.log(data.user);
		var url = utils.baseUrl + '/register/resetPassword.do';
		core.post(url, data.user, {
			onSuccess: function(result){
				window.location.href = utils.baseUrl + '/login/index.do';
			},
			onError: function(result){
				data.errMsg = result.data;
				data.msgStatus = true;
				console.log(result.data);
			}
		})
    }
    
    /**
     * 短信验证码
     */
    _this.sendMsg = function(){
		console.log('======msg');
		console.log(data.user);
		var url = utils.baseUrl + '/register/sendMsg.do';
		core.post(url, data.user, {
			onSuccess: function(result){
				console.log(result.msg);
			},
			onError: function(result){
				data.errMsg = result.data;
				data.msgStatus = true;
				console.log(result.data);
			}
		})
    }
    
	_this.init();
});