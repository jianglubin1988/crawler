package ssm.com.utils;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class SqlSessionUtils {
	
	public static SqlSessionFactory getSessionFactory(){
        SqlSessionFactory sessionFactory = null;
        String resource= "configuration.xml";
        try{
            sessionFactory = new SqlSessionFactoryBuilder().build(Resources.getResourceAsReader(resource));
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return sessionFactory;
    }

}
