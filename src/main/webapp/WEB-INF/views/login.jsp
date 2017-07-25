<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="_header.jsp"%>
<script type="text/javascript" src="${pageContext.request.contextPath }/resource/admin/scripts/project/login.js"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath }/resource/admin/styles/project/login.css"></link>

<body>

<div class="main">

	<div class="block">
		<div class="tabs">
			<p>用户登录</p>
			<p>快速注册</p>
			<p>忘记密码</p>
		</div>
		<div class="forms">
			<form class="layui-form" action="/login/signIn.do" method="post">
				<div class="layui-form-item">
					<label class="layui-form-label">请输入您的用户名</label>
					<div class="layui-input-block">
						<input type="text" name="username" lay-verify="required" placeholder="请输入您的用户名" autocomplete="off" class="layui-input">
					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">请输入密码</label>
					<div class="layui-input-block">
						<input type="password" name="password" lay-verify="title" autocomplete="off" placeholder="请输入密码" class="layui-input">
					</div>
				</div>
				<div class="layui-form-item">
					<div class="layui-input-block">
						<button class="layui-btn" lay-submit="" lay-filter="demo1">立即提交</button>
						<button type="reset" class="layui-btn layui-btn-primary">重置</button>
					</div>
				</div>
			</form>
		</div>
	</div>



	
</div>

</body>

</html>