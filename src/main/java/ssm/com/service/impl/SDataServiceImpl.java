package ssm.com.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import ssm.com.dao.SDataMapper;
import ssm.com.domain.SData;
import ssm.com.service.SDataService;

@Service("TestService")
public class SDataServiceImpl implements SDataService {
	
	@Resource
	private SDataMapper dataMapper;

	@Override
	public int deleteByPrimaryKey(Integer id) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int insert(SData record) {
		try {
			return this.dataMapper.insert(record);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int insertSelective(SData record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public SData selectByPrimaryKey(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int updateByPrimaryKeySelective(SData record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int updateByPrimaryKeyWithBLOBs(SData record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int updateByPrimaryKey(SData record) {
		// TODO Auto-generated method stub
		return 0;
	}

}
