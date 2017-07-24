<!--

	ajax表单，支持 file upload
	2016/10/21 aiv367
	Demo
	<vue-form

		action="save.php"
		@callback-post-before="form1PostBefore"
		@callback-post-success="form1PostSuccess"
		@callback-post-error="form1PostError"

		:load="true"
		action-load="load.php"
		:action-load-params="{}"
		@callback-load-success="form1LoadSuccess"
		@callback-load-error="form1LoadError"


	>
	表单内容
	</vue-form>

-->
<style lang="sass">
@import "../styles/base/_global.scss";
@import "../styles/base/_mixin.scss";

.vue-form{

	.vue-form-notice{

		position: fixed;
		top:0;
		bottom:0;
		left:0;
		right:0;
		background: rgba(0,0,0,0.2);

		.vue-form-notice-content{
			position: absolute;
			top:50%;
			left:50%;
			background: #fff;
			padding: $info-padding;
			line-height:1;
			font-size: $info-font-size;
			color:$info-font-color;
			border-radius:$radius;
			border:1px solid $info-border-color;
			box-shadow: 0 5px 10px rgba(0,0,0,0.15);
			@include translate(-50%,-50%);
			@include animate;

			&.success{
				border:1px solid $info-success-border-color;
				background: $info-success-bg-color;
				color:$info-success-font-color;
			}

			&.error{
				border:1px solid $info-danger-border-color;
				background: $info-danger-bg-color;
				color:$info-danger-font-color;
			}
		}

	}
	.ui-table-form {
		margin-bottom: 20px
	}
}
</style>

<template>
<form method="post" :enctype="enctype" autocomplete="off" class="vue-form" :target="target" :action="action">
	<slot></slot>
	<div class="vue-form-notice" transition="vue-fade" v-show="notice">
		<div class="vue-form-notice-content" :class="{success : noticeStatus === 1, error : noticeStatus === 2}"> {{noticeText}} </div>
	</div>
</form>
</template>

<script>

// 依赖 jquery.form.js
require('../scripts/lib/jquery-form/3.51/jquery.form.js');

module.exports = {

	props : {

		enctype : {default:false},			//表单有文件域需要，值为 multipart/form-data
		action : {default:''},				//保存表单数据的URL
		load : {default:false},				//是否执行load
		reset : {default:''},				//是否重新设置组件配置
		target : {default:false},			//form target属性
		postOnAjax : {default:true},		//是否启用异步提交

		actionLoad : {default:''},		 	//读取表单数据的URL
		actionLoadParams : {default:{}}, 	//读取数据的请求参数

	},

	data : function(){
		return {
			notice : false,
			noticeText : '',
			noticeStatus : 0,//0.defaut 1.success 2.error
			noticeWait : 1500,//消息停留时间ms
		};
	},

	watch: {

		//当load 改变并值为 true 时候触发读取数据操作
		load : function(val, oldVal){
			if(val){
				this.loadFormData();
			}
		},

		//重新设置组件配置
		reset : function(val,oldVal){
			this.initAjaxForm();
		}

	},

	methods : {

		//读取表单数据
		loadFormData : function(){

			var that = this;
			this.noticeText="数据加载中...";
			this.noticeStatus = 0;
			this.notice = true;

			core.post(this.actionLoad,this.actionLoadParams,{
				showLoading : false,
				onSuccess : function(result){

					that.$emit('callback-load-success',result);

					that.notice = false;
					return false;

				},
				onError : function(result){

					that.$emit('callback-load-error',result);

					that.noticeStatus = 2;
					that.noticeText = result.msg;

					setTimeout(function(){
						that.notice = false;
					},that.noticeWait);

					return false;

				},
				onAjaxError : function(XMLHttpRequest, textStatus, errorThrown){

					that.noticeStatus = 2;
					that.noticeText = 'error code : '+textStatus;

					setTimeout(function(){
						that.notice = false;
					},that.noticeWait);

					return false;
				}
			});
		},

		//表单
		initAjaxForm : function(){

			var that = this;

			if(!this.postOnAjax) return false;

			//绑定ajax表单
			$(this.$el).unbind('submit').ajaxForm({

				url : that.action,
				dataType : 'json',
				beforeSubmit : function(arr, $form, options){

					var backval = that.$emit('callback-post-before',arr);

					if(backval){
						that.notice = true;
						that.noticeText = '提交中';
						that.noticeStatus = 0;
					}

					return backval;
				},
				success : function(result){

					//code 服务端返回状态码
					if(result.code==0){
						that.noticeStatus = 1;
						that.$emit('callback-post-success',result);
						that.noticeText = result.msg;

						setTimeout(function(){
							that.notice = false;
						},that.noticeWait);

					}else{
						that.noticeStatus = 2;
						that.notice = false;
						core.error(result.msg, function(){
							that.$emit('callback-post-error',result);
						})
					}

					

				},
				error : function(err){
					that.noticeText = 'error code : '+err.status;
					that.noticeStatus = 2;

					setTimeout(function(){
						that.notice = false;
					},that.noticeWait);
				},
				uploadProgress : function(evt,position,total,percentComplete){
					that.noticeText = '提交中：'+percentComplete + '%';
				}

			});

		}

	},

	ready : function(){

		var that = this;

		this.initAjaxForm();

		//读取数据
		if(this.load){
			this.loadFormData();
		}

	}

}
</script>