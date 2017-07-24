require('../common/common.js');
require('./_person.js');
require('../../styles/project/person.scss');
$(function(){

	new Vue({
		el: 'body',
		data: {
			bean: [],
			title: '',
			warning_sync: false,
			warnings: {'assets':1},
			assets:{}
		},

		methods: {

			assetsClick: function(){
				$.ajax({
					type:'post',
					url: '/admin/Login/personAssetsWarning',
					success: function(result){
						$('#right').html(result);
					}
				})
			},

			assetsWarning: function(){
				var _this = this;
				$('.warning-label').html('<i class="err-info">提示：预警设置最多输入3位正整数</i>');
				core.post('/customer/warning/edit',{},{
					showLoading: false,
					onSuccess: function(result){
						_this.assets = result.data;
						_this.warning_sync = true;
						return false;
					}
				})
			},

			showTip: function(target, tip){
				var html = '<i class="err-info">'+tip+'</i>';
				$(html).insertAfter(target);
			},

			v_up_imp: function(){
				var val = this.assets.up_percent_important;
				var $upimp = $('#up_percent_important').parent('.input-group');
				$upimp.siblings('.err-info').remove();
				if(!validate.checkPositiveNumber(val)){
					this.showTip($upimp, '请输入有效数字');
					return false;
				}
				return true;
			},

			v_down_imp:function(){
				var val = this.assets.down_percent_important;
				var $downimp = $('#down_percent_important').parent('.input-group');
				$downimp.siblings('.err-info').remove();
				if(!validate.checkPositiveNumber(val)){
					this.showTip($downimp, '请输入有效数字');
					return false;
				}
				return true;
			},

			v_up_gen:function(){
				var val = this.assets.up_percent_general;
				var $upgen = $('#up_percent_general').parent('.input-group');
				$upgen.siblings('.err-info').remove();
				if(!validate.checkPositiveNumber(val)){
					this.showTip($upgen, '请输入有效数字');
					return false;
				}
				return true;
			},

			v_down_gen:function(){
				var val = this.assets.down_percent_general;
				var $downgen = $('#down_percent_general').parent('.input-group');
				$downgen.siblings('.err-info').remove();
				if(!validate.checkPositiveNumber(val)){
					this.showTip($downgen, '请输入有效数字');
					return false;
				}
				return true;
			},

			valid: function(){
				var flag = false;
				if(this.v_up_imp() && this.v_down_imp() && this.v_up_gen() && this.v_down_gen()){
					if(Number(this.assets.up_percent_important) <= Number(this.assets.up_percent_general)){
						$('.warning-label').html('<i class="err-info">一般预警上浮必须小于重要预警上浮</i>');
					}else if(Number(this.assets.down_percent_important) <= Number(this.assets.down_percent_general)){
						$('.warning-label').html('<i class="err-info">一般预警下浮必须小于重要预警下浮</i>');
					}else{
						flag = true;
					}
				}
				return flag;
			},

			saveAssetsWarning: function(){
				var _this = this;
				if(this.valid()){
					if(this.assets.id == '' || this.assets.id == undefined){
						core.post('/customer/warning/setWarning', this.assets, {
							showLoading: false,
							onSuccess: function(result){
								_this.warning_sync = false;
							}
						})
					}else{
						core.post('/customer/warning/doEdit',this.assets,{
							showLoading: false,
							onSuccess: function(result){
								_this.warning_sync = false;
							}
						})
					}
				}
			},

			cancleAssetsWarning: function(){
				this.warning_sync = false;
			},

			init: function(){
				var _this = this;
				core.post('/customer/Warning/getWarningCount',{},{
					showLoading: false,
					onSuccess: function(result){
						_this.warnings.assets = result.data;
						return false;
					}
				})
			}

		},

		ready: function(){
			// var left_h = $('.left').height();
			// var right_h = $('.right').height();
			this.init();
		}

	});



})