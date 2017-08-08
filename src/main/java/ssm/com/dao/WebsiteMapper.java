package ssm.com.dao;

import java.util.List;
import java.util.Map;

import ssm.com.domain.Website;

public interface WebsiteMapper extends CommonMapper<Website>{
	
	public List<Map<String, String>> selectByUserid(Integer userId);
}