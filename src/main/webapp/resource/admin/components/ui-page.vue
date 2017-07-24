<!-- 
Demo
<ui-page :page="2" :page-all="15" :page-show="10" :show-go="true" @callback-click="onPage"></ui-page>
 -->
<style lang="sass">
@import "../styles/base/_global.scss";
@import "../styles/base/_mixin.scss";
.vue-page{
	text-align: right;
	ul{
		display: inline-block;
		list-style: none;
		padding:0;
		margin:0;
		&:after,&:before{
			content:'';
			display:table;
			clear:both;
		}

		li{
			float: left
		}

		li+li{
			margin-left: 20px;
		}
	}

	.btn-group-pages{
		.btn-page:disabled{
			box-shadow:2px 2px 5px rgba(0,0,0,0.15) inset;
			opacity: 1;
			background: $color-primary !important;
			color:$color-primary-invert !important;
			border-top:1px solid darken($color-primary,15%)  !important;
			border-bottom:1px solid darken($color-primary,15%) !important;
		}
	}

	.input-group-input-page{
		.form-control{
			width: 50px;
			text-align: center;
			box-shadow:1px 1px 2px rgba(0,0,0,0.15) inset;
		}
	}

}
</style>

<template>
	<div class="vue-page" v-show="pageAll">
		<ul>
			<li>
				<div class="btn-group btn-group-pages">
					<button type="button" @click="first" class="btn" :disabled="page <= 1">首页</button>
					<button type="button" @click="prev" class="btn" :disabled="page <= 1">上页</button>
					<button type="button" @click="open(p)" class="btn btn-page" :disabled="page == p" v-for="p in pages">{{p}}</button>
					<button type="button" @click="next" class="btn" :disabled="page == pageAll">下页</button>
					<button type="button" @click="last" class="btn" :disabled="page == pageAll">末页</button>
				</div>
			</li>
			<li v-if="showGo">
				<div class="input-group input-group-input-page">
					<input type="text" class="form-control" number v-model="input" @keyup.enter="go">
					<span class="input-group-btn">
						<button class="btn btn-default" type="button" @click="go">Go</button>
					</span>
				</div>
			</li>
		</ul>
	</div>

</template>

<script>
module.exports = {

	props : {
		page : {default:0},
		pageAll : {default:0},
		pageShow : {default:10},
		showGo : {default:false}
	},

	data : function(){
		return {
			input:''
		}
	},

	computed : {

		//生成显示的页码数组
		pages: function () {

			this.page = parseInt(this.page);
			this.pageAll = parseInt(this.pageAll);
			this.pageShow = parseInt(this.pageShow);

			var rows = [];
			var pageHalf = parseInt(this.pageShow/2);
			var pageStart = this.page - pageHalf;
			var pageOver = this.page + pageHalf;

			if(pageStart<=0) pageStart = 1;
			if(pageOver>this.pageAll) pageOver = this.pageAll;

			if(this.pageAll > this.pageShow){
				if(this.page < pageHalf) pageOver += pageHalf - this.page;
				if(this.page > this.pageAll - pageHalf){

					pageStart -= pageHalf - (this.pageAll - this.page);

				}
			}

			for(var i = pageStart; i<=pageOver ; i++){
				rows.push(i);
			}

			return rows;
		}

	},

	methods : {

		first : function(){
			var p =1;
			this.$emit('callback-click',p);
			this.goTop();
		},

		prev : function(){
			var p = this.page - 1;
			if(p<0) p=1;
			this.$emit('callback-click',p);
			this.goTop();
		},

		next : function(){
			var p = this.page + 1;
			if(p>this.pageAll) p=this.pageAll;
			this.$emit('callback-click',p);
			this.goTop();
		},

		last : function(){
			var p = this.pageAll;
			this.$emit('callback-click',p);
			this.goTop();
		},

		open : function(p){
			this.$emit('callback-click',p);
			this.goTop();
		},

		go : function(){
			this.$emit('callback-click',this.input);
			this.goTop();
		},

		goTop : function(){
			document.body.scrollIntoView();
		}

	},

	ready : function(){
		this.input = this.page;
	}
}
</script>