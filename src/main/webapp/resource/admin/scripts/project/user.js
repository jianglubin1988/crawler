require('../common/common.js');
require('../../styles/project/user.scss');
$(function(){

	var userinfo = {
		'username':'13940598389',//手机号码
		'realname':'robin',//姓名
		'company':'镭驰金控',//公司
		'accountType':'个人账户',//账户类型
		'companyCount':'1',//已关注公司个数
		'companyMax':'3',//关注公司上限
		'personCount':'10',//已关注个人个数
		'personMax':'100',//关注个人上限
		'createDate':'2017-2-21',//创建日期
		'endDate':'2020-1-1'//到期日期
	}

	new Vue({
		el: 'body',
		data: {
			user:{},
			pwd:{},
			pwd_sync:false
		},

		methods: {

			init: function(){
				var _this = this;
				core.post('/admin/user',{},{
					showLoading: false,
					onSuccess: function(result){
						_this.user = result.data.userinfo;
						console.log(_this.user);
						return false;
					}
				});
			},

			validOld: function(){
				var opwd = this.pwd.old_password;
				var $opwd = $('#old_password');
				$opwd.siblings('span').remove();
				if(validate.checkPass(opwd) < 2){
					$('<span class="red">密码长度为8-14位，至少包含数字，英文字母，特殊字符类型中的两种</span>').insertAfter($opwd);
					return false;
				}
				return true;
			},

			validPwd: function(){
				var pwd = this.pwd.password;
				var $pwd = $('#password');
				$pwd.siblings('span').remove();
				if(validate.checkPass(pwd) < 2){
					$('<span class="red">密码长度为8-14位，至少包含数字，英文字母，特殊字符类型中的两种</span>').insertAfter($pwd);
					return false;
				}
				return true;
			},

			validRepwd: function(){
				var pwd = this.pwd.password;
				var rpwd = this.pwd.re_password;
				var $rpwd = $('#re_password');
				$rpwd.siblings('span').remove();
				if(rpwd != pwd){
					$('<span class="red">两次密码输入不一致，请重新输入</span>').insertAfter($rpwd);
					return false;
				}
				return true;
			},

			valid: function(){
				if(this.validOld() && this.validPwd() && this.validRepwd()){
					return true;
				}
				return false;
			},

			editPwd: function(){
				this.pwd = {};
				this.pwd_sync = true;
			},
			updatePwd: function(){
				if(this.valid()){
					var _this = this;
					core.post('/admin/user/resetPassword',this.pwd,{
						showLoading: false,
						onSuccess: function(result){
							core.alert('密码已成功修改，请重新登录',function(){
								_this.logout();
							})
							return false;
						}
					})
				}
			},
			logout: function(){
				core.post('/admin/login/logout',{},{
					onSuccess: function(){
						window.location.href = '/admin/Login/index';
						return false;
					}
				})
			},
			canclePwd: function(){
				console.log('cancle pwd');
				this.pwd_sync = false;
			}
		},

		ready: function(){
			this.init();
		}

	});

})