<%@page import="ssm.com.domain.UserCrawler"%>
<%@page import="ssm.com.domain.CommonContext"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="_header.jsp"%>
<script type="text/javascript" src="${pageContext.request.contextPath }/resource/admin/scripts/project/taskList.js"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath }/resource/admin/styles/project/taskList.css"></link>

<body ng-app="taskListApp" ng-controller="taskListCtrl">
<%@include file="head.jsp"%>
<div class="container">
	<fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
	  <legend>任务列表</legend>
	</fieldset>
	 
	<table class="layui-table layui-form" lay-skin="line">
	  <colgroup>
	    <col width="150">
	    <col width="150">
	    <col width="200">
	    <col>
	  </colgroup>
	  <thead>
	    <tr>
	      <th>任务编号</th>
	      <th>主页</th>
	      <th>内容页</th>
	      <th>规则</th>
	      <th>状态</th>
	      <th>操作</th>
	    </tr> 
	  </thead>
	  <tbody>
	    <tr ng-repeat="task in data.taskList">
	    		<td>{{task.id}}</td>
	    		<td>{{task.targetUrl}}</td>
	    		<td>{{task.helpUrl}}</td>
	    		<td>{{task.ruleName}}</td>
	    		<td> 
				<input type="checkbox" ng-if="task.status == 1" checked="" name="close" data-value={{task.status}} data-id="{{task.id}}" lay-skin="switch" lay-filter="switchStatus" lay-text="停止|启动">
				<input type="checkbox" ng-if="task.status == 0" name="close" data-value={{task.status}} data-id="{{task.id}}" lay-skin="switch" lay-filter="switchStatus" lay-text="停止|启动">
			</td>
	    		<td>
	    			<button class="layui-btn layui-btn-small editTask" data-id="{{task.id}}"><i class="layui-icon"></i></button>
		    		<button class="layui-btn layui-btn-small" ng-click="delTask(task.id)"><i class="layui-icon"></i></button>
	    		</td>
	    </tr>
	  </tbody>
	</table>   
</div>
</body>
</html>