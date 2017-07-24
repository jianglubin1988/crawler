window.$ = require('../lib/jquery/3.0.0/jquery.min.js');
window.Vue = require('../lib/vue/1.0.25/vue.min.js');

window.core = require('../utils/core.js');
window.plugin = require('../utils/plugin.js');
window.utils = require('../utils/utils.js');
window.validate = require('../utils/validate.js');
window.url = require('./url.js');
window.session = require('./session.js');
require('../utils/textSearch.js');

// bootstrap
require('../lib/bootstrap/3.3.5-noicon/css/bootstrap.min.css');
require('../lib/bootstrap/3.3.5-noicon/js/bootstrap.min.js');

//x-ui modules
window.doT = require('../lib/doT/1.0.3/doT.js');
require('../../styles/module/x-ui-1.0.css');
require('../module/x-ui-1.0.js');

// font icon
require('../lib/icomoon/style.css');

// 样式
require('../../styles/base/base.scss');                 //初始标记化样式
require('../../styles/base/animate.scss');              //动画样式
require('../../styles/base/ui.scss');                   //ui组件样式
require('../../styles/base/vue.scss');                  //vue模板样式（过渡动画）
require('../../styles/base/rewrite_plugin.scss');       //第三方插件样式复写
require('../../styles/base/rewrite_bootstrap.scss');    //bootstrap样式复写
require('../../styles/base/rewrite_xui.scss');          //xui组件库样式复写

require('../../styles/base/layout.scss');               //主结构样式
require('../../styles/base/common.scss');               //公共样式（合并到layout.scss）

require('../lib/jquery-ui-datepicker/1.0/jquery-ui-datepicker.css');
require('../lib/jquery-ui-datepicker/1.0/jquery-ui-datepicker.js');

// vue全局模板
Vue.component('ui-dialog',require('../../components/ui-dialog.vue'));//对话框组件
Vue.component('ui-form',require('../../components/ui-form.vue'));//表单组件
Vue.component('ui-page',require('../../components/ui-page.vue'));//分页组件

// Vue.component('ui-input-date',require('../../components/ui-input-date.vue'));//日期输入组件
Vue.component('ui-input-area',require('../../components/ui-input-area.vue'));//省市输入组件
Vue.component('ui-input-domicile',require('../../components/ui-input-domicile.vue'));//获取户籍性质输入组件
Vue.component('ui-input-paytype',require('../../components/ui-input-paytype.vue'));//获取缴纳类型输入组件

//jquery-draggable
require('../lib/draggable/jquery-draggable.js');

$(function(){

    plugin.uiDatePicker($('.input-date'));

	//header--修改信息
	new Vue({
        el: '#header',
        data: {
            user: {
            	show: false,
            	username: 'pengsisi',
	            password: '123123',
	            realname: '彭思思',
	            mobile: '13585523009',
	            mail: 'pengsisi@71dai.com'
            }
        },
        methods: {
        	modify: function(){
        		this.user.show = true;
        	},
            logout: function(){
                core.post('/admin/login/logout',{},{
                    onSuccess: function(){
                        core.success('登出成功', function(){
                            window.location.href = '/admin/Login/index';
                        })
                        return false;
                    }
                })
            },
            center: function(){
                core.post('/admin/User/user',{},{
                    onSuccess: function(){
                        window.location.href = '/admin/User/user';
                        return false;
                    }
                })
            }
        },
        ready: function(){

        }
    });

    //结构
    var $content = $('.content-main');
    var $nav = $('#nav');
    $(window).on('resize',function(){

        var minHeight = $(this).height() - 110;
        $content.css('min-height',minHeight);


    }).resize();

});