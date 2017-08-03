<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="_header.jsp"%>
<script type="text/javascript" src="${pageContext.request.contextPath }/resource/admin/scripts/project/addRule.js"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath }/resource/admin/styles/project/addRule.css"></link>

<body ng-app="addRuleApp" ng-controller="addRuleCtrl">
<%@include file="head.jsp"%>
<div class="container">
	<fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
	  <legend>新增规则</legend>
	</fieldset>
	<form class="layui-form" method="post">
		<div class="layui-form-item">
			<label class="layui-form-label">规则名称</label>
			<div class="layui-input-block">
				<input type="text" name="title" required lay-verify="required" ng-model="data.webBean.targetUrl"
					placeholder="规则名称" autocomplete="off" class="layui-input">
			</div>
		</div>
		<div class="layui-form-item">
			<div class="layui-input-block">
				<button class="layui-btn" lay-submit lay-filter="formDemo" ng-click="formSubmit()">保存</button>
			</div>
		</div>
	</form>
</div>
</body>
</html>