require('../common/common.js');

$(function(){
	new Vue({
		el: '#left',
		data: {
			activeId: '',
			groups: {},
			groups_customers:{},
			newgroup: '',
			editgroup: '',
			group_sync: false,
			user:{'fdr':'2016-1-1','username':'123'}
		},
		methods: {
			toggleGroup: function(groupid){
				$('#group_'+ groupid + '>i:nth-child(2)').toggleClass('open-ico');
				$('#group_'+ groupid + '~ul').toggleClass('hide');
				var left_h = $('.left').height();
				var right_h = $('.right').height();
				$('.right').height(left_h-50);
			},

			customerClick: function(personid){
				$('.customer-items').children('li').each(function(){
					$(this).removeClass('active');
				})
				$('#customer_' + personid).addClass('active');
				$('body').data('customerId', personid);
				$.ajax({
					type:'post',
					url: '/admin/Login/personInfo',
					success: function(result){
						$('#right').html(result);
					}
				})
			},

			customerMngClick: function(){
				$.ajax({
					type:'post',
					url: '/admin/Login/customerManager',
					success: function(result){
						$('#right').html(result);
					}
				})
			},

			groupManage: function(){
				var _this = this;
				core.post('/customer/group/getGroupList',{},{
					showLoading: false,
					onSuccess: function(result){
						var data = result.data;
						data.forEach(function(group, index){
							if(group.name == '未分组'){
								data.splice(index,1);
							}
						})
						_this.groups = data;
						_this.group_sync = true;
						return false;
					}
				})
			},

			saveGroup: function(){
				var _this = this;
				core.post('/customer/group/addGroup',{'name':this.newgroup},{
					showLoading: false,
					onSuccess: function(result){
						var id = result.data.id;
						_this.groups.push({'name':_this.newgroup,'id':id});
						_this.newgroup = '';
						_this.init();
						return false;
					}
				})
			},

			updateGroup: function(id){
				var $input = $('#group-input-' + id);
				var $label = $('#group-label-' + id);
				var $group = $('#group-mng-' + id);
				var name = $input.val();
				var _this = this;
				core.post('/customer/group/editGroup',{'id':id,'name':name},{
					showLoading: false,
					onSuccess: function(result){
						$input.addClass('hide');
						$label.text(name)
						$label.removeClass('hide');
						$group.children('td').each(function(){
							$(this).children('.group-label').removeClass('hide');
							$(this).children('.group-edit').addClass('hide');
						});
						_this.init();
						return false;
					}
				})
			},

			editGroup: function(id, name){
				var $input = $('#group-input-' + id);
				$input.val(name);
				var $group = $('#group-mng-' + id);
				$group.children('td').each(function(){
					$(this).children('.group-label').addClass('hide');
					$(this).children('.group-edit').removeClass('hide');
				});
			},

			delGroup: function(id){
				var _this = this;
				core.confirm('确定删除这个分组吗？',function(val){
					if(val){
						var $tr = $('#group-mng-' + id);
						core.post('/customer/group/delGroup',{'id':id},{
							showLoading: false,
							onSuccess: function(result){
								_this.groups.forEach(function(group,index){
									if(group.id == id){
										_this.groups.splice(index,1);
									}
								})
								_this.init();
								return false;
							}
						})
					}
				})
			},

			cancleGroup: function(id){
				this.editgroup = '';
				var $group = $('#group-mng-' + id);
				$group.children('td').each(function(){
					$(this).children('.group-label').removeClass('hide');
					$(this).children('.group-edit').addClass('hide');
				});
			},

			init: function(){
				var _this = this;
				core.post('/customer/group/getGroupTree',{},{
					showLoading: false,
					onSuccess: function(result){
						_this.groups_customers = result.data;
						return false;
					}
				})
			}

		},
		ready: function(){
			this.init();
			var self = this;
			$('body').bind('leftvue-init', function(){
				self.init();
				$('.ui-mask').remove();
			})
		}
	})

})