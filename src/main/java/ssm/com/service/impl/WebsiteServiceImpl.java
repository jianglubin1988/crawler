package ssm.com.service.impl;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import ssm.com.dao.WebsiteMapper;
import ssm.com.domain.Rule;
import ssm.com.domain.Website;
import ssm.com.service.WebsiteService;

@Service("WebsiteService")
public class WebsiteServiceImpl implements WebsiteService {
	
	private static Logger log = Logger.getLogger(WebsiteServiceImpl.class);
	
	@Resource
	private WebsiteMapper mapper;

	@Override
	public int deleteByPrimaryKey(Integer id) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int insertSelective(Website record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Website selectByPrimaryKey(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int updateByPrimaryKeySelective(Website record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int updateByPrimaryKey(Website record) {
		// TODO Auto-generated method stub
		return 0;
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


}
