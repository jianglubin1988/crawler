package ssm.com.dao;

import ssm.com.domain.UserCrawler;

public interface UserCrawlerMapper extends CommonMapper<UserCrawler>{
	
	public UserCrawler selectByUsername(String username);
}