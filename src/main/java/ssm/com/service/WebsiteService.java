package ssm.com.service;

import java.util.List;
import java.util.Map;

import ssm.com.domain.Website;

public interface WebsiteService extends CommonService<Website> {

	public List<Map<String, String>> selectByUserid(Integer userId);
}
