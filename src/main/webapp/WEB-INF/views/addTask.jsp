<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="_header.jsp"%>
<script type="text/javascript"
	src="${pageContext.request.contextPath }/resource/admin/scripts/project/addTask.js"></script>
<link rel="stylesheet"
	href="${pageContext.request.contextPath }/resource/admin/styles/project/addTask.css"></link>

<body ng-app="addTaskApp" ng-controller="addTaskCtrl">
	<%@include file="head.jsp"%>
	<div class="container">
		            
		<fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
		  <legend>新增任务</legend>
		</fieldset>
		<form class="layui-form" method="post">
			<div class="layui-form-item">
				<label class="layui-form-label">网站主页</label>
				<div class="layui-input-block">
					<input type="text" name="title" required lay-verify="required" ng-model="data.webBean.targetUrl"
						placeholder="请输入主页地址" autocomplete="off" class="layui-input">
				</div>
			</div>
			<div class="layui-form-item">
				<label class="layui-form-label">内容页</label>
				<div class="layui-input-block">
					<input type="text" name="title" required lay-verify="required" ng-model="data.webBean.helpUrl"
						placeholder="请输入内容页地址" autocomplete="off" class="layui-input">
				</div>
			</div>
			<div class="layui-form-item">
				<label class="layui-form-label">选择框</label>
				<div class="layui-input-block">
					<select name="rule" lay-verify="required" 
						ng-model="data.webBean.ruleId" 
						ng-options="rule.id as rule.name for rule in data.ruleList" 
						ng-change="ruleChange(data.webBean.ruleId)">
						<option value=""></option>
					</select>
				</div>
			</div>
			<div class="layui-form-item">
				<div class="layui-input-block">
					<button class="layui-btn" lay-submit lay-filter="formDemo" ng-click="formSubmit()">立即提交</button>
					<button type="reset" class="layui-btn layui-btn-primary">重置</button>
				</div>
			</div>
		</form>
		
	</div>
</body>

</html>