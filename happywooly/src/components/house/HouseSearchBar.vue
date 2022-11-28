<template>
  <b-row class="mt-4 mb-4 text-center">
    <b-col class="sm-3">
      <b-form-select
        v-model="sidoCode"
        :options="sidos"
        @change="gugunList"
      ></b-form-select>
    </b-col>
    <b-col class="sm-3">
      <b-form-select
        v-model="gugunCode"
        :options="guguns"
        @change="dongList"
      ></b-form-select>
    </b-col>
    <b-col class="sm-3">
      <b-form-select
        v-model="dongCode"
        :options="dongs"
        @change="ageList"
      ></b-form-select>
    </b-col>
    <b-col class="sm-3">
      <b-form-select
        v-model="age"
        :options="ages"
        @change="themeList"
      ></b-form-select>
    </b-col>
    <b-col class="sm-3">
      <b-form-select
        v-model="theme"
        :options="themes"
        @change="searchApt"
      ></b-form-select>
    </b-col>
    <b-col align left cols="1">
      <v-btn
      class="mx-2"
      fab
      dark
      x-small
      color="deep-orange lighten-2"
      elevation="2"
      v-b-modal.modal-1
      @click="addMyArea"
    >
      <v-icon dark> mdi-heart </v-icon>
    </v-btn>
    </b-col>
  </b-row>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

const houseStore = "houseStore";
const subconditionStore = "subconditionStore";
const myareaStore = "myareaStore";
const userStore = "userStore";

export default {
  name: "HouseSearchBar",
  data() {
    return {
      sidoCode: null,
      gugunCode: null,
      dongCode: null,
      age: null,
      theme: null,
    };
  },
  computed: {
    ...mapState(houseStore, ["sidos", "guguns", "dongs", "houses"]),
    ...mapState(subconditionStore, ["ages", "themes", "subConditions"]),
    ...mapState(userStore, ["userInfo"]),
  },
  created() {
    this.CLEAR_SIDO_LIST();
    this.CLEAR_APT_LIST();
    this.getSido();
  },
  methods: {
    ...mapActions(houseStore, [
      "getSido",
      "getGugun",
      "getDong",
      "getAgeList",
      "getThemeList",
      "getHouseList",
    ]),
    ...mapActions(subconditionStore, [
      "getAgeList",
      "getThemeList",
      "getSubConditionList",
    ]),
    ...mapMutations(houseStore, [
      "CLEAR_SIDO_LIST",
      "CLEAR_GUGUN_LIST",
      "CLEAR_DONG_LIST",
      "CLEAR_AGE_LIST",
      "CLEAR_THEME_LIST",
      "CLEAR_APT_LIST",
    ]),
    ...mapMutations(subconditionStore, [
      "CLEAR_AGE_LIST",
      "CLEAR_THEME_LIST",
      "CLEAR_INFRA_LIST",
    ]),
    gugunList() {
      this.CLEAR_GUGUN_LIST();
      this.gugunCode = null;
      if (this.sidoCode) this.getGugun(this.sidoCode);
    },
    dongList() {
      this.CLEAR_DONG_LIST();
      this.dongCode = null;
      if (this.gugunCode) this.getDong(this.gugunCode);
    },
    ageList() {
      this.CLEAR_AGE_LIST();
      this.age = null;
      if (this.dongCode) this.getAgeList();
    },
    themeList() {
      this.CLEAR_THEME_LIST();
      this.theme = null;
      if (this.age) this.getThemeList();
    },
    searchApt() {
      if (this.dongCode) {
        this.CLEAR_INFRA_LIST();
        this.getSubConditionList({ age: this.age, theme: this.theme });
        this.getHouseList(this.dongCode);
      }
    },
    ...mapActions(myareaStore, ["areaInsert"]),

    addMyArea() {
      if(this.theme == null){
        alert("입력되지 않은 정보가 있습니다.");
      }
      else{
        let area = {
        uid: this.userInfo.uid,
        dongCode: this.dongCode,
        age: this.age,
        theme: this.theme,
      };
      this.areaInsert(area);
      alert("관심지역에 추가되었습니다");
      }
    },
  },
};
</script>

<style scoped>
.myPageBtn {
  margin: 0 5px;
}
</style>
