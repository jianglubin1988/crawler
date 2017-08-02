package ssm.com.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import ssm.com.domain.CommonContext;
import ssm.com.domain.UserCrawler;

public class CommonFilter implements Filter {

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		// TODO Auto-generated method stub

	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
		String path = req.getRequestURI();
		if(path.contains("/login/") || path.contains("/register/")) {
			chain.doFilter(request, response);
			return ;
		}
		HttpSession session = req.getSession(false);
		Boolean flag = false;
		if(session != null) {
			UserCrawler uc = (UserCrawler) session.getAttribute(CommonContext.SESSION_USER);
			if(uc != null) {
				chain.doFilter(request, response);
				return ;
			}else {
				flag = true;
			}
		} else {
			flag = true;
		}
		
		if(flag) {
			request.getRequestDispatcher("/login/index.do").forward(request, response);
			return ;
		}
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub

	}

}
