<%@page import="ssm.com.domain.User"%>
<%@page import="ssm.com.domain.CommonContext"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	User uc = (User) session.getAttribute(CommonContext.SESSION_USER);
%>

<div id="header">
	<div class="userinfo">
		欢迎您，<span><%=uc.getUsername() %></span>
	</div>
</div>
