package ssm.com.service.impl;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import ssm.com.dao.UserCrawlerMapper;
import ssm.com.domain.UserCrawler;
import ssm.com.service.UserCrawlerService;
import ssm.com.utils.EncoderUtils;

@Service("UserCrawlerService")
public class UserCrawlerServiceImpl implements UserCrawlerService {
	
	private static Logger log = Logger.getLogger(UserCrawlerServiceImpl.class);
	
	@Resource
	private UserCrawlerMapper mapper;

	@Override
	public int deleteByPrimaryKey(Integer id) {
		int result = 0;
		try {
			result = mapper.deleteByPrimaryKey(id);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return result;
	}

	@Override
	public int insert(UserCrawler record) {
		int result = 0;
		try {
			if(!StringUtils.isEmpty(record.getPassword())) {
				record.setPassword(EncoderUtils.encodeByMd5(record.getPassword()));
			}
			result = mapper.insert(record);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return result;
	}

	@Override
	public int insertSelective(UserCrawler record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public UserCrawler selectByPrimaryKey(Integer id) {
		UserCrawler result = null;
		try {
			result = mapper.selectByPrimaryKey(id);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return result;
	}

	@Override
	public int updateByPrimaryKeySelective(UserCrawler record) {
		int result = 0;
		try {
			result = mapper.updateByPrimaryKeySelective(record);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return result;
	}

	@Override
	public int updateByPrimaryKey(UserCrawler record) {
		int result = 0;
		try {
			result = mapper.updateByPrimaryKey(record);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return result;
	}

	@Override
	public UserCrawler selectByUsername(String username) {
		UserCrawler result = null;
		try {
			result = mapper.selectByUsername(username);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return result;
	}

}
