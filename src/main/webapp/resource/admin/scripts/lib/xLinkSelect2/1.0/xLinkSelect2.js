/**
 * xPlugin XX插件
 * @author aiv367 <aiv367@qq.com>
 * @version 1.0
 * @update 2016/07/26
 * @param  {object} options 分页参数
 * @return {object}         插件对象及方法
 * @example
 * $.fn.Plugin({
 * })
 */
(function ($){

	'use strict';

	function xLinkSelect2($fn,options){

		//声明实例变量
		this.$ = {};
		this.options = {};
		this.data = [];

		return this.init($fn,options);

	}

	xLinkSelect2.prototype = {

		$ : [],
		options : {},
		_animateEvent : 'webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend',

		init : function($fn,options){

			this._setOptions($fn,options);
			this._setElement($fn);
			this._setProperty();
			this._setEvent();

			return this;

		},

		_defaults : {
			width:450,
			levelTitles : [],
			cache : true,//是否缓存数据，如果为true,已经获得的数据不再从服务端获取
			data : [], //初始数据集合

			indexAllText : '全部',
			levelDefaultText : '请选择',//默认的levelTitle
			btnSureText : '确定',
			btnCancleText : '取消',
			offset : 5,//距离输入组件的位置偏移量

			ajaxUrl : null,
			ajaxType : 'post',
			value : '',//初始化默认选择值，分类之间的分隔符要保持跟 returnJoinChar 配置一致
			returnJoinChar : ',',//返回给输入组件的字符串连接符

			showIndexBar : true, //是否有检索工具栏,如果开启该项，需要引入下 LinkSelect_pinyin.js
			showBtn : true, //是否显示底部按钮

			className : '',
			showClassName : 'xLinkSelect2-in',
			hideClassName : 'xLinkSelect2-out',
			onSelect : function(selectData){},
			onReturn : function(selectData){},
			onAjaxBefore : function(params){ return params},
			onAjaxAfter : function(data){ return data},
			onShow : function(){},
			onShowEnd : function(){},
			onHide : function(){},
			onHideEnd : function(){},
			onDestroy : function(){}
		},

		_setOptions : function($fn,options){

			var attrOpts = $fn.attr('role-opts');
			if(attrOpts)
			{
				attrOpts = eval('('+attrOpts+')');
				if(attrOpts.xLinkSelect2)
				{
					attrOpts = attrOpts.xLinkSelect2;
				}
			}

			this.options = attrOpts ? $.extend({}, this._defaults, attrOpts) : this._defaults;
			this.options = $.extend({}, this.options, options);

		},

		_setElement : function($fn){

			var that = this;
			this.$.fn = $fn;
			this.$.node = $(
				'<div class="xLinkSelect2">' +
					'<div class="xLinkSelect2-header">' +
						'<ul></ul>' +
					'</div>' +
					'<div class="xLinkSelect2-content">' +
						'<ul></ul>' +
						'<div class="xLinkSelect2-loading"></div>' +
					'</div>' +
				'</div>'
			);

			this.$.header = this.$.node.find('.xLinkSelect2-header>ul');
			this.$.content = this.$.node.find('.xLinkSelect2-content>ul');
			this.$.loading = this.$.node.find('.xLinkSelect2-loading');

			//索引工具栏
			if(this.options.showIndexBar){

				this.$.indexBar = $(''+
					'<ol>' +
						'<li data-char="" ><a href="javascript:;">ALL</a></li>' +
						'<li data-char="A"><a href="javascript:;">A</a></li>' +
						'<li data-char="B"><a href="javascript:;">B</a></li>' +
						'<li data-char="C"><a href="javascript:;">C</a></li>' +
						'<li data-char="D"><a href="javascript:;">D</a></li>' +
						'<li data-char="E"><a href="javascript:;">E</a></li>' +
						'<li data-char="F"><a href="javascript:;">F</a></li>' +
						'<li data-char="G"><a href="javascript:;">G</a></li>' +
						'<li data-char="H"><a href="javascript:;">H</a></li>' +
						'<li data-char="I"><a href="javascript:;">I</a></li>' +
						'<li data-char="J"><a href="javascript:;">J</a></li>' +
						'<li data-char="K"><a href="javascript:;">K</a></li>' +
						'<li data-char="L"><a href="javascript:;">L</a></li>' +
						'<li data-char="M"><a href="javascript:;">M</a></li>' +
						'<li data-char="N"><a href="javascript:;">N</a></li>' +
						'<li data-char="O"><a href="javascript:;">O</a></li>' +
						'<li data-char="P"><a href="javascript:;">P</a></li>' +
						'<li data-char="Q"><a href="javascript:;">Q</a></li>' +
						'<li data-char="R"><a href="javascript:;">R</a></li>' +
						'<li data-char="S"><a href="javascript:;">S</a></li>' +
						'<li data-char="T"><a href="javascript:;">T</a></li>' +
						'<li data-char="U"><a href="javascript:;">U</a></li>' +
						'<li data-char="V"><a href="javascript:;">V</a></li>' +
						'<li data-char="W"><a href="javascript:;">W</a></li>' +
						'<li data-char="X"><a href="javascript:;">X</a></li>' +
						'<li data-char="Y"><a href="javascript:;">Y</a></li>' +
						'<li data-char="Z"><a href="javascript:;">Z</a></li>' +
					'</ol>'
				);

				this.$.content.before(this.$.indexBar);

			}

			//底部按钮
			if(this.options.showBtn){
				this.$.node.append(
					'<div class="xLinkSelect2-footer">' +
						'<button type="button" class="xBtn xBtn-primary btn-sure"></button>' +
						'<button type="button" class="xBtn btn-cancle"></button>' +
					'</div>'
				);

				this.$.btnSure = this.$.node.find('.btn-sure');
				this.$.btnCancle = this.$.node.find('.btn-cancle');
			}

			this.$.fn.after(this.$.node);

		},

		_setProperty : function(){
			var options = this.options;

			//设置索引All标题
			if(this.$.indexBar){
				this.$.indexBar.find('li:first a').text(options.indexAllText);
			}

			//设置本地数据
			if(options.data.length){
				this.data = options.data;
				options.cache = true;
			}

			this.$.btnSure && this.$.btnSure.text(options.btnSureText);
			this.$.btnCancle && this.$.btnCancle.text(options.btnCancleText);

			//自定义样式
			if(options.className) this.$.node.addClass(options.className);

			//设置默认值
			if(options.value=='') options.value = this.$.fn.val();

		},

		_setEvent : function(){

			var that = this;

			this.$.fn.on('focus',function(){
				that.setValue($(this).val());
				that.show();
			});

			$(document).on('click',function(){
				that.hide();
			});

			//阻止事件冒泡
			this.$.fn.on('click',function(){
				return false;
			});

			this.$.node.on('click',function(){
				return false;
			});

			//分类序列
			this.$.node.delegate('.xLinkSelect2-header>ul>li','click',function(){

				var $this = $(this);
				var data = $this.data('data');
				var itemData = $this.data('itemData');

				$this.addClass('xActive').siblings('li').removeClass('xActive');
				that.options.showIndexBar && that.$.indexBar.find('li').eq(0).addClass('xActive').siblings().removeClass('xActive');//过滤重置all状态

				that._viewData(data,itemData.id,'');
				return false;

			});

			//字母过滤栏序列
			this.$.indexBar && this.$.indexBar.find('li').on('click',function(){

				var $this = $(this);
				var $activeHeader = that.$.header.find('li.xActive');
				var data = $activeHeader.data('data');
				var itemData = $activeHeader.data('itemData');

				$this.addClass('xActive').siblings('li').removeClass('xActive');

				that._viewData(data,itemData.id,$this.data('char'));

				return false;

			});

			//选项序列
			this.$.node.delegate('.xLinkSelect2-content>ul>li','click',function(){

				var $this = $(this);
				var $activeTab = that.$.header.find('li.xActive');
				var itemData = $this.data('itemData');

				$this.addClass('xActive').siblings('li').removeClass('xActive');

				//为头部设置数据及状态
				$activeTab
				.data('itemData',itemData)
				.find('a').text(itemData.title);

				//移除之后的tab
				$activeTab.nextAll().remove();

				//创建下级tab
				that._createTab(itemData.id,function(data){

					//没有子数据，并且没有底部按钮，自动为输入框返回数据
					if(!data.length && !that.options.showBtn){

						var selectData = that.getSelectData();

						//触发回调
						var userReturn = that.options.onReturn.apply(that,[selectData]);

						if(typeof userReturn == "string"){
							that.$.fn.val(userReturn);
						}
						else
						{
							that.$.fn.val(selectData.title.join(that.options.returnJoinChar));
						}

						that.hide();

					}

				});

				//触发回调
				var userReturn = that.options.onSelect.apply(that,[that.getSelectData()]);

				return false;

			});

			this.$.btnSure && this.$.btnSure.on('click',function(){

			});

			this.$.btnCancle && this.$.btnCancle.on('click',function(){
				that.hide();
			});
		},

		/**
		 * 获取数据
		 * @param  {number} pid  父类ID
		 * @param  {function} callback(data) 回调方法
		 */
		_getData : function(pid,callback){

			var options = this.options;
			var that = this;

			//从缓存获取数据
			if(options.cache && this.data.length){


				var hasData = false;//是否有缓存
				var data = [];
				this.data.forEach(function(item){
					if(item.pid == pid){
						data.push(item);
						hasData = true;
					}
				});

				if(hasData){
					return callback && callback(data);
				}

			}

			//从远程读取
			if(options.ajaxUrl){

				var params = options.onAjaxBefore({pid:pid});

				that._loading(true);
				$.ajax({
					url:options.ajaxUrl,
					type: options.ajaxType,
					data : params,
					dataType : 'json',
					success:function(result, textStatus, jqXHR){

						that._loading(false);
						var result = options.onAjaxAfter(result);

						//压入数据缓存
						if(options.cache){

							result.forEach(function(result_item){

								var isCache = false;

								that.data.forEach(function(cache_item){

									if(result_item.id === cache_item.id){
										isCache = true;
										return true;
									}

								});

								if(!isCache){
									that.data.push(result_item);
								}

							});

						}

						//返回数据
						callback && callback(result);

					},
					error:function(XMLHttpRequest, textStatus, errorThrown){
						that._loading(false);
						console.debug(errorThrown);
					}
				});

			}else{

				return callback && callback([]);
			}
		},

		/**
		 * 显示数据
		 * @param  {object} data 数据
		 * @params {number} value 默认选中的ID
		 * @params {string} filterChar 列表过滤，针对拼音、字母首字母，空字符串不过滤
		 */
		_viewData : function(data,value,filterChar){

			var that = this;
			that.$.content.empty();
			data.forEach(function(item){


				//过滤
				var titleFirsthChar = (typeof xPinYin != 'undefined' ? xPinYin.getCamelChars(item.title).substring(0,1) : '');

				if(filterChar=="" || filterChar==titleFirsthChar){

					var $li = $('<li data-char="'+titleFirsthChar+'"><a href="javascript:;">'+item.title+'</a></li>');
					if(value==item.id) $li.addClass('xActive');//选中

					$li.data('itemData',item);

					that.$.content.append($li);

				}

			});

		},

		/**
		 * 显示loading
		 * @param  {boolean} status true:显示|false:隐藏
		 */
		_loading : function(status){
			if(status){
				this.$.loading.show();
			}else{
				this.$.loading.hide();
			}

		},

		/**
		 * 创建 tab 并激活
		 * @param  {number} pid 父类ID
		 * @params {function} callback 数据获取完毕回调
		 */
		_createTab : function(pid,callback){

			var that = this;
			var options = this.options;

			//1.获取数据
			this._getData(pid,function(data){

				//有数据才创建Tab
				if(data.length){

					//2.创建Tab结构
					var title = options.levelDefaultText;

					if(!pid){

						var title = options.levelTitles.length ? options.levelTitles[0] : options.levelDefaultText;

					}else{

						var $lastTab = that.$.header.find('li:last');

						if($lastTab.index()+1<that.options.levelTitles.length){
							title = that.options.levelTitles[$lastTab.index()+1];
						}

					}

					var $tab = $('<li data-pid="'+pid+'" class="xActive"><a href="javascript:;">'+title+'</a></li>');
					$tab
					.data('data',data)//列表数据
					.data('itemData',{});//选择数据

					that.$.header.append($tab);

					//3.激活
					$tab.click();

				}

				callback && callback(data);

			});

		},

		/**
		 * 设置默认值
		 * @param {string} titleStr 分类字符串，
		 */
		setValue : function(value){

			var that = this;
			var types = value.split(this.options.returnJoinChar);
			var level = 0;//当前处理的级别
			that.$.header.empty();

			_x(0);

			//递归调用逐级创建tab
			function _x(pid){

				that._createTab(pid,function(data){

					if(data.length){
						data.forEach(function(item){
							if(item.title == types[level]){

								var $lastTab = that.$.header.find('li:last');

								$lastTab
								.data('itemData',item)
								.find('>a').text(item.title);

								level++;
								_x(item.id);
							}
						});
					}
					else
					{
						that.$.header.find('li:first').click();
						return false;
					}

				});

			}

		},

		/**
		 * 获得所选择的数据
		 */
		getSelectData : function(){

			var $tabs = this.$.header.find('li');
			var data = {
				id:[],
				pid:[],
				title : [],
				data : []
			};

			$tabs.each(function(i,obj){

				var $obj = $(obj);
				var itemData = $obj.data('itemData');

				if(!$.isEmptyObject(itemData)){
					data.data.push(itemData);
					data.id.push(itemData.id);
					data.pid.push(itemData.pid);
					data.title.push(itemData.title);
				}

			});

			return data;

		},

		show : function(callback){

			var that = this;
			var options = this.options;
			if(this.$.node.css('display')=='block') return false;//正在显示中
			if(options.onShow.apply(this) === false) return false;

			this.$.node.unbind(that._animateEvent).one(that._animateEvent, function(){

				that.$.node.removeClass(options.showClassName);

				callback && callback();
				options.onShowEnd.apply(that);

			});

			this.$.node
			.css({
				left:this.$.fn.position().left,
				top:this.$.fn.position().top + options.offset + (this.$.fn.outerHeight ? this.$.fn.outerHeight() : this.$.fn.height()),
			})
			.removeClass(options.hideClassName)
			.addClass(options.showClassName)
			.show();
		},

		hide : function(callback){

			var that = this;
			var options = this.options;

			if(options.onHide.apply(this) === false) return false;

			this.$.node.one(that._animateEvent, function(){

				that.$.node.removeClass(options.hideClassName);
				that.$.node.hide();
				callback && callback();
				options.onHideEnd.apply(that);

			});

			this.$.node
			.removeClass(options.showClassName)
			.addClass(options.hideClassName);
		},

		destroy : function(){
			var that = this;

			if(this.options.onDestroy.apply(this) === false) return false;

			this.hide(function(){
				that.$.node.remove();
				that = null;
			});
		}

	}

	$.fn.xLinkSelect2 = function(options){

		var $this = $(this);

		if ($this.length == 0)
		{
			return $this;
		}
		else if ($this.length > 1)
		{
			$this.each(function(){
				$(this).xLinkSelect2(options);
			});
			return $this;
		}

		return new xLinkSelect2($this,options);

	};

})(window.jQuery || window.Zepto);