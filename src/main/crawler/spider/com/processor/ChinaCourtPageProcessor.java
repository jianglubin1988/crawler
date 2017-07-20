package spider.com.processor;

import us.codecraft.webmagic.Page;
import us.codecraft.webmagic.Site;
import us.codecraft.webmagic.model.AfterExtractor;
import us.codecraft.webmagic.model.ConsolePageModelPipeline;
import us.codecraft.webmagic.model.OOSpider;
import us.codecraft.webmagic.model.annotation.ExtractBy;
import us.codecraft.webmagic.model.annotation.HelpUrl;
import us.codecraft.webmagic.model.annotation.TargetUrl;

/**
 * 中国法院网
 * url http://www.chinacourt.org/index.shtml
 * @author robin
 *
 * 备注：链接被拒绝
 */
@TargetUrl("http://www.chinacourt.org/article/index/id/MzAwNDAwMiAOAAA%3D.shtml")
@HelpUrl("http://www.chinacourt.org/article/detail/2017/07/\\w+/\\d+.shtml")
public class ChinaCourtPageProcessor implements AfterExtractor{
	
	@ExtractBy("//div[@class='detail_bigtitle']/text()")
	private String title;
	
	@ExtractBy("//div[@class='detail_thr']/span[@class='time']/text()")
	private String pubtime;
	
	@ExtractBy("//div[@class='detail_thr']/span[@class='source']/text()")
	private String source;
	
	@ExtractBy("//div[@class='detail_thr']/span[@class='writer']/text()")
	private String author;
	
	@ExtractBy("//div[@class='detail_txt']/tidyText()")
	private String content;
	
	@Override
	public void afterProcess(Page page) {
//		SDataServiceImpl service = new SDataServiceImpl();
//		PageUtils pu = new PageUtils();
//		String url = page.getRequest().getUrl();
//		SData data = pu.page2data(page);
//		service.saveSDate(data);
	}

	public static void run() {
		//启动webmagic
//        OOSpider.create(Site.me().addStartUrl("http://www.chinacourt.org/article/index/id/MzAwNDAwMiAOAAA%3D.shtml"), ChinaCourtPageProcessor.class).run();
        OOSpider.create(Site.me().setSleepTime(1000)
                , new ConsolePageModelPipeline(), ChinaCourtPageProcessor.class)
                .addUrl("http://www.chinacourt.org/article/index/id/MzAwNDAwMiAOAAA%3D.shtml").thread(5).run();
	}

}
