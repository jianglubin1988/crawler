package ssm.com.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import ssm.com.domain.Test;
import ssm.com.service.TestService;

@Controller
@RequestMapping("/test")
public class TestController {
	
	private static Logger log = Logger.getLogger(TestController.class);

	@Resource
	private TestService testService;
	
	@RequestMapping("/select")
	public ModelAndView select(HttpServletRequest req, Model model){
		ModelAndView mv = new ModelAndView();
		try {
			Test test = this.testService.selectByPrimaryKey(1);
			mv.addObject("test",test);
			mv.setViewName("/test");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return mv;
	}
}
