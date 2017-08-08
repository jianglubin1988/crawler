package ssm.com.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import ssm.com.domain.CommonContext;
import ssm.com.domain.UserCrawler;

public class BaseController {

	public HttpSession getSession(HttpServletRequest request) {
		HttpSession session = request.getSession(false);
		return session;
	}
	
	public UserCrawler getCurrentUser(HttpServletRequest request) {
		return (UserCrawler) this.getSession(request).getAttribute(CommonContext.SESSION_USER);
	}
	
	public Integer getCurrentUserId(HttpServletRequest request) {
		return (Integer) this.getSession(request).getAttribute(CommonContext.SESSION_USER_ID);
	}
	
}
