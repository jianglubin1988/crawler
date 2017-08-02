package ssm.com.domain;

public class Website {
    private Integer id;

    private String targeturl;

    private String helpurl;
    
    private Integer userId;
    
    private Integer ruleId;

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
}