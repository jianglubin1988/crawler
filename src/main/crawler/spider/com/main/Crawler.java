package spider.com.main;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.http.client.methods.HttpGet;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import spider.com.processor.ToutiaoPageProcessor;
import ssm.com.dao.SDataMapper;
import ssm.com.domain.SData;
import ssm.com.service.SDataService;
import ssm.com.utils.HttpUtils;
import ssm.com.utils.SqlSessionUtils;

@Component
public class Crawler {
	
	@Resource
	private SDataService dataService;

	public static void main(String[] args) {
		Long time = Calendar.getInstance().getTimeInMillis();
		time = time - (1000 * 3600 * 24);
		String url = "http://www.toutiao.com/api/pc/feed/?category=news_finance&utm_source=toutiao&widen=1&max_behot_time=0";
		SimpleDateFormat fm = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String result = HttpUtils.sendHttpGet(new HttpGet(url));
		JSONObject obj = JSONObject.parseObject(result);
		Object arr = obj.get("data");
		List<Map> mapList = JSON.parseArray(arr+"", Map.class);
		
		List<SData> sdList = new ArrayList<SData>();
		for(Map map : mapList) {
			SData data = new SData();
			data.setTitle(map.get("title").toString());
			String surl = map.get("source_url").toString();
			surl = ToutiaoPageProcessor.PREFIX_PAGE + "a" + surl.substring(7);
			data.setUrl(surl);
			data.setSource(map.get("source").toString());
			Date date = new Date(Long.parseLong(map.get("behot_time").toString())*1000);
			data.setPubtime(date);
			data.setCreatedAt(new Date());
			data.toString();
			sdList.add(data);
		}
		
		Crawler c = new Crawler();
		c.saveSData(sdList);
		
	}
	
	private void saveSData(List<SData> data) {
		try {
			SqlSession sqlSession = SqlSessionUtils.getSessionFactory().openSession();
	        SDataMapper dataMapper = sqlSession.getMapper(SDataMapper.class);
			for(SData sd : data) {
				try {
					dataMapper.insertSelective(sd);
				} catch (Exception e) {
					System.out.println(sd.getTitle());
				}
				System.out.println("===========================================================");
			}
			sqlSession.commit();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
}
