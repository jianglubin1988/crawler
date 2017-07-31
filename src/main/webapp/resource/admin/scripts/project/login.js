var app = angular.module('loginApp', []);
app.controller('loginCtrl', function($scope) {
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
	}

	
	/**
	 * tab切换
	 */
    _this.tab = function(index){
    	data.tabIndex = index;
    }
    
    _this.showTips = function(msg){
    	$('.form-tips').fadeIn(500);
    	$('.form-tips').text(msg);
		setTimeout(function(){
			$('.form-tips').fadeOut(500, function(){
				$('.form-tips').text('');
			});
		},1000);
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
				_this.showTips(result.data);
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
				data.user = {};
				core.success(result.data, function(){
					window.location.href = utils.baseUrl + '/login/index.do';
				})
			},
			onError: function(result){
				_this.showTips(result.data);
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
				data.user = {};
				core.success(result.data, function(){
					window.location.href = utils.baseUrl + '/login/index.do';
				})
			},
			onError: function(result){
				_this.showTips(result.data);
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
				core.success(result.data);
			},
			onError: function(result){
				_this.showTips(result.data);
			}
		})
    }
    
	_this.init();
});