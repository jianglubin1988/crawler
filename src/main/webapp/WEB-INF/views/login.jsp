<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="_header.jsp"%>
<script type="text/javascript" src="${pageContext.request.contextPath }/resource/admin/scripts/project/login.js"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath }/resource/admin/styles/project/login.css"></link>
<body ng-app="loginApp" ng-controller="loginCtrl">

<div class="main">

	<div class="block">
		<div class="tabs">
			<p class="layui-this" ng-click="tab(1)">
				<i ng-show="data.tabIndex == 1" class="glyphicon glyphicon-chevron-right"></i>
				用户登录
			</p>
			<p ng-click="tab(2)"><i ng-show="data.tabIndex == 2" class="glyphicon glyphicon-chevron-right hide"></i>快速注册</p>
			<p ng-click="tab(3)"><i ng-show="data.tabIndex == 3" class="lglyphicon glyphicon-chevron-right hide"></i>忘记密码</p>
		</div>
		<div class="forms">
			<div class="login-form" ng-show="data.tabIndex == 1">
				<%-- <form class="layui-form form-content" action="${pageContext.request.contextPath }/login/signIn.do" method="post">
					<div class="layui-form-item">
						<label class="layui-form-label">用户名</label>
						<div class="layui-input-block">
							<input type="text" name="username" ng-keyup="customerKeyUp($event)" ng-model="data.user.username" lay-verify="required" placeholder="请输入您的用户名" autocomplete="off" class="layui-input" maxlength="20">
						</div>
					</div>
					<div class="layui-form-item">
						<label class="layui-form-label">密码</label>
						<div class="layui-input-block">
							<input type="password" name="password" ng-keyup="customerKeyUp($event)" ng-model="data.user.password" lay-verify="title" autocomplete="off" placeholder="请输入密码" class="layui-input" maxlength="16">
						</div>
					</div>
					<div class="layui-form-item">
						<div class="layui-input-block">
							<!-- <button class="layui-btn" type="submit">立即提交</button> -->
							<button class="layui-btn form-submit" type="button" ng-click="formSubmit()">立即提交</button>
						</div>
					</div>
				</form> --%>
				
				<form action="${pageContext.request.contextPath }/login/signIn.do" method="post">
				  <div class="form-group">
				    <label for="exampleInputEmail1">Email address</label>
				    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
				  </div>
				  <div class="form-group">
				    <label for="exampleInputPassword1">Password</label>
				    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
				  </div>
				  <button type="submit" class="btn btn-primary">Submit</button>
				</form>
				
			</div>

			<div class="register-form hide"  ng-show="data.tabIndex == 2">
				<form class="layui-form form-register" action="${pageContext.request.contextPath }/register/signUp.do" method="post">
					<div class="layui-form-item">
						<label class="layui-form-label">用户名</label>
						<div class="layui-input-block">
							<input type="text" name="username" ng-model="data.user.username" placeholder="请输入您的用户名" autocomplete="off" class="layui-input" maxlength="20">
						</div>
					</div>
					<div class="layui-form-item">
						<label class="layui-form-label">手机号</label>
						<div class="layui-input-block">
							<input type="text" name="mobile" ng-model="data.user.mobile" placeholder="请输入您的手机号码" autocomplete="off" class="layui-input" maxlength="11">
						</div>
					</div>
					<div class="layui-form-item">
						<label class="layui-form-label">新密码</label>
						<div class="layui-input-block">
							<input type="password" name="password" ng-model="data.user.password" autocomplete="off" placeholder="请输入密码" class="layui-input" maxlength="16">
						</div>
					</div>
					<div class="layui-form-item">
						<label class="layui-form-label">确认密码</label>
						<div class="layui-input-block">
							<input type="password" name="repassword" ng-model="data.user.repassword" autocomplete="off" placeholder="请再次输入密码" class="layui-input" maxlength="16">
						</div>
					</div>
					<div class="layui-form-item">
						<div class="layui-input-block">
							<button class="layui-btn form-submit" type="button" ng-click="formRegister()">立即提交</button>
						</div>
					</div>
				</form>
			</div>

			<div class="password-form hide" ng-show="data.tabIndex == 3">
				<form class="layui-form form-password" action="${pageContext.request.contextPath }/register/resetPassword.do" method="post">
					<div class="layui-form-item">
						<label class="layui-form-label">手机号</label>
						<div class="layui-input-block">
							<input type="text" name="mobile" ng-model="data.user.mobile" placeholder="请输入您的手机号码" autocomplete="off" class="layui-input" maxlength="11">
						</div>
					</div>
					<div class="layui-form-item">
						<label class="layui-form-label">验证码</label>
						<div class="layui-input-block">
							<input type="text" name="code" ng-model="data.user.code" placeholder="请输入验证码" autocomplete="off" class="layui-input input-code" maxlength="6">
							<button class="layui-btn btn-code" type="button" ng-click="sendMsg()">发送验证码</button>
						</div>
					</div>
					<div class="layui-form-item">
						<label class="layui-form-label">新密码</label>
						<div class="layui-input-block">
							<input type="password" name="password" ng-model="data.user.password" autocomplete="off" placeholder="请输入密码" class="layui-input" maxlength="16">
						</div>
					</div>
					<div class="layui-form-item">
						<label class="layui-form-label">确认密码</label>
						<div class="layui-input-block">
							<input type="password" name="repassword" ng-model="data.user.repassword" autocomplete="off" placeholder="请再次输入密码" class="layui-input" maxlength="16">
						</div>
					</div>
					<div class="layui-form-item">
						<div class="layui-input-block">
							<button class="layui-btn form-submit" type="button" ng-click="formPassword()">立即提交</button>
						</div>
					</div>
				</form>
			</div>

			<div class="form-tips"></div>
			
		</div>
		
	</div>
	
</div>

</body>

</html>