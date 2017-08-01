<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="_header.jsp"%>
<script type="text/javascript" src="${pageContext.request.contextPath }/resource/admin/scripts/project/index.js"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath }/resource/admin/styles/project/index.css"></link>

<body ng-app="indexApp" ng-controller="indexCtrl">
<div class="container">
	<div class="title">
		<p class="main-title">靠谱贷后数据采集系统</p>
		<p class="sub-title">靠谱采集，需要哪里采哪里，so easy!</p>
	</div>
	<div class="content">
		<div class="block bg-olive" ng-click="redirect('newTask')">
			新增任务
		</div>
		
		<div class="block bg-yellow" ng-click="redirect('taskList')">
			任务列表
		</div>
		
		<div class="block bg-blue" ng-click="redirect('newRule')">
			配置规则
		</div>
		
		<div class="block bg-green" ng-click="redirect('ruleList')">
			规则列表
		</div>
	</div>
</div>
</body>
</html>