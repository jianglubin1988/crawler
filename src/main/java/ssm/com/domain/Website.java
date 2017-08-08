package ssm.com.domain;

import javax.servlet.http.HttpServletRequest;

import ssm.com.utils.StringUtils;

public class Website {
    private Integer id;

    private String targeturl;

    private String helpurl;
    
    private Integer userId;
    
    private Integer ruleId;
    
    private Integer status;
    
    private Integer delFlag;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTargeturl() {
        return targeturl;
    }

    public void setTargeturl(String targeturl) {
        this.targeturl = targeturl == null ? null : targeturl.trim();
    }

    public String getHelpurl() {
        return helpurl;
    }

    public void setHelpurl(String helpurl) {
        this.helpurl = helpurl == null ? null : helpurl.trim();
    }

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getRuleId() {
		return ruleId;
	}

	public void setRuleId(Integer ruleId) {
		this.ruleId = ruleId;
	}
	
	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}
	
	public Integer getDelFlag() {
		return delFlag;
	}

	public void setDelFlag(Integer delFlag) {
		this.delFlag = delFlag;
	}
	
	public Website parseRequest(HttpServletRequest request) {
		Website web = new Website();
		try {
			String id = request.getParameter("id");
			String targetUrl = request.getParameter("targetUrl");
			String helpUrl = request.getParameter("helpUrl");
			String ruleId = request.getParameter("ruleId");
			String status = request.getParameter("status");
			String delFlag = request.getParameter("delFlag");
			
			if(StringUtils.obj2str(id) != "") {
				web.setId(Integer.parseInt(id));
			}
			if(StringUtils.obj2str(targetUrl) != "") {
				web.setTargeturl(targetUrl);
			}
			if(StringUtils.obj2str(helpUrl) != "") {
				web.setHelpurl(helpUrl);
			}
			if(StringUtils.obj2str(ruleId) != "") {
				web.setRuleId(Integer.parseInt(ruleId));
			}
			if(StringUtils.obj2str(status) != "") {
				web.setStatus(Integer.parseInt(status));
			}
			if(StringUtils.obj2str(delFlag) != "") {
				web.setDelFlag(Integer.parseInt(delFlag));
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return web;
	}

}