<template>
  <!-- <v-toolbar color="rgb(209, 243, 252)" height="50%" > -->
  <v-toolbar color="rgb(209, 243, 252)" height="50%" class="pl-16 pr-16">
    <router-link :to="{ name: 'main' }"
      ><img
        v-if="!userInfo"
        src="@/assets/logo.png"
        alt="logo"
        style="margin-top: 10px; height: 60px"
    /></router-link>
    <v-tabs color="lightgray" right v-if="!userInfo">
      <v-tab :to="{ name: 'login' }" class="noneDeco">로그인</v-tab>
      <v-tab :to="{ name: 'join' }">회원가입</v-tab>
      <v-tab :to="{ name: 'about' }"> ABOUT US </v-tab>
    </v-tabs>

    <router-link :to="{ name: 'main' }"
      ><img
        v-if="userInfo"
        src="@/assets/logo.png"
        alt="logo"
        style="margin-top: 10px; height: 60px"
    /></router-link>
    <v-tabs right v-if="userInfo">
      <v-tab :to="{ name: 'house' }">아파트 검색</v-tab>
      <v-tab :to="{ name: 'mypage' }">마이페이지</v-tab>
      <v-tab @click.prevent="onClickLogout"> 로그아웃 </v-tab>
      <v-tab :to="{ name: 'about' }"> ABOUT US </v-tab>
    </v-tabs>
  </v-toolbar>
</template>

<script>
import { mapState, mapActions } from "vuex";

const userStore = "userStore";

export default {
  name: "TheHeaderComp",
  data() {
    return {};
  },
  computed: {
    ...mapState(userStore, ["isLogin", "userInfo"]),
  },
  methods: {
    ...mapActions(userStore, ["userLogout"]),
    // ...mapMutations(memberStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    onClickLogout() {
      // this.SET_IS_LOGIN(false);
      // this.SET_USER_INFO(null);
      // sessionStorage.removeItem("access-token");
      // if (this.$route.path != "/") this.$router.push({ name: "main" });
      console.log(this.userInfo.uid);
      //vuex actions에서 userLogout 실행(Backend에 저장 된 리프레시 토큰 없애기
      //+ satate에 isLogin, userInfo 정보 변경)
      // this.$store.dispatch("userLogout", this.userInfo.userid);
      this.userLogout(this.userInfo.uid);
      sessionStorage.removeItem("access-token"); //저장된 토큰 없애기
      sessionStorage.removeItem("refresh-token"); //저장된 토큰 없애기
      if (this.$route.path != "/") this.$router.push({ name: "main" });
    },
    moveView(nxtView) {
      if (nxtView == "aboutUsView") this.$router.push({ name: nxtView });
      // else this.$router.push({ name: nxtView, params: { uid: this.loginUser.uid } });
      else this.$router.push({ name: nxtView });
    },
  },
};
</script>

<style>
* {
  text-decoration: none !important;
}
</style>
