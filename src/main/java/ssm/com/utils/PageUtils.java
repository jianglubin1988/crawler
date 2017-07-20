package ssm.com.utils;

import java.util.Date;

import ssm.com.domain.SData;
import us.codecraft.webmagic.Page;
import us.codecraft.webmagic.ResultItems;

public class PageUtils {
	
	public SData page2data(Page page) {
		DateUtils dateUtil = new DateUtils();
		SData data = new SData();
		try {
			ResultItems items = page.getResultItems();
			data.setTitle(items.get("title"));
			data.setSource(items.get("source"));
			data.setPubtime(dateUtil.parseDate(items.get("pubtime")));
			data.setContent(items.get("content"));
			data.setAuthor(items.get("author"));
			data.setUrl(items.get("url"));
			data.setCreatedAt(new Date());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return data;
	}
}
