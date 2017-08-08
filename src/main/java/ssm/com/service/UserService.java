package ssm.com.service;

import ssm.com.domain.User;

public interface UserService extends CommonService<User> {

	public User selectByUsername(String username);
	
	public User selectByMobile(String mobile);
}
