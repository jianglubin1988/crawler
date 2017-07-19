package ssm.com.dao;

import org.springframework.stereotype.Repository;

import ssm.com.domain.Test;

@Repository(value="TestMapper")
public interface TestMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Test record);

    int insertSelective(Test record);

    Test selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Test record);

    int updateByPrimaryKey(Test record);
}