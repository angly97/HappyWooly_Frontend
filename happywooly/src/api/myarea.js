import { apiInstance } from "./index.js";

const api = apiInstance();

async function insertArea(area, success, fail){
  await api.post(`/myarea/insert`, JSON.stringify(area)).then(success).catch(fail);
}

async function deleteArea(mid, success, fail){
  await api.delete(`/myarea/${mid}`).then(success).catch(fail);
}

async function selectAll(userid, success, fail){
  await api.get(`/myarea/${userid}`).then(success).catch(fail);
}

async function selectBydongCode(dongCode, success, fail){
  await api.get(`/myarea/dong/${dongCode}`).then(success).catch(fail);
}

export { insertArea, deleteArea, selectAll, selectBydongCode};