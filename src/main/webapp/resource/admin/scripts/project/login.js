require('../common/common.js');
require('../../styles/project/login.scss');

$(function(){

	var loginVue = new Vue({
		el: 'body',
		data: {
			bean: {
				is_remember: false
			},
			sync: false,
			htm: ''
		},
		methods: {
			loginSubmit: function(){
				core.post('/admin/login/login', this.bean, {
					showLoading: false,
					onSuccess: function(data){
						if(data.code == 0){
							window.location.href = '/admin/Login/companyIndex';
						}
						return false;
					}
				});
			}
		}
	})
})