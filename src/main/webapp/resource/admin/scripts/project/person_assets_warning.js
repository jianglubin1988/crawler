require('../common/common.js');
require('../../styles/project/person_assets_warning.scss');

$(function(){

	new Vue({
		el: '#assets-warning-info',
		data: {
			pageData: [],
			param:{'page':1,'name':'','warning_level':'','is_read':''}
		},
		methods: {

			query: function(){
				var _this = this;
				core.post('/customer/warning/getWarningList',this.param,{
					showLoading: false,
					onSuccess: function(result){
						_this.pageData = result.data;
						return false;
					}
				})
			},

			viewWarningDetail: function(personid, groupid){
				$('body').data('customerId', personid);
				//打开分组
				var is_open = $('#group_'+ groupid + '>i:nth-child(2)').hasClass('open-ico');
				if(!is_open){
					$('#group_'+ groupid + '>i:nth-child(2)').toggleClass('open-ico');
					$('#group_'+ groupid + '~ul').toggleClass('hide');
				}
				var left_h = $('.left').height();
				var right_h = $('.right').height();
				$('.right').height(left_h-50);

				//选中客户
				$('.customer-items').children('li').each(function(){
					$(this).removeClass('active');
				})
				$('#customer_' + personid).addClass('active');

				$.ajax({
					type:'post',
					url: '/admin/Login/personInfo',
					success: function(result){
						$('#right').html(result);
					}
				})
			},

			goPage: function(p){
				this.param.page = p;
				this.query();
			}
		},
		ready: function(){
			this.query();
		}
	})

})