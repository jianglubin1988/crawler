package ssm.com.utils;

import org.jsoup.helper.StringUtil;

public class StringUtils {

	public static String obj2str(Object obj) {
		return org.springframework.util.StringUtils.isEmpty(obj) || StringUtil.isBlank(obj.toString()) ? ""
				: obj.toString();
	}
}
