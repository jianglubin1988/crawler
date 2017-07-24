require('../common/common.js');
require('../../styles/project/register.scss');

$(function(){

	new Vue({
		el: 'body',
		data: {
			bean: {},
			protocolShow: false,
			countdown: 60
		},
		methods: {
			protocol: function(){
				this.protocolShow = true;
				return false;
			},

			sendSms: function(){
				var disabled = $('#sendMsg').attr('disabled');
				if(disabled){
					return false;
				}
				$('#sendMsg').attr('disabled', 'true');
				this.settime();
				core.post('/admin/register/registerSms',{'username':this.bean.username},{
					showLoading: false,
					onSuccess: function(){
						return false;
					}
				});
			},

			settime: function(){
				if(this.countdown == 0){
					if(!this.validPhone()){
						$('#sendMsg').removeAttr('disabled');
					}
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

			validPhone: function(){
				var flag = false;
				var reg = /((13|14|15|17|18)[0-9]{9})$/;
				var username = this.bean.username;
				var $username = $('#username')
				var _tips = $username.data('tips');
				$('#sendMsg').attr('disabled','true');
				$username.siblings('span').remove();
				if(!reg.test(username)){
					$('<span class="err-info">'+_tips+'</span>').insertAfter($username);
					flag = false;
				}else{
					flag = true;
					core.post('/admin/register/checkUsername', {'username': username}, {
						showLoading: false,
						onSuccess: function(data){
							if($('#sendMsg').data('resend') == 0){
								$('#sendMsg').removeAttr('disabled');
							}
							return false;
						},
						onError: function(data){
							$('<span class="err-info">'+data.msg+'</span>').insertAfter($username);
							return false;
						}
					})
				}
				return flag;
			},

			validCode: function(){
				var code = this.bean.code;
				var $code = $('#code');
				var flag = true;

				var code = this.bean.code;
				var reg = /^[0-9]+$/;
				var $code = $('#code');
				$code.siblings('span').remove();
				if(code == undefined ||　code.length < 6 || !reg.test(code)){
					$('<span class="err-info">请输入6位数字验证码</span>').insertAfter($code);
					return false;
				}
				return this.valid($code, code, flag);
			},

			checkPass: function(pass){
				if(pass == undefined || pass.length < 8){
				    return 0;
				}
				var ls = 0;
				if(pass.match(/([a-z])+/)){
				   ls++;
				}
				if(pass.match(/([0-9])+/)){
				   ls++;
				}
				if(pass.match(/([A-Z])+/)){
				    ls++;
				}
				if(pass.match(/[^a-zA-Z0-9]+/)){
				    ls++;
				}
				return ls;
			},

			validPwd: function(){
				var $pwd = $('#password');
				var pwd = this.bean.password;
				$pwd.siblings('span').remove();
				if(this.checkPass(pwd) < 2){
					$('<span class="err-info">密码长度为8-14位，至少包含数字，英文字母，特殊字符类型中的两种</span>').insertAfter($pwd);
					return false;
				}
				return this.valid($pwd, pwd, true);
			},

			validCompany: function(){
				var company = this.bean.company_name;
				var $company = $('#company_name');
				return this.valid($company, company, true);
			},

			validRealName: function(){
				var realname = this.bean.real_name;
				var $realname = $('#real_name');
				return this.valid($realname, realname, true);
			},

			valid: function(target, val, flag){
				var _minLength = target.data('min-length');
				var _maxLength = target.data('max-length');
				var _tips = target.data('tips');
				target.siblings('span').remove();
				if(val == undefined || val == '' || val.length > _maxLength || val.length < _minLength || !flag){
					$('<span class="err-info">'+_tips+'</span>').insertAfter(target);
					return false;
				}
				return true;
			},

			validForm: function(){
				var _code = this.validCode();
				var _pwd = this.validPwd();
				var _company = this.validCompany();
				var _real = this.validRealName();
				if(_code && _pwd && _company && _real){
					return true;
				}
				return false;
			},

			agree: function(){
				$('#protocolAgree').toggleClass('active');
				if($('#protocolAgree').hasClass('active')){
					$('.btn-register').removeAttr('disabled');
				}else{
					$('.btn-register').attr('disabled','true');
				}
			},

			doRegister: function(){
				var valid = this.validForm();
				if(valid){
					core.post('/admin/register/register',this.bean,{
						onSuccess: function(data){
							if(data.code == '0'){
								core.success('注册成功！',function(){
									window.location.href = '/admin/Login/index';
								});
							}
							return false;
						}
					});
				}
				return false;
			},

			protocolConfirm: function(){
				this.protocolShow = false;
			}
		}
	})
})