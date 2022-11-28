import { apiInstance, keywordApiInstance } from "./index.js";

const api = apiInstance();
const keywordApi = keywordApiInstance()

function subConditionList(params, success, fail) {
    api.get(`/sub-condition`, { params: params }).then(success).catch(fail);
  }
  
  function infraList(params, success, fail) {
    keywordApi.get(``, { params: params }).then(success).catch(fail);
  }
  

export { subConditionList, infraList };
