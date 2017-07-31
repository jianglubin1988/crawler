package ssm.com.dao;

import ssm.com.domain.RuleInfo;

public interface RuleInfoMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(RuleInfo record);

    int insertSelective(RuleInfo record);

    RuleInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(RuleInfo record);

    int updateByPrimaryKey(RuleInfo record);
}