<!--

	缴纳类型选择组件
	2016/11/03 aiv367
	Demo
	<vue-input-paytype></vue-input-paytype>

-->
<template>
	<select :class="class" :name="name" :disabled="disabled" v-model="value" @change="change" lazy>
		<option value="" selected v-if="loading">数据读取中...</option>
		<option value="{{row.id}}" v-for="row in rows">{{row.name}}</option>
	</select>
</template>

<script>
module.exports = {

	props : {

		class : {default:'form-control ui-w200'},
		disabled : {default:false},
        name : String,
        cityValue : {default:''},
        domicileValue : {default:''},
        value : String

	},

	data : function(){
		return {

			loading : false,
            rows : [],

		}
	},

    watch : {

        cityValue : function(val,oldVal){
            if(val!==oldVal)
            {
                this.load();
            }
        },

        domicileValue : function(val,oldVal){
            if(val!==oldVal)
            {
                this.load();
            }
        },
    },

	methods : {

        load : function(){

            if(this.cityValue=='' || this.domicileValue == '') return false;

            var that = this;
            this.loading = true;
            var params = {
                city_id : this.cityValue,
                domicile_type : this.domicileValue
            }

            core.post(url.base.getPayType,params,{
                showLoading:false,
                onSuccess : function(result){
                    that.loading = false;
                    that.rows = result.data;
                },
                onError : function(result){
                    that.loading = false;
                    that.rows = [];
                    return false;
                }
            });
        },

        change : function(){
            this.$emit('change',this.value);
        }

	},

	ready : function(){

		this.load();
	}

}
</script>