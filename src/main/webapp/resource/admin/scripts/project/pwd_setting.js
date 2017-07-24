require('../common/common.js');
require('../../styles/project/pwd_setting.scss');

$(function(){

	new Vue({
		el: 'body',
		data: {
			bean: {},
			sync: false,
			htm: ''
		},
		methods: {
			submit: function(){
				var username = $.session.get('username');
				this.bean.username = username;
				if(this.validate()){
					console.log(2);
					core.post('/admin/register/resetPassword',this.bean, {
						onSuccess: function(data){
							core.success('重置密码成功', function(){
								window.location.href = '/admin/Login/index';
							});
							return false;
						}
					})
				}
			},
			validate: function(){
				console.log(1);
				if(this.validPwd() && this.validRePwd()){
					return true;
				}else{
					return false;
				}
			},
			validPwd: function(){
				var $pwd = $('#password');
				$pwd.siblings('label').remove();
				if(this.bean.password == undefined){
					$('<label class="err-info">请输入新密码</label>').insertAfter($pwd);
					return false;
				}
				if(this.checkPass(this.bean.password) < 2){
					$('<label class="err-info">密码长度为8-14位，至少包含数字，英文字母，特殊字符类型中的两种</label>').insertAfter($pwd);
					return false;
				}
				return true;
			},
			validRePwd: function(){
				var $pwd = $('#password');
				var $repwd = $('#re_password');
				$repwd.siblings('label').remove();
				if(this.bean.password == '' || this.bean.password == undefined){
					$pwd.siblings('label').remove();
					$('<label class="err-info">请输入新密码</label>').insertAfter($pwd);
					return false;
				}else if(this.bean.re_password == '' || this.bean.re_password == undefined){
					$('<label class="err-info">请输入确认密码</label>').insertAfter($repwd);
					return false;
				}else if(this.bean.password != this.bean.re_password){
					$('<label class="err-info">确认密码与新密码不一致</label>').insertAfter($repwd);
					return false;
				}
				return true;
			},
			checkPass: function(pass){
				if(pass.length < 8){
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
			showMsg: function(html){

				this.sync = true;
				this.htm = html;
			}
		},
		ready: function(){
			console.log($.session.get('username'));
		}
	})
})