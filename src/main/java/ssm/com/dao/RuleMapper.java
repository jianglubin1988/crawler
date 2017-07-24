package ssm.com.dao;

import java.util.List;

import ssm.com.domain.Rule;

public interface RuleMapper extends CommonMapper<Rule>{
	
	public List<Rule> selectByWebsiteKey(Integer webId);

}