package spider.com.processor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.http.client.methods.HttpGet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import ssm.com.domain.SData;
import ssm.com.service.impl.SDataServiceImpl;
import ssm.com.utils.DateUtils;
import ssm.com.utils.HttpUtils;
import us.codecraft.webmagic.Page;
import us.codecraft.webmagic.Site;
import us.codecraft.webmagic.Spider;
import us.codecraft.webmagic.processor.PageProcessor;

/**
 * 通过接口获取页面地址，解析地址获取数据
 * @author robin
 *
 */
public class DynamicIPageProcessor implements PageProcessor {

private Site site = Site.me().setRetryTimes(3).setSleepTime(100);
	
	public static final String PREFIX_PAGE = "http://www.toutiao.com/";
	public static final String REGEX_GROUP = "/group/\\d+/";
	private static final String NEWS_FINANCE_URL = "http://www.toutiao.com/api/pc/feed/?category=news_finance&utm_source=toutiao&widen=1&max_behot_time=0";
	
	private List<String> links = null;
	@Override
	public void process(Page page) {
		this.initLinks();
		page.addTargetRequests(links);
		
		String title = page.getHtml().xpath("//h1[@class='article-title']/text()").toString();
		if (title == null || title == "") {
			// skip this page
			page.setSkip(true);
		}else {
			String source = page.getHtml().xpath("//div[@class='articleInfo']/span[@class='src']/text()").toString();
			String pubtime = page.getHtml().xpath("//div[@class='articleInfo']/span[@class='time']/text()").toString();
			String content = page.getHtml().xpath("//div[@class='article-content']/tidyText()").toString();
			String author = "";
			String url = page.getRequest().getUrl();
			Date createTime = new Date();
//			
//			try {
//				SData data = new SData();
//				data.setTitle(title);
//				data.setSource(source);
//				Date date = DateUtils.format_mm.parse(pubtime);
//				data.setPubtime(date);
//				data.setContent(content);
//				data.setAuthor(author);
//				data.setCreatedAt(createTime);
//				data.setUrl(url);
//				this.saveData(data);
//			} catch (Exception e) {
//				e.printStackTrace();
//			}
		}
	}

	@Override
	public Site getSite() {
		return site;
	}
	
	private void initLinks() {
		String result = HttpUtils.sendHttpGet(new HttpGet(NEWS_FINANCE_URL));
		JSONObject obj = JSONObject.parseObject(result);
		Object arr = obj.get("data");
		List<Map> mapList = JSON.parseArray(arr+"", Map.class);
		links = new ArrayList<String>();
		for(Map map : mapList) {
			String surl = map.get("source_url").toString();
			if(surl.matches(REGEX_GROUP)) {
				surl = PREFIX_PAGE + "a" + surl.substring(7);
				links.add(surl);
			}
		}
	}
	
	public void saveData(SData data) {
		SDataServiceImpl service = new SDataServiceImpl();
		service.saveSDate(data);
		System.out.println(data.getTitle());
	}
	
	public static void run() {
		Spider.create(new ToutiaoPageProcessor()).addUrl(PREFIX_PAGE).thread(5).run();
	}
	

}
