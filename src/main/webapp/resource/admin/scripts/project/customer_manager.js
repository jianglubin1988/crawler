require('../common/common.js');
require('./_person.js');
require('../../styles/project/customer_manager.scss');

$(function(){
	new Vue({
		el: '#customer_manager',
		data: {
			pageData:{
				page:1,
				pageAll:1,
				rows:[]
			},
			groups: [],
			customer: {},
			customer_sync: false
		},
		methods: {
			goPage: function(p){
				this.pageData.page = p;
				this.pageData.rows = rows2;

			},

			customerManage: function(){
				this.pageData.rows = rows;
				this.cus_mng_sync = true;

			},

			initGroupList: function(id){
				var _this = this;
				core.post('/customer/group/getGroupList',{},{
					showLoading: false,
					onSuccess: function(result){
						_this.groups = result.data;
						if(id == undefined || id == ''){
							_this.customer.group_id = result.data[0].id;
						}else{
							_this.customer.group_id = id;
						}
						return false;
					}
				})
			},

			addCustomer: function(){
				this.customer = {};
				this.customer.sex = '男';
				plugin.uiDatePicker($('.input-date'), {
					changeYear: false,
					changeMonth: false,
				});
				var _this = this;
				$("#fdr").datepicker({
			        onSelect: function(dateText,inst){
			        	_this.customer.lending_date = dateText;
			           	$("#dqr").datepicker("option","minDate",dateText);
					}
			    });
				this.initGroupList();
				$('.form-control').siblings('i').remove();
				this.customer_sync = true;
			},

			saveCustomer: function(){
				var _this = this;
				if(this.validate()){
					if(this.customer.id == '' || this.customer.id == undefined){
						// 新增
						core.post('/customer/index/addCustomer',this.customer,{
							showLoading: false,
							onSuccess: function(result){
								if(result.code == 0){
									_this.customer_sync = false;
									_this.init();
									$('body').trigger('leftvue-init');
								}
							}
						})
					}else{
						// 修改
						core.post('/customer/index/editCustomer',this.customer,{
							showLoading: false,
							onSuccess: function(result){
								if(result.code == 0){
									_this.customer_sync = false;
									_this.init();
									$('body').trigger('leftvue-init');
								}
							}
						})
					}
				}
			},

			editCustomer: function(id){
				var _this = this;
				$('.vue-dialog-header>div>span').text('编辑客户');
				plugin.uiDatePicker($('.input-date'), {
					changeYear: false,
					changeMonth: false,
				});
				$("#fdr").datepicker({
			        onSelect: function(dateText,inst){
			        	_this.customer.lending_date = dateText;
			           	$("#dqr").datepicker("option","minDate",dateText);
					}
			    });
				core.post('/customer/index/getCustomerInfo',{'id':id},{
					showLoading: false,
					onSuccess: function(result){
						_this.customer = result.data;
						_this.initGroupList(_this.customer.group_id);
						$('.form-control').siblings('i').remove();
						_this.customer_sync = true;
						return false;
					}
				})
			},

			delCustomer: function(id, groupId){
				var _this = this;
				var param = {'id':id,'groupId':groupId};
				core.confirm('是否删除该客户',function(status){
					if(status){
						core.post('/customer/index/delCustomer',{'id':id,'group_id':groupId},{
							showLoading: false,
							onSuccess: function(result){
								if(result.code == 0){
									_this.init();
									$('body').trigger('leftvue-init');
								}
							}
						})
					}
				})
			},

			showTip: function(target,tip){
				target.siblings('i').remove();
				var _tip = '<i class="err-info">'+tip+'</i>';
				$(_tip).insertAfter(target);
			},

			validate: function(){
				if(this.v_username() && this.v_id_card() && this.v_tel() && this.v_mail() && this.v_fdr() && this.v_dqr() && this.v_amount()){
					return true;
				}
				return false;
			},

			v_username: function(){
				var username = this.customer.name;
				var $username = $('#username');
				$username.siblings('i').remove();
				if(username == '' || username == undefined){
					this.showTip($username, '姓名不可以为空，请输入姓名');
					return false;
				}
				return true;
			},

			v_id_card: function(){
				var card = this.customer.card_no;
				var $card = $('#id_card');
				$card.siblings('i').remove();
				if(!validate.validIdcard(card)){
					this.showTip($card, '请输入有效的身份证号码');
					return false
				}
			    return true;
			},

			v_tel: function(){
				var tel = this.customer.phone;
				var $tel = $('#tel');
				$tel.siblings('i').remove();
				if(!validate.validPhone(tel)){
					this.showTip($tel, '请输入正确的手机号');
					return false
				}
				return true;
			},

			v_mail: function(){
				var mail = this.customer.email;
				var $mail = $('#mail');
				$mail.siblings('i').remove();
				if(!validate.validEmail(mail)){
					this.showTip($mail, '请输入正确的Email');
					return false
				}
				return true;
			},

			v_fdr: function(){
				var fdr = this.customer.lending_date;
				var $fdr = $('#fdr');
				$fdr.siblings('i').remove();
				if(fdr == '' || fdr == undefined){
					this.showTip($fdr, '请选择放贷日');
					return false
				}
				return true;
			},

			v_dqr: function(){
				var dqr = this.customer.due_date;
				var $dqr = $('#dqr');
				$dqr.siblings('i').remove();
				if(dqr == '' || dqr == undefined){
					this.showTip($dqr, '请选择到期日');
					return false
				}
				return true;
			},

			v_amount: function(){
				var amount = this.customer.lending_amount;
				var $amount = $('#amount');
				$amount.siblings('i').remove();
				if(!validate.validAmount(amount)){
					this.showTip($amount, '请输入正确的放贷金额');
					return false
				}
				return true;
			},

			init: function(){
				var _this = this;
				var param = {'id':'0'};
				core.post('/customer/index/getCustomerList',param,{
					showLoading: false,
					onSuccess: function(result){
						_this.pageData.rows = result.data;
						return false;
					}
				})
			}
		},

		ready: function(){
			this.init();
		}
	})

})