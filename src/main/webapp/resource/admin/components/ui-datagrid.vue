<!--

	数据列表组件
	2016/9/22 aiv367

	属性配置：
	nodeCheckAll : { default : '.check-all'}, //全选 checkbox node
	nodeCheckItem : { default : '.check-item'}, //行选 checkbox node
	nodeCheckStatus : { default : '.check-status'}, //自动设置 nodeCheckStatus 设定样式的目标 disabled 属性
	classSelected : { default : 'warning'},//行被选中的样式 tr.class

	示例：
	<vue-datagrid></vue-datagrid>

-->

<style lang="sass">
@import "../styles/base/_global.scss";
@import "../styles/base/_mixin.scss";
</style>

<template>
	<form autocomplete="off">
		<slot></slot>
	</form>
</template>

<script>
module.exports = {

	props : {
		nodeCheckAll : { default : '.check-all'}, //全选 checkbox node
		nodeCheckItem : { default : '.check-item'}, //行选 checkbox node
		nodeCheckStatus : { default : '.check-status'}, //选择状态
		classSelected : { default : 'warning'},//行被选中的样式 tr.class
		checkValue : {default:[]},//被选中的数据
	},

	methods : {

		init : function(){

			var that =this;
			var $el = $(this.$el);

			//全选
			$el.delegate(this.nodeCheckAll,'change',function(){
				$el.find(that.nodeCheckItem).prop('checked',this.checked).change();
			});

			//行选
			$el.delegate(this.nodeCheckItem,'change',function(){

				var $tr = $(this).closest('tr');
				var $checkboxAll = $el.find(that.nodeCheckAll);
				var $checkboxItems = $el.find(that.nodeCheckItem);

				this.checked ? $tr.addClass(that.classSelected) : $tr.removeClass(that.classSelected);
				$checkboxAll.prop('checked', $checkboxItems.length == $checkboxItems.filter(':checked').length);
console.debug('row selectd');
				_refreshDelsBtnStatus();

			});

			function _refreshDelsBtnStatus(){

				$el.find(that.nodeCheckStatus).prop('disabled',!$el.find(that.nodeCheckItem).filter(':checked').length);

				// 获得checked值
				setTimeout(function(){
					var ids = [];
					$el.find(that.nodeCheckItem+':checked').each(function(index,checkbox){
						ids.push(checkbox.value);
					});

					that.checkValue = ids;
				})
			}


			_refreshDelsBtnStatus();

		}

	},

	ready : function(){
		this.init();
	}

}
</script>