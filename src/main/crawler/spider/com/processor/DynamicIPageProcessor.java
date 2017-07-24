package spider.com.processor;

import java.util.List;
import java.util.Map;

import spider.com.pipeline.DataPipeline;
import spider.com.rewrite.DynamicSpider;
import spider.com.rewrite.IPageProcessor;
import us.codecraft.webmagic.Page;
import us.codecraft.webmagic.Site;

/**
 * 通过接口获取页面地址，解析地址获取数据
 * 
 * @author robin
 *
 */
public class DynamicIPageProcessor implements IPageProcessor {

	private Site site = Site.me().setRetryTimes(3).setSleepTime(100);

	@Override
	public void process(Page page, Map<String, String> pageMap) {
		List<String> links = page.getHtml().links().regex(pageMap.get("helpUrl")).all();
		page.addTargetRequests(links);
		page.putField("title", page.getHtml().xpath(pageMap.get("title")));
		if (page.getResultItems().get("title") == null || page.getResultItems().get("title") == "") {
			page.setSkip(true);
		} else {
			String pubtime = pageMap.get("pubtime");
			if(pubtime == "" || pubtime == "null") {
				page.putField("pubtime", "");
			}else {
				page.putField("pubtime", page.getHtml().xpath(pubtime));
			}
			
			String source = pageMap.get("source");
			if(source == "" || source == "null") {
				page.putField("source", "");
			}else {
				page.putField("source", page.getHtml().xpath(pageMap.get("source")));
			}
			
			String content = pageMap.get("content");
			if(content == "" || content == "null") {
				page.putField("content", "");
			}else {
				page.putField("content", page.getHtml().xpath(content));
			}
			
			String author = pageMap.get("author");
			if(author == "" || author == "null") {
				page.putField("author", "");
			}else {
				page.putField("author", page.getHtml().xpath(author));
			}
			
		}
	}

	@Override
	public Site getSite() {
		return site;
	}

	public void run(Map<String, String> pageMap) {
		DynamicSpider.create(new DynamicIPageProcessor()).addPipeline(new DataPipeline()).addUrl(pageMap.get("targetUrl")).thread(5).run(pageMap);
	}

	@Override
	public void process(Page page) {
		// TODO Auto-generated method stub
		
	}

}
