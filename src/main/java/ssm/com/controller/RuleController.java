package ssm.com.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import ssm.com.service.RuleService;
import ssm.com.utils.DataUtils;

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
	
	/**
	 * 新增规则
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/save")  
    public @ResponseBody Map<String,Object> save(HttpServletRequest request,HttpServletResponse response) throws IOException{
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			
			
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
        return map;  
    }
	
	/**
	 * 查询所有规则
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/selectAll")  
    public @ResponseBody Map<String,Object> selectAll(HttpServletRequest request,HttpServletResponse response) throws IOException{
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			map = DataUtils.successData(service.selectAll());
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
			map = DataUtils.errorData("");
		}
        return map;  
    }
	
	
}
