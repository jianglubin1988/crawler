package ssm.com.utils;

import java.util.HashMap;
import java.util.Map;

public class DataUtils {

	public static Map<String, Object> successData(Object obj){
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("code", 0);
		result.put("msg", "成功");
		result.put("data", obj);
		return result;
	}
	
	public static Map<String, Object> errorData(Object obj){
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("code", 1);
		result.put("msg", "失败");
		result.put("data", obj);
		return result;
	}
}
