package spider.com.processor;

import java.util.List;

import spider.com.pipeline.DataPipeline;
import ssm.com.utils.DateUtils;
import us.codecraft.webmagic.Page;
import us.codecraft.webmagic.Site;
import us.codecraft.webmagic.Spider;
import us.codecraft.webmagic.processor.PageProcessor;

/**
 * Í¬»¨Ë³
 * url http://news.10jqka.com.cn/today_list/
 * @author robin
 *
 */

public class TonghuashunPageProcessor implements PageProcessor{
	
	private Site site = Site.me().setRetryTimes(3).setSleepTime(100);
	
	public static void run() {
		//Æô¶¯webmagic
		Spider.create(new TonghuashunPageProcessor()).addPipeline(new DataPipeline()).addUrl("http://news.10jqka.com.cn/today_list/").thread(5).run();
	}

	@Override
	public void process(Page page) {
		DateUtils du = new DateUtils();
		List<String> links = page.getHtml().links().regex("http://news.10jqka.com.cn/"+du.getCurrentYmd()+"/c\\d+.shtml").all();
		page.addTargetRequests(links);
		page.putField("title", page.getHtml().xpath("//div[@class='atc-head']/h1/text()"));
		if(page.getResultItems().get("title") == null || page.getResultItems().get("title") == "") {
			page.setSkip(true);
		}else {
			page.putField("pubtime", page.getHtml().xpath("//div[@class='info']/span[@class='time']/text()"));
			page.putField("source", page.getHtml().xpath("//div[@class='info']/span[@id='source_baidu']/a/text()"));
			page.putField("content", page.getHtml().xpath("//div[@class='atc-content']/tidyText()"));
			page.putField("author", "");
		}
	}

	@Override
	public Site getSite() {
		return site;
	}
}
