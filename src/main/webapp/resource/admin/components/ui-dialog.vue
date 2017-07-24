<!--
	Demo
	<ui-dialog :width="700" :height="600" :show.sync="true">
		<div slot="header">标题</div>
		<div slot="content">传递过来的内容</div>
		<div slot="footer">
			<button class="btn btn-primary">确定</button>
			<button class="btn btn-default" @click="showA = false">取消</button>
		</div>
	</ui-dialog>
-->

<style lang="sass">
@import "../styles/base/_global.scss";
@import "../styles/base/_mixin.scss";

$vue-dialog-padding : 20px;

html.vue-dialog-pop{
	overflow: hidden !important;
}

.vue-dialog-modal{
	position: fixed;
	top:0;
	right:0;
	bottom:0;
	left:0;
	z-index:999;
	background: rgba(0,0,0,0.3);
	overflow: auto;

	.vue-dialog{

		background: #fff;
		border-radius: $radius;
		overflow: hidden;
		position: absolute;
		/*top:50%;*/
		/*top:10px;*/
		left:50%;
		box-shadow:0 5px 10px rgba(0,0,0,0.3);
		@include translate(-50%,0);

		.vue-dialog-header{
			line-height: 23px;
			padding : $vue-dialog-padding $vue-dialog-padding $vue-dialog-padding/2 $vue-dialog-padding;
			font-size :$font-size-title;
			color : $color-primary;
		}

		.vue-dialog-content{
			padding : $vue-dialog-padding/2 $vue-dialog-padding $vue-dialog-padding $vue-dialog-padding;
			font-size :$font-size-info;
			color : $color-info;
			line-height:2;
		}

		.vue-dialog-footer{
			//padding : $vue-dialog-padding/2 $vue-dialog-padding $vue-dialog-padding $vue-dialog-padding;
			font-size :$font-size-title;
			color : $color-title;
			text-align: center;
			.btn + .btn {
				margin-left: 10px;
			}
		}

		.vue-dialog-close{
			font-size: 30px;
			color:#222;
			position: absolute;
			top:15px;
			right:20px;
			line-height: 1;
			cursor: pointer;

			&:hover{
				@include scale(1.2);
			}

		}
		.form-group {
			p {
				color: $color-title;
				margin-bottom: 10px;
			}
		}
	}
	.vue-dialog-tips {
	    strong {
	        display: block;
	        color: $color-title;
	        text-align: center;
	        font-size: 16px;
	        margin-bottom: 20px;
	    }
	    p {
	        margin: 0 auto;
	        padding: 5px 0;
	        width: 300px;
	        color: $color-info
	    }
	    .btn-box {
	        text-align: center;
	        padding-bottom: 20px;
	    }
	}
}


</style>

<template>

<div class="vue-dialog-modal" transition="vue-fade" v-show="show" tabindex="1" @keyup.esc="show = false" @dblclick="show = false" v-cloak>
	<div class="vue-dialog" :style="{width : width+'px',height : height+'px'}"  @dblclick.stop>
		<div class="vue-dialog-close" @click="show = false">
			<slot name="close">×</slot>
		</div>
		<div class="vue-dialog-header">
			<slot name="header"></slot>
		</div>
		<div class="vue-dialog-content">
			<slot name="content"></slot>
		</div>
		<div class="vue-dialog-footer">
			<slot name="footer"></slot>
		</div>
	</div>
</div>
</template>

<script>
module.exports = {

	props : {
		width : {default: 500 },
		height : Number,
		show : {default:false}
	},
	data : function(){
		return {
			width:500,
			height:300
		};
	},

	methods : {
		resize : function(){
			var $el = $(this.$el);
			var $dialog = $el.find('.vue-dialog');
			var top = ($el.height() - $dialog.height()) /2;
			if(top<=0) top = 0;
			$dialog.css({top:top});
		}
	},

	watch: {
		'show': function (val, oldVal) {
			if(val){
				var that = this;
				this.resize();
				this.$el.focus();
				// $(that.$el).find('textarea,input:not(:hidden)').eq(0).focus();
				$('html').addClass('vue-dialog-pop');
			}
			else
			{
				$('html').removeClass('vue-dialog-pop');
			}
		},
	}
}
</script>