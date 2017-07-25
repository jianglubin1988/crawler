package ssm.com.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import ssm.com.domain.UserCrawler;
import ssm.com.service.UserCrawlerService;
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
	
	@RequestMapping("/signIn")
	public ModelAndView login(HttpServletRequest req, Model model){
		ModelAndView mv = new ModelAndView();
		try {
			HttpSession session = req.getSession(true);
			String username = req.getParameter("username");
			String password = req.getParameter("password");
			
			UserCrawler uc = service.selectByUsername(username);
			boolean isLogin = EncoderUtils.checkPassword(password, uc.getPassword());
			if(isLogin) {
				session.setAttribute("username", username);
				session.setAttribute("userId", uc.getId());
				mv.setViewName("/index");
			}else {
				mv.setViewName("/login");
			}
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return mv;
	}
}
