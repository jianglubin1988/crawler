package ssm.com.service;

import java.util.List;

import ssm.com.domain.RuleInfo;

public interface RuleInfoService extends CommonService<RuleInfo> {

	public List<RuleInfo> selectByRuleId(Integer ruleId);
}
