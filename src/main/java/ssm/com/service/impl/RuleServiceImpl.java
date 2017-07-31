package ssm.com.service.impl;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import ssm.com.dao.RuleMapper;
import ssm.com.domain.Rule;
import ssm.com.service.RuleService;
@Service("RuleService")
public class RuleServiceImpl implements RuleService {
	
	private static Logger log = Logger.getLogger(RuleServiceImpl.class);

	@Resource
	private RuleMapper mapper;
	
	@Override
	public int deleteByPrimaryKey(Integer id) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int insert(Rule record) {
		int result = 0;
		try {
			result = mapper.insert(record);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return result;
	}

	@Override
	public int insertSelective(Rule record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Rule selectByPrimaryKey(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int updateByPrimaryKeySelective(Rule record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int updateByPrimaryKey(Rule record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Rule selectByWebsiteKey(Integer webId) {
		Rule result = new Rule();
		try {
			result = mapper.selectByWebsiteKey(webId);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return result;
	}

}
