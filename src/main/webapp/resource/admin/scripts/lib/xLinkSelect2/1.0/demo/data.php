<?php
sleep(rand(0,1));
$data = array();

switch($_REQUEST['pid']){

	case 0:

		$data = array(
			array("id" => "1", 	"pid" => "0", "title" => "北京市"),
			array("id" => "2", 	"pid" => "0", "title" => "上海市"),
			array("id" => "3", 	"pid" => "0", "title" => "天津市"),
			array("id" => "4", 	"pid" => "0", "title" => "重庆市"),
			array("id" => "5", 	"pid" => "0", "title" => "浙江省"),
			array("id" => "6", 	"pid" => "0", "title" => "江苏省"),
			array("id" => "7", 	"pid" => "0", "title" => "广东省"),
			array("id" => "8", 	"pid" => "0", "title" => "福建省"),
			array("id" => "9", 	"pid" => "0", "title" => "湖南省"),
			array("id" => "10", "pid" => "0", "title" => "湖北省"),
			array("id" => "11", "pid" => "0", "title" => "辽宁省"),
			array("id" => "12", "pid" => "0", "title" => "吉林省"),
			array("id" => "13", "pid" => "0", "title" => "黑龙江省"),
			array("id" => "14", "pid" => "0", "title" => "河北省"),
			array("id" => "15", "pid" => "0", "title" => "河南省"),
			array("id" => "16", "pid" => "0", "title" => "山东省"),
			array("id" => "17", "pid" => "0", "title" => "陕西省"),
			array("id" => "18", "pid" => "0", "title" => "甘肃省"),
			array("id" => "19", "pid" => "0", "title" => "青海省"),
			array("id" => "20", "pid" => "0", "title" => "新疆"),
			array("id" => "21", "pid" => "0", "title" => "山西省"),
			array("id" => "22", "pid" => "0", "title" => "四川省"),
			array("id" => "23", "pid" => "0", "title" => "贵州省"),
			array("id" => "24", "pid" => "0", "title" => "安徽省"),
			array("id" => "25", "pid" => "0", "title" => "江西省"),
			array("id" => "26", "pid" => "0", "title" => "云南省"),
			array("id" => "27", "pid" => "0", "title" => "内蒙古"),
			array("id" => "28", "pid" => "0", "title" => "广西"),
			array("id" => "29", "pid" => "0", "title" => "西藏"),
			array("id" => "30", "pid" => "0", "title" => "宁夏"),
			array("id" => "31", "pid" => "0", "title" => "海南省"),
			array("id" => "32", "pid" => "0", "title" => "香港"),
			array("id" => "33", "pid" => "0", "title" => "澳门"),
			array("id" => "34", "pid" => "0", "title" => "台湾"),
			array("id" => "35", "pid" => "0", "title" => "其他"),
		);
		break;

	case 11:

		$data = array(
			array("id" => "110", "pid" => "11", "title" =>  "沈阳市", "other"=>[1,2,3,4,5,6]),
			array("id" => "111", "pid" => "11", "title" =>  "大连市", "other"=>[0,1,2,3,4,5,6]),
			array("id" => "112", "pid" => "11", "title" =>  "鞍山市"),
			array("id" => "113", "pid" => "11", "title" =>  "抚顺市"),
			array("id" => "114", "pid" => "11", "title" =>  "本溪市"),
			array("id" => "115", "pid" => "11", "title" =>  "丹东市"),
			array("id" => "116", "pid" => "11", "title" =>  "锦州市"),
			array("id" => "117", "pid" => "11", "title" =>  "营口市"),
			array("id" => "118", "pid" => "11", "title" =>  "阜新市"),
			array("id" => "119", "pid" => "11", "title" =>  "辽阳市"),
			array("id" => "120", "pid" => "11", "title" =>  "盘锦市"),
			array("id" => "121", "pid" => "11", "title" =>  "铁岭市"),
			array("id" => "122", "pid" => "11", "title" =>  "朝阳市"),
			array("id" => "123", "pid" => "11", "title" =>  "葫芦岛市"),
		);
		break;

	case 110:

		$data = array(
			array("id" => "11001", "pid" => "110", "title" => "皇姑区"),
			array("id" => "11002", "pid" => "110", "title" => "和平区"),
			array("id" => "11003", "pid" => "110", "title" => "沈河区"),
			array("id" => "11004", "pid" => "110", "title" => "铁西区"),
			array("id" => "11005", "pid" => "110", "title" => "于洪区"),
			array("id" => "11006", "pid" => "110", "title" => "东陵区"),
			array("id" => "11007", "pid" => "110", "title" => "苏家屯区"),
		);
		break;

	case 114:

		$data = array(
			array("id" =>"11401", "pid" =>"114", "title" => "西湖区"),
			array("id" =>"11402", "pid" =>"114", "title" => "平山区"),
			array("id" =>"11403", "pid" =>"114", "title" => "明山区"),
			array("id" =>"11404", "pid" =>"114", "title" => "南芬区")
		);
		break;
}

echo json_encode($data);
?>