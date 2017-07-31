package ssm.com.service;

import ssm.com.domain.Rule;

public interface RuleService extends CommonService<Rule> {

	public Rule selectByWebsiteKey(Integer webId);
}
