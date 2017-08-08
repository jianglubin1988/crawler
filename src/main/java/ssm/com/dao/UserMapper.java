package ssm.com.dao;

import ssm.com.domain.User;

public interface UserMapper extends CommonMapper<User>{
	
	public User selectByUsername(String username);
	
	public User selectByMobile(String mobile);
}