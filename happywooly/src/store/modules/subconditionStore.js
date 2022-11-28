import { subConditionList, infraList } from "@/api/subcondition.js";

const subConditionStore = {
  namespaced: true,
  state: {
    ages: [{ value: null, text: "선택하세요" }],
    themes: [{ value: null, text: "선택하세요" }],
    age: 1,
    theme: 1,
    subConditions: [],
    infras: []
  },
  getters: {},
  mutations: {
    CLEAR_AGE_LIST(state) {
      state.ages = [{ value: null, text: "선택하세요" }];
    },
    CLEAR_THEME_LIST(state) {
      state.themes = [{ value: null, text: "선택하세요" }];
    },
    CLEAR_INFRA_LIST(state) {
      state.infras = [];
    },
    SET_AGE_LIST(state) {
      state.ages.push({ value: 1, text: "미취학" });
      state.ages.push({ value: 2, text: "초등생" });
      state.ages.push({ value: 3, text: "청소년" });
    },
    SET_THEME_LIST(state) {
      state.themes.push({ value: 1, text: "즐거운 아이" });
      state.themes.push({ value: 2, text: "똑똑한 아이" });
      state.themes.push({ value: 3, text: "건강한 아이" });
    },
    SET_SUBCONDITION_LIST(state, subConditions) {
      state.subConditions = [];
      subConditions.forEach(subCondition => {
        state.subConditions.push({ name: subCondition.thirdName, radius: subCondition.radius });
      });
    },
    SET_INFRA_LIST(state, infraInfo) {
      state.infras.push(infraInfo);
    },
  },
  actions: {
    clearInfraList: ({commit}) => {
      commit("CLEAR_INFRA_LIST");
    },
    getAgeList: ({commit}) => {
      commit("SET_AGE_LIST");
    },
    getThemeList: ({commit}) => { 
      commit("SET_THEME_LIST");
    },
    getSubConditionList: ({ commit }, condition) => {
      const params = {
        age: condition.age,
        theme: condition.theme,
      };
      subConditionList(
        params,
        ({ data }) => {
          commit("SET_SUBCONDITION_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getInfraList: ({ commit }, condition) => {
      const regex = new RegExp(`${condition.keyword}$`);
      const params = {
        x: condition.x,
        y: condition.y,
        radius: condition.radius,
        query: condition.keyword
      };
      infraList(
        params,
        ({ data }) => {
          let curCnt = data.meta.total_count;
          data.documents.forEach((item)=>{
            if(!regex.test(item.place_name)){
              curCnt--;
            }
          })    
          const infraInfo = {
            name: condition.keyword,
            category: condition.keyword,
            radius: condition.radius,
            cnt: curCnt
          }
          commit("SET_INFRA_LIST", infraInfo);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default subConditionStore;
