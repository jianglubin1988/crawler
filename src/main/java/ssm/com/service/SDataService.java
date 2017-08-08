package ssm.com.service;

import java.util.List;

import ssm.com.domain.SData;

public interface SDataService extends CommonService<SData>{
    
    public void saveSDate(SData data);
    
    public void saveSDataList(List<SData> data);
}
