module.exports = {

	base : {
		getArea : '/admin/Area/getAreaList',										//获得省市列表
		getDomicile : '/admin/socialSecurity/getDomicileType',						//获取户籍性质列表
		getPayType : '/admin/socialSecurity/getPayType',							//获取缴纳类型
		findUser : '/admin/SocialSecurity/getStaffList',							//根据姓名查找员工
	},

	//首页
	index : {
		getStatInfo : '/admin/Index/getStatInfo',									//获取首页数据
		getCalendarData : '/admin/Index/getCalendarData',							//获取首页日历提醒数据
		getNoticeList : '/admin/Message/getMessageList',							//获得消息列表
		readNotice : '/admin/Message/readMessage',									//设置已读
		delNotice : '/admin/Message/deleteMessage',									//删除消息
	},

	//员工管理
	employee : {
		employeeList : '/admin/staff/getEntryList',									//入职登记列表
		regularList : '/admin/staff/getRegularList',								//转正员工列表
		renewList : '/admin/staff/getRenewList',									//续签员工列表
		dimissionList : '/admin/staff/getDimissionList',							//办离职员工列表
		reinstatementList : '/admin/staff/getReinstatementList',					//办复职员工列表
		changeList : '/admin/staff/getChangeList',									//调岗调薪列表
		changeRecordList : '/admin/staff/getChangeRecord',							//调岗调薪记录列表
		birthdayReminderList : '/admin/staff/getBirthdayReminderList',				//获取生日提醒类别

		initEntryBasic : '/admin/staff/addEntryBasic',								//获取新增员工模板配置
		organizationList : '/admin/staff/getOrganizationList',					    //获取机构(公司)、下属部门、下属职位的三级联动

		editExcelStaff : '/admin/staff/editExcelStaff',								//批量导入员工信息 上传后检验

		getStaffRecordList: '/admin/staff/getStaffRecordList',						//员工档案：获取员工列表
		getStaffRecordInfo: '/admin/staff/getStaffRecordInfo',						//员工档案：档案详情（基本资料/人事档案/调岗调薪记录/合同签订记录）
		salaryInfo: '/admin/staff/salaryInfo',										//员工档案:薪资福利
		getSecurityLogList : '/admin/socialSecurity/getSecurityLogList',			//员工档案:获取社保公积金缴纳记录




	},

	//社保公积金
	socialSecurity : {
		securityGrossList : '/admin/SocialSecurity/getSecurityGrossList',			//社保信息列表
		securityAdditionList : '/admin/socialSecurity/getSecurityAdditionList',		//社保补缴列表
		securityChangingList : '/admin/socialSecurity/getSecurityChangingList',		//社保补差列表
		securityCitySchemeInfo : '/admin/SocialSecurity/getSecurityCitySchemeInfo',	//获得社保基数
		securityDetail : ' 	/admin/socialSecurity/getSecurityDetail',				//获得保险明细表
		getSecuritySchemeList : '/admin/socialSecurity/getSecuritySchemeList',		//获取社保公积金规则列表
		delSecurityAdditionInfo : '/admin/socialSecurity/delSecurityAdditionInfo',	//删除补缴
		delSecurityChangingInfo : '/admin/socialSecurity/delSecurityChangingInfo',	//删除补差
		organizationList : '/admin/SocialSecurity/getOrganizationList',				//获取参保方案
		citySecurityScheme : '/admin/SocialSecurity/getCitySecurityScheme',			//获取社保缴纳地社保缴纳比例
		editAdjustmentData : '/admin/SocialSecurity/editAdjustmentData',				//批量调整基数 上传后校验
	},

	//权限管理
	auth : {
		userList : '/admin/auth/getUserList',										//获得管理账号列表
		forbid : '/admin/auth/forbid',												//启用/禁用操作员
		setAuth : '/admin/auth/setAuth',											//设置菜单权限
		delUser : '/admin/auth/delUser',											//删除用户
	},

	//设置
	setting : {
		getRemind : '/admin/Setting/getRemind',										//读取设置
	},

	//薪资管理
	salary : {
		infoList : '/admin/salary',										        	//取得薪资信息首页需要展示的数据接口
		getDepartment : '/admin/salary/getDepartment',								//高级查询获取部门列表
		doSalaryEdit : '/admin/salary/doEdit',											//编辑工资条信息
		delete : '/admin/salary/delete',											//删除单条工资信息
		resetDate : '/admin/salary/resetDate',										//重置发薪日期
		doReupload : '/admin/salary/doReupload',									//重新上传薪资信息接口
		remove : '/admin/salary/remove',											//取消发放
		batchDelete : '/admin/salary/batchDelete',									//删除豆腐块
		download : '/admin/salary/download',										//下载豆腐块
		templateAdd : '/admin/template/add',										//新建薪资模版页数据接口
		deleteField : '/admin/template/deleteField',								//删除自定义薪资字段
		doAddFirst : '/admin/template/doAddFirst',							    	//新建薪资模版执行 初次使用

		templateIndex : '/admin/template',							    			//获取公司薪资模版列表
		templateDelete : '/admin/template/delete',							    	//删除薪资模版
		templateCopy : '/admin/template/copy',							        	//复制薪资模版
		setDefaultTemplate : '/admin/template/setDefaultTemplate',					//设置默认薪资模版
		templateEdit : '/admin/template/edit',										//获取编辑薪资模版页信息接口
		doAdd : '/admin/template/doAdd',											//新建薪资接口执行
		doEdit : '/admin/template/doEdit',											//编辑薪资模版执行
		analysis : '/admin/costAnalysis',											//成本分析，页面初始接口
		getSubCost : '/admin/costAnalysis/getSubCost',								//成本分析，子饼图接口
		getOtherPage : '/admin/costAnalysis/getOtherPage',

		getDownloadTemplate : '/admin/template/getDownloadTemplate',				//获取下载模版裂口
		editView : '/admin/salary/editView',										//薪资上传预览修正
		upload : '/admin/salary/upload',											//上传薪资（重新上传）
	}

}