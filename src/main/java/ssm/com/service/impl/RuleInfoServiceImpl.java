package ssm.com.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import ssm.com.dao.RuleInfoMapper;
import ssm.com.domain.RuleInfo;
import ssm.com.service.RuleInfoService;

@Service("RuleInfoService")
public class RuleInfoServiceImpl implements RuleInfoService {
	
	private static Logger log = Logger.getLogger(RuleInfoServiceImpl.class);

	@Resource
	private RuleInfoMapper mapper;

	@Override
	public int deleteByPrimaryKey(Integer id) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int insert(RuleInfo record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int insertSelective(RuleInfo record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public RuleInfo selectByPrimaryKey(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int updateByPrimaryKeySelective(RuleInfo record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int updateByPrimaryKey(RuleInfo record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<RuleInfo> selectByRuleId(Integer ruleId) {
		List<RuleInfo> result = new ArrayList<RuleInfo>();
		try {
			result = mapper.selectByRuleId(ruleId);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return result;
	}

}
