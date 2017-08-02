<%@page import="ssm.com.domain.UserCrawler"%>
<%@page import="ssm.com.domain.CommonContext"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	UserCrawler uc = (UserCrawler) session.getAttribute(CommonContext.SESSION_USER);
%>

<div id="header">
	<div class="userinfo">
		欢迎您，<span><%=uc.getUsername() %></span>
	</div>
</div>
