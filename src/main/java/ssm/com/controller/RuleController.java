package ssm.com.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import ssm.com.service.RuleService;

@Controller
@RequestMapping("/rule")
public class RuleController extends BaseController{

	private static Logger log = Logger.getLogger(RuleController.class);

	@Resource
	private RuleService service;
	
	@RequestMapping("/addRule")
	public ModelAndView addRule(HttpServletRequest req, Model model){
		ModelAndView mv = new ModelAndView();
		try {
			mv.setViewName("/addRule");
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return mv;
	}
	
	@RequestMapping("/ruleList")
	public ModelAndView ruleList(HttpServletRequest req, Model model){
		ModelAndView mv = new ModelAndView();
		try {
			mv.addObject("data", "ruleList");
			mv.setViewName("/ruleList");
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return mv;
	}
	
}
