package ssm.com.service;

import ssm.com.domain.UserCrawler;

public interface UserCrawlerService extends CommonService<UserCrawler> {

	public UserCrawler selectByUsername(String username);
}
