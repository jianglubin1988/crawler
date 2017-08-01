package ssm.com.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import ssm.com.service.WebsiteService;

@Controller
@RequestMapping("/website")
public class WebsiteController extends BaseController{

	private static Logger log = Logger.getLogger(WebsiteController.class);

	@Resource
	private WebsiteService service;
	
	@RequestMapping("/addTask")
	public ModelAndView addTask(HttpServletRequest req, Model model){
		ModelAndView mv = new ModelAndView();
		try {
			mv.setViewName("/addTask");
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return mv;
	}
	
	@RequestMapping("/taskList")
	public ModelAndView taskList(HttpServletRequest req, Model model){
		ModelAndView mv = new ModelAndView();
		try {
			mv.addObject("data", "taskList");
			mv.setViewName("/taskList");
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return mv;
	}
	
}
