package spider.com.rewrite;

import java.util.Map;

import us.codecraft.webmagic.Page;
import us.codecraft.webmagic.processor.PageProcessor;

/**
 * jiagnlubin
 */
public interface IPageProcessor extends PageProcessor {

	public void process(Page page, Map<String, String> pageMap);
}
