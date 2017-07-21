package spider.com.main;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import spider.com.processor.DynamicIPageProcessor;
import ssm.com.utils.DateUtils;

/**
 * @author robin
 */
public class Crawler {
	
	public static void main(String[] args) {
		Crawler c = new Crawler();
		DynamicIPageProcessor processor = new DynamicIPageProcessor();
		processor.run(c.getMap());
	}
	
	private Map<String, String> getMap() {
		DateUtils du = new DateUtils();
		Map<String, String> map = new HashMap<String, String>();
		map.put("targetUrl", "http://news.10jqka.com.cn/today_list/");
		map.put("helpUrl", "http://news.10jqka.com.cn/" + du.getCurrentYmd() + "/c\\d+.shtml");
		map.put("title", "//div[@class='atc-head']/h1/text()");
		map.put("pubtime", "//div[@class='info']/span[@class='time']/text()");
		map.put("source", "//div[@class='info']/span[@id='source_baidu']/a/text()");
		map.put("content", "//div[@class='info']/span[@id='source_baidu']/a/text()");
		map.put("author", "");
		return map;
	}
	
	private List<Map<String, String>> getList() {
		List<Map<String, String>> pageList = new ArrayList<Map<String, String>>();
		pageList.add(getMap());
		return pageList;
	}
	
}
