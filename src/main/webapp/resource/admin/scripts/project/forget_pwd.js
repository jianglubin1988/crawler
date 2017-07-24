require('../common/common.js');
require('../../styles/project/forget_pwd.scss');

$(function(){

	new Vue({
		el: 'body',
		data: {
			bean: {},
			countdown: 60
		},
		methods: {
			submit: function(){
				var _this = this;
		        core.post('/admin/register/forgetPassword', this.bean, {
		        	onSuccess: function(data){
		        		if(data.code == 0){
		        			$.session.set('username',_this.bean.username);
		        			console.log($.session.get('username'));
		    				window.location.href = '/admin/Register/pwd_setting';
		        		}
		        		return false;
		        	}
		        });
			},

			sendSms: function(){
				var disabled = $('#sendMsg').attr('disabled');
				if(disabled){
					return false;
				}
				$('#sendMsg').attr('disabled', 'true');
				var _this = this;
				core.post('/admin/register/forgetSms',{'username':this.bean.username},{
					showLoading: false,
					onSuccess: function(data){
						_this.settime();
						return false;
					}
				});
			},

			validUsername: function(){
				var flag = false;
				var reg = /((13|14|15|17|18)[0-9]{9})$/;
				var username = this.bean.username;
				var $username = $('#username')
				var _tips = $username.data('tips');
				$username.siblings('span').remove();
				if(!reg.test(username)){
					$('<span class="err-info">'+_tips+'</span>').insertAfter($username);
					$('#sendMsg').attr('disabled','true');
					flag = false;
				}else{
					flag = true;
					core.post('/admin/register/checkUsername', {'username': username}, {
						showLoading: false,
						onSuccess: function(data){
							$('#sendMsg').attr('disabled', 'true');
							flag = false;
							$username.siblings('span').remove();
							$('<span class="err-info">请输入已注册的手机号</span>').insertAfter($username);
							return false;
						},
						onError: function(data){
							if($('#sendMsg').data('resend') == 0){
								$('#sendMsg').removeAttr('disabled');
							}
							return false;
						}
					})
				}
				return flag;
			},

			validCode: function(){
				var code = this.bean.code;
				var reg = /^[0-9]+$/;
				var $code = $('#code');
				$code.siblings('span').remove();
				if(code.length < 6 || !reg.test(code)){
					$('<span class="err-info">请输入6位数字验证码</span>').insertAfter($code);
				}
			},

			settime: function(){
				if(this.countdown == 0){
					$('#sendMsg').removeAttr('disabled');
					$('#sendMsg').text('发送短信验证码');
					$('#sendMsg').data('resend','0');
					this.countdown = 60;
					return ;
				}else{
					$('#sendMsg').attr('disabled', 'true');
					$('#sendMsg').text('重新发送(' + this.countdown + ')');
					$('#sendMsg').data('resend','1');
					this.countdown--;
				}
				var _this = this;
				setTimeout(function(){
					_this.settime();
				},1000);
			},
		}
	})

})