package ssm.com.domain;

public class Website {
    private Integer id;

    private String targeturl;

    private String helpurl;

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
}