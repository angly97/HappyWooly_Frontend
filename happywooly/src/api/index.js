import axios from "axios";

// local vue api axios instance
function apiInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}

// 주변 시설 검색 axios 
function keywordApiInstance() {
  const instance = axios.create({
    baseURL: "https://dapi.kakao.com/v2/local/search/keyword.json",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Authorization": "KakaoAK "+process.env.VUE_APP_KAKAO_REST_KEY
    },
  })
  return instance;
}

export { apiInstance, keywordApiInstance };
