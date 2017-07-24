<!--

	省市选择组件
	2016/11/02 aiv367
	Demo
	<vue-input-area></vue-input-area>

-->
<template>
	<select :class="class" :name="provinceName" :disabled="disabled" v-model="provinceValue" @change="loadCity" lazy>
		<option value="" selected v-if="provinceLoading">数据读取中...</option>
        <option value="">请选择</option>
		<option value="{{row.id}}" v-for="row in provinceRows">{{row.name}}</option>
	</select>
	<select :class="class" :name="cityName" :disabled="disabled" v-model="cityValue" @change="change" lazy>
		<option value="" selected v-if="cityLoading">数据读取中...</option>
        <option value="">请选择</option>
		<option value="{{row.id}}" v-for="row in cityRows">{{row.name}}</option>
	</select>
</template>

<script>
module.exports = {

	props : {

		class : {default:'form-control ui-width-auto'},
		disabled : {default:false},
		provinceName : String,
		cityName : String,
		provinceValue : {default:''},
		cityValue : {default:''}

	},

	data : function(){
		return {

			provinceLoading : false,
            cityLoading : false,
            provinceRows : [],
            cityRows : [],

		}
	},

    watch : {
        provinceValue : function(val,oldVal){

            if(val!==oldVal)
            {
                this.loadCity();
            }
        },
    },

	methods : {

		//读取省份列表
        loadProvince : function(){

            var that = this;
            var params = {type : "p"};
            this.provinceLoading = true;
            core.post(url.base.getArea,params,{
                showLoading:false,
                onSuccess : function(result){
                    that.provinceRows = result.data;
                    that.provinceLoading = false;
                    that.cityRows = [];
                    that.loadCity();

                },
                onError : function(){
                    that.provinceLoading = false;
                    that.cityRows = [];
                    return false;
                }
            });

        },

        //读取城市列表
        loadCity : function(){

            if(this.provinceValue=='') return false;
            var that = this;
            var params = {
                type : "c",
                id:that.provinceValue
            };

            that.cityLoading = true;
            core.post(url.base.getArea,params,{
                showLoading:false,
                onSuccess : function(result){
                    that.cityRows = result.data;
                    that.cityLoading = false;
                },
                onError : function(result){
                    return false;
                }
            });

            this.change();
        },

        change : function(){
            this.$emit('change',this.provinceValue,this.cityValue);
        }

	},

	ready : function(){

		this.loadProvince();
	}

}
</script>