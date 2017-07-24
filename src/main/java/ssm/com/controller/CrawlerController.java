package ssm.com.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import ssm.com.domain.SData;
import ssm.com.service.SDataService;

@Controller
@RequestMapping("/admin/crawler")
public class CrawlerController {
	
	private static Logger log = Logger.getLogger(CrawlerController.class);

	@Resource
	private SDataService dataService;
	
	@RequestMapping("/show")
	public ModelAndView select(HttpServletRequest req, Model model){
		ModelAndView mv = new ModelAndView();
		try {
			SData data = this.dataService.selectByPrimaryKey(1);
			mv.addObject("data",data);
			mv.setViewName("/index");
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return mv;
	}
}
