package ssm.com.domain;

public class Rule {
    private Integer id;

    private Integer webid;

    private String name;

    private String rule;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getWebid() {
        return webid;
    }

    public void setWebid(Integer webid) {
        this.webid = webid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getRule() {
        return rule;
    }

    public void setRule(String rule) {
        this.rule = rule == null ? null : rule.trim();
    }
}