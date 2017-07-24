package ssm.com.dao;

import ssm.com.domain.UserCrawler;

public interface UserCrawlerMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(UserCrawler record);

    int insertSelective(UserCrawler record);

    UserCrawler selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(UserCrawler record);

    int updateByPrimaryKey(UserCrawler record);
}