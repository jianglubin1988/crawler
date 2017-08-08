package ssm.com.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import ssm.com.dao.WebsiteMapper;
import ssm.com.domain.Website;
import ssm.com.service.WebsiteService;

@Service("WebsiteService")
public class WebsiteServiceImpl implements WebsiteService {
	
	private static Logger log = Logger.getLogger(WebsiteServiceImpl.class);
	
	@Resource
	private WebsiteMapper mapper;

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
	public int insertSelective(Website record) {
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
	public Website selectByPrimaryKey(Integer id) {
		Website result = new Website();
		try {
			result = mapper.selectByPrimaryKey(id);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return result;
	}

	@Override
	public int updateByPrimaryKeySelective(Website record) {
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
	public int updateByPrimaryKey(Website record) {
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
	public int insert(Website record) {
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
	public List<Map<String, String>> selectByUserid(Integer userId) {
		List<Map<String, String>> result = new ArrayList<Map<String, String>>();
		try {
			result = mapper.selectByUserid(userId);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return result;
	}


}
