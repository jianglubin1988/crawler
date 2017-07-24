<!--

	文件本地预览组件，支持单文件，多文件
	2016/9/22 aiv367

	属性配置：
	id : String,															//file id属性
	name : String,															//file name属性
	accept : {default:'.jpg,.jpeg,.gif,.png'},								//允许文件类型
	multiple : {default:false},												//多文件选择
	width : {default:'100px'},												//预览框宽度
	height : {default:'100px'},												//预览框高度
	transition : {default:'vue-fade'},										//动画
	data : [],																//要显示的图片地址数据[url,url,...]
	ctrlZoom : {default:true},												//参看原图功能
	ctrlRemove : {default:true},											//移除图片功能
	class: {default:''},													//用户样式
	allowFiles : {default:0}
	dragEnabled : {default:true}											//启用拖拽文件

	示例：
	<vue-input-file-thumbnail name="face" :ctrl-zoom="false" :ctrl-remove="false"></vue-input-file-thumbnail>

-->
<style lang="sass">
@import "../styles/base/_global.scss";
@import "../styles/base/_mixin.scss";
.vue-input-file-thumbnail{

	font-size: 0;
	box-sizing: border-box;
	position: relative;
	.vue-input-file-thumbnail-item{

		cursor: pointer;
		display:inline-block;
		vertical-align: middle;
		text-align: center;
		width: 100%;
		height:100%;
		box-sizing: border-box;
		border:1px dashed $border-input-color;
		padding:1px;
		position: relative;
		margin-right: 10px;
		overflow: hidden;
		position: relative;

		&:before{
			position: absolute;
			top:50%;
			left:50%;
			content : "+";
			width: 40px;
			height: 40px;
			line-height: 40px;
			font-size: 30px;
			text-align: center;
			color:$border-input-color;
			margin-left: -20px;
			margin-top: -20px;
		}

		&:hover{
			border-color:$color-primary;
			&:after{
				color: $color-primary;
			}
		}

		&:last-child{
			margin-right:0;
		}

		//状态 加载中
		&.vue-input-file-thumbnail-item-loading{

			&:after{
				display:none;
			}

			.vue-input-file-thumbnail-loading{
				display: block;
			}

		}

		//状态 加载完成
		&.vue-input-file-thumbnail-item-loaded{

			&:after{
				display:none;
			}

			&:hover{
				.vue-input-file-thumbnail-item-ctrl{
					display: block;
				}
			}

			.vue-input-file-thumbnail-loading{
				display: none;
			}

		}

		input[type="file"]{
			display: none;
		}

		img{
			position: relative;
			max-width: 100%;
			max-height: 100%;
			display: inline-block;
		}

		/*放大 删除*/
		.vue-input-file-thumbnail-item-ctrl{
			position: absolute;
			top:5px;
			right:5px;
			display: none;
			line-height: 1;

			>a{
				display: inline-block;
				width:20px;
				height:20px;
				line-height:20px;
				font-size:12px;
				text-align:center;
				box-shadow: 0px 1px 3px rgba(0,0,0,0.2);
				border-radius:10px;
				margin-left:3px;
				text-decoration: none;
			}

			.vue-input-file-thumbnail-item-zoom{

				background:#2d2d2d;
				color:#fff;

			}

			.vue-input-file-thumbnail-item-remove{

				background:$color-danger;
				color:#fff;

			}
		}

		.vue-input-file-thumbnail-loading{
			width: 20px;
			height: 20px;
			position: absolute;
			top:50%;
			left:50%;
			margin-left:-10px;
			margin-top:-10px;
			display: none;
			background: url(data:image/gif;base64,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) no-repeat center center;
		}

	}
	&.vue-input-file-thumbnail-drag{

		border:2px dashed $color-danger;
		padding:10px;

		&:after{
			content : '文件拖拽到此处';
			display: block;
			position: absolute;
			top:50%;
			left:50%;
			color:#222;
			font-size: $font-size-title;
			color:$color-title;
			@include translate(-50%, -50%);
		}

		&.dragleave{


		}
	}

}
</style>

<template>
	<div class="vue-input-file-thumbnail" :class="class">

		<template v-if="!fileReader">
			<input type="file" name="{{name}}" id="{{id}}" accept="{{accept}}"/>
			<span class="text-danger"> 您的浏览器不支持fileReader </span>
		</template>

		<template v-else>

			<div class="vue-input-file-thumbnail-item" :class="{'vue-input-file-thumbnail-item-loading' : item.loading == 1 , 'vue-input-file-thumbnail-item-loaded' : item.loading == 2}" :style="{width:width,height:height,lineHeight:height}" v-for="item in files" v-show="item.loading > 0 || !multiple" :transition="transition" @click="browseModify(item)">

				<input type="file" name="{{name}}" id="{{id}}" accept="{{allowFilesType}}" @change="change($event,item)"/>

				<img :src="item.base64" :alt="item.name" v-if="item.loading == 2">

				<div class="vue-input-file-thumbnail-item-ctrl">
					<a class="vue-input-file-thumbnail-item-zoom" :href="item.base64" target="_blank" @click.stop v-if="ctrlZoom">🔍</a>
					<a class="vue-input-file-thumbnail-item-remove" href="javascript:;" @click.stop="remove(item)" v-if="ctrlRemove">×</a>
				</div>

				<div class="vue-input-file-thumbnail-loading"></div>

			</div>

			<div class="vue-input-file-thumbnail-item" @click="browse" :style="{width:width,height:height,lineHeight:height}" v-if="showAdd"></div>

		</template>

	</div>
</template>

<script>
module.exports = {

	props : {
		id : String,															//file id属性
		name : String,															//file name属性
		multiple : {default:false},												//多文件选择
		width : {default:'100px'},												//预览框宽度
		height : {default:'100px'},												//预览框高度
		transition : {default:'vue-fade'},										//动画
		ctrlZoom : {default:true},												//参看原图功能
		ctrlRemove : {default:true},											//移除图片功能
		class : {default:''},													//用户样式
		data : [],																//要显示的图片地址数据[url,url,...]
		allowFiles : {default:0},												//允许上传文件数 0.不限制
		allowFilesSize : {default:0},											//允许上传的文件尺寸 0.不限制 单位字节
		allowFilesType : {default:'.jpg,.jpeg,.gif,.png'},						//允许上传的文件类型 空串.不限制
		errorFilesSize : {default:'文件尺寸错误'},								//错误文件尺寸提示信息
		errorFilesType : {default:'文件类型错误'},								//错误文件类型提示信息

	},

	data : function(){
		return {
			fileReader : true, //是否支持fileReader
			files : [],
			showAdd : true //是否显示添加按钮
		};
	},

	watch : {

		//是否显示添加按钮
		files : function(newVal,oldVal){

			if(this.multiple && this.allowFiles == 0){
				this.showAdd = true;
			}
			else if(this.multiple && this.allowFiles > newVal.length)
			{
				this.showAdd = true;
			}
			else if(!this.multiple && newVal.length<1)
			{
				this.showAdd = true;
			}
			else
			{
				this.showAdd = false;
			}
		}

	},

	methods : {

		//检测浏览器是否支持fileReader
		check : function(){
			if(!(window.FileReader && window.File && window.FileList && window.Blob)){
				this.fileReader = false;
			}
		},

		//打开文件浏览对话框
		browse : function(){

			var that = this;

			this.files.push({
				loading : 0, //0.未加载 1.加载中 2.加载完毕
				base64 : '',
				fileObj : {}//file原生对象
			});

			setTimeout(function(){
				var $input = $(that.$el).find(':file:last');
				that.files[that.files.length-1].$el = $input;
				$input.click();
			});

		},

		//修改文件
		browseModify : function(item){
			item.$el.click();
		},

		//file发生改变
		change : function(evt,item){

			var that = this;

			if(evt.target.files.length){

				item.fileObj = evt.target.files[0];

				//检查文件类型
				var ext = ('.'+item.fileObj.name.substring(item.fileObj.name.lastIndexOf('.') + 1)).toLowerCase();
				if(this.allowFilesType!=='' && this.allowFilesType.indexOf(ext)==-1){
					alert(this.errorFilesType);
					this.remove(item);
					return false;
				}

				//检查文件尺寸
				if(this.allowFilesSize && this.allowFilesSize < item.fileObj.size){
					alert(this.errorFilesSize);
					this.remove(item);
					return false;
				}


				that.preview(item);
			}
		},

		//删除
		remove : function(item){
			this.files.$remove(item);
		},

		//预览
		preview : function(item){

			var that = this;
			var reader = new FileReader();
			reader.onload = function(e){
				item.base64 = e.target.result;
				item.loading = 2;//加载完毕
			}
			reader.readAsDataURL(item.fileObj);
			item.loading = 1;//加载中
		},

		//数据回显 data = [url]
		showData : function(){

			var that = this;

			this.data.forEach(function(item){

				var fileData = {
					loading : 2, //0.未加载 1.加载中 2.加载完毕
					base64 : item,
					fileObj : {}//file原生对象
				};
				that.files.push(fileData);
			});

			//dom创建有延时
			setTimeout(function(){
				var $inputs = $(that.$el).find(':file');
				that.files.forEach(function(file,index){
					file.$el = $inputs[index];
				});
			});


		},

		//拖拽上传
		drag : function(){

			// var that = this;
			// var $el = $(this.$el);

// document.addEventListener("dragenter", function(e){

// 	that.dragStatus = 'dragenter'
//     // test.style.borderColor = 'red';
// }, true);
// document.addEventListener("dragleave", function(e){
// 	that.dragStatus = 'dragleave'
// }, true);


/*
			$(document).on({
				dragleave:function(e){		//拖离
					// e.preventDefault();
					// e.stopPropagation();
					// console.debug('拖离');
					$el.removeClass('vue-input-file-thumbnail-drag');
				},
				drop:function(e){			//拖后放
					e.preventDefault();
					e.stopPropagation();

					// $el.removeClass('vue-input-file-thumbnail-drag');
					// console.debug('拖后放');
				},
				dragenter:function(e){		//拖进
					// e.preventDefault();
					// e.preventDefault();
					console.debug('拖进');
					$el.addClass('vue-input-file-thumbnail-drag');
				},
				// dragover:function(e){		//拖来拖去
				// 	console.debug('拖来拖去');
				// 	e.preventDefault();
				// }
			});
*/
		}

	},

	ready : function(){

		this.check();

		this.showData();
		// this.drag();

		//如果是多图上传 ,文件名没写[]，自动补全文件名
		if(this.multiple && this.name.substr(-2)!='[]'){
			this.name +='[]';
		}

	}
}
</script>