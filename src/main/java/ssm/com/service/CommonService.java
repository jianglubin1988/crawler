package ssm.com.service;

import ssm.com.domain.Rule;

public interface CommonService<T> {

	int deleteByPrimaryKey(Integer id);

    int insert(Rule record);

    int insertSelective(T record);

    T selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(T record);

    int updateByPrimaryKey(T record);
}
