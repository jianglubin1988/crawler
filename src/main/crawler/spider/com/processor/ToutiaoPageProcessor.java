package spider.com.processor;

import java.util.List;

import us.codecraft.webmagic.Page;
import us.codecraft.webmagic.Site;
import us.codecraft.webmagic.Spider;
import us.codecraft.webmagic.processor.PageProcessor;

public class ToutiaoPageProcessor implements PageProcessor {
	
	private Site site = Site.me().setRetryTimes(3).setSleepTime(100);
	
	public static final String PREFIX_PAGE = "http://www.toutiao.com/";
//	private static final String PREFIX_PAGE = "http://www.toutiao.com/a6443597303000531214";
	public static final String REGEX_PAGE = "http://www.toutiao.com/a(\\d+)";
//	private static final String REGEX_PAGE = "http://www.toutiao.com/a6443597303000531214";

	@Override
	public void process(Page page) {
//		List<String> links = page.getHtml().links().regex(REGEX_PAGE).all();
//		List<String> allLinks = page.getHtml().links().all();
		page.addTargetRequests(page.getHtml().links().regex("http://www.toutiao.com/a(\\\\d+)").all());
//		page.putField("author", page.getUrl().regex("https://github\\.com/(\\w+)/.*").toString());
		page.putField("title", page.getHtml().xpath("//h1[@class='article-title']/text()").toString());
		page.putField("src", page.getHtml().xpath("//div[@class='articleInfo']/span[@class='src']/text()").toString());
		page.putField("time", page.getHtml().xpath("//div[@class='articleInfo']/span[@class='time']/text()").toString());
		if (page.getResultItems().get("title") == null) {
			// skip this page
			page.setSkip(true);
		}
		page.putField("content", page.getHtml().xpath("//div[@class='article-content']/tidyText()"));
	}

	@Override
	public Site getSite() {
		return site;
	}
	
	public static void main(String[] args) {
		Spider.create(new ToutiaoPageProcessor()).addUrl(PREFIX_PAGE).thread(5).run();
	}

}
