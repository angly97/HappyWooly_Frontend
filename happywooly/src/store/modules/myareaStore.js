import { insertArea, deleteArea, selectAll, selectBydongCode} from "@/api/myarea";

const myareaStore = {
  namespaced: true,
  state: {
    areas:[],
    isData:null,
    areat:{
      mid:null,
      age:null,
      theme:null,
      sidoName:null,
      gugunName:null,
      dongName:null,
      dongCode:null
    },
    delInfo:{
      uid: null
    }
  },
  getters: {
    checkUserInfo: function (state) {
      return state.userInfo;
    },
    checkToken: function (state) {
      return state.isValidToken;
    },
  },
  mutations: {
    CLEAR_MYAREA(state) {
      state.areas = [];
    },
    SET_MID: function (state, mid) {
      state.areat.mid = mid;
    },
    SET_MYAREA: function (state, area) {
      state.areas.push(area);
    },
    SET_AGE: function(state, agenum){
      if(agenum==1) {
        state.areat.age="미취학"
      }else if (agenum==2) {
        state.areat.age="초등생"
      } else {
        state.areat.age="청소년"
      }
    },
    SET_THEME: function(state, themenum){
      if(themenum==1) {
        state.areat.theme="즐거운 아이"
      }else if (themenum==2) {
        state.areat.theme="똑똑한 아이"
      } else {
        state.areat.theme="건강한 아이"
      }
    },
    SET_NAME:function(state, data){
      state.areat.sidoName = data.sidoName;
      state.areat.gugunName = data.gugunName;
      state.areat.dongName = data.dongName;
    },
    SET_SIDONAME:function(state, sido){
      state.areat.sidoName = sido
    },
    SET_GUGUNNAME:function(state, gugun){
      state.areat.gugunName = gugun
    },
    SET_DONGNAME:function(state, dong){
      state.areat.dongName = dong
    },
    SET_DONGCODE:function(state, code){
      state.areat.dongCode = code;
    },
    
  },
  actions: {
    async areaInsert({commit}, area){
      await insertArea(
        area,
        () => {
          commit("SET_MYAREA", area)
        },
        (error)=>{
          console.log(error);
        }
      );
    },

    async areaDelete({}, delInfo){
      await deleteArea( 
        delInfo,
        ()=>{
        },
        (error)=>{
          console.log(error);
        }
      );
    },

    async areaList({dispatch, commit}, uid){
      commit("CLEAR_MYAREA");
      await selectAll(
        uid,
        ({data}) =>{
          let areastemp = null;
          if(data){
            areastemp=data;
          for (let index = 0; index < areastemp.length; index++) {
            const element = areastemp[index];
            dispatch("searchDongCode", element);
          }
        }
        },
        (error)=>{
          console.log(error);
        }
      )
    },
    
    async searchDongCode({state, commit}, element){
      await selectBydongCode(
        element.dongCode,
        ({data}) =>{
          commit("SET_MID", element.mid);
          commit("SET_AGE", element.age);
          commit("SET_THEME", element.theme);
          commit("SET_SIDONAME", data.sidoName);
          commit("SET_GUGUNNAME", data.gugunName);
          commit("SET_DONGNAME", data.dongName);
          commit("SET_DONGCODE", element.dongCode);
          commit("SET_MYAREA", JSON.parse(JSON.stringify(state.areat)));
        },
        (error)=>{
          console.log(error);
        }
      )
    }
  },
};

export default myareaStore;
