<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="_header.jsp"%>
<script type="text/javascript" src="${pageContext.request.contextPath }/resource/admin/scripts/project/index.js"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath }/resource/admin/styles/project/index.css"></link>

<body ng-app="indexApp" ng-controller="indexCtrl">
<%@include file="head.jsp"%>
<div class="container">
	<div class="title">
		<p class="main-title">爱吃烤鸭管理系统</p>
		<p class="sub-title">爱吃烤鸭，味道好！</p>
	</div>
	<div class="content">
		<div class="block bg-olive" ng-click="redirect('newTask')">
			会员管理
		</div>
		
		<div class="block bg-yellow" ng-click="redirect('taskList')">
			积分管理
		</div>
		
		<div class="block bg-blue" ng-click="redirect('newRule')">
			进货管理
		</div>
		
		<div class="block bg-green" ng-click="redirect('ruleList')">
			账单管理
		</div>
	</div>
</div>
</body>
</html>