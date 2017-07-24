require('../common/common.js');

require('../../styles/project/index.scss');

$(function(){

	// 获取关键字
	var getKeywords = function($parent){
		var _all = '';
		$('.keywords>p:nth-child(2)').children('span').each(function(){
			var label = $(this).text();
			label = label.replace('x','|');
			_all += label.trim();
		})
		_all = _all.substring(0, _all.length - 1);
		return _all;
	}

	// 文章加载
	var loadArticle = function(list){
		list.forEach(function(article){
			var _id = article.id;
			var _star = article.star;
			var _heart = article.favorite;
			var _effect = article.effect;

			var _heartClass = "heart";
			if(_heart == 1){
				_heartClass = "heart fullheart";
			}

			var _effectClassP = "default-positive";
			var _effectClassN = "default-negative";
			if(_effect == 1){
				_effectClassP = "positive";
			}else if(_effect == 2){
				_effectClassN = "negative";
			}

			var _star5 = '<label for="rate5'+_id+'" name="5" data-id="'+_id+'"></label>';
			var _star4 = '<label for="rate4'+_id+'" name="4" data-id="'+_id+'"></label>';
			var _star3 = '<label for="rate3'+_id+'" name="3" data-id="'+_id+'"></label>';
			var _star2 = '<label for="rate2'+_id+'" name="2" data-id="'+_id+'"></label>';
			var _star1 = '<label for="rate1'+_id+'" name="1" data-id="'+_id+'"></label>';
			switch(_star){
				case '5': _star5 = '<label for="rate5'+_id+'" name="5" data-id="'+_id+'" class="active"></label>';
				case '4': _star4 = '<label for="rate4'+_id+'" name="4" data-id="'+_id+'" class="active"></label>';
				case '3': _star3 = '<label for="rate3'+_id+'" name="3" data-id="'+_id+'" class="active"></label>';
				case '2': _star2 = '<label for="rate2'+_id+'" name="2" data-id="'+_id+'" class="active"></label>';
				case '1': _star1 = '<label for="rate1'+_id+'" name="1" data-id="'+_id+'" class="active"></label>';
				default: ;
			}

			var _li =   '<li class="load-li">'+
						'	<div>'+
						'		<div class="title">'+
						'			<a href="'+article.url+'" target="_blank">'+article.title+'</a>'+
						'		</div>'+
						'		<div class="operate">'+
						'			<p class="'+_heartClass+'" data-id="'+_id+'"></p>'+
						'			<p class="star">'+
						'				<input id="rate5'+_id+'" name="rating'+_id+'" value="5" type="radio">'+_star5+
						'				<input id="rate4'+_id+'" name="rating'+_id+'" value="4" type="radio">'+_star4+
						'				<input id="rate3'+_id+'" name="rating'+_id+'" value="3" type="radio">'+_star3+
						'				<input id="rate2'+_id+'" name="rating'+_id+'" value="2" type="radio">'+_star2+
						'				<input id="rate1'+_id+'" name="rating'+_id+'" value="1" type="radio">'+_star1+
						'			</p>'+
						'			<p class="effect">'+
						'				<span v-if="article.effect == 1" class="default '+_effectClassP+'" name="positive" data-id="'+_id+'">正面</span>'+
						'				<span v-if="article.effect == 2" class="default '+_effectClassN+'" name="negative" data-id="'+_id+'">负面</span>'+
						'			</p>'+
						'		</div>'+
						'	</div>'+
						'	<div class="info">'+
						'		<span class="time">'+article.pubtime+'</span>'+
						'		<span class="source">来源：'+article.source+'</span>'+
						'	</div>'+
						'	<div>'+
						'		<p class="content">'+
						'			'+article.content+''+
						'		</p>'+
						'	</div>'+
						'</li>';
			$(_li).appendTo($('.article>ul'));

		});

	}


	var indexVue = new Vue({
		el: 'body',
		data: {
			articles: [],
			companys: [],
			companykey: '',
			companyName: '',
			companyId: '',
			keyword: '',
			show: true,
			hide: false,
			sync: false,
			add_sync: false,
			success_sync: false,
			match_sync: false,
			match_fail: false,
			keywords: [],
			default_keywords: [],
			years: [],
			param: {
				page: 1
			},
			htm: ''
		},

		methods: {

			addCompany: function(){
				this.companykey = '';
				this.match_fail = false;
				if(this.companys.length<3){
					this.add_sync = true;
				}else{
					core.noticeError('关注公司已达上限');
				}
			},

			cancleAddCompany: function(){
				this.companykey = '';
				this.add_sync = false;
				this.match_fail = false;
			},

			saveCompany: function(){
				this.match_sync = true;
				var _this = this;
				core.post('/admin/company/addCompany',{'keyword':this.companykey},{
					showLoading: false,
					onSuccess: function(result){
						_this.success_sync = true;
						_this.add_sync = false;
						_this.match_sync = false;
						return false;
					},
					onError: function(result){
						_this.match_sync = false;
						_this.match_fail = true;
						$('#addCompanyTip>span').text(result.msg)
						return false;
					}
				})
			},

			successConifrm: function(){
				this.success_sync = false;
				window.location.href = window.location.href;
			},

			useDefault: function(){
				var _this = this;
				core.confirm('确定恢复默认关键字吗？', function(status){
					if(status){
						core.post('/admin/company/useDefaultKeywords',{company_id: _this.companyId},{
							onSuccess: function(result){
								_this.keywords = result.data;
								_this.articleQuery();
								return false;
							}
						})

					}
				});
			},

			setKeywords: function(){
				var keys = '';
				if(keys == ''){
					this.keywords.forEach(function(val){
						if(val.enable == 1){
							keys += val.keywords + "|";
						}
					})
				}
				this.param.keywords = keys.substring(0, keys.length-1);
			},

			articleQuery: function(){
				$('.load-li').remove();
				var _this = this;
				// _this.articles.splice(0, _this.articles.length);
				_this.param.page = 1;
				_this.param.companyName = this.companyName;
				this.setKeywords();
				core.post('/admin/search/index',this.param, {
					onSuccess: function(result){
						_this.articles = result.data.list;
						if(_this.articles.length > 0){
							$('.article').removeClass('hide');
							$('.blank-article').addClass('hide');
							setTimeout(function(){
								$('.left').height($('.right').height() + 50);
							},100);
						}else{
							$('.article').addClass('hide');
							$('.blank-article').removeClass('hide');
						}
						return false;
					},
					onError: function(result){
						$('.article').addClass('hide');
						$('.blank-article').removeClass('hide');
						return false;
					}
				});
			},

			getHighLight: function(){
				var text = '';
				this.keywords.forEach(function(val){
					if(val.enable == 1){
						text += val.keywords + ' ';
					}
				});
				text = text.substring(0, text.length - 1);
			},

			articlePageQuery: function(){
				var _this = this;
				_this.param.page++;
				core.post('/admin/search/index',this.param, {
					showLoading: false,
					onSuccess: function(result){
						var list = result.data.list;
						if(list.length > 0){
							loadArticle(list);
						}else{
							_this.param.page--;
						}
						$('.left').height($('.right').height() + 50);
						return false;
					},
					onError: function(){
						return false;
					}
				});
			},

			customKeywordsInit: function(){
				var _this = this;
				core.post('/admin/company/getCustomKeywords',{'company_id':this.companyId},{
					showLoading: false,
					onSuccess: function(result){
						_this.keywords = result.data;
						_this.articleQuery();
						return false;
					},
					onError: function(result){
						_this.keywords = [];
						_this.articleQuery();
						return false;
					}
				})
			},

			defaultKeywordsInit: function(){
				var _this = this;
				core.post('/admin/company/getDefaultKeywords',{'company_id': this.companyId},{
					showLoading: false,
					onSuccess: function(result){
						_this.default_keywords = result.data;
						return false;
					}
				})
			},

			companyInit: function(){
				var _this = this;
				core.post('/admin/company/getCompanyList',{},{
					showLoading: false,
					onSuccess: function(result){
						if(result.data.length > 0){
							$('.blank-right').addClass('hide');
							$('.right').removeClass('hide');
							_this.companys = result.data;
							for(var i=0;i<_this.companys.length;i++){
								if(i == 0){
									_this.companys[i].default = true;
									_this.companys[i].grey = false;
									_this.companyId = _this.companys[i].company_id;
									_this.companyName = _this.companys[i].name;
								}else{
									_this.companys[i].default = false;
									_this.companys[i].grey = true;
								}
							}
							if(result.data.length > 0){
								_this.customKeywordsInit(_this.companyId);
							}
						}else{
							$('.right').addClass('hide');
							$('.blank-right').removeClass('hide');
						}
						return false;
					},
					onError: function(result){
						console.log(result);
						return false;
					}
				});
			},

			companyInfo: function(){
				this.param.puborder = 0;
				this.param.effect = 0;
				this.param.favorite = 0;
				for(var i=0;i<this.companys.length;i++){
					if(this.companyId == this.companys[i].company_id){
						this.companys[i].default = true;
						this.companyName = this.companys[i].name;
						this.customKeywordsInit(this.companyId);
					}else{
						this.companys[i].default = false;
					}
				}
			},

			addKeyword: function(){
				var _this = this;
				if(this.keyword == ''){
					return false;
				}
				this.keyword = this.keyword.replace(/ /g,'')
				var newword = {
					keywords:this.keyword,
					enable: 1
				};
				var param = {company_id:this.companyId,keywords: this.keyword};
				core.post('/admin/company/addKeywords',param,{
					onSuccess: function(result){
						_this.keywords.push(newword);
						_this.articleQuery();
						return false;
					}
				})
				this.keyword = '';
			},

			changeStatus: function(value, enable){
				var _this = this;
				if(enable == 0){
					enable = 1;
				}else{
					enable = 0;
				}
				var param = {
					company_id: this.companyId,
					keywords: value,
					key: 'enable',
					value: enable
				}
				core.post('/admin/company/editKeywords',param,{
					showLoading: false,
					onSuccess: function(result){
						_this.keywords = _this.changeEnbale(_this.keywords, value, enable);
						_this.articleQuery();
						return false;
					}
				})
			},

			articleSetting: function(param){
				core.post('/admin/search/setting',param,{
					showLoading: false,
					onSuccess: function(result){
						console.log(result);
						return false;
					},
					onError: function(){
						return false;
					}
				})
			},

			changeEnbale: function(arr, val, enable){
				for(var i=0; i<arr.length; i++) {
				    if(arr[i].keywords == val) {
					    arr[i].enable = enable;
					    break;
				    }
				}
				return arr;
			},

			removeByValue: function(arr, val){
				for(var i=0; i<arr.length; i++) {
				    if(arr[i].keywords == val) {
					    arr.splice(i, 1);
					    break;
				    }
				}
				return arr;
			},

			removeKeyword: function(value){
				var _this = this;
				_this.keywords = _this.removeByValue(_this.keywords, value);
				var param = {
					company_id: this.companyId,
					keywords: value,
					key: 'status',
					value: 0
				}
				core.post('/admin/company/editKeywords',param,{
					showLoading: false,
					onSuccess: function(result){
						_this.articleQuery();
						return false;
					}
				})
			}
		},

		ready: function(){
			this.companyInit();
		}
	})

	//滚动翻页
	var loading = false;
	$(window).scroll(function(){
		var _scrollTop = $(window).scrollTop();
		var w_height = $(window).height();
		var d_height = $(document).height();
		if((_scrollTop+w_height)==d_height){
		     if(loading == false){
		     	indexVue.articlePageQuery();
		        // indexVue.getHighLight();

		    }
		}
	});

	// 企业列表
	$('body').on('click', '.left>.companys>p', function(){
		$(this).siblings('p').each(function(){
			$(this).removeClass('active');
			$(this).children('span').removeClass('house').addClass('house2');
		})
		$(this).addClass('active')
		$(this).children('span').removeClass('house2').addClass('house');
		indexVue.companyId = $(this).data('id');
		indexVue.companyInfo();
	})

	// 影响范围
	$('body').on('click','.effect>span', function(){
		var name = $(this).attr('name');
		var param = {
			data_id: $(this).data('id'),
			key: 'effect',
			value: 0
		}
		var flag = false;
		if($(this).hasClass('positive') || $(this).hasClass('negative')){
			flag = true;
		}
		if(name == 'positive'){
			$(this).removeClass('default-negative').removeClass('default-positive').addClass('positive');
			$(this).siblings('span').removeClass('negative').removeClass('default-negative').addClass('default-positive');
			if($(this).hasClass('positive')){
				param.value = 1;
			}
		}else{
			$(this).removeClass('default-negative').removeClass('default-positive').addClass('negative');
			$(this).siblings('span').removeClass('positive').removeClass('default-positive').addClass('default-negative');
			if($(this).hasClass('negative')){
				param.value = 2;
			}
		}
		if(flag){
			param.value = 0;
			var article_id = 0;
			$(this).removeClass('positive').removeClass('negative');
		}
		indexVue.articleSetting(param);
	})

	// 星级评价
	$('body').on('click','.star>label', function(){
		var id = $(this).data('id');
		var name = $(this).attr('name');
		var param = {
			data_id: id,
			key: 'star',
			value: $(this).attr('name')
		}
		$(this).removeClass('active');
		$(this).siblings('label').each(function(){
			$(this).removeClass('active');
		});
		indexVue.articleSetting(param);
	})

	// 收藏
	$('body').on('click', '.heart', function(){
		var param = {
			data_id: $(this).data('id'),
			key: 'favorite',
			value: 0
		}
		$(this).toggleClass('fullheart');
		var heart = $(this).hasClass('fullheart');
		if(heart){
			param.value = 1;
		}else{
			param.value = 2;
		}
		indexVue.articleSetting(param);
	})

})