package ssm.com.service;

import ssm.com.domain.SData;

public interface SDataService {

	int deleteByPrimaryKey(Integer id);

    int insert(SData record);

    int insertSelective(SData record);

    SData selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(SData record);

    int updateByPrimaryKeyWithBLOBs(SData record);

    int updateByPrimaryKey(SData record);
}
