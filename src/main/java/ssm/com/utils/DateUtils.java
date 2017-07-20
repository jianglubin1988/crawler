package ssm.com.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtils {

	private SimpleDateFormat format_ss = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	private SimpleDateFormat format_mm = new SimpleDateFormat("yyyy-MM-dd HH:mm");
	private SimpleDateFormat format_dd = new SimpleDateFormat("yyyy-MM-dd");
	private SimpleDateFormat format_ymd = new SimpleDateFormat("yyyyMMdd");
	
	public Date parseDateBySecond(String yMdHms) throws Exception{
		return this.format_ss.parse(yMdHms);
	}
	
	public Date parseDateByMinute(String yMdHm) throws Exception{
		return this.format_mm.parse(yMdHm);
	}
	
	public Date parseDate(String yMd) throws Exception{
		return this.format_dd.parse(yMd);
	}
	
	public String getCurrentYmd() {
		return format_ymd.format(new Date());
	}
	
}
