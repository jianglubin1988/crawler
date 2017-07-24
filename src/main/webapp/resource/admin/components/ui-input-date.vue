<!--

	日期选择组件
	2016/11/02 aiv367
	Demo
	<ui-input-date type="ym" name="hpf_begin_date" :value.sync="step4.form.default.hpf_begin_date.value" :disabled="step4.form.default.pay_hpf.value=='0'" />

-->
<style lang="sass">
</style>

<template>
	<input type="text" :readonly="readonly" class="vue-date" :placeholder="placeholder" :class="class" :disabled="disabled" :name="name" :style="style" v-model="value"/>
</template>

<script>
require('../scripts/lib/bootstrap-datepicker-master/dist/css/bootstrap-datepicker.css');
require('../scripts/lib/bootstrap-datepicker-master/dist/js/bootstrap-datepicker.js');
require('../scripts/lib/bootstrap-datepicker-master/dist/locales/bootstrap-datepicker.zh-CN.min.js');

module.exports = {

	props : {

		class : {default:'form-control date ui-w200'},
		style : {default:''},
		name : String,
		value : String,
		placeholder : String,
		readonly : {default:false},
		disabled : {default:false},
		value : String,
		type : {default:'ymd'},	//ymd：年月日|ym：年月
		opt:Object

	},

	watch:{

		//参数变动检测 目前只支持startDate、endDate
		opt : function(val,oldVal){

			var $el = $(this.$el);

			if(val.startDate){
				$el.datepicker('setStartDate',val.startDate);
			}

			if(val.endDate){
				$el.datepicker('setEndDate',val.endDate);
			}

		},

		value : function(val,oldVal){
			if(val!==oldVal){
				$(this.$el).datepicker('update',val);
				this.change();//input 的chang事件好像被datepicker阻止了，所以只能写到这里了
			}
		}
	},

	methods : {

		init : function(){

			var option = {};

			switch(this.type){
				case 'ymd':
					option = $.extend(true,{
						language : "zh-CN",
						format : 'yyyy-mm-dd',
					},this.opt);

					break;
				case 'ym':
					option = $.extend(true,{
						language: "zh-CN",
						format : 'yyyy-mm',
						minViewMode: 1
					},this.opt);
					break;
				default:
					option = $.extend(true,{
						language: "zh-CN"
					},this.opt);
					break;
			}

			$(this.$el).datepicker(option);
		},

		change : function(){

			this.$emit('change',this.value);
		}

	},

	ready : function(){

		this.init();
	}

}
</script>