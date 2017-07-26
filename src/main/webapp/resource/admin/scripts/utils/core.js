/**
 * 静态核心方法<br>
 * 目前实现了对话框、消息框、等待框、服务端异步通讯等方法
 * @author aiv367
 * @version v1.0
 * @namespace
 */
var core = {

	/**
	 * 定义接口公共字段
	 */
	interface : {
		code : 'code',	//状态码字段名称
		msg : 'msg',	//返回消息字段名称
		successVal : 0,	//定义当code等于什么时是成功状态
		timeout: 2		//请求超时状态
	},

	baseUrl : "/",

	/**
	 * 加载提示框，支持区域显示
	 * @param  {Boolean} status  true:显示loading|false:隐藏loading
	 * @param  {Object} options 其他配置参数
	 * @example
	 * core.loading(true);
	 * core.loading(false);
	 * core.loading(true,{$target:$('#test')});
	 * core.loading(false,{onHide:function(){}});
	 * core.loading(false,{$target:$('#test'),onHide:function(){}});
	 */
	loading : function(status,options){

		var opt = $.extend(true, {
			$target : $('body'),
			onHide : $.noop
		}, options);

		$(opt.$target).xLoading(status,opt.onHide);
	},

	/**
	 * 弹出窗口
	 * @param  {Object} options 	使用 xDialog options 的配置
	 * @return {Object} 			返回xDilaog实例对象
	 * @example
	 * core.dialog({
	 * 	class:'',//弹层外层元素自定义样式，添加到模板
	 * 	title:'',//'提示' | title标题文案
	 * 	content:'',//'内容' | 弹层内容字符串，可以传入通过doT构建的模板字符串
	 * 	autoClose:'',//false | 弹层是否能自动关闭
	 * 	timer:2000,//2000 | 弹层多长时间后自动关闭，配合autoClose字段使用
	 * 	hasTitle:true,//true | 弹层是否有title标题元素
	 * 	hasCancel:true,//true | 是否有cancel取消按钮，如果没有是alert，如果有是confirm
	 * 	hasMask:true,//true | 是否有蒙层
	 * 	hasClose:true,//true | 是否有关键按钮‘X’
	 * 	maskClose:true,//true | 是否允许单击蒙层关闭弹窗
	 * 	hasAnimate:true//true | 弹层弹出和关闭的时候是否有动画
	 * 	openAnimate:'',//'ui-dialog-animate' | 弹层弹出时候的动画样式
	 * 	closeAnimate:''//'ui-dialog-animate-close' | 弹层关闭时候的动画样式
	 * 	animateTimer:200//200 | 弹层动画的持续时间
	 * 	sureText:'',//'确定' | 确定按钮文案
	 * 	cancelText:'',//'取消' | 取消按钮文案
	 * 	fn:{//回调函数对象
	 * 		initCb:function(){},//弹层初始化后回调
	 * 		sureCb:function(){},//点击确认按钮回调
	 * 		cancelCb:function(){},//点击取消按钮回调
	 * 		closeCb:function(){}//关闭弹层回调
	 * 	}
	 * });
	 */
	dialog : function(options){
		return window.xDialog(options);
	},

	/**
	 * 对话框
	 * @param  {String} text		对话框内容
	 * @param  {Function} callback	确定按钮回调函数
	 * @example
	 * core.alert('我是对话框');
	 * core.alert('我是对话框',function(){alert('我单击了确定按钮')});
	 * core.alert('我是对话框',function(){alert('我单击了确定按钮，并阻止关闭对话框');return false;});
	 */
	alert : function(text,callback){
		return window.xDialog({
			content: text,
			title:"对话框",
			hasTitle:false,
			hasCancel : false,
			maskClose : false,
			fn:{
				sureCb: function(){
					if(callback) {
						return callback();
					}
				}
			}
		});
	},

	/**
	 * 选择对话框
	 * @param  {String}   text	 选择框内容
	 * @param  {Function} callback 按钮的回调函数，当单击“是” callback(true),当单击“否”，callback(false)
	 * @example
	 * core.confirm(text,function(status){});
	 */
	confirm : function(text,callback){
		return window.xDialog({
			content: text,
			title:"选择框",
			hasTitle:false,
			hasCancel : true,
			maskClose : false,
			fn:{
				sureCb: function(){
					if(callback) {
						return callback(true);
					}
				},
				cancelCb:function(){
					if(callback) {
						return callback(false);
					}
				}
			}
		});
	},

	/**
	 * 错误对话框
	 * @param  {String}   text     错误对话框内容
	 * @param  {Function} callback 按钮的回调函数
	 * @example
	 * core.error('错误对话框',function(){});
	 */
	error : function(text,callback){
		window.xDialog({
			class : 'ui-dialog-error',
			content: text,
			hasTitle: false,
			hasCancel : false,
			maskClose : false,
			fn:{
				sureCb: function(){
					if(callback) {
						return callback(true);
					}
				}
			}
		});
	},

	/**
	 * 正确对话框
	 * @param  {String}   text     正确对话框内容
	 * @param  {Function} callback 按钮的回调函数
	 * @example
	 * core.success('正确对话框',function(){});
	 */
	success : function(text,callback){
		window.xDialog({
			class : 'ui-dialog-success',
			content: text,
			hasTitle: false,
			hasCancel : false,
			maskClose : false,
			fn:{
				sureCb: function(){
					if(callback) {
						return callback(true);
					}
				}
			}
		});
	},

	/**
	 * 消息框
	 * @param  {String}   text      消息内容
	 * @params {Object}	  options	对话框配置
	 * @return {Object}   xDialog对象
	 * @example
	 * core.notice('提示消息框');
	 * core.notice('提示消息框',{
	 * 	timer:5000,//自动关闭时间
	 * 	class:'ui-dialog-notice success'//自定义样式
	 * });
	 */
	notice : function(text,options){

		var opt = $.extend(true, {
			class : 'ui-dialog-notice',
			content: text,
			hasTitle: false,
			hasCancel : false,
			autoClose : true,
			hasMask : false,
			timer : 2000,
		}, options);

		return window.xDialog(opt);
	},

	/**
	 * 成功消息提示框
	 * @extend core.notice
	 * @param  {String} text    消息内容
	 * @param  {Object} options 消息参数，主要是{timer:2000,class:'ui-dialog-notice success'}
	 * @example
	 * core.noticeSuccess('正确提示消息框');
	 * core.noticeSuccess('正确提示消息框',{
	 * 	timer:5000,//自动关闭时间
	 * 	class:'ui-dialog-notice success'//自定义样式
	 * });
	 */
	noticeSuccess : function(text,options){

		var opt = $.extend(true, {
			class : 'ui-dialog-notice success'
		}, options);

		this.notice(text,opt);
	},

	/**
	 * 错误消息提示框
	 * @extend core.notice
	 * @param  {String} text    消息内容
	 * @param  {Object} options 消息参数，主要是{timer:2000,class:'ui-dialog-notice success'}
	 * @example
	 * core.noticeError('错误提示消息框');
	 * core.noticeError('错误提示消息框',{
	 * 	timer:5000,//自动关闭时间
	 * 	class:'ui-dialog-notice error'//自定义样式
	 * });
	 */
	noticeError : function(text,options){

		var opt = $.extend(true, {
			class : 'ui-dialog-notice error'
		}, options);

		this.notice(text,opt);
	},

	/**
	 * 服务端异步通信方法<br/>
	 * 要求服务端返回数据必须是json，并且json数据中必须包含 {code:'1',msg:'结果信息'}，这个两个关键属性，当服务端返回code!='1' 时即结果出错了，core.post会弹出错误提示信息(回调方法 return false,不会弹)
	 * @param  {String} url 服务端URL
	 * @param  {Object} params 发送参数
	 * @param  {Objcet} options 其他参数
	 * core.post('http://localhost/server.php',{name:'abc'},{
	 * 		onSuccess : function(result){},//服务端操作成功后的回调事件，服务端成功码1
	 * 		onError : function(result){},//服务端操作失败后的回调事件，当return false时候，不弹出错误提示框
	 * 		showLoading : true,//是否显示loading
	 * 		$showLoadingTarget : $('body')//在什么地方显示loading
	 * });
	 */
	post: function(url, params, options){

		// //定义服务端的关键字段信息
		// var interface = {
		// 	code : 'code',	//状态码字段名称
		// 	msg : 'msg',		//返回消息字段名称
		// 	successVal : 0	//定义当code等于什么时是成功状态
		// };

		var opt = $.extend(true, {
			onSuccess : function(result){},
			onError : function(result){},
			onAjaxError : function(XMLHttpRequest, textStatus, errorThrown){},
			showLoading : true,
			$showLoadingTarget : $('body'),
		}, options);

		if(opt.showLoading) core.loading(true,{$target:opt.$showLoadingTarget});

		return $.ajax({
			url:url,
			type:'post',
			data : params,
			dataType : 'json',
			cache:false,
			success:function(result, textStatus, jqXHR){
				if(opt.showLoading) {
					core.loading(false,{
						$target:opt.$showLoadingTarget,
						onHide:function(){
							_success();
						}
					});
				} else {
					_success();
				}

				function _success(){
					if(eval('result.'+core.interface.code) === core.interface.successVal) {
						 opt.onSuccess(result);
//						if(opt.onSuccess(result) !== false) core.noticeSuccess(result.msg);
					} else {
						opt.onError(result);
//						if(opt.onError(result) !== false) core.noticeError(result.msg);//当回调返回false，不弹出错误框了
					}
				}

			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				var showNotice = true;
				if(opt.onAjaxError(XMLHttpRequest, textStatus, errorThrown)==false){
					showNotice = false;
				}

				if(textStatus == "abort"){
					showNotice = false;
				}

				if(opt.showLoading) {
					core.loading(false,{
						$target:opt.$showLoadingTarget,
						onHide : function(){

							showNotice && core.error(textStatus);
						}
					});
				} else {
					showNotice && core.error(textStatus);
				}

			}
		});
	},
	
//	post: function(url, params, options){
//
//		var opt = $.extend(true, {
//			onSuccess : function(result){},
//			onError : function(result){},
//			onAjaxError : function(XMLHttpRequest, textStatus, errorThrown){},
//		}, options);
//
//		return $.ajax({
//			url:url,
//			type:'post',
//			data : params,
//			dataType : 'json',
//			cache:false,
//			success:function(result, textStatus, jqXHR){
//				if(eval('result.'+core.interface.code) === core.interface.successVal) {
//					opt.onSuccess(result);
//				} else {
//					opt.onError(result);
//				}
//			},
//			error:function(XMLHttpRequest, textStatus, errorThrown){
//				var showNotice = true;
//				if(opt.onAjaxError(XMLHttpRequest, textStatus, errorThrown)==false){
//					showNotice = false;
//				}
//
//				if(textStatus == "abort"){
//					showNotice = false;
//				}
//
//				showNotice && alert(textStatus);
//
//			}
//		});
//	},

	/**
	 * 生成服务端url
	 * @param  {[type]} url [description]
	 * @return {[type]}     [description]
	 */
	url : function(url){
		return this.baseUrl + url;
	},
	
	jDialog: function(target, options, callback){
		var opt = $.extend(true, {
			modal: true,
			title: '提示',
			height: 200,
			width: 100,
			autoOpen: false,
			buttons: {
		        '确定': function() {
		        	$(this).dialog("close");
		        	if(callback){
		        		return callback(true);
		        	}
		        },
				'关闭': function() {
					$(this).dialog("close");
					if(callback){
		        		return callback(false);
		        	}
		        }
		    }
		}, options);
		return target.dialog(opt);
	}

};

//支持构建接口
