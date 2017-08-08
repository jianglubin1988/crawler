package ssm.com.service.impl;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import ssm.com.dao.UserMapper;
import ssm.com.domain.User;
import ssm.com.service.UserService;
import ssm.com.utils.EncoderUtils;

@Service("UserCrawlerService")
public class UserServiceImpl implements UserService {
	
	private static Logger log = Logger.getLogger(UserServiceImpl.class);
	
	@Resource
	private UserMapper mapper;

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
	public int insert(User record) {
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
	public int insertSelective(User record) {
		int result = 0;
		try {
			result = mapper.insertSelective(record);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return result;
	}

	@Override
	public User selectByPrimaryKey(Integer id) {
		User result = null;
		try {
			result = mapper.selectByPrimaryKey(id);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return result;
	}

	@Override
	public int updateByPrimaryKeySelective(User record) {
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
	public int updateByPrimaryKey(User record) {
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
	public User selectByUsername(String username) {
		User result = null;
		try {
			result = mapper.selectByUsername(username);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return result;
	}

	@Override
	public User selectByMobile(String mobile) {
		User result = null;
		try {
			result = mapper.selectByMobile(mobile);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return result;
	}

}
