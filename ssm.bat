@echo off
echo 1构建ssm    2拷贝    3启动服务
set /p input=请选择
if %input% == 1 (
	echo building
	mvn install
)
if %input% == 2 (
	xcopy "D:\GitWorkspace\java\ssm\target\ssm.war" "D:\Tomcat 8.0\webapps\" /Y
)
if %input% == 3 (
	cd D:\Tomcat 8.0\bin\
	startup.bat
	cd D:\GitWorkspace\java\ssm
	echo startup finished
)
echo finished

