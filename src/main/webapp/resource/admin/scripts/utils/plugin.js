/**
 * 插件封装
 * aiv367 2016/11/02
 */
var plugin = {

	_uiOpt : 'plugin-opt',//通过此私有变量来改变dom中配置参数的属性名称

	/**
	 * plugin 插件初始化
	 */
	init : function(){

		//日期插件
        plugin.uiDatePicker($('input[plugin="date"]'));

        //地区选择插件
        plugin.uiCityPicker($('input[plugin="city"]'));

	},

	/**
	 * 日期输入框
	 * @depend
	 * datepicker
	 * require('../lib/bootstrap-datepicker-master/dist/css/bootstrap-datepicker.css');
	 * require('../lib/bootstrap-datepicker-master/dist/js/bootstrap-datepicker.js');
	 * require('../lib/bootstrap-datepicker-master/dist/locales/bootstrap-datepicker.zh-CN.min.js');
	 *
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
		$node.removeClass('hasDatepicker');

	},

	/**
	 * 地区输入框
	 * @depend
	 * require('../lib/city-picker/1.1.0/city-picker.css');
	 * require('../lib/city-picker/1.1.0/city-picker.data.js');
	 * require('../lib/city-picker/1.1.0/city-picker.js');
	 * @param  {Object} $nodes jquery选择器对象
	 * @param  {Object} options 参数配置，具体参数详见jquery ui datepicker
	 * @example
	 * plugin.uiCityPicker($('.ui-input-date'),{
	 * 		format: "yyyy/mm",
	 * 		minViewMode: 1,// 0.day 1.month
	 * });

	 */
	uiCityPicker : function($node,options){

		if ($node.length == 0){
			return this;
		}else if ($node.length > 1){
			$node.each(function(){plugin.uiCityPicker($(this),options)});
			return this;
		}

		var optAttr = eval('('+$node.attr(plugin._uiOpt)+')');
		var opt = $.extend(true, {}, optAttr);

		opt = $.extend(true, opt,options);

		$node.citypicker(opt);

	},


};

//支持构建接口
if(module) module.exports = plugin;