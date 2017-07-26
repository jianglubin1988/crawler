package ssm.com.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import ssm.com.domain.UserCrawler;
import ssm.com.service.UserCrawlerService;
import ssm.com.utils.DataUtils;
import ssm.com.utils.EncoderUtils;

@Controller
@RequestMapping("/register")
public class RegisterController {
	
	private static Logger log = Logger.getLogger(RegisterController.class);

	@Resource
	private UserCrawlerService service;
	
	/**
	 * 注册
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/signUp")  
    public @ResponseBody Map<String,Object> register(HttpServletRequest request,HttpServletResponse response) throws IOException{
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			String username = request.getParameter("username");
			String password = request.getParameter("password");
			String mobile = request.getParameter("mobile");
			UserCrawler uc = service.selectByUsername(username);
			if(uc == null) {
				uc = new UserCrawler();
				String enPwd = EncoderUtils.encodeByMd5(password);
				uc.setUsername(username);
				uc.setPassword(enPwd);
				uc.setMobile(mobile);
				service.insertSelective(uc);
				map = DataUtils.successData("注册成功");
			}else {
				map = DataUtils.errorData("用户已存在");
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
        return map;  
    }
	
	/**
	 * 忘记密码
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/resetPassword")  
    public @ResponseBody Map<String,Object> resetPwd(HttpServletRequest request,HttpServletResponse response) throws IOException{
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			String username = request.getParameter("username");
			String password = request.getParameter("password");
			
			UserCrawler uc = service.selectByUsername(username);
			if(uc != null) {
				String enPwd = EncoderUtils.encodeByMd5(password);
				map = DataUtils.successData("密码重置成功");
			}else {
				map = DataUtils.errorData("用户不存在");
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
        return map;  
    }
	
	/**
	 * 短信验证码
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/sendMsg")  
    public @ResponseBody Map<String,Object> sendMsg(HttpServletRequest request,HttpServletResponse response) throws IOException{
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			String username = request.getParameter("username");
			String password = request.getParameter("password");
			
			UserCrawler uc = service.selectByUsername(username);
			if(uc == null) {
				String enPwd = EncoderUtils.encodeByMd5(password);
				map = DataUtils.successData("验证码");
			}else {
				map = DataUtils.errorData("用户已存在");
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
        return map;  
    }
	
}
