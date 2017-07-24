package ssm.com.utils;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import com.sun.mail.util.BASE64EncoderStream;

public class EncoderUtils {
	
	/**
	 * MD5加密
	 * @param pwd
	 * @return
	 * @throws NoSuchAlgorithmException
	 * @throws UnsupportedEncodingException
	 */
	public static String encodeByMd5(String pwd) throws NoSuchAlgorithmException, UnsupportedEncodingException {
		MessageDigest md5 = MessageDigest.getInstance("MD5");
		byte[] result = BASE64EncoderStream.encode(md5.digest(pwd.getBytes("utf-8")));
		return new String(result, "utf-8");
	}
	
	/**
	 * 密码校验
	 * @param newPwd
	 * @param oldPwd
	 * @return
	 * @throws Exception
	 */
	public static Boolean checkPassword(String newPwd, String oldPwd) throws Exception {
		return encodeByMd5(newPwd).equals(oldPwd) ? true : false;
	}
	
	public static void main(String[] args) throws Exception{
		System.out.println(EncoderUtils.encodeByMd5("123456"));
	}
}
