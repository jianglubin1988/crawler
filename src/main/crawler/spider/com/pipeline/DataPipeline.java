package spider.com.pipeline;

import java.util.Date;

import ssm.com.domain.SData;
import ssm.com.service.impl.SDataServiceImpl;
import ssm.com.utils.DateUtils;
import us.codecraft.webmagic.ResultItems;
import us.codecraft.webmagic.Task;
import us.codecraft.webmagic.pipeline.Pipeline;

public class DataPipeline implements Pipeline {
	
	@Override
	public void process(ResultItems resultItems, Task task) {
		try {
			SDataServiceImpl service = new SDataServiceImpl();
			DateUtils dateUtil = new DateUtils();
			SData data = new SData();
			String url = resultItems.getRequest().getUrl();
			ResultItems items = resultItems;
			if(items.get("title") != null && items.get("title") != "" && items.get("title") != "null") {
				data.setTitle(items.get("title").toString());
				data.setSource(items.get("source").toString());
				data.setPubtime(dateUtil.parseDate(items.get("pubtime").toString()));
				data.setContent(items.get("content").toString());
				data.setAuthor(items.get("author").toString());
				data.setUrl(url);
				data.setCreatedAt(new Date());
				service.saveSDate(data);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
