<%@page import="ssm.com.domain.UserCrawler"%>
<%@page import="ssm.com.domain.CommonContext"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="_header.jsp"%>
<script type="text/javascript" src="${pageContext.request.contextPath }/resource/admin/scripts/project/addRule.js"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath }/resource/admin/styles/project/addRule.css"></link>

<body ng-app="addRuleApp" ng-controller="addRuleCtrl">
<div class="container">
	新增规则
	<%
		UserCrawler uc = (UserCrawler) session.getAttribute(CommonContext.SESSION_USER);
	%>
	
	<%=uc.getUsername() %>
</div>
</body>
</html>