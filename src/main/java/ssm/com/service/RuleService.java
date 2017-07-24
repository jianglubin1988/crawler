package ssm.com.service;

import java.util.List;

import ssm.com.domain.Rule;

public interface RuleService extends CommonService<Rule> {

	public List<Rule> selectByWebsiteKey(Integer webId);
}
