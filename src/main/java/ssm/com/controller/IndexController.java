package ssm.com.controller;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/")
public class IndexController {
	
	private static Logger log = Logger.getLogger(IndexController.class);

	@RequestMapping("/index")
	public ModelAndView index(HttpServletRequest req, Model model){
		ModelAndView mv = new ModelAndView();
		try {
			mv.setViewName("/index");
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return mv;
	}
	
}
