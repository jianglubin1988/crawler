/**
 * 插件封装
 * @namespace
 */
var plugin = {

	_uiOpt : 'ui-opt',//通过此私有变量来改变dom中配置参数的属性名称

	/**
	 * 异步表单
	 * @param  {Object} $nodes  jQuery 表单选择器对象
	 * @param  {Object} options 配置参数
	 * @example
	 * plugin.uiFormAjax($('form'),{
	 * 	loadUrl : null,	//获取原记录url
	 * 	loadParams : {}, //获取原记录参数
	 * 	postUrl : $node.attr('action'), //保存记录url
	 * 	onInit : function(){}, //表单初始化回调事件，主要用于校验规则绑定等前期操作
	 * 	onLoadSuccess : function(){}, //获取原记录成功回调函数
	 * 	onLoadError : function(){}, //获取原纪录失败回调函数
	 * 	onPostBefore : function(){}, //表单提交前回调函数，return false，阻止表单提交，主要用于数据校验检查等
	 * 	onPostAfter : function(){}, //表单提交后回调函数，主要用于输入项目的状态改变，如禁用，等待提示等
	 * 	onPostSuccess : function(){}, //保存记录成功回调函数
	 * 	onPostError : function(){}, //保存记录失败回调函数
	 * 	showLoading : true, //是否显示loading
	 * 	$showLoadingTarget : $('body') //loading显示容器
	 * });
	 */
	uiFormAjax : function($node,options){

		if ($node.length == 0){
			return this;
		}else if ($node.length > 1){
			$node.each(function(){core.uiFormAjax($(this),options);});
			return this;
		}

		var opt = $.extend(true, {
			loadUrl : null,
			loadParams : {},
			postUrl : $node.attr('action'),
			onInit : function($node){},
			onLoadSuccess : function($node,result){},
			onLoadError : function($node,result){},
			onPostBefore : function($node,params){},
			onPostAfter : function($node,params){},
			onPostSuccess : function($node,result){},
			onPostError : function($node,result){},
			showLoading : true,
			$showLoadingTarget : $('body')

		}, options);

		opt.onInit($node);//初始化事件

		//获得原数据（表单编辑，信息回显）
		if(opt.loadUrl){
			core.post(opt.loadUrl,opt.loadParams,{
				onSuccess : function(result){
					opt.onLoadSuccess($node,result);
					return false;//阻止noticeSuccess
				},
				onError : function(result){
					return opt.onLoadError($node,result);
				},
				showLoading : opt.showLoading,
				$showLoadingTarget : opt.$showLoadingTarget
			});
		}

		//表单提交
		$node.on('submit',function(){

			var paramsArr = $(this).serializeArray();//序列化数组
			var paramsObj = {};//序列化对象
			var params = {};

			paramsArr.forEach(function(data){

				if(paramsObj[data.name])
				{
					if($.isArray(paramsObj[data.name]))
					{
						paramsObj[data.name].push(data.value);
					}
					else
					{
						paramsObj[data.name]=[paramsObj[data.name],data.value];
					}
				}
				else
				{
					paramsObj[data.name]=data.value;
				}

			});

			// 旧代码
			// params = paramsObj;

			// if(opt.onPostBefore($node,params) == false){
			// 	return false;
			// }
			//
			//

			params = opt.onPostBefore($node,paramsObj);

			if(params == false){
				return false;
			}

			core.post(opt.postUrl,params,{
				onSuccess : function(result){
					return opt.onPostSuccess($node,result);
				},
				onError : function(result){
					return opt.onPostError($node,result);
				},
				showLoading : opt.showLoading,
				$showLoadingTarget : opt.$showLoadingTarget
			});

			opt.onPostAfter($node,params);
			return false;

		});
	},

	uiDataGrid2: function($node,options){

		if ($node.length == 0){
			return this;
		}else if ($node.length > 1){
			$node.each(function(){core.uiDataGrid($(this),options);});
			return this;
		}

		var opt = $.extend(true, {
			checkBoxAllClassName : '.checkbox-all',
			checkBoxItemClassName : '.checkbox-item',
			btnDelsClassName : '.btn-dels',
			btnDelClassName : '.btn-del',
			urlDel : '',
			onDelSuccess : function(result){},
			onDelError : function(result){}
		}, options);

		//全选
		$node.delegate(opt.checkBoxAllClassName,'change',function(){
			$node.find(opt.checkBoxItemClassName).prop('checked',this.checked).change();
		});

		//单选
		$node.delegate(opt.checkBoxItemClassName,'change',function(){
			var $tr = $(this).closest('tr');
			var $checkboxAll = $node.find(opt.checkBoxAllClassName);
			var $checkboxItems = $node.find(opt.checkBoxItemClassName);

			this.checked ? $tr.addClass('active') : $tr.removeClass('active');
			$checkboxAll.prop('checked', $checkboxItems.length == $checkboxItems.filter(':checked').length);

			_refreshDelsBtnStatus();
		});

		//删除选取
		$node.delegate(opt.btnDelsClassName,'click',function(){

			//获取选中的id数组
			var $checked = $node.find(opt.checkBoxItemClassName+ ':checked');
			var ids = [];
			$checked.each(function(){
				ids.push(this.value);
			});

			//删除
			_del(ids,function(result){

				//移除tr
				$checked.closest('tr').fadeOut('fast',function(){$(this).remove();});
				opt.onDelSuccess(result);

			},function(result){
				opt.onDelError(result);
			});
		});

		//删除单条
		$node.delegate(opt.btnDelClassName,'click',function(){

			//获取选中的id数组
			var $checked = $node.find(opt.checkBoxItemClassName+ ':checked');
			var ids = [];
			$checked.each(function(){
				ids.push($(this).closest('tr').data('id'));
			});

			//删除
			_del(ids,function(result){
				//移除tr
				$checked.closest('tr').fadeOut('fast',function(){$(this).remove();});
				return opt.onDelSuccess(result);
			},function(result){
				return opt.onDelError(result);
			});


		});

		// //删除单条
		// plugin.uiBtnTip($node.find('.btn-del'),{
		// 	fn : {
		// 		sureCb : function(xtip){
		// 			var $row = xtip.$btn.closest('tr');
		// 			core.post(opt.urlDel,{id:$row.data('id')},{
		// 				onSuccess : function(result){
		// 					core.noticeSuccess('删除成功');
		// 					$row.fadeOut('fast',function(){$(this).remove()});
		// 					opt.onDelSuccess(result);
		// 				},
		// 				onError : function(result){
		// 					core.noticeError('删除失败');
		// 					opt.onDelError(result);
		// 				}
		// 			})
		// 		}
		// 	}
		// });

		function _del(ids,onSuccess,onError){
			core.confirm('确定要删除选择的记录',function(sure){
				if(sure){
					core.post(opt.urlDel,{id:ids},{
						onSuccess : function(result){
							return onSuccess(result);
						},
						onError : function(result){
							return onError(result);
						}
					})
				}
			});
		}

		//刷新批量删除按钮 禁用/可用 状态
		function _refreshDelsBtnStatus(){
			$node.find(opt.btnDelsClassName).prop('disabled',!$node.find(opt.checkBoxItemClassName).filter(':checked').length);
		}

		_refreshDelsBtnStatus();
	},

	/**
	 * 自动随内容撑高的textarea多行文本框,最大高度取自 dom 属性 max-height
	 * @extend xAutoHeightTextArea
	 * @param  {Object} $nodes jquery 选择器对象
	 * @param  {Object} options 参数配置
	 * @example
	 * plugin.uiTextareaAutoHeight($('textarea'),{
	 * 	maxHeight : 200
	 * });
	 */
	uiTextareaAutoHeight : function($node,options){

		if ($node.length == 0){
			return this;
		}else if ($node.length > 1){
			$node.each(function(){plugin.uiTextareaAutoHeight($(this),options)});
			return this;
		}

		//获取dom属性配置
		var optAttr = eval('('+$node.attr(plugin._uiOpt)+')');
		var opt = $.extend(true, {
			maxHeight: 200
		}, optAttr);

		//获取js调用参数配置
		opt = $.extend(true, opt,options);

		xAutoHeightTextArea($node,opt);
	},

	/**
	 * 日期输入框<br>
	 * 内部使用 jquery ui datepicker
	 * @param  {Object} $nodes jquery选择器对象
	 * @param  {Object} options 参数配置，具体参数详见jquery ui datepicker
	 * @example
	 * plugin.uiDatePicker($('.ui-input-date'),{
	 * 		format: "yyyy/mm",
	 * 		minViewMode: 1,// 0.day 1.month
	 * });
	 */
	uiDatePicker : function($node,options){

		if ($node.length == 0){
			return this;
		}else if ($node.length > 1){
			$node.each(function(){plugin.uiDatePicker($(this),options)});
			return this;
		}

		var optAttr = eval('('+$node.attr(plugin._uiOpt)+')');
		var opt = $.extend(true, {
			language: "zh-CN",
			format: "yyyy-mm-dd",
		}, optAttr);

		opt = $.extend(true, opt,options);

		$node.datepicker(opt);

	},

	/**
	 * 悬浮提示框
	 * @param  {Object} $nodes jquery选择器对象
	 * @param  {Object} options 参数配置
	 * @example
	 * plugin.uiTooltip($('.ui-tooltip'),{
	 * 	delay: { "show": 300, "hide": 100 },
	 *	html : true,
	 *	placement : 'auto', //top | bottom | left | right | auto
	 *	trigger : 'hover focus' //click | hover | focus
	 * });
	 */
	uiTooltip : function($node,options){

		if ($node.length == 0){
			return this;
		}else if ($node.length > 1){
			$node.each(function(){plugin.uiTooltip($(this),options);});
			return this;
		}

		var optAttr = eval('('+$node.attr(plugin._uiOpt)+')');
		var opt = $.extend(true, {
			delay: { "show": 300, "hide": 100 },
			html : true,
			placement : 'auto', //top | bottom | left | right | auto
			trigger : 'hover focus' //click | hover | focus
		}, optAttr);

		opt = $.extend(true, opt,options);

		$node.tooltip(opt);
	},

	/**
	 * 带确认提示操作的按钮
	 * @param  {Object} $nodes jquery选择器对象
	 * @param  {Object} $options 配置参数
	 * @example
	 * plugin.uiBtnTip($('.ui-btn-tip'),{
	 * 	direct : '',//tip浮层箭头的方向，可以手动指定up、down，不指定为空的时候自适应
	 * 	arrowPosFix : 15, //计算图层位置时候fix的偏移量
	 * 	class : 'ui-btn-tip',
	 * 	hasSure : true,
	 * 	hasCancel : true,
	 * 	autoClose : false,
	 * 	content:'确定要删除此项目',
	 * 	fn : {
	 * 		sureCb : function(){
	 * 			eval($node.attr('onsure'));//执行 onsure 属性事件
	 * 		}
	 * 	}
	 * })
	 */
	uiBtnTip : function($node,options){


		if ($node.length == 0){
			return this;
		}else if ($node.length > 1){
			$node.each(function(){plugin.uiBtnTip($(this),options);});
			return this;
		}

		var optAttr = eval('('+$node.attr(plugin._uiOpt)+')');

		var opt = $.extend(true, {
			direct : '',	//tip浮层箭头的方向，可以手动指定up、down，不指定为空的时候自适应
			arrowPosFix : 15, //计算图层位置时候fix的偏移量
			class : 'ui-btn-tip',
			hasSure : true,
			hasCancel : true,
			autoClose : false,
			content:'确定要删除此项目',
			fn : {
				sureCb : function(){
					eval($node.attr('onsure'));//执行 onsure 属性事件
				}
			}

		}, optAttr);

		opt = $.extend(true, opt,options);

		$node.on('click',function(){

			var xtip = xTip($node,opt);
			xtip.$btn = $(this);//这里是为了让 xtip 跟btn建立绑定关系

		})
	},

	/**
	 * 倒计时插件(支持跟服务端时间校准)
	 * @param  {object} $node   $nodes jquery选择器对象
	 * @param  {object} options $options 配置参数
	 * @example
	 * js code:
	 * plugin.uiTimeCountDown($node,{
	 * 	className : '',//自定义样式
	 * 	overHtml : '倒计时已经结束',
	 * 	overTimestamp : '',//结束的时间戳秒
	 * 	serverTimestamp : ''//服务端时间戳秒，用于本地时间跟服务端时间倒计时同步校准
	 * 	onEnterEnd : function($node,timeLeft){},//倒计时结束触发 timeLeft 剩余时间，秒
	 *  onEnterFrame : function($node){}//倒计时过程触发
	 * });
	 *
	 * html code:
	 * <span class="ui-time-count-down" ui-opt="{overHtml:'完蛋了',overTimestamp:<?=time()+10 ?>,serverTimestamp:<?=time() ?>,className:'ui-color-danger',onEnterFrame:function($node,t){console.debug(t);}}"></span>
	 */
	uiTimeCountDown : function($node,options){

		if ($node.length == 0){
			return this;
		}else if ($node.length > 1){
			$node.each(function(){plugin.uiTimeCountDown($(this),options);});
			return this;
		}

		var optAttr = eval('('+$node.attr(plugin._uiOpt)+')');
		var opt = $.extend(true, {
			className : '',//自定义样式
			overHtml : null,//倒计时结束时显示的文字，默认是0秒
			overTimestamp : parseInt(new Date().getTime()/1000),//结束的时间戳秒
			serverTimestamp : parseInt(new Date().getTime()/1000),//服务端时间戳秒，用于本地时间跟服务端时间倒计时同步校准
			onEnterEnd : function($node,timeLeft){},//倒计时结束触发 timeLeft 剩余时间，秒
			onEnterFrame : function($node){}//倒计时过程触发

		}, optAttr);

		//获得本地时间跟服务端时间差
		var timeDiff = parseInt(new Date().getTime()/1000) - opt.serverTimestamp;

		var _t = setInterval(setIntervalFun,1000);

		setIntervalFun();

		function setIntervalFun(){

			var timeNow = parseInt(new Date().getTime()/1000) + timeDiff;

			opt.onEnterFrame($node,opt.overTimestamp - timeNow);

			if(timeNow >= opt.overTimestamp){

				if(opt.overHtml) $node.html(opt.overHtml);
				clearInterval(_t);
				opt.onEnterEnd($node)

			} else {
				$node.html('<span '+(opt.className?'class="'+opt.className+'"':'')+'>'+betweenTimeToFirendly(timeNow,opt.overTimestamp)+'</span>');
			}
		}

		//生成友好时间差
		function betweenTimeToFirendly(startTimestamp,endTimestamp){

			timeInterval = endTimestamp - startTimestamp;

			if(timeInterval<=0)
			{
				result = '<span>0</span>秒';
			}
			else if(timeInterval<60)
			{
				result='<span>'+timeInterval+'</span>秒';
			}
			else if(timeInterval<3600)
			{
				var minutes = parseInt(timeInterval/60);

				result = '<span>'+minutes+'<span>分';
				timeInterval = timeInterval - minutes*60;
				result += '<span>'+timeInterval+'</span>秒';
			}
			else if(timeInterval<86400)
			{
				var hours = parseInt(timeInterval/3600)
				result = '<span>'+hours+'</span>时';
				timeInterval = timeInterval - hours*3600;

				var minutes = parseInt(timeInterval/60);
				result += '<span>'+minutes+'</span>分';
				timeInterval = timeInterval - minutes*60;
				result += '<span>'+timeInterval+'</span>秒';
			}
			else
			{
				var days =  parseInt(timeInterval/86400);
				result = '<span>'+days+'</span>天';
				timeInterval = timeInterval - days*86400;

				var hours = parseInt(timeInterval/3600);
				result += '<span>'+hours+'</span>时';
				timeInterval = timeInterval - hours*3600;

				var minutes = parseInt(timeInterval/60);
				result += '<span>'+minutes+'</span>分';
				timeInterval = timeInterval - minutes*60;
				result += '<span>'+timeInterval+'</span>秒';
			}
			return result;
		}
	},

	/**
	 * 图形验证码，单击更换
	 * @param  {object} $node $nodes jquery选择器对象
	 * @example
	 * <img class="ui-captcha" src="http://xxx.com/captcha" alt="图形验证码" />
	 */
	uiCaptcha : function($node){

		if ($node.length == 0){
			return this;
		}else if ($node.length > 1){
			$node.each(function(){plugin.uiCaptcha($(this));});
			return this;
		}

		$node
		.data('src',$node.attr('src'))
		.css('cursor','pointer')
		.on('click',function(){
			this.src = $(this).data('src')+'?n='+new Date().getTime();
		})
	},

	/**
	 * 分页插件
	 * @param  {object} $node $nodes jquery选择器对象
	 * @param  {object} options 分页参数
	 */
	uiPage : function($node,options){

		if ($node.length == 0){
			return this;
		}else if ($node.length > 1){
			$node.each(function(){plugin.uiPage($(this));});
			return this;
		}

		var optAttr = eval('('+$node.attr(plugin._uiOpt)+')');
		var opt = $.extend(true, {
			page : 1,//当前页
			pageAll : 1,//总页数
			pageSize : 10,//每页显示记录数
			pageBtnView : 5,//显示的页码数
			className : '',//自定义样式
			onChange : function(page){}//回调事件
		}, optAttr);



		$($node).xPages({
			curPage: opt.page,
			perPageResult: opt.pageAll
		});

	}

};

//初始化方法
$(function(){

	//ui-textarea-autoheight
	// plugin.uiTextareaAutoHeight($('.ui-textarea-autoheight'));

	//ui-datepicker
	plugin.uiDatePicker($('.form-control[type="date"]'));

	//ui-tooltip
	// plugin.uiTooltip($('.ui-tooltip'));

	//ui-btn-tip
	// plugin.uiBtnTip($('.ui-btn-tip'));

	//倒计时
	// plugin.uiTimeCountDown($('.ui-time-count-down'));

	//验证码
	// plugin.uiCaptcha($('.ui-captcha'));

});

//支持构建接口
if(module) module.exports = plugin;
