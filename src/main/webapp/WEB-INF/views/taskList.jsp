<%@page import="ssm.com.domain.UserCrawler"%>
<%@page import="ssm.com.domain.CommonContext"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="_header.jsp"%>
<script type="text/javascript" src="${pageContext.request.contextPath }/resource/admin/scripts/project/taskList.js"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath }/resource/admin/styles/project/taskList.css"></link>

<body ng-app="taskListApp" ng-controller="taskListCtrl">
<div class="container">
	任务列表
	<%
		UserCrawler uc = (UserCrawler) session.getAttribute(CommonContext.SESSION_USER);
	%>
	
	<%=uc.getUsername() %>
	
	{taskList}
</div>
</body>
</html>