package ssm.com.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
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

import ssm.com.domain.Website;
import ssm.com.service.WebsiteService;
import ssm.com.utils.DataUtils;

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
			mv.addObject("data", "中文验证");
			mv.setViewName("/taskList");
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return mv;
	}
	
	/**
	 * 新增网站
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/save")  
    public @ResponseBody Map<String,Object> save(HttpServletRequest request,HttpServletResponse response) throws IOException{
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			String tu = request.getParameter("targetUrl");
			String hu = request.getParameter("helpUrl");
			String rid = request.getParameter("ruleId");
			Website record = new Website();
			record.setTargeturl(tu);
			record.setHelpurl(hu);
			record.setUserId(super.getCurrentUserId(request));
			record.setRuleId(Integer.parseInt(rid));
			service.insertSelective(record);
			map = DataUtils.successData(record);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
			map = DataUtils.errorData("保存失败， 原因：" + e.getMessage());
		}
        return map;  
    }
	
	/**
	 * 获取当前登录用户的任务列表
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/selectByUser")  
    public @ResponseBody Map<String,Object> selectByUser(HttpServletRequest request,HttpServletResponse response) throws IOException{
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			List<Map<String, String>> result = service.selectByUserid(super.getCurrentUserId(request));
			map = DataUtils.successData(result);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
			map = DataUtils.errorData("获取任务列表失败， 原因：" + e.getMessage());
		}
        return map;  
    }
	
	/**
	 * 获取当前登录用户的任务列表
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/update")  
    public @ResponseBody Map<String,Object> update(HttpServletRequest request,HttpServletResponse response) throws IOException{
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			Website record = new Website();
			record = record.parseRequest(request);
			service.updateByPrimaryKeySelective(record);
			map = DataUtils.successData(record);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
			map = DataUtils.errorData("获取任务列表失败， 原因：" + e.getMessage());
		}
        return map;  
    }
	
	/**
	 * 删除任务
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/delete")  
    public @ResponseBody Map<String,Object> delete(HttpServletRequest request,HttpServletResponse response) throws IOException{
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			Website record = new Website();
			record = record.parseRequest(request);
			service.deleteByPrimaryKey(record.getId());
			map = DataUtils.successData(record);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
			map = DataUtils.errorData("删除任务失败， 原因：" + e.getMessage());
		}
        return map;  
    }
	
}
