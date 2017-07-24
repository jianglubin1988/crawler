require('../common/common.js');
require('../../styles/project/person_info.scss');

$(function(){

	new Vue({
		el: '#person-info',
		data: {
			user: {},
			houseInfo: {},
			carInfo: {},
			houses: [],
			cars:[],
			carTypes:[],
			customerId: '',
			region:{
				province: {},
				city:{},
				district:{}
			},
			car:{
				brand:{},
				series:{},
				model:{}
			},
			license: {
				year:{},
				month:{}
			},
			licenseYear:{},
			licenseMonth:{},
			car_sync: false,
			house_sync: false
		},
		methods: {

			sub: function (v1, v2) {
		    	var balance = v1 - v2;
		      	return balance.toFixed(2);
		    },

			saveHouse: function(){
				if(!this.validHouse()){
					return false;
				}
				var _this = this;
				core.post('/customer/house/getAreaInfo', {'area_id':this.houseInfo.district},{
					showLoading: false,
					onSuccess: function(result){
						_this.houseInfo.province = result.data.province;
						_this.houseInfo.city = result.data.city;
						_this.houseInfo.district = result.data.district;
						_this.houseInfo.customer_id = _this.customerId;
						core.post('/customer/house/addHouse',_this.houseInfo,{
							showLoading: false,
							onSuccess: function(result){
								_this.initHouse();
								_this.initBaseInfo();
								_this.house_sync = false;
							}
						})
						return false;
					}
				})
			},

			saveCar: function(){
				if(!this.validCar()){
					return false;
				}
				var _this = this;
				core.post('/customer/car/addCar',this.carInfo,{
					showLoading: false,
					onSuccess: function(result){
						_this.initCar();
						_this.initBaseInfo();
						_this.car_sync = false;
						return false;
					}
				})
			},

			initProvince: function(){
				var _this = this;
				core.post('/customer/car/getProvince',{},{
					showLoading: false,
					onSuccess: function(result){
						_this.region.province = result.data;
						return false;
					}
				})
			},

			addHouse: function(){
				this.houseInfo = {province:'',city:'',district:''};
				$('.form-control').siblings('i').remove();
				this.initProvince();
				this.house_sync = true;
			},

			addCar: function(){
				this.carInfo = {
						price:0,
						customer_id:this.customerId,
						province:'',
						city:'',
						brand:'',
						series:'',
						model:'',
						year:'',
						month:''
					};
				var _this = this;
				$('.form-control').siblings('i').remove();
				core.post('/customer/car/getCategory',{},{
					showLoading: false,
					onSuccess: function(result){
						_this.car.brand = result.data;
						_this.initProvince();
						_this.car_sync = true;
						return false;
					}
				})
			},

			delCar: function(id){
				var _this = this;
				core.confirm('确定删除该车辆吗？', function(status){
					if(status){
						core.post('/customer/car/delCar',{'id':id},{
							showLoading: false,
							onSuccess: function(result){
								_this.initCar();
								_this.initBaseInfo();
								_this.car_sync = false;
								return false;
							}
						})
					}
				})
			},

			delHouse: function(id){
				var _this = this;
				var customerId = $('body').data('customerId');
				var param = {'id':id,'customer_id': customerId};
				core.confirm('确定删除该房产吗？', function(status){
					if(status){
						core.post('/customer/house/delHouse',param,{
							showLoading: false,
							onSuccess: function(result){
								_this.initHouse();
								_this.initBaseInfo();
								return false;
							}
						})
					}
				})
			},

			showTip: function(target, tip){
				target.siblings('i').remove();
				var html = '<i class"err-info">'+tip+'</i>';
				$(html).insertAfter(target);
			},

			v_houseProvince: function(){
				var $houseProvince = $('#houseProvince');
				if(this.houseInfo.province == '' || this.houseInfo.province == undefined){
					this.showTip($houseProvince, '请选择省份');
					return false;
				}
				return true;
			},

			v_houseCity: function(){
				var $houseCity = $('#houseCity');
				if(this.houseInfo.city == '' || this.houseInfo.city == undefined){
					this.showTip($houseCity, '请选择城市');
					return false;
				}
				return true;
			},

			v_houseDistrict: function(){
				var $houseDistrict = $('#houseDistrict');
				$houseDistrict.siblings('i').remove();
				if(this.houseInfo.district == '' || this.houseInfo.district == undefined){
					this.showTip($houseDistrict, '请选择区县');
					return false;
				}
				return true;
			},

			v_houseBlock: function(){
				var $houseBlock = $('#houseBlock');
				$houseBlock.siblings('i').remove();
				if(this.houseInfo.name == '' || this.houseInfo.name == undefined){
					this.showTip($houseBlock, '请输入小区名称');
					return false;
				}
				return true;
			},

			v_size: function(){
				var $size = $('#houseSize');
				$size.siblings('i').remove();
				if(!validate.validAmount(this.houseInfo.size)){
					this.showTip($size, '请输入有效面积')
					return false;
				}
				return true;
			},

			validHouse: function(){
				if(this.v_houseProvince() && this.v_houseCity() && this.v_houseDistrict() && this.v_houseBlock() && this.v_size()){
					return true;
				}
				return false;
			},

			provinceChange: function(){
				var _this = this;
				var $houseProvince = $('#houseProvince');
				$houseProvince.siblings('i').remove();
				var areaId = this.houseInfo.province;
				core.post('/customer/car/getCity',{'area_id':areaId},{
					showLoading: false,
					onSuccess: function(result){
						_this.region.city = result.data;
						_this.region.district = {};
						return false;
					}
				})
			},

			cityChange: function(){
				var _this = this;
				var $houseCity = $('#houseCity');
				$houseCity.siblings('i').remove();
				core.post('/customer/car/getDistrict',{'area_id':this.houseInfo.city},{
					showLoading: false,
					onSuccess: function(result){
						_this.region.district = result.data;
						return false;
					}
				})
			},

			isEmpty: function(obj){
				var result;
				(obj == '' || obj == undefined) ? result = true : result = false;
				return result;
			},

			v_carBrand: function(){
				var $carBrand = $('#carModel');
				if(this.carInfo.brand == '' || this.carInfo.brand == undefined){
					this.showTip($carBrand, '请选择品牌');
					return false;
				}
				return true;
			},

			v_carSeries: function(){
				var $carSeries = $('#carModel');
				if(this.carInfo.series == '' || this.carInfo.series == undefined){
					this.showTip($carSeries, '请选择车系');
					return false;
				}
				return true;
			},

			v_carModel: function(){
				var $carModel = $('#carModel');
				if(this.carInfo.model == '' || this.carInfo.model == undefined){
					this.showTip($carModel, '请选择车型');
					return false;
				}
				return true;
			},

			v_carYear: function(){
				var $carYear = $('#carMonth');
				if(this.carInfo.year == '' || this.carInfo.year == undefined){
					this.showTip($carYear, '请选择年份');
					return false;
				}
				return true;
			},

			v_carMonth: function(){
				var $carMonth = $('#carMonth');
				if(this.carInfo.month == '' || this.carInfo.month == undefined){
					this.showTip($carMonth, '请选择月份');
					return false;
				}
				return true;
			},

			v_carProvince: function(){
				var $carProvince = $('#carCity');
				if(this.carInfo.province == '' || this.carInfo.province == undefined){
					this.showTip($carProvince, '请选择省份');
					return false;
				}
				return true;
			},

			v_carCity: function(){
				var $carCity = $('#carCity');
				if(this.carInfo.city == '' || this.carInfo.city == undefined){
					this.showTip($carCity, '请选择城市');
					return false;
				}
				return true;
			},

			v_carKilometers: function(){
				var $carKilometers = $('#carKilometers');
				$carKilometers.siblings('i').remove();
				if(this.carInfo.kilometers == '' || this.carInfo.kilometers == undefined){
					this.showTip($carKilometers, '请输入行驶里程');
					return false;
				}
				this.calcCar();
				return true;
			},

			validCar: function(){
				if(this.v_carBrand() && this.v_carSeries()
					&& this.v_carModel() && this.v_carYear()
					&& this.v_carMonth() && this.v_carProvince()
					&& this.v_carCity() && this.v_carKilometers()){
					return true;
				}
				return false;
			},

			brandChange: function(){
				var _this = this;
				var $carBrand = $('#carModel');
				$carBrand.siblings('i').remove();
				var arr = this.carInfo.brand.split('-');
				this.carInfo.brandLabel = arr[1];
				core.post('/customer/car/getModel',{'value':arr[0]},{
					showLoading: false,
					onSuccess: function(result){
						_this.car.series = result.data;
						_this.car.model = {};
						_this.licenseYear = {};
						_this.licenseMonth = {};
						_this.carInfo.year = '';
						_this.carInfo.month = '';
						_this.calcCar();
						return false;
					}
				})
			},

			seriesChange: function(){
				var _this = this;
				var $carSeries = $('#carModel');
				$carSeries.siblings('i').remove();
				var arr = this.carInfo.series.split('-');
				this.carInfo.seriesLabel = arr[1];
				core.post('/customer/car/getStyle',{'value':arr[0]},{
					showLoading: false,
					onSuccess: function(result){
						_this.car.model = result.data;
						_this.licenseYear = {};
						_this.licenseMonth = {};
						_this.carInfo.year = '';
						_this.carInfo.month = '';
						_this.calcCar();
						return false;
					}
				})
			},

			modelChange: function(){
				var _this = this;
				var $carModel = $('#carModel');
				$carModel.siblings('i').remove();
				var arr = this.carInfo.model.split('-');
				this.carInfo.name = this.carInfo.brandLabel + ' ' + this.carInfo.seriesLabel + ' ' + arr[2];
				this.carInfo.car_id = arr[0];
				core.post('/customer/car/getYear',{'product_year':arr[1]},{
					showLoading: false,
					onSuccess: function(result){
						_this.licenseYear = result.data;
						_this.licenseMonth = {};
						_this.carInfo.month = '';
						_this.calcCar();
						return false;
					}
				})
			},

			yearChange: function(){
				var arr = this.carInfo.model.split('-');
				var _this = this;
				var $carYear = $('#carMonth');
				$carYear.siblings('i').remove();
				var param = {'product_year':arr[1],'select_year':this.carInfo.year};
				core.post('/customer/car/getMonth',param,{
					showLoading: false,
					onSuccess: function(result){
						_this.licenseMonth = result.data;
						_this.calcCar();
						return false;
					}
				})
			},

			monthChange: function(){
				var $carMonth = $('#carMonth');
				$carMonth.siblings('i').remove();
				if(this.carInfo.month < 10){
					this.carInfo.date = this.carInfo.year + '-0' + this.carInfo.month;
				}else{
					this.carInfo.date = this.carInfo.year + '-' + this.carInfo.month;
				}
				this.calcCar();
			},

			carProvinceChange: function(){
				var _this = this;
				var $carProvince = $('#carCity');
				$carProvince.siblings('i').remove();
				var arr = this.carInfo.province.split('-');
				this.carInfo.provinceLabel = arr[1];
				core.post('/customer/car/getCity',{'area_id':arr[0]},{
					showLoading: false,
					onSuccess: function(result){
						_this.region.city = result.data;
						_this.region.district = {};
						_this.calcCar();
						return false;
					}
				})
			},

			carCityChange: function(){
				var $carCity = $('#carCity');
				$carCity.siblings('i').remove();
				var arr = this.carInfo.city.split('-');
				this.carInfo.area = this.carInfo.provinceLabel + ' ' + arr[1];
				this.calcCar();
			},

			validCarinfo: function(){
				if(this.isEmpty(this.carInfo.brand) || this.isEmpty(this.carInfo.series)
					|| this.isEmpty(this.carInfo.model) || this.isEmpty(this.carInfo.year)
					|| this.isEmpty(this.carInfo.month) || this.isEmpty(this.carInfo.province)
					|| this.isEmpty(this.carInfo.city) || this.isEmpty(this.carInfo.kilometers)){
					return false;
				}
				return true;
			},

			calcCar: function(){
				if(this.validCarinfo()){
					var _this = this;
					core.post('/customer/car/getReckon',this.carInfo,{
						showLoading: false,
						onSuccess: function(result){
							_this.carInfo.price = result.data.value;
							return false;
						}
					})
				}else{
					this.carInfo.price = 0;
				}
			},

			initHouse: function(){
				var _this = this;
				core.post('/customer/house/getHouseList',{'customer_id':this.customerId},{
					showLoading: false,
					onSuccess: function(result){
						_this.houses = result.data;
						_this.initHeight();
						return false;
					}
				})
			},

			initCar: function(){
				var _this = this;
				core.post('/customer/car/getCarList',{'id':this.customerId},{
					showLoading: false,
					onSuccess: function(result){
						_this.cars = result.data;
						_this.initHeight();
						return false;
					}
				})
			},

			initBaseInfo: function(){
				var _this = this;
				core.post('/customer/index/getCustomerInfo',{id:this.customerId},{
					showLoading: false,
					onSuccess: function(result){
						_this.user = result.data;
						return false;
					}
				})
			},


			init: function(){
				var _this = this;
				var customerId = $('body').data('customerId');
				this.customerId = customerId;
				this.initCharts();
				this.initBaseInfo();
				this.initHouse();
				this.initCar();
			},

			initCharts: function(customerId){
				var _this = this;
				core.post('/customer/Car/getLine',{'id':this.customerId},{
					showLoading: false,
					onSuccess: function(result){
						var xData = new Array();
						var yData = new Array();
						result.data.forEach(function(val){
							xData.push(val.date.toString());
							yData.push(val.value.toString());
						})
						_this.getCharts(yData, xData);
						return false;
					}
				})
			},

			getCharts: function(xData, yData){
				// 基于准备好的dom，初始化echarts实例
			    var myChart = echarts.init(document.getElementById('charts'));
			    // 指定图表的配置项和数据
			    var option = {
				    tooltip: {
				        trigger: 'axis',
				        position: function (pt) {
				            return [pt[0], '10%'];
				        }
				    },
				    title: {
				        left: 'center',
				        text: '资产变动情况',
				    },
				    xAxis: {
				        type: 'category',
				        name: '月份',
				        boundaryGap: false,
				        data: yData
				    },
				    yAxis: {
				        type: 'value',
				        name: '资产变动（万元）',
				        boundaryGap: [0, '100%']
				    },
				    series: [
				        {
				            name:'资产变动（万元）',
				            type:'line',
				            smooth:true,
				            symbol: 'none',
				            sampling: 'average',
				            itemStyle: {
				                normal: {
				                    color: 'rgb(255, 70, 131)'
				                }
				            },
				            areaStyle: {
				                normal: {
				                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
				                        offset: 0,
				                        color: 'rgb(255, 158, 68)'
				                    }, {
				                        offset: 1,
				                        color: 'rgb(255, 70, 131)'
				                    }])
				                }
				            },
				            data: xData
				        }
				    ]
				};
			    // 使用刚指定的配置项和数据显示图表。
			    myChart.setOption(option);
			},

			initHeight: function(){
				var w_height = $(window).height();
				var h_length = this.houses.length;
				var c_length = this.cars.length;
				var _height = 250;
				if(h_length != 0 && c_length != 0){
					_height = (h_length * 51) + (c_length * 51) - 150;
				}
				console.log(h_length);
				console.log(c_length);
				var height = w_height + _height;
				$('.right').height(height);
				$('.container-right').height(height);
			}
		},
		ready: function(){
			this.init();
		}
	})

})