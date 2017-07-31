package ssm.com.dao;

import java.util.List;

import ssm.com.domain.RuleInfo;

public interface RuleInfoMapper extends CommonMapper<RuleInfo> {
	public List<RuleInfo> selectByRuleId(Integer ruleId);
}