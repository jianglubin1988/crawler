package ssm.com.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import ssm.com.domain.UserCrawler;
import ssm.com.service.UserCrawlerService;
import ssm.com.utils.DataUtils;
import ssm.com.utils.EncoderUtils;

@Controller
@RequestMapping("/login")
public class LoginController {
	
	private static Logger log = Logger.getLogger(LoginController.class);

	@Resource
	private UserCrawlerService service;
	
	@RequestMapping("/index")
	public ModelAndView index(HttpServletRequest req, Model model){
		ModelAndView mv = new ModelAndView();
		try {
			mv.setViewName("/login");
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return mv;
	}
	
	/**
	 * 登录
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/signIn")  
    public @ResponseBody Map<String,Object> login(HttpServletRequest request,HttpServletResponse response) throws IOException{
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			HttpSession session = request.getSession(true);
			String username = request.getParameter("username");
			String password = request.getParameter("password");
			
			UserCrawler uc = service.selectByUsername(username);
			if(uc != null) {
				boolean isLogin = EncoderUtils.checkPassword(password, uc.getPassword());
				if(isLogin) {
					session.setAttribute("username", username);
					session.setAttribute("userId", uc.getId());
					map = DataUtils.successData(uc);
				}else {
					map = DataUtils.errorData("用户名或密码错误");
				}
			}else {
				map = DataUtils.errorData("用户名或密码错误");
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
        return map;  
    }
	
	@RequestMapping("/redirect")
	public ModelAndView redirect(HttpServletRequest req, Model model){
		ModelAndView mv = new ModelAndView();
		try {
			mv.setViewName("/index");
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return mv;
	}
	
//	@RequestMapping("/signIn")
//	public ModelAndView login(HttpServletRequest req, Model model){
//		ModelAndView mv = new ModelAndView();
//		try {
//			HttpSession session = req.getSession(true);
//			String username = req.getParameter("username");
//			String password = req.getParameter("password");
//			
//			UserCrawler uc = service.selectByUsername(username);
//			if(uc != null) {
//				boolean isLogin = EncoderUtils.checkPassword(password, uc.getPassword());
//				if(isLogin) {
//					session.setAttribute("username", username);
//					session.setAttribute("userId", uc.getId());
//					mv.addObject("result", DataUtils.successData(uc));
//					mv.setViewName("/index");
//				}else {
//					mv.addObject("result", DataUtils.errorData("用户名或密码错误"));
//					mv.setViewName("/login");
//				}
//			}else {
//				mv.addObject("result", DataUtils.errorData("用户名或密码错误"));
//				mv.setViewName("/login");
//			}
//			
//		} catch (Exception e) {
//			e.printStackTrace();
//			log.error(e.getMessage());
//		}
//		return mv;
//	}
}
