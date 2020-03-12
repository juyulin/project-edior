import { ajax, AjaxRequest, AjaxResponse } from 'rxjs/ajax';
import 'rxjs/Rx'
export interface response {
  code: number;
  data: any;
  errmsg?: string | null
}
function ajaxJson(type: string, url: string, data?:any ){
  let URL = 'http://localhost:7001/'+url;
  let config: AjaxRequest = {
    url:URL,
    method:type,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if(type ==='post'){
    config['body'] = JSON.stringify(data || {});
  }
  else if(type === 'get'){
    let ret = '?';
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
    }
    ret=ret.substring(0,ret.length-1);
    config.url +=ret;
  }
  return ajax(config).map((res: AjaxResponse) => res.response)
    
}

export {
  ajaxJson
}