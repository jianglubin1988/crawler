package ssm.com.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import ssm.com.domain.CommonContext;
import ssm.com.domain.User;

public class BaseController {

	public HttpSession getSession(HttpServletRequest request) {
		HttpSession session = request.getSession(false);
		return session;
	}
	
	public User getCurrentUser(HttpServletRequest request) {
		return (User) this.getSession(request).getAttribute(CommonContext.SESSION_USER);
	}
	
	public Integer getCurrentUserId(HttpServletRequest request) {
		return (Integer) this.getSession(request).getAttribute(CommonContext.SESSION_USER_ID);
	}
	
}
