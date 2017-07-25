$(function(){
	
	$('.form-tips>span').on('click', function(){
		$('.form-tips').hide();
	})

	$('.tabs>p:nth-child(1)').on('click', function(){
		console.log('用户登录');
		$('.login-form').show();
		$('.register-form').hide();
		$('.password-form').hide();
	})
	
	$('.tabs>p:nth-child(2)').on('click', function(){
		console.log('注册');
		$('.login-form').hide();
		$('.register-form').show();
		$('.password-form').hide();
	})
	
	$('.tabs>p:nth-child(3)').on('click', function(){
		console.log('忘记密码');
		$('.login-form').hide();
		$('.register-form').hide();
		$('.password-form').show();
	})
	
	$('.form-submit').on('click', function(){
		var obj = $('.form-content').serialize();
		var url = utils.baseUrl + '/login/signIn.do';
		core.post(url, obj, {
			onSuccess: function(result){
				console.log(result.data.username);
				var redirect = utils.baseUrl + '/login/redirect.do';
				window.location.href = redirect;
			},
			onError: function(result){
				console.log(result.data);
			}
		})
		
	})

})