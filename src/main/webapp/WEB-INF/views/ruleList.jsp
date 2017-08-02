<%@page import="ssm.com.domain.UserCrawler"%>
<%@page import="ssm.com.domain.CommonContext"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="_header.jsp"%>
<script type="text/javascript" src="${pageContext.request.contextPath }/resource/admin/scripts/project/ruleList.js"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath }/resource/admin/styles/project/ruleList.css"></link>

<body ng-app="ruleListApp" ng-controller="ruleListCtrl">
<%@include file="head.jsp"%>
<div class="container">
	规则列表
	
	{ruleList}
</div>
</body>
</html>