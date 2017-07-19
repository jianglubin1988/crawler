package ssm.com.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import ssm.com.dao.SDataMapper;
import ssm.com.domain.SData;
import ssm.com.service.SDataService;
import ssm.com.utils.SqlSessionUtils;

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
	
	/**
	 * 保存爬虫数据
	 * @param data
	 */
	public void saveSDataList(List<SData> data) {
		try {
			SqlSession sqlSession = SqlSessionUtils.getSessionFactory().openSession();
	        SDataMapper dataMapper = sqlSession.getMapper(SDataMapper.class);
			for(SData sd : data) {
				try {
					dataMapper.insertSelective(sd);
				} catch (Exception e) {
					System.out.println("save data : " + sd.getTitle() + "faile, reason : " + e.getMessage());
				}
			}
			sqlSession.commit();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 保存爬虫数据
	 * @param data
	 */
	public void saveSDate(SData data) {
		try {
			SqlSession sqlSession = SqlSessionUtils.getSessionFactory().openSession();
	        SDataMapper dataMapper = sqlSession.getMapper(SDataMapper.class);
			try {
				dataMapper.insertSelective(data);
			} catch (Exception e) {
				System.out.println("save data : " + data.getTitle() + "faile, reason : " + e.getMessage());
			}
			sqlSession.commit();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
